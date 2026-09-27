/* Product catalogue for Athanikkal Traders.
   Plain script (not an ES module) so the site works when index.html is
   opened directly from disk — file:// blocks module imports. */

const SHOP = {
  name: 'Athanikkal Traders',
  addressLines: [
    'AV Arcade, Chullottuparambu Road',
    'Chelari, Thenhipalam',
    'Malappuram Dist., Kerala - 673635'
  ],
  phonePrimary: '9061541000',
  phoneSecondary: '9656940958',
  whatsapp: '919061541000',
  gstin: '32ABHFA0870E1ZY',
  mapsUrl: 'https://maps.google.com/?q=Athanikkal+Traders+Chelari+Kerala'
};

const CATEGORIES = [
  { id: 'gypsum-board', en: 'Gypsum Boards',          ml: 'ജിപ്സം ബോർഡുകൾ' },
  { id: 'cement-board', en: 'Cement Board (V Board)', ml: 'സിമന്റ് ബോർഡ് (വി ബോർഡ്)' },
  { id: 'channel',      en: 'Channels & Framing',     ml: 'ചാനലുകളും ഫ്രെയിമിംഗും' },
  { id: 'grid',         en: 'Ceiling Grid',           ml: 'സീലിംഗ് ഗ്രിഡ്' },
  { id: 'tile',         en: 'Ceiling Tiles',          ml: 'സീലിംഗ് ടൈലുകൾ' },
  { id: 'putty',        en: 'Putty & POP',            ml: 'പുട്ടിയും പി.ഒ.പി.യും' },
  { id: 'fastener',     en: 'Fasteners & Accessories', ml: 'സ്ക്രൂകളും ആക്സസറികളും' }
];

/* `img` is a filename stem in images/products/. Several products deliberately
   share one image so the shop needs ~25 photos instead of 58. */
