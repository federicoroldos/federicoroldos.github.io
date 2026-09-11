// roldos.site - interactivity

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
  bindTerminal();
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
    '.section-head, .tl-item, .case, .mini-list, .cert-list, .edu-card, .skill-block, .info-card, .stats, .contact-form, .contact-side'
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

/* ===== Interactive terminal (easter egg) ===== */
function bindTerminal() {
  const terminal = document.getElementById('terminal');
  const body = document.getElementById('terminalBody');
  const output = document.getElementById('termOutput');
  const input = document.getElementById('termInput');
  const before = document.getElementById('termBefore');
  const after = document.getElementById('termAfter');
  if (!terminal || !body || !output || !input || !before || !after) return;

  function syncCursor() {
    const val = input.value;
    const start = input.selectionStart != null ? input.selectionStart : val.length;
    const end = input.selectionEnd != null ? input.selectionEnd : start;
    before.textContent = val.slice(0, start);
    after.textContent = val.slice(end);
  }

  ['input', 'keyup', 'click', 'select', 'focus'].forEach(evt => input.addEventListener(evt, syncCursor));
  syncCursor();

  // Lock the terminal to its initial content height so it ends
  // right at the prompt and never resizes when output scrolls.
  function lockHeight() {
    if (output.childElementCount > 0) return;
    body.style.height = 'auto';
    const h = body.scrollHeight;
    body.style.height = h + 'px';
  }
  lockHeight();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { lockHeight(); measureLine(); });
  window.addEventListener('resize', () => { lockHeight(); measureLine(); });

  // Stepped wheel scrolling: jump whole lines instantly like a real
  // console, bypassing the browser's smooth wheel animation.
  let wheelX = 0, wheelY = 0, lineH = 0;
  function measureLine() {
    const lh = parseFloat(getComputedStyle(body).lineHeight);
    lineH = Number.isFinite(lh) && lh > 0 ? lh : 21;
  }
  measureLine();
  body.addEventListener('wheel', (e) => {
    if (e.ctrlKey) return; // let pinch-zoom through
    e.preventDefault();
    if (!lineH) measureLine();
    const unit = e.deltaMode === 1 ? lineH : e.deltaMode === 2 ? body.clientHeight : 1;
    wheelY += e.deltaY * unit;
    wheelX += e.deltaX * unit;
    const stepY = Math.trunc(wheelY / lineH);
    const stepX = Math.trunc(wheelX / lineH);
    if (stepY !== 0) { wheelY -= stepY * lineH; body.scrollTop += stepY * lineH; }
    if (stepX !== 0) { wheelX -= stepX * lineH; body.scrollLeft += stepX * lineH; }
  }, { passive: false });

  const history = [];
  let hIndex = -1;

  const PROFILE_HTML = `<pre class="t-code"><span class="t-brace">{</span>\n` +
    `  <span class="t-key">"role"</span>:     <span class="t-str">"Software Engineer"</span>,\n` +
    `  <span class="t-key">"location"</span>: <span class="t-str">"Montevideo, UY"</span>,\n` +
    `  <span class="t-key">"focus"</span>:    [<span class="t-str">"Backend"</span>, <span class="t-str">"DevOps"</span>, <span class="t-str">"Full-Stack"</span>],\n` +
    `  <span class="t-key">"stack"</span>:    [<span class="t-str">"Java"</span>, <span class="t-str">"Python"</span>, <span class="t-str">"TS"</span>, <span class="t-str">"React"</span>],\n` +
    `  <span class="t-key">"languages"</span>:[<span class="t-str">"ES"</span>, <span class="t-str">"EN (C1)"</span>, <span class="t-str">"FI (A1)"</span>],\n` +
    `  <span class="t-key">"open_to"</span>:  <span class="t-str">"internships, full-time, freelance"</span>\n` +
    `<span class="t-brace">}</span></pre>`;

  terminal.addEventListener('click', () => {
    const sel = window.getSelection();
    if (sel && sel.toString().length > 0) return;
    input.focus();
  });

  const COMMANDS = ['help', 'whoami', 'cat', 'ls', 'pwd', 'echo', 'date', 'uname', 'open', 'theme', 'clear', 'secret', 'hire', 'sudo', 'exit'];
  const FILES = ['profile.json', 'README.md', 'contact.txt', 'secret.txt', 'projects/'];
  const SITES = ['github', 'linkedin', 'email'];
  const THEMES = ['dark', 'light'];
  let lastTab = null;

  function longestCommonPrefixLen(strs) {
    if (strs.length === 0) return 0;
    let len = strs[0].length;
    for (let i = 1; i < strs.length; i++) {
      let j = 0;
      while (j < len && j < strs[i].length && strs[i][j] === strs[0][j]) j++;
      len = j;
      if (len === 0) break;
    }
    return len;
  }

  function complete() {
    const val = input.value;
    const start = input.selectionStart != null ? input.selectionStart : val.length;
    const end = input.selectionEnd != null ? input.selectionEnd : start;
    const left = val.slice(0, start);
    const right = val.slice(end);
    const tok = left.match(/[^\s]*$/);
    const current = tok ? tok[0] : '';
    const tokenStart = left.length - current.length;
    const beforeToken = left.slice(0, tokenStart);
    const isFirst = beforeToken.trim() === '';
    let pool;
    if (isFirst) {
      pool = COMMANDS;
    } else {
      const cmd = (beforeToken.trim().split(/\s+/)[0] || '').toLowerCase();
      if (cmd === 'cat') pool = FILES;
      else if (cmd === 'open') pool = SITES;
      else if (cmd === 'theme') pool = THEMES;
      else return;
    }
    const low = current.toLowerCase();
    const matches = pool.filter(c => c.toLowerCase().startsWith(low));
    if (matches.length === 0) { lastTab = null; return; }
    if (matches.length === 1) {
      const rep = matches[0] + (isFirst ? ' ' : '');
      const newLeft = left.slice(0, tokenStart) + rep;
      input.value = newLeft + right;
      const pos = newLeft.length;
      try { input.setSelectionRange(pos, pos); } catch (_) {}
      syncCursor();
      lastTab = null;
      return;
    }
    const lcp = longestCommonPrefixLen(matches.map(s => s.toLowerCase()));
    if (lcp > current.length) {
      const rep = matches[0].slice(0, lcp);
      const newLeft = left.slice(0, tokenStart) + rep;
      input.value = newLeft + right;
      const pos = newLeft.length;
      try { input.setSelectionRange(pos, pos); } catch (_) {}
      syncCursor();
      lastTab = null;
      return;
    }
    const key = left + '|' + tokenStart;
    if (lastTab && lastTab.key === key) {
      printOut(matches.join('  '));
      scrollDown();
      lastTab = null;
    } else {
      lastTab = { key };
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      complete();
      return;
    }
    lastTab = null;
    if (e.key === 'Enter') {
      run(input.value);
      input.value = '';
      hIndex = -1;
      syncCursor();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      if (hIndex === -1) hIndex = history.length - 1;
      else if (hIndex > 0) hIndex -= 1;
      input.value = history[hIndex] || '';
      requestAnimationFrame(() => { input.setSelectionRange(input.value.length, input.value.length); syncCursor(); });
      syncCursor();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIndex === -1) return;
      hIndex += 1;
      input.value = hIndex >= history.length ? (hIndex = -1, '') : history[hIndex];
      requestAnimationFrame(() => { try { input.setSelectionRange(input.value.length, input.value.length); } catch (_) {} syncCursor(); });
      syncCursor();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      output.innerHTML = '';
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      echoLine(input.value + '^C');
      input.value = '';
      syncCursor();
    } else if (e.key === 'u' && e.ctrlKey) {
      e.preventDefault();
      input.value = '';
      syncCursor();
    }
  });

  function scrollDown() {
    body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function echoLine(cmd) {
    const p = document.createElement('p');
    p.className = 'term-line term-echo';
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = '$';
    p.appendChild(prompt);
    p.appendChild(document.createTextNode(' ' + cmd));
    output.appendChild(p);
  }

  function printOut(text, cls) {
    const p = document.createElement('p');
    p.className = 'term-line ' + (cls || 'term-out');
    p.textContent = text;
    output.appendChild(p);
  }

  function printHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) output.appendChild(div.firstChild);
  }

  function run(raw) {
    const cmdLine = raw.replace(/\s+/g, ' ').trim();
    echoLine(raw.trim() === '' ? '' : raw.trim());
    if (cmdLine === '') { scrollDown(); return; }
    history.push(cmdLine);
    if (history.length > 50) history.shift();

    const parts = cmdLine.split(' ');
    const base = parts[0].toLowerCase();
    const args = parts.slice(1);
    const rest = args.join(' ');
    const restLower = rest.toLowerCase();

    switch (base) {
      case 'help':
        printOut('available commands:');
        printOut('  whoami              who are you?');
        printOut('  cat profile.json    view profile');
        printOut('  ls                  list files');
        printOut('  pwd                 where am I?');
        printOut('  echo <text>         say something');
        printOut('  date                current date');
        printOut('  open <site>         github | linkedin | email');
        printOut('  theme <dark|light>  switch site theme');
        printOut('  clear               clear terminal');
        break;
      case 'whoami':
        printOut('federico-roldos');
        break;
      case 'pwd':
        printOut('/home/federico');
        break;
      case 'ls':
      case 'dir':
      case 'll':
        printOut('profile.json  README.md  contact.txt  secret.txt  projects/');
        break;
      case 'cat':
        if (!rest) { printOut('usage: cat <file>', 'term-err'); break; }
        if (restLower === 'profile.json') printHtml(PROFILE_HTML);
        else if (restLower === 'secret.txt') printOut('You found the easter egg. Curious people who poke at terminals are exactly who I like working with — reach me at federicoroldos1@gmail.com');
        else if (restLower === 'contact.txt') printOut('email: federicoroldos1@gmail.com | github: github.com/federicoroldos | linkedin: linkedin.com/in/federicoroldos');
        else if (restLower === 'readme.md' || restLower === 'readme') printOut('roldos.site — built with HTML, CSS and JS. Hosted on GitHub Pages. This terminal is real, try "help".');
        else if (restLower === 'projects/' || restLower === 'projects') printOut('cat: projects/: Is a directory', 'term-err');
        else printOut(`cat: ${args[0]}: No such file or directory`, 'term-err');
        break;
      case 'echo':
        printOut(rest);
        break;
      case 'date':
        printOut(new Date().toString());
        break;
      case 'uname':
        printOut(restLower.includes('-a') ? 'Linux roldos.site 6.9.0-federico x86_64 GNU/Linux' : 'Linux');
        break;
      case 'open':
        if (!rest) { printOut('usage: open <github|linkedin|email>', 'term-err'); break; }
        if (restLower === 'github') { printOut('opening github.com/federicoroldos ...'); window.open('https://github.com/federicoroldos', '_blank', 'noopener'); }
        else if (restLower === 'linkedin') { printOut('opening linkedin.com/in/federicoroldos ...'); window.open('https://www.linkedin.com/in/federicoroldos/', '_blank', 'noopener'); }
        else if (restLower === 'email' || restLower === 'mail') { printOut('opening federicoroldos1@gmail.com ...'); window.location.href = 'mailto:federicoroldos1@gmail.com'; }
        else printOut(`open: unknown site "${args[0]}" — try github, linkedin or email`, 'term-err');
        break;
      case 'theme':
        if (restLower === 'dark' || restLower === 'light') {
          state.theme = restLower;
          localStorage.setItem(STORAGE.THEME, state.theme);
          applyTheme();
          printOut(`theme set to ${restLower}`);
        } else {
          printOut('usage: theme <dark|light>', 'term-err');
        }
        break;
      case 'sudo':
        if (restLower === 'hire federico' || restLower === 'hire') printOut('Permission granted. Start here: federicoroldos1@gmail.com');
        else printOut("user 'guest' is not in the sudoers file. This incident will be reported.", 'term-err');
        break;
      case 'rm':
        printOut('Nice try. This filesystem is indestructible.', 'term-err');
        break;
      case 'exit':
      case 'quit':
      case 'logout':
        printOut('There is no escape. You live in this terminal now.');
        break;
      case 'vim':
      case 'vi':
      case 'nano':
      case 'emacs':
      case 'code':
        printOut("No editors here. Only raw terminal energy. Try 'cat secret.txt'.");
        break;
      case 'hello':
      case 'hi':
      case 'hey':
      case 'hola':
      case 'moi':
      case 'terve':
        printOut("Hey! Nice to meet you. Type 'help' to look around.");
        break;
      case 'hire':
      case 'hireme':
      case 'hire-me':
        printOut('Great choice. Email me: federicoroldos1@gmail.com');
        break;
      case 'secret':
      case 'xyzzy':
      case 'konami':
        printOut("Close. Try 'cat secret.txt'.");
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      default:
        printOut(`command not found: ${parts[0]} — try 'help'`, 'term-err');
    }
    scrollDown();
  }
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
