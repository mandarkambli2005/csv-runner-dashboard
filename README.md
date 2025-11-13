# CSV Runner Dashboard (Next.js + shadcn/ui)

A dashboard where users upload a CSV with `date,person,miles run` to see validated parsing, overall & per-person metrics, and charts.

## 1) Project Overview
This implements the "CSV Runner Dashboard" challenge. It parses & validates CSVs, shows overall & per-person metrics (avg/min/max), and renders an overall chart + per-person chart.

## 2) Assumptions
- CSV contains headers **exactly**: `date`, `person`, `miles run` (case-insensitive accepted).
- `date` is ISO-like (`YYYY-MM-DD`) or any value `new Date(...)` can parse reliably.
- `miles run` is numeric; blank/NaN rows are rejected with an error summary.
- No auth, no backend persistence; all in-memory in the browser.
- Large CSVs (thousands of rows) are fine for demo; not optimized for millions.

## 3) Prerequisites
- Node.js v18+ (tested with 18/20)
- PNPM/NPM/Yarn; examples use **npm**
- No local DB
- Tools installed by `npm install`

## 4) Setup
```bash
npm install
npm run dev
```

### Environment
Create `.env` from `.env.example` if you add keys. Not required for the base app.

### Seed / Sample
A sample file is provided at `public/sample.csv`.

## 5) Run & Verify
- Start dev: `npm run dev` then open http://localhost:3000
- Click **Upload CSV** and select your file or **Download sample** and use it.
- Verify Acceptance Items:
  1. **Sample CSV + instructions** — README explains, sample in `public/sample.csv`.
  2. **Overall & per-person charts/views** — See the **Overview** and **Per Person** tabs/selectors.
  3. **Metrics computed correctly** — Cards show avg/min/max overall and per person.
  4. **Error handling for invalid CSV** — Upload an invalid file (wrong headers/bad types) to see errors.

## 6) Features & Limitations
**Works:**
- Header/type validation, detailed error feedback (missing headers, invalid numbers, bad dates).
- Overall metrics and per-person metrics.
- Overall chart (miles per day total) and per-person chart (stacked or single series).

**Known Gaps / Future Improvements:**
- Persist last upload to localStorage.
- Filtering by date ranges.
- Export cleaned dataset as CSV.
- Add unit tests (Zod schema tests, stats utilities).

## 7) Notes on Architecture
- **App Router (Next 14)** under `app/` with a single page.
- **Components:** `components/ui/*` (shadcn-inspired primitives), `components/*` feature components.
- **Utils:** `lib/csv.ts` (parsing/validation), `lib/stats.ts` (aggregations).
- **State:** Local React state in `app/page.tsx`. No global store needed.

Folder structure:
```
app/
components/
lib/
public/
```

## 8) Accessibility & UI
- Labels with inputs, focusable buttons & keyboard-usable controls.
- Sufficient color contrast using Tailwind defaults.
- Semantic elements & ARIA where helpful.

---

## Commands
- `npm run dev` — run dev server
- `npm run build` — production build
- `npm start` — start production server

## Acceptance Checklist
- [x] Sample CSV + instructions
- [x] Overall & per-person charts/views
- [x] Metrics computed correctly
- [x] Error handling for invalid CSV
```

