# EngiMate — Engineering Toolkit Chrome Extension

> An all-in-one Chrome extension for Electrical & Computer Engineering students. Six practical tools, always one click away while you study, browse datasheets, or write lab reports.

---

## Table of Contents

- [Preview](#preview)
- [Tools](#tools)
  - [Unit Converter](#1-unit-converter)
  - [Resistor Color Code](#2-resistor-color-code-calculator)
  - [Truth Table Generator](#3-boolean-truth-table-generator)
  - [Datasheet Finder](#4-datasheet-finder)
  - [Formula Saver](#5-formula-saver)
  - [Number Converter](#6-numberbase-converter)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [How Each Tool Works](#how-each-tool-works)
- [Tech Stack](#tech-stack)

---

## Preview

```
┌────────────────────────────────────────────────┐
│  ┌──┐  ┌──────────────────────────────────────┐│
│  │⇄ │  │  Unit Converter                      ││
│  │Ω │  │  Category: [📡 Frequency      ▼]     ││
│  │⊞ │  │                                      ││
│  │📄│  │  [  1000  ] [kHz ▼]  ⇄  [1][MHz ▼]  ││
│  │Σ │  │                                      ││
│  │01│  │  1000 kHz = 1 MHz                    ││
│  └──┘  └──────────────────────────────────────┘│
└────────────────────────────────────────────────┘
     Sidebar      Main content panel (520×580 px)
```

---

## Tools

### 1. Unit Converter

Instantly converts values across **13 engineering categories**:

| Category | Example Units |
|---|---|
| Length | nm, μm, mm, cm, m, km, in, ft, mi, mil |
| Mass | μg, mg, g, kg, tonne, oz, lb |
| Temperature | °C, °F, K |
| Time | ns, μs, ms, s, min, hr, day |
| Frequency | Hz, kHz, MHz, GHz, THz, RPM, rad/s |
| Voltage | nV, μV, mV, V, kV |
| Current | nA, μA, mA, A, kA |
| Power | nW, μW, mW, W, kW, MW, **dBm, dBW** |
| Capacitance | pF, nF, μF, mF, F |
| Inductance | nH, μH, mH, H |
| Resistance | mΩ, Ω, kΩ, MΩ, GΩ |
| Angle | deg, rad, grad, rev |
| Data / Storage | bit, B, KB, MB, GB, TB, KiB, MiB, GiB |

**How to use:**
1. Pick a category from the dropdown.
2. Enter a value in the left field.
3. Choose source and target units from the two unit dropdowns.
4. The result appears instantly. Hit **⇄** to swap direction.

> Temperature and Power (dBm/dBW) use special formulas instead of simple factors.

---

### 2. Resistor Color Code Calculator

Decodes standard **4-band** and **5-band** resistors using the IEC color code.

**Color → Value:**
1. Toggle between **4-Band** or **5-Band** mode.
2. Select the color of each band from the dropdowns.
3. The animated SVG resistor updates in real time with the actual band colors.
4. The resistance value and tolerance appear at the bottom (e.g., `10 kΩ  ±5%`).

**Color band reference:**

| Color | Digit | Multiplier | Tolerance |
|---|---|---|---|
| Black | 0 | ×1 | — |
| Brown | 1 | ×10 | ±1% |
| Red | 2 | ×100 | ±2% |
| Orange | 3 | ×1 kΩ | — |
| Yellow | 4 | ×10 kΩ | — |
| Green | 5 | ×100 kΩ | ±0.5% |
| Blue | 6 | ×1 MΩ | ±0.25% |
| Violet | 7 | ×10 MΩ | ±0.1% |
| Gray | 8 | ×100 MΩ | ±0.05% |
| White | 9 | ×1 GΩ | — |
| Gold | — | ×0.1 | ±5% |
| Silver | — | ×0.01 | ±10% |

---

### 3. Boolean Truth Table Generator

Parses a **boolean expression** and generates its full truth table automatically.

**Supported operators:**

| Operator | Symbols accepted |
|---|---|
| AND | `AND`, `&`, `&&`, `·`, `*` |
| OR | `OR`, `\|`, `\|\|`, `+` |
| NOT | `NOT`, `!`, `~` |
| XOR | `XOR`, `^` |
| NAND | `NAND` |
| NOR | `NOR` |
| XNOR | `XNOR` |

**How to use:**
1. Type an expression in the input field, e.g. `A AND B OR NOT C`.
2. Press **Generate** or hit Enter.
3. Variables are auto-detected (any uppercase letter A–Z, up to 5 variables = max 32 rows).
4. Click any **chip** button for a ready-made example.

**Example expressions:**

```
A AND B
NOT (A OR B)
(A XOR B) AND C
A AND B OR NOT A AND C
```

The output column is highlighted in purple. 1s are shown in teal, 0s in grey.

---

### 4. Datasheet Finder

Searches for component datasheets across the most popular EE databases.

**How to use:**
1. Type a part number or component name (e.g. `NE555`, `LM358`, `STM32F411`).
2. Press **Search** — six clickable links appear, one per database.
3. Or click any **manufacturer button** to jump directly to that company's product page.

**Databases searched:**

| Site | Best for |
|---|---|
| Octopart | Cross-distributor search, pricing |
| Mouser | Stock levels, ordering |
| DigiKey | Stock levels, ordering |
| AllDatasheet | Free PDF datasheets |
| Datasheet.com | Free PDF datasheets |
| Google (PDF) | `<part> datasheet filetype:pdf` |

**Manufacturer quick-links:** TI · ST · NXP · Microchip · ADI · Infineon

---

### 5. Formula Saver

A personal formula notebook that **persists across browser sessions** using Chrome's storage API.

**Pre-loaded formulas (15 built-in):**

| Formula | Expression |
|---|---|
| Ohm's Law | `V = I × R` |
| Power (V·I) | `P = V × I` |
| Power (I²R) | `P = I² × R` |
| Power (V²/R) | `P = V² / R` |
| RC Time Constant | `τ = R × C` |
| RL Time Constant | `τ = L / R` |
| Resonant Frequency | `f₀ = 1 / (2π√(LC))` |
| Capacitor Energy | `E = ½ × C × V²` |
| Inductor Energy | `E = ½ × L × I²` |
| Voltage Divider | `Vout = Vin × R₂/(R₁+R₂)` |
| Capacitor Charge | `Q = C × V` |
| Inductor Voltage | `V = L × dI/dt` |
| Decibel (Power) | `dB = 10 log₁₀(P₂/P₁)` |
| Decibel (Voltage) | `dB = 20 log₁₀(V₂/V₁)` |
| RC Cutoff Frequency | `fc = 1 / (2πRC)` |

**How to use:**
- Click **+ Add New Formula** to expand the form.
- Fill in a name, expression, and optional description, then click **Save Formula**.
- Use the search box to filter in real time by name, expression, or description.
- Click **×** on any card to delete it permanently.

> Your custom formulas are saved in `chrome.storage.local` — they survive browser restarts and extension updates.

---

### 6. Number / Base Converter

Converts between the four number bases used in digital electronics, **simultaneously and in real time**.

| Base | Input format |
|---|---|
| BIN (Binary) | `0` and `1` only |
| DEC (Decimal) | Any integer |
| HEX (Hexadecimal) | `0–9` and `A–F` |
| OCT (Octal) | `0–7` only |

**Features:**
- Type in any of the four fields — all others update instantly.
- **Bit visualizer** shows the binary representation as colored squares (purple = 1, dark = 0), grouped in nibbles with bit-position labels (e.g., bit 7 down to bit 0).
- Automatically scales to **8-bit**, **16-bit**, or **32-bit** depending on the value.
- **Signed (Two's Complement)** toggle — enable it to see how negative numbers are represented in binary (e.g., `-1` in 8-bit = `11111111`).
- **Hex color preview** — if the hex value is 3 or 6 digits long, a color swatch appears automatically (great for CSS/display work).

---

## Installation

This extension is loaded as an **unpacked extension** (developer mode). No Chrome Web Store account needed.

### Steps

1. **Download or clone** this repository:
   ```bash
   git clone https://github.com/dahlia1384/EngiMate-Chrome-Extension-Toolkit-for-EE-CE-Students.git
   ```

2. **Open Chrome** and go to:
   ```
   chrome://extensions
   ```

3. **Enable Developer Mode** using the toggle in the top-right corner.

4. Click **"Load unpacked"** and select the root folder of this project (the one containing `manifest.json`).

5. The **EngiMate icon** (purple "E" circle) will appear in your Chrome toolbar.  
   Pin it for easy access: click the puzzle piece icon → pin EngiMate.

### Requirements

- Google Chrome (or any Chromium-based browser: Edge, Brave, Arc, etc.)
- No internet connection required — all tools run locally
- No external dependencies or build step

---

## Project Structure

```
EngiMate/
│
├── manifest.json        Chrome Extension Manifest V3 — declares permissions,
│                        popup page, and icon paths
│
├── popup.html           Main UI — all 6 tool panels in a single HTML file,
│                        shown/hidden via JavaScript
│
├── popup.css            All styling — dark theme, sidebar layout, tool panels,
│                        animations, and utility classes
│
├── popup.js             All logic — tool switching, unit conversion tables,
│                        resistor color data, boolean expression parser,
│                        datasheet link builder, formula storage, number converter
│
└── icons/
    ├── icon16.png       Toolbar icon (16×16)
    ├── icon48.png       Extension management page icon (48×48)
    └── icon128.png      Chrome Web Store icon (128×128)
```

### Key design decisions

| Decision | Reason |
|---|---|
| Single popup file | No routing or bundler needed; simpler to load and demo |
| `chrome.storage.local` for formulas | Persists data without a backend or server |
| Manifest V3 | Required for new Chrome extensions; uses `storage` permission only |
| No external libraries | Zero dependencies = fast load, no CDN calls, works offline |
| Dark theme | Reduces eye strain during late-night study sessions |

---

## How Each Tool Works

### Unit Converter — internals

Each unit has a **conversion factor relative to a base unit** (e.g., the base for length is metres). Converting from unit A to unit B:

```
result = inputValue × factorA / factorB
```

Temperature and Power (dBm/dBW) use **dedicated conversion functions** instead of simple factors because they are non-linear (logarithmic or offset-based).

### Resistor Calculator — internals

The color-to-value mapping follows the IEC 60062 standard:

```
4-band:  value = (digit1 × 10 + digit2) × multiplier
5-band:  value = (digit1 × 100 + digit2 × 10 + digit3) × multiplier
```

The SVG resistor graphic updates by changing the `fill` attribute on the band `<rect>` elements directly in the DOM.

### Truth Table Parser — internals

A hand-written **recursive descent parser** processes the expression string:

```
Grammar:
  expr     → or_expr
  or_expr  → xor_expr (('OR' | 'NOR') xor_expr)*
  xor_expr → and_expr (('XOR' | 'XNOR') and_expr)*
  and_expr → not_expr (('AND' | 'NAND') not_expr)*
  not_expr → 'NOT' not_expr | primary
  primary  → VARIABLE | '(' expr ')'
```

Each parse function returns a **JavaScript closure** `(vars) => boolean`, so evaluation is just a function call per row. Variables are auto-detected by scanning the expression for uppercase letters.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Extension platform | Chrome Manifest V3 |
| UI | Vanilla HTML5 + CSS3 (no frameworks) |
| Logic | Vanilla JavaScript ES2020 (`'use strict'`) |
| Persistence | `chrome.storage.local` |
| Icons | Generated via .NET `System.Drawing` (PowerShell) |
| Fonts | System fonts (`-apple-system`, `Segoe UI`, `Roboto`) + `Consolas` for monospace |

---

## License

MIT — see [LICENSE](LICENSE) for details.
