/* ============================================================
   EngiMate — popup.js
   ============================================================ */

'use strict';

// ── Navigation ────────────────────────────────────────────────
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tool-' + btn.dataset.tool).classList.add('active');
  });
});

// ── ① Unit Converter ─────────────────────────────────────────

const UNITS = {
  length: {
    label: 'Length',
    base: 'm',
    units: {
      nm:  { label: 'Nanometer (nm)',  f: 1e-9 },
      μm:  { label: 'Micrometer (μm)', f: 1e-6 },
      mm:  { label: 'Millimeter (mm)', f: 1e-3 },
      cm:  { label: 'Centimeter (cm)', f: 1e-2 },
      m:   { label: 'Meter (m)',        f: 1 },
      km:  { label: 'Kilometer (km)',   f: 1e3 },
      in:  { label: 'Inch (in)',        f: 0.0254 },
      ft:  { label: 'Foot (ft)',        f: 0.3048 },
      yd:  { label: 'Yard (yd)',        f: 0.9144 },
      mi:  { label: 'Mile (mi)',        f: 1609.344 },
      mil: { label: 'Mil (thou)',       f: 2.54e-5 },
    }
  },
  mass: {
    label: 'Mass',
    units: {
      μg:    { label: 'Microgram (μg)',  f: 1e-9 },
      mg:    { label: 'Milligram (mg)',  f: 1e-6 },
      g:     { label: 'Gram (g)',        f: 1e-3 },
      kg:    { label: 'Kilogram (kg)',   f: 1 },
      tonne: { label: 'Metric Ton (t)', f: 1e3 },
      oz:    { label: 'Ounce (oz)',      f: 0.0283495 },
      lb:    { label: 'Pound (lb)',      f: 0.453592 },
    }
  },
  temperature: {
    label: 'Temperature',
    special: true,
    units: {
      C: { label: '°Celsius (C)' },
      F: { label: '°Fahrenheit (F)' },
      K: { label: 'Kelvin (K)' },
    },
    convert(val, from, to) {
      let c = from === 'C' ? val : from === 'F' ? (val - 32) * 5/9 : val - 273.15;
      return to === 'C' ? c : to === 'F' ? c * 9/5 + 32 : c + 273.15;
    }
  },
  time: {
    label: 'Time',
    units: {
      ns:  { label: 'Nanosecond (ns)',  f: 1e-9 },
      μs:  { label: 'Microsecond (μs)', f: 1e-6 },
      ms:  { label: 'Millisecond (ms)', f: 1e-3 },
      s:   { label: 'Second (s)',        f: 1 },
      min: { label: 'Minute (min)',      f: 60 },
      hr:  { label: 'Hour (hr)',         f: 3600 },
      day: { label: 'Day',              f: 86400 },
    }
  },
  frequency: {
    label: 'Frequency',
    units: {
      Hz:     { label: 'Hertz (Hz)',       f: 1 },
      kHz:    { label: 'Kilohertz (kHz)',  f: 1e3 },
      MHz:    { label: 'Megahertz (MHz)',  f: 1e6 },
      GHz:    { label: 'Gigahertz (GHz)', f: 1e9 },
      THz:    { label: 'Terahertz (THz)', f: 1e12 },
      rpm:    { label: 'RPM',              f: 1/60 },
      'rad/s': { label: 'Rad/s',          f: 1/(2*Math.PI) },
    }
  },
  voltage: {
    label: 'Voltage',
    units: {
      nV: { label: 'Nanovolt (nV)',   f: 1e-9 },
      μV: { label: 'Microvolt (μV)', f: 1e-6 },
      mV: { label: 'Millivolt (mV)', f: 1e-3 },
      V:  { label: 'Volt (V)',        f: 1 },
      kV: { label: 'Kilovolt (kV)',   f: 1e3 },
    }
  },
  current: {
    label: 'Current',
    units: {
      nA: { label: 'Nanoampere (nA)',   f: 1e-9 },
      μA: { label: 'Microampere (μA)', f: 1e-6 },
      mA: { label: 'Milliampere (mA)', f: 1e-3 },
      A:  { label: 'Ampere (A)',        f: 1 },
      kA: { label: 'Kiloampere (kA)',   f: 1e3 },
    }
  },
  power: {
    label: 'Power',
    units: {
      nW:  { label: 'Nanowatt (nW)',   f: 1e-9 },
      μW:  { label: 'Microwatt (μW)', f: 1e-6 },
      mW:  { label: 'Milliwatt (mW)', f: 1e-3 },
      W:   { label: 'Watt (W)',        f: 1 },
      kW:  { label: 'Kilowatt (kW)',   f: 1e3 },
      MW:  { label: 'Megawatt (MW)',   f: 1e6 },
      dBm: { label: 'dBm',            f: null, special: true },
      dBW: { label: 'dBW',            f: null, special: true },
    },
    convert(val, from, to) {
      let watts;
      if (from === 'dBm') watts = Math.pow(10, (val - 30) / 10);
      else if (from === 'dBW') watts = Math.pow(10, val / 10);
      else watts = val * UNITS.power.units[from].f;
      if (to === 'dBm') return 10 * Math.log10(watts) + 30;
      if (to === 'dBW') return 10 * Math.log10(watts);
      return watts / UNITS.power.units[to].f;
    },
    special: true
  },
  capacitance: {
    label: 'Capacitance',
    units: {
      pF: { label: 'Picofarad (pF)',   f: 1e-12 },
      nF: { label: 'Nanofarad (nF)',   f: 1e-9 },
      μF: { label: 'Microfarad (μF)', f: 1e-6 },
      mF: { label: 'Millifarad (mF)', f: 1e-3 },
      F:  { label: 'Farad (F)',        f: 1 },
    }
  },
  inductance: {
    label: 'Inductance',
    units: {
      nH: { label: 'Nanohenry (nH)',   f: 1e-9 },
      μH: { label: 'Microhenry (μH)', f: 1e-6 },
      mH: { label: 'Millihenry (mH)', f: 1e-3 },
      H:  { label: 'Henry (H)',        f: 1 },
    }
  },
  resistance: {
    label: 'Resistance',
    units: {
      mΩ: { label: 'Milliohm (mΩ)',   f: 1e-3 },
      Ω:  { label: 'Ohm (Ω)',         f: 1 },
      kΩ: { label: 'Kilohm (kΩ)',     f: 1e3 },
      MΩ: { label: 'Megohm (MΩ)',     f: 1e6 },
      GΩ: { label: 'Gigohm (GΩ)',     f: 1e9 },
    }
  },
  angle: {
    label: 'Angle',
    units: {
      deg:  { label: 'Degree (°)',     f: Math.PI/180 },
      rad:  { label: 'Radian (rad)',   f: 1 },
      grad: { label: 'Gradian (grad)', f: Math.PI/200 },
      rev:  { label: 'Revolution',     f: 2*Math.PI },
    }
  },
  data: {
    label: 'Data / Storage',
    units: {
      bit: { label: 'Bit (b)',       f: 1 },
      B:   { label: 'Byte (B)',      f: 8 },
      KB:  { label: 'Kilobyte (KB)', f: 8e3 },
      MB:  { label: 'Megabyte (MB)', f: 8e6 },
      GB:  { label: 'Gigabyte (GB)', f: 8e9 },
      TB:  { label: 'Terabyte (TB)', f: 8e12 },
      Kib: { label: 'Kibibyte (KiB)',f: 8192 },
      Mib: { label: 'Mebibyte (MiB)',f: 8*1024*1024 },
      Gib: { label: 'Gibibyte (GiB)',f: 8*1024*1024*1024 },
    }
  },
};

