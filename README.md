# Revenue Funnel — Interactive Visualization

A web application that makes the full B2B SaaS recurring revenue system visible and explorable in a single view.

**Repository:** [github.com/rookiedk/recurring-revenue-funnel](https://github.com/rookiedk/recurring-revenue-funnel)

## What it is

Most revenue diagrams show half the picture. This one shows all of it — from first market contact through to expansion — and lets you interrogate it interactively.

The funnel has two halves: The top half narrows while the bottom half widens. What happens at the point where they meet is where the most important story in the business lives.

## What you can do with it

- **By stage** — Walk the journey one stage at a time (Awareness → … → Expansion) and drill into metrics for each of the three lens layers (VL3 leading signals, VL2 economics, VL1 outcomes).
- **Across stages** — Open the full-system grid: every layer × every stage at once, with the funnel stay synced when you hover or click a cell. Use this to spot coupling, drift, and leverage that a single column never shows.
- Switch lenses to see the same funnel through different questions.
- Use the diagram to reason about where the system is leaking, compounding, or hiding leverage, and which product or GTM moves touch which signals.

## Status

- **Milestone 1** — Model and architecture ✅
- **Milestone 2** — Interactive funnel and lens panel ✅
- **Milestone 3** — Cross-stage reading mode (full grid + funnel sync) ✅ · Deeper relationship mapping and diagnosis flows 🔜
- **Milestone 3+** — From diagnosis to decision: given what the system shows, what to do and where the lever sits 🔜

## Stack

React · Vite · SVG · Framer Motion · Tailwind · deploy on Vercel (or any static host)

## Local development

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev` (default [http://localhost:5173](http://localhost:5173))
3. Production build: `npm run build`
4. Preview build locally: `npm run preview`

## Project layout

| Path | Role |
|------|------|
| `src/App.jsx` | Reading modes, stage/lens state, metric model |
| `src/components/FunnelDiagram.jsx` | SVG funnel and stage selection |
| `src/components/MetricsPanel.jsx` | Lens stack for **By stage** |
| `src/components/CrossStagePanel.jsx` | Full grid for **Across stages** |
