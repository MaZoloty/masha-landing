import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirectories = new Set(['.git', '.github', '.agents', '.claude', '.codex', 'automation', 'docs', 'specs']);
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.mjs', '.php', '.toml', '.txt', '.xml']);
const errors = [];

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    if (ignoredDirectories.has(entry)) continue;
    const path = join(directory, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

function fail(file, message) {
  errors.push(`${relative(root, file)}: ${message}`);
}

const files = walk(root);
const htmlFiles = files.filter(file => extname(file) === '.html' && file !== join(root, 'components.html'));

for (const file of files.filter(file => textExtensions.has(extname(file)))) {
  const content = readFileSync(file, 'utf8');
  if (/(?:\d{8,12}:[A-Za-z0-9_-]{30,})/.test(content)) {
    fail(file, 'possible Telegram bot token');
  }
  if (/fonts\.(?:googleapis|gstatic)\.com/i.test(content)) {
    fail(file, 'runtime Google Fonts request');
  }
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  if (/\sstyle\s*=/i.test(html)) fail(file, 'inline style attribute');
  if (/\son[a-z]+\s*=/i.test(html)) fail(file, 'inline event handler');
  if (/mc\.yandex\.ru\/metrika\/tag\.js/i.test(html)) fail(file, 'inline analytics loader');

  for (const match of html.matchAll(/\b(?:href|src|action)=["']([^"'#]+)["']/gi)) {
    const reference = match[1].split('?')[0];
    if (!reference || /^(?:https?:|mailto:|tel:|data:)/i.test(reference)) continue;
    const target = reference.startsWith('/')
      ? join(root, reference.replace(/^\/+/, ''))
      : resolve(dirname(file), reference);
    if (!existsSync(target)) fail(file, `missing local reference ${match[1]}`);
  }
}

const home = readFileSync(join(root, 'index.html'), 'utf8');
if (/<form\b/i.test(home) || /send-telegram/i.test(home)) {
  fail(join(root, 'index.html'), 'public lead form must stay removed');
}
if (!/href=["']https:\/\/t\.me\/masha_zoloty["'][^>]+data-telegram-contact/i.test(home)) {
  fail(join(root, 'index.html'), 'direct Telegram contact action is missing');
}

const htaccessPath = join(root, '.htaccess');
const htaccess = readFileSync(htaccessPath, 'utf8');
for (const header of [
  'Content-Security-Policy',
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'Permissions-Policy',
]) {
  if (!htaccess.includes(header)) fail(htaccessPath, `missing ${header}`);
}

const allowedHashes = new Set(
  [...htaccess.matchAll(/'sha256-([^']+)'/g)].map(match => match[1]),
);
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    const normalized = match[1].replace(/\r\n?/g, '\n');
    const hash = createHash('sha256').update(normalized, 'utf8').digest('base64');
    if (!allowedHashes.has(hash)) fail(file, `inline script CSP hash is missing: sha256-${hash}`);
  }
}

if (errors.length) {
  console.error(`Security check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Security check passed: ${htmlFiles.length} public HTML files and ${files.length} files inspected.`);
