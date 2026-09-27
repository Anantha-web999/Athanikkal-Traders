/* Enquiry list ("cart"). No prices anywhere — wholesale rates are quoted
   by phone, so this only ever tracks product ids and quantities. */

const CART_KEY = 'athanikkal_cart_v1';

function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  document.dispatchEvent(new CustomEvent('cartchange'));
}

function cartCount() {
  return readCart().reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(id, qty = 1) {
  const items = readCart();
  const existing = items.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ id, qty });
  }
  writeCart(items);
}

function setQty(id, qty) {
  if (qty < 1) return removeFromCart(id);
  const items = readCart();
  const existing = items.find(item => item.id === id);
  if (existing) existing.qty = qty;
  writeCart(items);
}

function removeFromCart(id) {
  writeCart(readCart().filter(item => item.id !== id));
}

function clearCart() {
  writeCart([]);
}

function inCart(id) {
  return readCart().some(item => item.id === id);
}

function buildEnquiryText(details) {
  const items = readCart();
  const lines = [`*${SHOP.name.toUpperCase()} — ENQUIRY*`, ''];

  items.forEach((item, i) => {
    const p = getProduct(item.id);
    if (!p) return;
    const label = [p.brand, p.en].filter(Boolean).join(' ');
    lines.push(`${i + 1}. ${label}${p.spec ? ` (${p.spec})` : ''}`);
    lines.push(`   Qty: ${item.qty} ${STRINGS['unit_' + p.unit].en}`);
  });

  lines.push('');
  lines.push(`Fulfilment: ${details.fulfilment === 'pickup' ? 'Pickup from shop' : 'Delivery in Kerala'}`);
  lines.push(`Name: ${details.name}`);
  lines.push(`Phone: ${details.phone}`);
  if (details.place) lines.push(`Place: ${details.place}`);
  if (details.notes) lines.push(`Notes: ${details.notes}`);

  return lines.join('\n');
}

function whatsappLink(details) {
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(buildEnquiryText(details))}`;
}
