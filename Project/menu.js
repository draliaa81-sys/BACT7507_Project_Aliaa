/* ============================================================
   menu.js
   Fetches dish data from menu.json and renders the menu grid,
   handles filtering, the dish detail modal, the mobile nav,
   scroll animations, and the contact form.

   To add / edit / remove a dish: just edit menu.json — this
   file does not need to change. See README.md for the schema.
   ============================================================ */

let dishes = [];
let currentFilter = 'all';

// Simple inline placeholder so the page still looks fine if an
// image file referenced in menu.json hasn't been added yet.
const FALLBACK_IMG =
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">
      <rect width="100%" height="100%" fill="#2a2420"/>
      <text x="50%" y="50%" fill="#c9a35a" font-family="serif" font-size="22"
            text-anchor="middle" dominant-baseline="middle">Image coming soon</text>
    </svg>`);

async function loadMenu() {
  try {
    const res = await fetch('menu.json');
    if (!res.ok) throw new Error('Failed to load menu.json (' + res.status + ')');
    dishes = await res.json();
    renderMenu(currentFilter);
  } catch (err) {
    console.error('Could not load menu:', err);
    const grid = document.getElementById('menuGrid');
    if (grid) {
      grid.innerHTML =
        '<p style="text-align:center;color:var(--text-muted);padding:2rem;">' +
        'Sorry, the menu could not be loaded right now. Please try again shortly.</p>';
    }
  }
}

function onImgError(imgEl) {
  imgEl.onerror = null; // prevent infinite loop if fallback also fails
  imgEl.src = FALLBACK_IMG;
}

function renderMenu(filter) {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  const filtered = filter === 'all' ? dishes : dishes.filter(d => d.category === filter);

  grid.innerHTML = filtered.map(d => `
    <div class="dish-card" onclick="openModal(${d.id})">
      <div class="dish-img-wrap">
        <img src="${d.img}" alt="${d.name}" class="dish-img" loading="lazy"
             onerror="onImgError(this)" />
      </div>
      <div class="dish-body">
        <div class="dish-tags">
          ${d.tags.map(t => `<span class="dish-tag ${t === 'Halal' ? 'halal' : ''}">${t}</span>`).join('')}
        </div>
        <h3 class="dish-name">${d.name}</h3>
        <p class="dish-arabic">${d.arabic}</p>
        <p class="dish-desc">${d.desc}</p>
        <div class="dish-footer">
          <span class="dish-price">${d.price}</span>
          <span class="dish-ingredients">${d.ingredients.split(',').slice(0, 3).join(', ')}...</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterMenu(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(filter);
}

function openModal(id) {
  const d = dishes.find(x => x.id === id);
  if (!d) return;

  const modalImg = document.getElementById('modalImg');
  modalImg.onerror = () => onImgError(modalImg);
  modalImg.src = d.img;
  modalImg.alt = d.name;

  document.getElementById('modalTags').innerHTML =
    d.tags.map(t => `<span class="dish-tag ${t === 'Halal' ? 'halal' : ''}">${t}</span>`).join('');
  document.getElementById('modalName').textContent = d.name;
  document.getElementById('modalArabic').textContent = d.arabic;
  document.getElementById('modalDesc').textContent = d.longDesc;
  document.getElementById('modalIngredients').textContent = d.ingredients;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function submitForm(e) {
  e.preventDefault();
  document.getElementById('formSuccess').style.display = 'block';
  e.target.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
  setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 6000);
}

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Nav scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.padding = window.scrollY > 60 ? '0.8rem 4rem' : '';
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// Keyboard close modal
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Init
loadMenu();