function fmtNum(n) {
  if (!isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs === 0) return '0';
  if (abs >= 0.001 && abs < 1e7) {
    const s = parseFloat(n.toPrecision(8)).toString();
    return s;
  }
  return n.toExponential(6).replace(/\.?0+e/, 'e');
}

function populateUnitSelects(cat) {
  const units = UNITS[cat].units;
  const keys = Object.keys(units);
  [document.getElementById('unit-from'), document.getElementById('unit-to')].forEach((sel, i) => {
    sel.innerHTML = '';
    keys.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = units[k].label;
      sel.appendChild(opt);
    });
    if (i === 1 && keys.length > 1) sel.value = keys[1];
  });
}

function doUnitConvert() {
  const cat = document.getElementById('unit-category').value;
  const fromUnit = document.getElementById('unit-from').value;
  const toUnit = document.getElementById('unit-to').value;
  const rawVal = parseFloat(document.getElementById('unit-from-val').value);
  const toInput = document.getElementById('unit-to-val');
  const hint = document.getElementById('unit-formula');

  if (isNaN(rawVal)) { toInput.value = ''; hint.textContent = ''; return; }

  const def = UNITS[cat];
  let result;
  if (def.special && def.convert) {
    result = def.convert(rawVal, fromUnit, toUnit);
  } else {
    const base = rawVal * def.units[fromUnit].f;
    result = base / def.units[toUnit].f;
  }

  toInput.value = fmtNum(result);
  hint.textContent = `${rawVal} ${fromUnit} = ${fmtNum(result)} ${toUnit}`;
}

