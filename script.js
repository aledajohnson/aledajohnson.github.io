// Everything interactive lives here. No copy lives here: all text is in index.html.

// ── Header hairline once you scroll ──
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

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

// ── Favorite Books: pull a book off the stack ──
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
