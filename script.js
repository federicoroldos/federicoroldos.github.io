// roldos.site — interactivity

const STORAGE = { LANG: 'roldos-lang', THEME: 'roldos-theme' };
const state = { lang: 'en', theme: 'dark' };

document.addEventListener('DOMContentLoaded', () => {
  loadPrefs();
  applyTheme();
  applyLang();
  bindToggles();
  bindMobileMenu();
  bindScrollSpy();
  bindReveal();
  bindContactForm();
  setYear();
});

function loadPrefs() {
  const lang = localStorage.getItem(STORAGE.LANG);
  const theme = localStorage.getItem(STORAGE.THEME);
  if (lang === 'en' || lang === 'es') state.lang = lang;
  if (theme === 'dark' || theme === 'light') state.theme = theme;
}

function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
}

/* ===== Theme ===== */
function applyTheme() {
  document.body.setAttribute('data-theme', state.theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = state.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(STORAGE.THEME, state.theme);
  applyTheme();
}

/* ===== Language ===== */
function applyLang() {
  document.body.setAttribute('data-lang', state.lang);
  document.documentElement.setAttribute('lang', state.lang);
  document.querySelectorAll('[data-i18n-en]').forEach(el => {
    const next = el.getAttribute(`data-i18n-${state.lang}`);
    if (next != null) el.textContent = next;
  });
  const label = document.getElementById('langLabel');
  if (label) label.textContent = state.lang === 'en' ? 'ES' : 'EN';
}

function toggleLang() {
  state.lang = state.lang === 'en' ? 'es' : 'en';
  localStorage.setItem(STORAGE.LANG, state.lang);
  applyLang();
}

function bindToggles() {
  const lang = document.getElementById('langToggle');
  const theme = document.getElementById('themeToggle');
  if (lang) lang.addEventListener('click', toggleLang);
  if (theme) theme.addEventListener('click', toggleTheme);
}

/* ===== Mobile menu ===== */
function bindMobileMenu() {
  const btn = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ===== Scroll spy ===== */
function bindScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
}

/* ===== Reveal on scroll ===== */
function bindReveal() {
  const targets = document.querySelectorAll(
    '.section-head, .tl-item, .project, .edu-card, .skill-block, .info-card, .stats, .contact-form, .contact-side'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => obs.observe(el));
}

/* ===== Contact form (FormSubmit ajax) ===== */
function bindContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const endpoint = form.getAttribute('data-endpoint');
    if (!endpoint) return;

    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    showStatus('', false);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Network error');
      form.reset();
      showStatus(state.lang === 'es' ? '¡Mensaje enviado! Te responderé pronto.' : 'Message sent! I will get back to you soon.', true);
    } catch (err) {
      showStatus(state.lang === 'es' ? 'No se pudo enviar el mensaje. Probá de nuevo o escribime por correo.' : 'Could not send the message. Please try again or email me directly.', false, true);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  function showStatus(msg, success, isError) {
    if (!status) return;
    if (!msg) { status.hidden = true; status.textContent = ''; status.className = 'form-status'; return; }
    status.hidden = false;
    status.textContent = msg;
    status.className = 'form-status ' + (success ? 'success' : (isError ? 'error' : ''));
  }
}