document.getElementById('unit-category').addEventListener('change', e => {
  populateUnitSelects(e.target.value);
  doUnitConvert();
});
document.getElementById('unit-from-val').addEventListener('input', doUnitConvert);
document.getElementById('unit-from').addEventListener('change', doUnitConvert);
document.getElementById('unit-to').addEventListener('change', doUnitConvert);
document.getElementById('unit-swap').addEventListener('click', () => {
  const f = document.getElementById('unit-from');
  const t = document.getElementById('unit-to');
  const fv = document.getElementById('unit-from-val');
  const tv = document.getElementById('unit-to-val');
  [f.value, t.value] = [t.value, f.value];
  fv.value = tv.value === '' ? fv.value : tv.value;
  doUnitConvert();
});

populateUnitSelects('length');

// ── ② Resistor Color Code ─────────────────────────────────────

const RCOLORS = [
  { name: 'Black',  d: 0, m: 1,     tol: null, hex: '#111111', text: '#fff' },
  { name: 'Brown',  d: 1, m: 10,    tol: 1,    hex: '#8B4513', text: '#fff' },
  { name: 'Red',    d: 2, m: 100,   tol: 2,    hex: '#CC0000', text: '#fff' },
  { name: 'Orange', d: 3, m: 1e3,   tol: null, hex: '#FF6600', text: '#000' },
  { name: 'Yellow', d: 4, m: 1e4,   tol: null, hex: '#FFD700', text: '#000' },
  { name: 'Green',  d: 5, m: 1e5,   tol: 0.5,  hex: '#228B22', text: '#fff' },
  { name: 'Blue',   d: 6, m: 1e6,   tol: 0.25, hex: '#1A44CC', text: '#fff' },
  { name: 'Violet', d: 7, m: 1e7,   tol: 0.1,  hex: '#8B00C8', text: '#fff' },
  { name: 'Gray',   d: 8, m: 1e8,   tol: 0.05, hex: '#808080', text: '#fff' },
  { name: 'White',  d: 9, m: 1e9,   tol: null, hex: '#EEEEEE', text: '#000' },
  { name: 'Gold',   d: null, m: 0.1,  tol: 5,  hex: '#CFB53B', text: '#000' },
  { name: 'Silver', d: null, m: 0.01, tol: 10, hex: '#A8A9AD', text: '#000' },
  { name: 'None',   d: null, m: null, tol: 20, hex: 'transparent', text: '#888' },
];

let resBands = 4;

function buildBandSelectors() {
  const row = document.getElementById('bands-row');
  row.innerHTML = '';

  const configs = resBands === 4
    ? [
        { id: 'rb1', label: 'Band 1', type: 'digit' },
        { id: 'rb2', label: 'Band 2', type: 'digit' },
        { id: 'rb3', label: 'Mult.',  type: 'mult' },
        { id: 'rb4', label: 'Tol.',   type: 'tol' },
      ]
    : [
        { id: 'rb1', label: 'Band 1', type: 'digit' },
        { id: 'rb2', label: 'Band 2', type: 'digit' },
        { id: 'rb3', label: 'Band 3', type: 'digit' },
        { id: 'rb4', label: 'Mult.',  type: 'mult' },
        { id: 'rb5', label: 'Tol.',   type: 'tol' },
      ];

  configs.forEach(cfg => {
    const group = document.createElement('div');
    group.className = 'band-group';

    const lbl = document.createElement('div');
    lbl.className = 'band-group-label';
    lbl.textContent = cfg.label;

    const ind = document.createElement('div');
    ind.className = 'band-indicator';
    ind.id = 'ind-' + cfg.id;

    const sel = document.createElement('select');
    sel.className = 'band-sel';
    sel.id = 'sel-' + cfg.id;

    const available = RCOLORS.filter(c => {
      if (cfg.type === 'digit') return c.d !== null;
      if (cfg.type === 'mult') return c.m !== null && c.name !== 'None';
      if (cfg.type === 'tol') return c.tol !== null;
      return true;
    });

    available.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = c.name;
      sel.appendChild(opt);
    });

    // sensible defaults
    if (cfg.id === 'rb1') sel.value = 'Brown';
    if (cfg.id === 'rb2') sel.value = 'Black';
    if (cfg.id === 'rb3') sel.value = resBands === 4 ? 'Red' : 'Black';
    if (cfg.id === 'rb4') sel.value = resBands === 4 ? 'Gold' : 'Red';
    if (cfg.id === 'rb5') sel.value = 'Gold';

    sel.addEventListener('change', () => { updateBandVisual(cfg.id, sel.value); calcResistor(); });

    group.appendChild(lbl);
    group.appendChild(ind);
    group.appendChild(sel);
    row.appendChild(group);

    updateBandVisual(cfg.id, sel.value);
  });

  // show/hide rb5 in SVG
  document.getElementById('rb5').classList.toggle('hidden', resBands !== 5);

  // reposition bands in SVG
  repositionBands();
  calcResistor();
}

