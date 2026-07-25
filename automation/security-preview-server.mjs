import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htaccess = readFileSync(resolve(root, '.htaccess'), 'utf8');
const csp = htaccess.match(/Header always set Content-Security-Policy "([^"]+)"/)?.[1];
const port = Number(process.env.PORT || 4175);

if (!csp) throw new Error('Content-Security-Policy was not found in .htaccess');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let path = resolve(root, `.${pathname}`);

  if (path !== root && !path.startsWith(`${root}${sep}`)) {
    response.writeHead(404).end();
    return;
  }
  if (existsSync(path) && statSync(path).isDirectory()) path = resolve(path, 'index.html');
  if (!existsSync(path) || !statSync(path).isFile()) {
    response.writeHead(404).end();
    return;
  }

  response.setHeader('Content-Security-Policy', csp);
  response.setHeader('Strict-Transport-Security', 'max-age=31536000');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Content-Type', mimeTypes[extname(path).toLowerCase()] || 'application/octet-stream');
  response.writeHead(200);
  response.end(readFileSync(path));
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Security preview: http://127.0.0.1:${port}/`);
});
