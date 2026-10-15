// Everything interactive lives here. No copy lives here: all text is in index.html.
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Header hairline once you scroll ──
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── The mirror: click to pop the buttons out ──
const stage = document.querySelector('.stage');
const mirror = document.getElementById('mirror');
const hint = document.getElementById('hint');

function setOpen(open) {
  stage.classList.toggle('open', open);
  mirror.setAttribute('aria-expanded', open);
  mirror.setAttribute('aria-label', open ? 'Close the menu' : 'Open the menu');
  if (open) hint.classList.add('gone');
}
mirror.addEventListener('click', () => setOpen(!stage.classList.contains('open')));

// The sky inside the mirror shifts a little toward the cursor
if (!reduced) {
  document.querySelector('.hero').addEventListener('pointermove', e => {
    const r = mirror.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
    const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    mirror.style.setProperty('--mx', `${dx * -30}px`);
    mirror.style.setProperty('--my', `${dy * -30}px`);
  });
}

// ── Buttons open one panel at a time ──
const pops = [...document.querySelectorAll('.pop')];
const panels = [...document.querySelectorAll('.panel')];

function showPanel(id, scroll = true) {
  const target = document.getElementById(id);
  if (!target) return;
  panels.forEach(p => { p.hidden = p !== target; });
  pops.forEach(b => b.setAttribute('aria-current', b.dataset.panel === id));
  history.replaceState(null, '', '#' + id);
  if (scroll) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}
pops.forEach(b => b.addEventListener('click', () => showPanel(b.dataset.panel)));

// A link like aledajohnson.github.io/#van opens straight to that panel
const fromHash = location.hash.slice(1);
if (fromHash && document.getElementById(fromHash)?.classList.contains('panel')) {
  setOpen(true);
  showPanel(fromHash, false);
}

// ── About: flip cards ──
document.querySelectorAll('.fact').forEach(btn => {
  btn.setAttribute('aria-pressed', 'false');
  btn.addEventListener('click', () => btn.setAttribute('aria-pressed', btn.classList.toggle('flipped')));
});

// ── Van Build: empty tiles for missing photos, and a big-photo viewer ──
const photos = [...document.querySelectorAll('.photo')];
photos.forEach((fig, i) => {
  fig.dataset.n = String(i + 1).padStart(2, '0');
  const img = fig.querySelector('img');
  const markMissing = () => fig.classList.add('missing');
  img.addEventListener('error', markMissing);
  if (img.complete && img.naturalWidth === 0 && img.src) markMissing();
});

const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
let current = 0;
const shown = () => photos.filter(f => !f.classList.contains('missing'));

function openPhoto(index) {
  const list = shown();
  if (!list.length) return;
  current = (index + list.length) % list.length;
  const img = list[current].querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  if (!lightbox.open) lightbox.showModal();
}
photos.forEach(fig => fig.addEventListener('click', () => {
  if (!fig.classList.contains('missing')) openPhoto(shown().indexOf(fig));
}));
lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lb-prev').addEventListener('click', () => openPhoto(current - 1));
lightbox.querySelector('.lb-next').addEventListener('click', () => openPhoto(current + 1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
lightbox.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') openPhoto(current - 1);
  if (e.key === 'ArrowRight') openPhoto(current + 1);
});

// ── Reading List: pull a book off the shelf ──
const note = document.getElementById('shelf-note');
const spines = [...document.querySelectorAll('.spine')];
spines.forEach(s => {
  s.setAttribute('aria-pressed', 'false');
  s.addEventListener('click', () => {
    const on = s.getAttribute('aria-pressed') !== 'true';
    spines.forEach(o => o.setAttribute('aria-pressed', 'false'));
    s.setAttribute('aria-pressed', on);
    note.textContent = on ? s.dataset.note : '';
  });
});