function updateBandVisual(id, colorName) {
  const c = RCOLORS.find(x => x.name === colorName);
  if (!c) return;
  document.getElementById('ind-' + id).style.background = c.hex;
  document.getElementById(id).setAttribute('fill', c.hex);
}

function repositionBands() {
  if (resBands === 4) {
    setPos('rb1', 93, 19);
    setPos('rb2', 116, 19);
    setPos('rb3', 140, 19);
    setPos('rb4', 167, 19);
  } else {
    setPos('rb1', 88,  16);
    setPos('rb2', 105, 16);
    setPos('rb3', 122, 16);
    setPos('rb4', 143, 16);
    setPos('rb5', 167, 14);
  }
}

function setPos(id, x, w) {
  const el = document.getElementById(id);
  el.setAttribute('x', x);
  el.setAttribute('width', w);
}

function calcResistor() {
  const get = id => RCOLORS.find(c => c.name === document.getElementById('sel-' + id)?.value);

  let ohms;
  let tol;

  if (resBands === 4) {
    const b1 = get('rb1'), b2 = get('rb2'), b3 = get('rb3'), b4 = get('rb4');
    if (!b1 || !b2 || !b3 || !b4) return;
    ohms = (b1.d * 10 + b2.d) * b3.m;
    tol = b4.tol;
  } else {
    const b1 = get('rb1'), b2 = get('rb2'), b3 = get('rb3'), b4 = get('rb4'), b5 = get('rb5');
    if (!b1 || !b2 || !b3 || !b4 || !b5) return;
    ohms = (b1.d * 100 + b2.d * 10 + b3.d) * b4.m;
    tol = b5.tol;
  }

  document.getElementById('res-value').textContent = fmtOhms(ohms);
  document.getElementById('res-tol').textContent = tol != null ? `±${tol}%` : '±?%';
}

function fmtOhms(v) {
  if (v >= 1e9) return (v / 1e9).toPrecision(4).replace(/\.?0+$/, '') + ' GΩ';
  if (v >= 1e6) return (v / 1e6).toPrecision(4).replace(/\.?0+$/, '') + ' MΩ';
  if (v >= 1e3) return (v / 1e3).toPrecision(4).replace(/\.?0+$/, '') + ' kΩ';
  return v + ' Ω';
}

document.getElementById('res-4band').addEventListener('click', () => {
  resBands = 4;
  document.getElementById('res-4band').classList.add('active');
  document.getElementById('res-5band').classList.remove('active');
  buildBandSelectors();
});
document.getElementById('res-5band').addEventListener('click', () => {
  resBands = 5;
  document.getElementById('res-5band').classList.add('active');
  document.getElementById('res-4band').classList.remove('active');
  buildBandSelectors();
});

buildBandSelectors();

// ── ③ Truth Table Generator ───────────────────────────────────

class BoolParser {
  constructor(expr) {
    this.tokens = this._tokenize(expr.toUpperCase().trim());
    this.pos = 0;
  }

