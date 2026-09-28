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

function renderHeader() {
  const mount = document.querySelector('[data-header]');
  if (!mount) return;
  const page = document.body.dataset.page;

  mount.innerHTML = `
    <div class="wrap header-inner">
      <a class="brand" href="index.html">
        ${LOGO_SVG}
        <span class="brand-text">
          <strong>Athanikkal Traders</strong>
          <small>Chelari · Malappuram</small>
        </span>
      </a>

      <nav class="nav">
        <a href="index.html"    class="${page === 'home' ? 'is-active' : ''}"     data-i18n="nav_home"></a>
        <a href="products.html" class="${page === 'products' ? 'is-active' : ''}" data-i18n="nav_products"></a>
        <a href="cart.html"     class="${page === 'cart' ? 'is-active' : ''}"     data-i18n="nav_enquiry"></a>
      </nav>

      <div class="header-actions">
        <div class="lang-switch">
          <button type="button" data-lang-btn="en">EN</button>
          <button type="button" data-lang-btn="ml">മല</button>
        </div>
        <a class="cart-link" href="cart.html" aria-label="Enquiry list">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.6 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
          <span class="cart-badge" data-cart-badge hidden>0</span>
        </a>
      </div>
    </div>`;

  mount.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
  });
}

function renderFooter() {
  const mount = document.querySelector('[data-footer]');
  if (!mount) return;

  mount.innerHTML = `
    <div class="wrap footer-inner">
      <div>
        ${LOGO_SVG.replace('class="brand-mark"', 'class="footer-logo"')}
        <p class="muted">${SHOP.addressLines.join('<br>')}</p>
        <p class="muted"><span data-i18n="gstin_label"></span>: ${SHOP.gstin}</p>
      </div>
      <div>
        <h3 data-i18n="phone_label"></h3>
        <p><a href="tel:+91${SHOP.phonePrimary}">${SHOP.phonePrimary}</a></p>
        <p><a href="tel:+91${SHOP.phoneSecondary}">${SHOP.phoneSecondary}</a></p>
        <p><a href="${SHOP.mapsUrl}" target="_blank" rel="noopener" data-i18n="directions"></a></p>
      </div>
      <div>
        <h3 data-i18n="hours_label"></h3>
        <div class="footer-hours" data-footer-hours></div>
      </div>
      <div>
        <h3 data-i18n="nav_products"></h3>
        <ul class="footer-cats"></ul>
      </div>
    </div>
    <div class="wrap footer-base">
      <span>© ${new Date().getFullYear()} ${SHOP.name}</span>
      <span data-i18n="order_note"></span>
    </div>`;

  renderHours(mount.querySelector('[data-footer-hours]'));

  const list = mount.querySelector('.footer-cats');
  CATEGORIES.forEach(cat => {
    const li = el('li');
    const a = el('a', null, tField(cat));
    a.href = `products.html?cat=${cat.id}`;
    a.dataset.catLink = cat.id;
    li.append(a);
    list.append(li);
  });
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
  renderHeader();
  renderFooter();
  applyLang();
  updateCartBadge();
});
