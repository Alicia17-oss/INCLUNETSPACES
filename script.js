/* IncunetSpaces – script.js
   - Tema AMOLED / Azul cielo (persistente)
   - Menú móvil responsive
   - Navegación activa
   - Carga de JSON (voluntariados / organizaciones)
   - Filtro rápido en voluntariados
   - Efecto reveal on-scroll
   - Copiar bloques JSON en /api.html
*/

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ---------- Tema (dark=AMOLED / light=Azul cielo) ---------- */
function applyTheme() {
  const t = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('dark', t === 'dark');
  const btn = $('#theme-toggle');
  if (btn) btn.textContent = t === 'dark' ? 'Modo cielo' : 'Modo AMOLED';
}
function toggleTheme() {
  const t = localStorage.getItem('theme') || 'dark';
  localStorage.setItem('theme', t === 'dark' ? 'light' : 'dark');
  applyTheme();
}

/* ---------- Nav activa ---------- */
function setActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a, .mobile-menu a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

/* ---------- Menú móvil ---------- */
function initMenu() {
  const btn = $('#menu-toggle');
  const menu = $('#mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  $$('.mobile-menu a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

/* ---------- Efecto reveal ---------- */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));
}

/* ---------- Alertas y copiar código ---------- */
function showAlert(msg) {
  let el = $('.alert');
  if (!el) {
    el = document.createElement('div');
    el.className = 'alert';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1800);
}
function copyCode(btn) {
  const code = btn?.parentElement?.querySelector('code')?.innerText || '';
  if (!code) return;
  navigator.clipboard.writeText(code).then(() => showAlert('✅ Copiado con éxito'));
}

/* ---------- Helpers de datos ---------- */
async function fetchJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`HTTP ${r.status} al cargar ${path}`);
  return r.json();
}

/* ---------- Voluntariados (con filtro) ---------- */
async function initVoluntariados() {
  const wrap = $('#lista-vol');
  if (!wrap) return;

  let data = [];
  try {
    data = await fetchJSON('mock/voluntariados.json');
  } catch (e) {
    console.warn(e);
  }

  const render = list => {
    wrap.innerHTML = list.map(v => `
      <article class="card reveal">
        <img src="${v.img}" alt="${v.nombre_vol}">
        <div class="content">
          <span class="badge">${v.categoria}</span>
          <h3>${v.nombre_vol}</h3>
          <p>${v.descripcion}</p>
        </div>
      </article>
    `).join('');
    initReveal();
  };

  render(data);

  const input = $('#filtro');
  if (input) {
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      const filtered = data.filter(v =>
        v.nombre_vol.toLowerCase().includes(q) ||
        v.categoria.toLowerCase().includes(q) ||
        (v.descripcion || '').toLowerCase().includes(q)
      );
      render(filtered);
    });
  }
}

/* ---------- Organizaciones ---------- */
async function initOrganizaciones() {
  const wrap = $('#lista-org');
  if (!wrap) return;

  let data = [];
  try {
    data = await fetchJSON('mock/organizaciones.json');
  } catch (e) {
    console.warn(e);
  }

  wrap.innerHTML = data.map(o => `
    <article class="card reveal">
      <img src="${o.img}" alt="${o.nombre_org}">
      <div class="content">
        <span class="badge">${o.categoria || o.ubicacion}</span>
        <h3>${o.nombre_org}</h3>
        <p>${o.descripcion}</p>
      </div>
    </article>
  `).join('');
  initReveal();
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  setActive();
  initMenu();
  initReveal();
  initVoluntariados();
  initOrganizaciones();

  $('#theme-toggle')?.addEventListener('click', toggleTheme);

  // Delegación para botones "📋 Copiar" en api.html
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.copy');
    if (btn) copyCode(btn);
  });
});