  _tokenize(expr) {
    const toks = [];
    let i = 0;
    while (i < expr.length) {
      if (/\s/.test(expr[i])) { i++; continue; }
      const rest = expr.slice(i);
      if (rest.startsWith('XNOR')) { toks.push('XNOR'); i += 4; continue; }
      if (rest.startsWith('NAND')) { toks.push('NAND'); i += 4; continue; }
      if (rest.startsWith('NOR'))  { toks.push('NOR');  i += 3; continue; }
      if (rest.startsWith('NOT'))  { toks.push('NOT');  i += 3; continue; }
      if (rest.startsWith('AND'))  { toks.push('AND');  i += 3; continue; }
      if (rest.startsWith('XOR'))  { toks.push('XOR');  i += 3; continue; }
      if (rest.startsWith('OR'))   { toks.push('OR');   i += 2; continue; }
      if (expr[i] === '(') { toks.push('LP'); i++; continue; }
      if (expr[i] === ')') { toks.push('RP'); i++; continue; }
      if (expr[i] === '!') { toks.push('NOT'); i++; continue; }
      if (expr[i] === '~') { toks.push('NOT'); i++; continue; }
      if (expr[i] === '&') { if (expr[i+1] === '&') i++; toks.push('AND'); i++; continue; }
      if (expr[i] === '|') { if (expr[i+1] === '|') i++; toks.push('OR');  i++; continue; }
      if (expr[i] === '^') { toks.push('XOR'); i++; continue; }
      if (expr[i] === '+') { toks.push('OR');  i++; continue; }
      if (expr[i] === '*' || expr[i] === '·') { toks.push('AND'); i++; continue; }
      if (/[A-Z]/.test(expr[i])) { toks.push({ type: 'VAR', v: expr[i] }); i++; continue; }
      if (/[0-9]/.test(expr[i])) { toks.push({ type: 'LIT', v: expr[i] !== '0' }); i++; continue; }
      i++;
    }
    toks.push('EOF');
    return toks;
  }

  peek() { return this.tokens[this.pos]; }
  next() { return this.tokens[this.pos++]; }

  parse() {
    const fn = this._or();
    if (this.peek() !== 'EOF') throw new Error('Unexpected token near end of expression');
    return fn;
  }

  _or() {
    let l = this._xor();
    while (['OR','NOR'].includes(this.peek())) {
      const op = this.next();
      const r = this._xor();
      const [ll, rr] = [l, r];
      l = op === 'OR' ? v => ll(v) || rr(v) : v => !(ll(v) || rr(v));
    }
    return l;
  }
  _xor() {
    let l = this._and();
    while (['XOR','XNOR'].includes(this.peek())) {
      const op = this.next();
      const r = this._and();
      const [ll, rr] = [l, r];
      l = op === 'XOR' ? v => ll(v) !== rr(v) : v => ll(v) === rr(v);
    }
    return l;
  }
  _and() {
    let l = this._not();
    while (['AND','NAND'].includes(this.peek())) {
      const op = this.next();
      const r = this._not();
      const [ll, rr] = [l, r];
      l = op === 'AND' ? v => ll(v) && rr(v) : v => !(ll(v) && rr(v));
    }
    return l;
  }
  _not() {
    if (this.peek() === 'NOT') { this.next(); const f = this._not(); return v => !f(v); }
    return this._primary();
  }
  _primary() {
    const t = this.next();
    if (t && t.type === 'VAR') { const n = t.v; return v => v[n]; }
    if (t && t.type === 'LIT') { const b = t.v; return () => b; }
    if (t === 'LP') {
      const fn = this._or();
      if (this.next() !== 'RP') throw new Error('Missing closing parenthesis');
      return fn;
    }
    throw new Error(`Unexpected token: ${JSON.stringify(t)}`);
  }
}

function getVars(expr) {
  return [...new Set((expr.toUpperCase().match(/[A-Z]/g) || []))].sort();
}

function generateTable(expr) {
  const vars = getVars(expr);
  if (vars.length === 0) throw new Error('No variables found. Use letters A–Z.');
  if (vars.length > 5) throw new Error('Max 5 variables (32 rows). Simplify the expression.');
  const fn = new BoolParser(expr).parse();
  const rows = [];
  for (let i = 0; i < (1 << vars.length); i++) {
    const vals = {};
    vars.forEach((v, idx) => { vals[v] = Boolean((i >> (vars.length - 1 - idx)) & 1); });
    rows.push({ vals, result: fn(vals) });
  }
  return { vars, rows };
}

