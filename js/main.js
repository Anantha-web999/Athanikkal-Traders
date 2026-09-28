/* Shared UI: header, footer, language toggle, cart badge, product cards. */

/* Simplified mark from the shop logo — the chevron A with its overhanging
   beam. The full logo (with the figure) is too fine to read at 34px, so it
   is used large in the footer instead. */
const LOGO_SVG = `<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
  <path d="M32 6 L58 58 L46.5 58 L32 28.5 L17.5 58 L6 58 Z"/>
  <rect x="12.5" y="38" width="39" height="6.5"/>
</svg>`;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* Header and footer markup is baked in by build.js so the page is complete
   before JavaScript runs — this only attaches behaviour to it. */
function wireHeader() {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
  });
}

function wireFooter() {
  renderHours(document.querySelector('[data-footer-hours]'));
}

/* `time` is a plain string when it needs no translation ("9:00 AM – 7:00 PM")
   and a {en, ml} object when it does ("Closed"). */
function renderHours(mount) {
  if (!mount) return;
  const paint = () => {
    mount.innerHTML = '';
    SHOP.hours.forEach(slot => {
      const row = el('div', 'hours-row');
      row.append(el('span', null, tField(slot.days)));
      const time = typeof slot.time === 'string' ? slot.time : tField(slot.time);
      row.append(el('span', 'hours-time', time));
      mount.append(row);
    });
  };
  document.addEventListener('langchange', paint);
  paint();
}

function updateCartBadge() {
  const count = cartCount();
  document.querySelectorAll('[data-cart-badge]').forEach(badge => {
    badge.textContent = count;
    badge.hidden = count === 0;
  });
}

/* Products have no photos yet. The <img> is removed if the file is absent,
   revealing a styled fallback underneath — so the grid never shows broken
   images while the shop collects real photography. */
function thumb(product) {
  const box = el('div', 'thumb');
  box.dataset.cat = product.cat;

  const fallback = el('span', 'thumb-fallback', product.brand || tField(product).slice(0, 12));
  box.append(fallback);

  const img = new Image();
  img.loading = 'lazy';
  img.alt = '';
  img.src = `images/products/${product.img}.jpg`;
  img.addEventListener('error', () => img.remove());
  box.append(img);

  return box;
}

function productCard(product) {
  const card = el('article', 'card');

  card.append(thumb(product));

  const body = el('div', 'card-body');
  if (product.brand) body.append(el('span', 'card-brand', product.brand));
  body.append(el('h3', 'card-title', tField(product)));
  if (product.spec) body.append(el('p', 'card-spec', product.spec));
  body.append(el('p', 'card-price', t('price_note')));

  const btn = el('button', 'btn btn-add');
  btn.type = 'button';
  const paint = () => {
    const added = inCart(product.id);
    btn.textContent = added ? t('added') : t('add');
    btn.classList.toggle('is-added', added);
  };
  btn.addEventListener('click', () => {
    addToCart(product.id);
    paint();
  });
  document.addEventListener('cartchange', paint);
  document.addEventListener('langchange', paint);
  paint();

  body.append(btn);
  card.append(body);
  return card;
}

document.addEventListener('cartchange', updateCartBadge);

document.addEventListener('DOMContentLoaded', () => {
  wireHeader();
  wireFooter();
  applyLang();
  updateCartBadge();
});
