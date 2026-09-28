/* Bakes static English HTML into the pages so search engines and slow phones
   see real content before any JavaScript runs. JS then re-renders the same
   markup for interactivity and Malayalam.

   Run after editing js/products.js:   node build.js
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;

/* js/products.js is a plain browser script, so evaluate it and hand back the
   top-level bindings rather than require()-ing it. */
function loadData() {
  const src = fs.readFileSync(path.join(ROOT, 'js', 'products.js'), 'utf8');
  const ctx = vm.createContext({});
  return vm.runInContext(src + ';({ SHOP, CATEGORIES, PRODUCTS })', ctx);
}

const esc = s => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const LOGO = `<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
  <path d="M32 6 L58 58 L46.5 58 L32 28.5 L17.5 58 L6 58 Z"/>
  <rect x="12.5" y="38" width="39" height="6.5"/>
</svg>`;

function header(page) {
  const on = p => (p === page ? ' is-active' : '');
  return `<div class="wrap header-inner">
      <a class="brand" href="index.html">
        ${LOGO}
        <span class="brand-text">
          <strong>Athanikkal Traders</strong>
          <small>Chelari &middot; Malappuram</small>
        </span>
      </a>

      <nav class="nav">
        <a href="index.html" class="${on('home')}" data-i18n="nav_home">Home</a>
        <a href="products.html" class="${on('products')}" data-i18n="nav_products">Products</a>
        <a href="cart.html" class="${on('cart')}" data-i18n="nav_enquiry">Enquiry</a>
      </nav>

      <div class="header-actions">
        <div class="lang-switch">
          <button type="button" data-lang-btn="en">EN</button>
          <button type="button" data-lang-btn="ml">&#3374;&#3378;</button>
        </div>
        <a class="cart-link" href="cart.html" aria-label="Enquiry list">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.6 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
          <span class="cart-badge" data-cart-badge hidden>0</span>
        </a>
      </div>
    </div>`;
}

function hoursRows(SHOP) {
  return SHOP.hours.map(slot => {
    const time = typeof slot.time === 'string' ? slot.time : slot.time.en;
    return `<div class="hours-row"><span>${esc(slot.days.en)}</span><span class="hours-time">${esc(time)}</span></div>`;
  }).join('\n        ');
}

function footer(SHOP, CATEGORIES) {
  const cats = CATEGORIES.map(c =>
    `<li><a href="products.html?cat=${c.id}" data-cat-name="${c.id}">${esc(c.en)}</a></li>`
  ).join('\n          ');

  return `<div class="wrap footer-inner">
      <div>
        ${LOGO.replace('class="brand-mark"', 'class="footer-logo"')}
        <p class="muted">${SHOP.addressLines.map(esc).join('<br>')}</p>
        <p class="muted"><span data-i18n="gstin_label">GSTIN</span>: ${SHOP.gstin}</p>
      </div>
      <div>
        <h3 data-i18n="phone_label">Phone</h3>
        <p><a href="tel:+91${SHOP.phonePrimary}">${SHOP.phonePrimary}</a></p>
        <p><a href="tel:+91${SHOP.phoneSecondary}">${SHOP.phoneSecondary}</a></p>
        <p><a href="${esc(SHOP.mapsUrl)}" target="_blank" rel="noopener" data-i18n="directions">Get directions</a></p>
      </div>
      <div>
        <h3 data-i18n="hours_label">Shop Hours</h3>
        <div class="footer-hours" data-footer-hours>
        ${hoursRows(SHOP)}
        </div>
      </div>
      <div>
        <h3 data-i18n="nav_products">Products</h3>
        <ul class="footer-cats">
          ${cats}
        </ul>
      </div>
    </div>
    <div class="wrap footer-base">
      <span>&copy; ${new Date().getFullYear()} ${esc(SHOP.name)}</span>
      <span data-i18n="order_note">Orders are confirmed over the phone. No online payment.</span>
    </div>`;
}

function categoryIndex(CATEGORIES, PRODUCTS) {
  return CATEGORIES.map((cat, i) => {
    const count = PRODUCTS.filter(p => p.cat === cat.id).length;
    return `<a class="cat-tile" href="products.html?cat=${cat.id}">
        <span class="idx">${String(i + 1).padStart(2, '0')}</span>
        <span><h3 data-cat-name="${cat.id}">${esc(cat.en)}</h3>
        <span class="count">${count} items</span></span>
      </a>`;
  }).join('\n      ');
}

function productGrid(PRODUCTS) {
  return PRODUCTS.map(p => {
    const fallback = p.brand || p.en.slice(0, 12);
    return `<article class="card">
        <div class="thumb" data-cat="${p.cat}">
          <span class="thumb-fallback">${esc(fallback)}</span>
          <img loading="lazy" alt="" src="images/products/${p.img}.jpg" onerror="this.remove()">
        </div>
        <div class="card-body">
          ${p.brand ? `<span class="card-brand">${esc(p.brand)}</span>` : ''}
          <h3 class="card-title">${esc(p.en)}</h3>
          ${p.spec ? `<p class="card-spec">${esc(p.spec)}</p>` : ''}
          <p class="card-price">Call for best wholesale rate</p>
          <button class="btn btn-add" type="button">Add</button>
        </div>
      </article>`;
  }).join('\n      ');
}

/* Replaces everything between <!-- build:NAME --> and <!-- /build:NAME -->. */
function inject(html, name, content) {
  const re = new RegExp(`(<!-- build:${name} -->)[\\s\\S]*?(<!-- /build:${name} -->)`);
  if (!re.test(html)) throw new Error(`Marker "${name}" not found`);
  return html.replace(re, `$1\n      ${content}\n      $2`);
}

function writePage(file, transform) {
  const full = path.join(ROOT, file);
  fs.writeFileSync(full, transform(fs.readFileSync(full, 'utf8')));
  console.log(`  built ${file}`);
}

function main() {
  const { SHOP, CATEGORIES, PRODUCTS } = loadData();
  console.log(`Building ${PRODUCTS.length} products across ${CATEGORIES.length} categories`);

  writePage('index.html', h => {
    h = inject(h, 'header', header('home'));
    h = inject(h, 'categories', categoryIndex(CATEGORIES, PRODUCTS));
    h = inject(h, 'hours', hoursRows(SHOP));
    return inject(h, 'footer', footer(SHOP, CATEGORIES));
  });

  writePage('products.html', h => {
    h = inject(h, 'header', header('products'));
    h = inject(h, 'products', productGrid(PRODUCTS));
    return inject(h, 'footer', footer(SHOP, CATEGORIES));
  });

  writePage('cart.html', h => {
    h = inject(h, 'header', header('cart'));
    return inject(h, 'footer', footer(SHOP, CATEGORIES));
  });

  const origin = 'https://anantha-web999.github.io/Athanikkal-Traders';
  const today = new Date().toISOString().slice(0, 10);
  const urls = ['', 'products.html'].map(u =>
    `  <url><loc>${origin}/${u}</loc><lastmod>${today}</lastmod></url>`
  ).join('\n');

  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);
  console.log('  built sitemap.xml');

  fs.writeFileSync(path.join(ROOT, 'robots.txt'),
`User-agent: *
Allow: /
Disallow: /cart.html

Sitemap: ${origin}/sitemap.xml
`);
  console.log('  built robots.txt');
  console.log('Done.');
}

main();