function renderTruthTable(expr) {
  const out = document.getElementById('truth-output');
  const err = document.getElementById('truth-error');
  err.classList.add('hidden');
  out.innerHTML = '';
  try {
    const { vars, rows } = generateTable(expr);
    const tbl = document.createElement('table');
    tbl.className = 'truth-table';
    const thead = tbl.createTHead();
    const hr = thead.insertRow();
    vars.forEach(v => { const th = document.createElement('th'); th.textContent = v; hr.appendChild(th); });
    const rth = document.createElement('th');
    rth.textContent = 'OUT';
    rth.style.color = '#9d94ec';
    hr.appendChild(rth);
    const tbody = tbl.createTBody();
    rows.forEach(row => {
      const tr = tbody.insertRow();
      vars.forEach(v => {
        const td = tr.insertCell();
        td.textContent = row.vals[v] ? '1' : '0';
        td.className = row.vals[v] ? 'bit-1' : 'bit-0';
      });
      const rtd = tr.insertCell();
      rtd.textContent = row.result ? '1' : '0';
      rtd.className = 'result-col ' + (row.result ? 'bit-1' : 'bit-0');
    });
    out.appendChild(tbl);
  } catch(e) {
    err.textContent = '⚠ ' + e.message;
    err.classList.remove('hidden');
  }
}

document.getElementById('truth-gen').addEventListener('click', () => {
  renderTruthTable(document.getElementById('truth-expr').value.trim());
});
document.getElementById('truth-expr').addEventListener('keydown', e => {
  if (e.key === 'Enter') renderTruthTable(e.target.value.trim());
});
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.getElementById('truth-expr').value = chip.dataset.e;
    renderTruthTable(chip.dataset.e);
  });
});

// ── ④ Datasheet Finder ────────────────────────────────────────

const DS_SITES = [
  { icon: '🔍', name: 'Octopart',      url: q => `https://octopart.com/search?q=${q}` },
  { icon: '📦', name: 'Mouser',         url: q => `https://www.mouser.com/Search/Refine?Keyword=${q}` },
  { icon: '🛒', name: 'DigiKey',        url: q => `https://www.digikey.com/en/products/filter?keywords=${q}` },
  { icon: '📄', name: 'AllDatasheet',   url: q => `https://www.alldatasheet.com/view.jsp?Searchword=${q}` },
  { icon: '📋', name: 'Datasheet.com',  url: q => `https://www.datasheet.com/search.php?q=${q}` },
  { icon: '🔎', name: 'Google (PDF)',   url: q => `https://www.google.com/search?q=${q}+datasheet+filetype:pdf` },
];

function buildDsLinks(query) {
  const container = document.getElementById('ds-links');
  container.innerHTML = '';
  if (!query) return;
  const enc = encodeURIComponent(query);
  DS_SITES.forEach(site => {
    const btn = document.createElement('button');
    btn.className = 'ds-link-btn';
    btn.innerHTML = `<span class="ds-icon">${site.icon}</span><span class="ds-name">${site.name}</span><span class="ds-arrow">↗</span>`;
    btn.addEventListener('click', () => window.open(site.url(enc), '_blank'));
    container.appendChild(btn);
  });
}

document.getElementById('ds-btn').addEventListener('click', () => {
  buildDsLinks(document.getElementById('ds-query').value.trim());
});
document.getElementById('ds-query').addEventListener('keydown', e => {
  if (e.key === 'Enter') buildDsLinks(e.target.value.trim());
});

document.querySelectorAll('.mfr-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = document.getElementById('ds-query').value.trim();
    window.open(btn.dataset.base + encodeURIComponent(q), '_blank');
  });
});

// ── ⑤ Formula Saver ───────────────────────────────────────────

