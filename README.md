# Athanikkal Traders

Product catalogue and enquiry website for Athanikkal Traders — wholesaler of gypsum,
false ceiling and drywall materials in Chelari, Malappuram, Kerala.

Plain HTML, CSS and JavaScript. No build step, no framework, no server.
Open `index.html` in a browser and it runs.

## How it works

Customers browse products, add them to an **enquiry list**, choose delivery or
pickup, and send the list to the shop on WhatsApp. Orders are confirmed by phone.

There are **no prices on the site** — wholesale rates change often and vary by
customer, so the cart is a quote request rather than a checkout. There is no
payment gateway and no backend.

## Files

```
index.html        Home — hero, categories, contact
products.html     Full catalogue with search and category filter
cart.html         Enquiry list, delivery/pickup, WhatsApp + Call
css/style.css     All styling
js/products.js    Shop details + product catalogue  ← edit this to change products
js/i18n.js        English / Malayalam translations
js/cart.js        Enquiry list logic (localStorage)
js/main.js        Header, footer, product cards
images/products/  Product photos (see below)
```

## Adding product photos

Each product in `js/products.js` has an `img` field. Save a photo as
`images/products/<img>.jpg` and it appears automatically.
If the file is missing the card falls back to a clean coloured placeholder,
so the site never shows a broken image.

Filenames needed:

```
everest-vboard    shera-vboard      plain-board       gyblock
mr-board          kool-board        dampline          glass-rock
foam-sheet        gyproc-channel    ordinary-channel  section-channel
partition-channel ceiling-grid      tile-dew-drop     tile-gyptone
putty-bucket      gypsum-powder     screw             self-screw
angler-bolt       plug              clip              nut-bolt
soffit-cleat      pop-patra         tape              fastener
drywall-bit
```

Use photos the shop owns, or official images from the brand's dealer kit.
Avoid pulling images from Google search results — they are usually copyrighted.

## Editing products

Open `js/products.js`. Each product looks like this:

```js
{ id: 'mr-board', cat: 'gypsum-board', img: 'mr-board', unit: 'sheet',
  en: 'MR Board', ml: 'എം.ആർ. ബോർഡ്', spec: 'Moisture resistant' }
```

- `id` must be unique — it is what the cart stores
- `cat` must match a category id in `CATEGORIES`
- `unit` must be one of: `sheet` `piece` `box` `packet` `bucket` `bag` `roll` `length`

## Before going live

- [ ] Client confirms the ambiguous product names from the handwritten list:
      Metric Grid, Magnic, Gypsera, Glass Rock, Gyptone/Echostic, Dampline
- [ ] Native speaker proof-reads the Malayalam in `js/i18n.js` and `js/products.js`
- [ ] Real product photos added
- [ ] Confirm 9061541000 is the shop's WhatsApp number (set in `js/products.js`)
- [ ] **Fix the Google Business listing** — it currently says "Permanently closed"
- [ ] Buy a domain and deploy

## Deploying

Drag this folder onto [netlify.com/drop](https://app.netlify.com/drop) — it goes
live instantly and free. Or enable GitHub Pages in the repository settings.
