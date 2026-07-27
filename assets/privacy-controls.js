(() => {
  'use strict';

  const STORAGE_KEY = 'mazoloty.analytics-consent.v1';
  const ACCEPTED = 'accepted';
  const REJECTED = 'rejected';
  const METRIKA_ID = 109430856;
  let banner;
  let metrikaInitialized = false;

  function readDecision() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function saveDecision(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage may be unavailable in private or restricted browser modes.
    }
  }

  function loadMetrika() {
    if (metrikaInitialized) return;
    metrikaInitialized = true;

    window.ym = window.ym || function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();

    if (!document.querySelector('[data-mazoloty-metrika]')) {
      const script = document.createElement('script');
      script.async = true;
      script.dataset.mazolotyMetrika = '';
      script.src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;
      script.referrerPolicy = 'strict-origin-when-cross-origin';
      script.addEventListener('error', () => script.remove(), { once: true });
      document.head.appendChild(script);
    }

    window.ym(METRIKA_ID, 'init', {
      webvisor: false,
      clickmap: true,
      accurateTrackBounce: true,
      trackLinks: true,
    });
  }

  function stopMetrika() {
    if (metrikaInitialized && typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'destruct');
    }
    metrikaInitialized = false;

    ['_ym_d', '_ym_isad', '_ym_uid', '_ym_visorc'].forEach(name => {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    });
  }

  function closeBanner() {
    if (!banner) return;
    banner.hidden = true;
  }

  function applyDecision(value) {
    saveDecision(value);
    closeBanner();
    if (value === ACCEPTED) {
      loadMetrika();
    } else {
      stopMetrika();
    }
  }

  function createBanner() {
    if (banner) return banner;

    banner = document.createElement('section');
    banner.className = 'privacy-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-labelledby', 'privacy-banner-title');
    const copy = document.createElement('div');
    copy.className = 'privacy-banner__copy';
    const title = document.createElement('h2');
    title.className = 'privacy-banner__title';
    title.id = 'privacy-banner-title';
    title.textContent = 'Можно включить аналитику?';
    const text = document.createElement('p');
    text.className = 'privacy-banner__text';
    text.append('Яндекс Метрика помогает понять, какие страницы полезны, и включается только с вашего согласия. ');
    const details = document.createElement('a');
    details.href = '/privacy.html';
    details.textContent = 'Подробнее';
    text.append(details, '.');
    copy.append(title, text);

    const actions = document.createElement('div');
    actions.className = 'privacy-banner__actions';
    const rejectButton = document.createElement('button');
    rejectButton.className = 'privacy-banner__button privacy-banner__button--secondary';
    rejectButton.type = 'button';
    rejectButton.dataset.privacyReject = '';
    rejectButton.textContent = 'Без аналитики';
    const acceptButton = document.createElement('button');
    acceptButton.className = 'privacy-banner__button';
    acceptButton.type = 'button';
    acceptButton.dataset.privacyAccept = '';
    acceptButton.textContent = 'Разрешить';
    actions.append(rejectButton, acceptButton);
    banner.append(copy, actions);

    rejectButton.addEventListener('click', () => {
      applyDecision(REJECTED);
    });
    acceptButton.addEventListener('click', () => {
      applyDecision(ACCEPTED);
    });

    document.body.appendChild(banner);
    return banner;
  }

  function openSettings() {
    const currentBanner = createBanner();
    currentBanner.hidden = false;
    const currentDecision = readDecision();
    const focusTarget = currentDecision === ACCEPTED
      ? currentBanner.querySelector('[data-privacy-reject]')
      : currentBanner.querySelector('[data-privacy-accept]');
    focusTarget.focus({ preventScroll: true });
  }

  function addSettingsLinks() {
    document.querySelectorAll('[data-privacy-settings]').forEach(control => {
      control.addEventListener('click', event => {
        event.preventDefault();
        openSettings();
      });
    });

    const footer = document.querySelector('footer');
    if (!footer || footer.querySelector('[data-privacy-settings]')) return;

    const wrapper = document.createElement('p');
    wrapper.className = 'privacy-settings-entry';
    const button = document.createElement('button');
    button.className = 'privacy-settings-link';
    button.type = 'button';
    button.dataset.privacySettings = '';
    button.textContent = 'Настройки аналитики';
    button.addEventListener('click', openSettings);
    wrapper.appendChild(button);
    const target = footer.querySelector('.container') || footer;
    target.appendChild(wrapper);
  }

  function initialize() {
    addSettingsLinks();
    const decision = readDecision();
    if (decision === ACCEPTED) {
      loadMetrika();
      return;
    }
    if (decision !== REJECTED) createBanner();
  }

  window.mazolotyPrivacy = {
    openSettings,
    getAnalyticsDecision: readDecision,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();