const DEFAULT_FORMULAS = [
  { id: 'd1',  name: "Ohm's Law",         expr: "V = I × R",                desc: "Voltage, current & resistance" },
  { id: 'd2',  name: "Power (V·I)",        expr: "P = V × I",                desc: "Electrical power" },
  { id: 'd3',  name: "Power (I²R)",        expr: "P = I² × R",               desc: "Power in a resistor" },
  { id: 'd4',  name: "Power (V²/R)",       expr: "P = V² / R",               desc: "Power from V and R" },
  { id: 'd5',  name: "RC Time Constant",   expr: "τ = R × C",                desc: "Charges to 63.2% in τ seconds" },
  { id: 'd6',  name: "RL Time Constant",   expr: "τ = L / R",                desc: "Current rises to 63.2% in τ" },
  { id: 'd7',  name: "Resonant Frequency", expr: "f₀ = 1 / (2π√(LC))",      desc: "LC circuit resonance" },
  { id: 'd8',  name: "Capacitor Energy",   expr: "E = ½ × C × V²",          desc: "Energy stored in capacitor" },
  { id: 'd9',  name: "Inductor Energy",    expr: "E = ½ × L × I²",          desc: "Energy stored in inductor" },
  { id: 'd10', name: "Voltage Divider",    expr: "Vout = Vin × R₂/(R₁+R₂)", desc: "Resistor divider output" },
  { id: 'd11', name: "Capacitor Charge",   expr: "Q = C × V",               desc: "Charge stored" },
  { id: 'd12', name: "Inductor Voltage",   expr: "V = L × dI/dt",           desc: "Voltage across inductor" },
  { id: 'd13', name: "Decibel (Power)",    expr: "dB = 10 log₁₀(P₂/P₁)",   desc: "Power ratio in dB" },
  { id: 'd14', name: "Decibel (Voltage)",  expr: "dB = 20 log₁₀(V₂/V₁)",   desc: "Voltage ratio in dB" },
  { id: 'd15', name: "Cutoff Frequency",   expr: "fc = 1 / (2πRC)",         desc: "RC low/high pass filter" },
];

let formulas = [];

const hasStorage = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

function loadFormulas(cb) {
  if (!hasStorage) {
    formulas = [...DEFAULT_FORMULAS];
    if (cb) cb();
    return;
  }
  chrome.storage.local.get(['formulas', 'defaultsLoaded'], data => {
    formulas = data.formulas || [];
    if (!data.defaultsLoaded) {
      formulas = [...DEFAULT_FORMULAS, ...formulas];
      chrome.storage.local.set({ formulas, defaultsLoaded: true }, cb);
    } else {
      if (cb) cb();
    }
  });
}

function saveFormulas(cb) {
  if (!hasStorage) { if (cb) cb(); return; }
  chrome.storage.local.set({ formulas }, cb);
}

