# Zips India Interactive Dashboard

Investor and operations dashboard for the Zips India garment care network (Telangana / Hyderabad focus).

Inspired by [ZIPS Cleaners](https://321zips.com/) — orange/navy theme, hub-and-spoke model, everyday low prices.

## Features

### Four tabs (top navigation)

1. **Dashboard** — KPIs, map preview, distance tables, demographics, pricing, expansion
2. **Network Map** — Full-screen satellite map with enhanced controls
3. **Business Plan** — Full project report (Venkat) with 20 drop stores @ ₹15L avg and ₹9.17 Cr CAPEX
4. **Financial Model** — Interactive sliders for break-even and profit

### Business Plan & CAPEX

- Narrative sections from the Venkat project report (docx)
- **Synced to dashboard:** 20 launch drop stores @ **₹15L average**, **₹9.17 Cr** initial CAPEX (`src/data/setupCosts.json`)
- Pricing, volume ramps, and financial sliders are unchanged

Regenerate report JSON after editing the docx:

```bash
npm run convert-report
```

### Network Map

- Satellite / street toggle, layer filters, distance lines from Tukkuguda plant
- Color-coded distances: green &lt;15 km, amber 15–28 km, red &gt;28 km
- Store search, jump-to-store list, trade-radius circles
- Popups with road km, drive time, population, income, nearby apartments

### Financial Simulator

Slide these variables and see live updates:

- Pickup points × garments per point (or direct garments/day)
- Avg price, cost per garment, fixed monthly cost, working days
- Break-even garments/day, monthly EBITDA, P&amp;L bar chart, EBITDA vs volume curve

### Distance tables

- **Flagship stores** — premium locations with visibility anchors, income, population
- **Convenience stores** — apartments/villa communities with nearby projects

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm run preview
```

## Tech stack

- Vite + React
- Tailwind CSS v4
- react-leaflet / Leaflet
- Recharts