const PRODUCTS = [
  // ---------- Cement Board (V Board) ----------
  { id: 'everest-6x4-6',  cat: 'cement-board', brand: 'Everest', img: 'everest-vboard', unit: 'sheet', en: 'Everest V Board', ml: 'എവറസ്റ്റ് വി ബോർഡ്', spec: '6 x 4 ft · 6 mm' },
  { id: 'everest-6x4-8',  cat: 'cement-board', brand: 'Everest', img: 'everest-vboard', unit: 'sheet', en: 'Everest V Board', ml: 'എവറസ്റ്റ് വി ബോർഡ്', spec: '6 x 4 ft · 8 mm' },
  { id: 'everest-8x4-10', cat: 'cement-board', brand: 'Everest', img: 'everest-vboard', unit: 'sheet', en: 'Everest V Board', ml: 'എവറസ്റ്റ് വി ബോർഡ്', spec: '8 x 4 ft · 10 mm' },
  { id: 'everest-8x4-12', cat: 'cement-board', brand: 'Everest', img: 'everest-vboard', unit: 'sheet', en: 'Everest V Board', ml: 'എവറസ്റ്റ് വി ബോർഡ്', spec: '8 x 4 ft · 12 mm' },
  { id: 'everest-8x4-16', cat: 'cement-board', brand: 'Everest', img: 'everest-vboard', unit: 'sheet', en: 'Everest V Board', ml: 'എവറസ്റ്റ് വി ബോർഡ്', spec: '8 x 4 ft · 16 mm' },
  { id: 'everest-8x4-18', cat: 'cement-board', brand: 'Everest', img: 'everest-vboard', unit: 'sheet', en: 'Everest V Board', ml: 'എവറസ്റ്റ് വി ബോർഡ്', spec: '8 x 4 ft · 18 mm' },

  { id: 'shera-8x4-6',  cat: 'cement-board', brand: 'Shera', img: 'shera-vboard', unit: 'sheet', en: 'Shera V Board', ml: 'ഷെറ വി ബോർഡ്', spec: '8 x 4 ft · 6 mm' },
  { id: 'shera-8x4-8',  cat: 'cement-board', brand: 'Shera', img: 'shera-vboard', unit: 'sheet', en: 'Shera V Board', ml: 'ഷെറ വി ബോർഡ്', spec: '8 x 4 ft · 8 mm' },
  { id: 'shera-8x4-10', cat: 'cement-board', brand: 'Shera', img: 'shera-vboard', unit: 'sheet', en: 'Shera V Board', ml: 'ഷെറ വി ബോർഡ്', spec: '8 x 4 ft · 10 mm' },
  { id: 'shera-8x4-12', cat: 'cement-board', brand: 'Shera', img: 'shera-vboard', unit: 'sheet', en: 'Shera V Board', ml: 'ഷെറ വി ബോർഡ്', spec: '8 x 4 ft · 12 mm' },
  { id: 'shera-8x4-15', cat: 'cement-board', brand: 'Shera', img: 'shera-vboard', unit: 'sheet', en: 'Shera V Board', ml: 'ഷെറ വി ബോർഡ്', spec: '8 x 4 ft · 15 mm' },

  // ---------- Gypsum Boards ----------
  { id: 'plain-board', cat: 'gypsum-board', img: 'plain-board', unit: 'sheet', en: 'Plain Board',  ml: 'പ്ലെയിൻ ബോർഡ്', spec: 'Standard gypsum ceiling board' },
  { id: 'gyblock',     cat: 'gypsum-board', img: 'gyblock',     unit: 'piece', en: 'Gyblock',      ml: 'ജിബ്ലോക്ക്',    spec: 'Gypsum partition block' },
  { id: 'mr-board',    cat: 'gypsum-board', img: 'mr-board',    unit: 'sheet', en: 'MR Board',     ml: 'എം.ആർ. ബോർഡ്',  spec: 'Moisture resistant' },
  { id: 'kool-board',  cat: 'gypsum-board', img: 'kool-board',  unit: 'sheet', en: 'Kool Board',   ml: 'കൂൾ ബോർഡ്',     spec: 'Heat insulating board' },
  { id: 'dampline',    cat: 'gypsum-board', img: 'dampline',    unit: 'sheet', en: 'Dampline',     ml: 'ഡാംപ്‌ലൈൻ',     spec: 'Damp resistant board' },
  { id: 'glass-rock',  cat: 'gypsum-board', img: 'glass-rock',  unit: 'sheet', en: 'Glass Rock',   ml: 'ഗ്ലാസ് റോക്ക്',  spec: 'Glasswool insulation' },
  { id: 'foam-sheet',  cat: 'gypsum-board', img: 'foam-sheet',  unit: 'sheet', en: 'Foam Sheet / Insu Board', ml: 'ഫോം ഷീറ്റ് / ഇൻസു ബോർഡ്', spec: 'Thermal insulation sheet' },

  // ---------- Channels & Framing ----------
  { id: 'gyproc-magnic',     cat: 'channel', brand: 'Gyproc', img: 'gyproc-channel', unit: 'piece', en: 'Gyproc Magnic Channel',     ml: 'ജിപ്രോക് മാഗ്നിക് ചാനൽ',     spec: 'Ceiling channel' },
  { id: 'gyproc-xpert',      cat: 'channel', brand: 'Gyproc', img: 'gyproc-channel', unit: 'piece', en: 'Gyproc Xpert Channel',      ml: 'ജിപ്രോക് എക്സ്പെർട്ട് ചാനൽ', spec: 'Ceiling channel' },
  { id: 'gyproc-true-steel', cat: 'channel', brand: 'Gyproc', img: 'gyproc-channel', unit: 'piece', en: 'Gyproc True Steel Channel', ml: 'ജിപ്രോക് ട്രൂ സ്റ്റീൽ ചാനൽ', spec: 'Ceiling channel' },
  { id: 'gyproc-gypsera',    cat: 'channel', brand: 'Gyproc', img: 'gyproc-channel', unit: 'piece', en: 'Gyproc Gypsera Channel',    ml: 'ജിപ്രോക് ജിപ്സെറ ചാനൽ',     spec: 'Ceiling channel' },

  { id: 'pk-steel',            cat: 'channel', brand: 'PK Steel',      img: 'ordinary-channel', unit: 'piece', en: 'PK Steel Channel',       ml: 'പി.കെ. സ്റ്റീൽ ചാനൽ',   spec: 'Ordinary channel' },
  { id: 'shakthi-steel-ultra', cat: 'channel', brand: 'Shakthi Steel', img: 'ordinary-channel', unit: 'piece', en: 'Shakthi Steel Ultra',    ml: 'ശക്തി സ്റ്റീൽ അൾട്ര',    spec: 'Ordinary channel' },
  { id: 'shakthi-steel-plane', cat: 'channel', brand: 'Shakthi Steel', img: 'ordinary-channel', unit: 'piece', en: 'Shakthi Steel Plane',    ml: 'ശക്തി സ്റ്റീൽ പ്ലെയിൻ',  spec: 'Ordinary channel' },

  { id: 'section-inter',     cat: 'channel', img: 'section-channel', unit: 'piece', en: 'Intermediate Section', ml: 'ഇന്റർമീഡിയറ്റ് സെക്ഷൻ', spec: 'Section' },
  { id: 'section-perimeter', cat: 'channel', img: 'section-channel', unit: 'piece', en: 'Perimeter Section',    ml: 'പെരിമീറ്റർ സെക്ഷൻ',     spec: 'Section' },
  { id: 'section-l-angle',   cat: 'channel', img: 'section-channel', unit: 'piece', en: 'L Angle',              ml: 'എൽ ആംഗിൾ',              spec: 'Section' },

  { id: 'partition-ordinary', cat: 'channel', brand: 'PK Steel', img: 'partition-channel', unit: 'piece', en: 'Partition Channel - Ordinary', ml: 'പാർട്ടീഷൻ ചാനൽ - ഓർഡിനറി', spec: 'Floor & Stud' },
  { id: 'partition-xpert',    cat: 'channel', brand: 'Gyproc',   img: 'partition-channel', unit: 'piece', en: 'Partition Channel - Xpert',    ml: 'പാർട്ടീഷൻ ചാനൽ - എക്സ്പെർട്ട്', spec: 'Floor & Stud' },
  { id: 'partition-gypsera',  cat: 'channel', brand: 'Gyproc',   img: 'partition-channel', unit: 'piece', en: 'Partition Channel - Gypsera',  ml: 'പാർട്ടീഷൻ ചാനൽ - ജിപ്സെറ',   spec: 'Floor & Stud' },

  // ---------- Ceiling Grid ----------
  { id: 'grid-metric-10',   cat: 'grid', brand: 'Gyproc', img: 'ceiling-grid', unit: 'length', en: 'Metric Grid',        ml: 'മെട്രിക് ഗ്രിഡ്',  spec: '10 ft' },
  { id: 'grid-wall-angle',  cat: 'grid', brand: 'Gyproc', img: 'ceiling-grid', unit: 'length', en: 'Wall Angle',         ml: 'വാൾ ആംഗിൾ',       spec: '10 ft' },
  { id: 'grid-cross-4',     cat: 'grid', brand: 'Gyproc', img: 'ceiling-grid', unit: 'length', en: 'Cross Grid',         ml: 'ക്രോസ് ഗ്രിഡ്',    spec: '4 ft' },
  { id: 'grid-cross-2',     cat: 'grid', brand: 'Gyproc', img: 'ceiling-grid', unit: 'length', en: 'Cross Grid',         ml: 'ക്രോസ് ഗ്രിഡ്',    spec: '2 ft' },

  // ---------- Ceiling Tiles ----------
  { id: 'tile-dew-drop', cat: 'tile', img: 'tile-dew-drop', unit: 'piece', en: 'Dew Drop Tile',        ml: 'ഡ്യൂ ഡ്രോപ്പ് ടൈൽ',     spec: '2 x 2 ft' },
  { id: 'tile-gyptone',  cat: 'tile', brand: 'Gyptone', img: 'tile-gyptone', unit: 'piece', en: 'Gyptone Acoustic Tile', ml: 'ജിപ്‌ടോൺ അക്കൗസ്റ്റിക് ടൈൽ', spec: '2 x 2 ft · 4 sq.ft' },

  // ---------- Putty & POP ----------
  { id: 'putty-5kg',     cat: 'putty', img: 'putty-bucket',  unit: 'bucket', en: 'Bucket Putty',        ml: 'ബക്കറ്റ് പുട്ടി',       spec: '5 kg' },
  { id: 'putty-20kg',    cat: 'putty', img: 'putty-bucket',  unit: 'bucket', en: 'Bucket Putty',        ml: 'ബക്കറ്റ് പുട്ടി',       spec: '20 kg' },
  { id: 'gypsum-powder', cat: 'putty', img: 'gypsum-powder', unit: 'bag',    en: 'Gypsum Powder (POP)', ml: 'ജിപ്സം പൗഡർ (പി.ഒ.പി.)', spec: 'Plaster of Paris' },

  // ---------- Fasteners & Accessories ----------
  { id: 'screw-1',      cat: 'fastener', img: 'screw',       unit: 'box',    en: 'Drywall Screw',        ml: 'ഡ്രൈവാൾ സ്ക്രൂ',      spec: '1 inch' },
  { id: 'screw-1-5',    cat: 'fastener', img: 'screw',       unit: 'box',    en: 'Drywall Screw',        ml: 'ഡ്രൈവാൾ സ്ക്രൂ',      spec: '1½ inch' },
  { id: 'screw-2',      cat: 'fastener', img: 'screw',       unit: 'box',    en: 'Drywall Screw',        ml: 'ഡ്രൈവാൾ സ്ക്രൂ',      spec: '2 inch' },
  { id: 'self-screw',   cat: 'fastener', img: 'self-screw',  unit: 'box',    en: 'Metal to Metal Self Screw', ml: 'മെറ്റൽ ടു മെറ്റൽ സെൽഫ് സ്ക്രൂ', spec: '½ inch' },
  { id: 'bolt-gyproc',  cat: 'fastener', brand: 'Gyproc', img: 'angler-bolt', unit: 'packet', en: 'Angler Bolt with Rawl Plug', ml: 'ആംഗ്ലർ ബോൾട്ട് (റോൾ പ്ലഗ്)', spec: 'Gyproc' },
  { id: 'bolt-ordinary',cat: 'fastener', img: 'angler-bolt', unit: 'packet', en: 'Angler Bolt - Ordinary', ml: 'ആംഗ്ലർ ബോൾട്ട് - ഓർഡിനറി', spec: 'Ordinary' },
  { id: 'plug-6mm',     cat: 'fastener', img: 'plug',        unit: 'packet', en: 'Plug',                 ml: 'പ്ലഗ്',                spec: '6 mm' },
  { id: 'plug-7mm',     cat: 'fastener', img: 'plug',        unit: 'packet', en: 'Plug',                 ml: 'പ്ലഗ്',                spec: '7 mm' },
  { id: 'connecting-clip', cat: 'fastener', img: 'clip',     unit: 'packet', en: 'Connecting Clip',      ml: 'കണക്ടിംഗ് ക്ലിപ്പ്',    spec: 'Ceiling accessory' },
  { id: 'butterfly-clip',  cat: 'fastener', img: 'clip',     unit: 'packet', en: 'Butterfly Clip',       ml: 'ബട്ടർഫ്ലൈ ക്ലിപ്പ്',    spec: 'Ceiling accessory' },
  { id: 'nut-bolt',     cat: 'fastener', img: 'nut-bolt',    unit: 'packet', en: 'Nut Bolt',             ml: 'നട്ട് ബോൾട്ട്',         spec: 'Ceiling accessory' },
  { id: 'soffit-cleat', cat: 'fastener', img: 'soffit-cleat',unit: 'packet', en: 'Soffit Cleat',         ml: 'സോഫിറ്റ് ക്ലീറ്റ്',     spec: 'Ceiling accessory' },
  { id: 'pop-patra',    cat: 'fastener', img: 'pop-patra',   unit: 'piece',  en: 'POP Patra',            ml: 'പി.ഒ.പി. പത്ര',        spec: 'Finishing' },
  { id: 'paper-tape',   cat: 'fastener', img: 'tape',        unit: 'roll',   en: 'Paper Tape Roll',      ml: 'പേപ്പർ ടേപ്പ് റോൾ',     spec: 'Jointing' },
  { id: 'joint-tape',   cat: 'fastener', img: 'tape',        unit: 'roll',   en: 'Joint Tape',           ml: 'ജോയിന്റ് ടേപ്പ്',       spec: 'Jointing' },
  { id: 'golden-fastener', cat: 'fastener', img: 'fastener', unit: 'packet', en: 'Golden Fastener',      ml: 'ഗോൾഡൻ ഫാസ്റ്റ്നർ',     spec: 'Fixing' },
  { id: 'hammer-fastener', cat: 'fastener', img: 'fastener', unit: 'packet', en: 'Hammer Fastener',      ml: 'ഹാമർ ഫാസ്റ്റ്നർ',       spec: 'Fixing' },
  { id: 'drywall-bit',  cat: 'fastener', img: 'drywall-bit', unit: 'piece',  en: 'Drywall Bit',          ml: 'ഡ്രൈവാൾ ബിറ്റ്',        spec: 'Tool' }
];

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getCategory(id) {
  return CATEGORIES.find(c => c.id === id);
}