function renderFormulas(filter = '') {
  const list = document.getElementById('formula-list');
  list.innerHTML = '';
  const q = filter.toLowerCase();
  const filtered = formulas.filter(f =>
    f.name.toLowerCase().includes(q) || f.expr.toLowerCase().includes(q) || (f.desc || '').toLowerCase().includes(q)
  );
  if (filtered.length === 0) {
    list.innerHTML = `<div class="formula-empty">${filter ? 'No matches found.' : 'No formulas saved yet.'}</div>`;
    return;
  }
  filtered.forEach(f => {
    const card = document.createElement('div');
    card.className = 'formula-card';
    card.innerHTML = `
      <div class="formula-card-name">${esc(f.name)}</div>
      <div class="formula-card-expr">${esc(f.expr)}</div>
      ${f.desc ? `<div class="formula-card-desc">${esc(f.desc)}</div>` : ''}
      <button class="formula-del" data-id="${f.id}" title="Delete">×</button>`;
    list.appendChild(card);
  });
  list.querySelectorAll('.formula-del').forEach(btn => {
    btn.addEventListener('click', () => {
      formulas = formulas.filter(x => x.id !== btn.dataset.id);
      saveFormulas(() => renderFormulas(document.getElementById('f-search').value));
    });
  });
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.getElementById('f-add').addEventListener('click', () => {
  const name = document.getElementById('f-name').value.trim();
  const expr = document.getElementById('f-expr').value.trim();
  const desc = document.getElementById('f-desc').value.trim();
  if (!name || !expr) return;
  formulas.unshift({ id: 'u' + Date.now(), name, expr, desc });
  saveFormulas(() => {
    renderFormulas(document.getElementById('f-search').value);
    document.getElementById('f-name').value = '';
    document.getElementById('f-expr').value = '';
    document.getElementById('f-desc').value = '';
    document.getElementById('add-formula-details').removeAttribute('open');
  });
});

document.getElementById('f-search').addEventListener('input', e => renderFormulas(e.target.value));

loadFormulas(() => renderFormulas());

// ── ⑥ Number Converter ────────────────────────────────────────

const ncBin = document.getElementById('nc-bin');
const ncDec = document.getElementById('nc-dec');
const ncHex = document.getElementById('nc-hex');
const ncOct = document.getElementById('nc-oct');
const ncSigned = document.getElementById('nc-signed');

function updateFromDecimal(dec) {
  if (!isFinite(dec)) {
    [ncBin, ncDec, ncHex, ncOct].forEach(el => el.value = '');
    document.getElementById('nc-bits').innerHTML = '';
    document.getElementById('nc-color-preview').classList.add('hidden');
    return;
  }
  const signed = ncSigned.checked;
  const n = Math.round(dec);

  if (signed) {
    // Pick smallest power-of-2 bit width that holds the value
    const minBits = n >= 0 ? Math.floor(Math.log2(n + 1)) + 2 : Math.floor(Math.log2(-n - 1)) + 2;
    const width = Math.max(8, [8, 16, 32].find(w => w >= minBits) || 32);
    const unsigned = n >>> 0;
    const masked = unsigned & ((width === 32) ? 0xFFFFFFFF : (Math.pow(2, width) - 1));
    ncBin.value = masked.toString(2).padStart(width, '0');
  } else {
    ncBin.value = n < 0 ? '' : n.toString(2);
  }
  ncDec.value = n;
  ncHex.value = n < 0 ? '' : n.toString(16).toUpperCase();
  ncOct.value = n < 0 ? '' : n.toString(8);

  renderBits(n < 0 ? 0 : n);

  // hex color preview
  const hexStr = ncHex.value;
  const colorPrev = document.getElementById('nc-color-preview');
  if (hexStr.length === 3 || hexStr.length === 6) {
    const full = hexStr.length === 3
      ? hexStr.split('').map(c => c + c).join('')
      : hexStr;
    document.getElementById('nc-swatch').style.background = '#' + full;
    document.getElementById('nc-hex-color').textContent = '#' + full;
    colorPrev.classList.remove('hidden');
  } else {
    colorPrev.classList.add('hidden');
  }
}

function renderBits(n) {
  const container = document.getElementById('nc-bits');
  container.innerHTML = '';

  let bitCount = 8;
  if (n > 0xFFFF) bitCount = 32;
  else if (n > 0xFF) bitCount = 16;

  const binStr = n.toString(2).padStart(bitCount, '0');

  for (let nibStart = 0; nibStart < bitCount; nibStart += 4) {
    const nibble = document.createElement('div');
    nibble.className = 'bit-nibble';

    const posRow = document.createElement('div');
    posRow.className = 'bit-pos-row';
    const cellRow = document.createElement('div');
    cellRow.className = 'bit-nibble-cells';

    for (let b = nibStart; b < nibStart + 4; b++) {
      const pos = document.createElement('div');
      pos.className = 'bit-pos';
      pos.textContent = bitCount - 1 - b;
      posRow.appendChild(pos);

      const box = document.createElement('div');
      const bit = b < binStr.length ? binStr[b] : '0';
      box.className = 'bit-box ' + (bit === '1' ? 'b1' : 'b0');
      box.textContent = bit;
      cellRow.appendChild(box);
    }
    nibble.appendChild(posRow);
    nibble.appendChild(cellRow);
    container.appendChild(nibble);
  }
}

ncBin.addEventListener('input', () => {
  const v = ncBin.value.replace(/\s/g, '');
  if (/^[01]+$/.test(v)) updateFromDecimal(parseInt(v, 2));
  else if (v === '') updateFromDecimal(NaN);
});
ncDec.addEventListener('input', () => {
  const v = parseInt(ncDec.value, 10);
  if (!isNaN(v)) updateFromDecimal(v);
  else if (ncDec.value === '' || ncDec.value === '-') updateFromDecimal(NaN);
});
ncHex.addEventListener('input', () => {
  const v = ncHex.value.replace(/\s/g, '');
  if (/^[0-9a-fA-F]+$/.test(v)) updateFromDecimal(parseInt(v, 16));
  else if (v === '') updateFromDecimal(NaN);
});
ncOct.addEventListener('input', () => {
  const v = ncOct.value;
  if (/^[0-7]+$/.test(v)) updateFromDecimal(parseInt(v, 8));
  else if (v === '') updateFromDecimal(NaN);
});
ncSigned.addEventListener('change', () => {
  const dec = parseInt(ncDec.value, 10);
  if (!isNaN(dec)) updateFromDecimal(dec);
});

// Initial state
updateFromDecimal(42);
