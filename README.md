# Idle Cultivation

A browser idle/incremental **xianxia life-sim**: each run is one life, death is prestige via reincarnation, and the incremental game *is* the reincarnation cycle. Genre blend of roguelike prestige loop + idle scaling + cultivation RPG. Currently building the **Early (Mortal/Wuxia)** phase.

Stack: React 19 · Vite · TypeScript · Zustand · React Router 7 · Tailwind 4 · Zod. React Compiler enabled.

---

## Documentation (sources of truth)

Project knowledge is recomposed by theme under `docs/`. Each doc opens with a `## Key facts` block (fast priming) followed by narrative. The manifest (`docs/.knowledge-manifest.json`) tracks the taxonomy, fact provenance, and conflict rulings; re-run `/organize-knowledge` to fold new knowledge in.

| Doc | What it's the source of truth for |
|---|---|
| [`docs/vision/identity.md`](docs/vision/identity.md) | What the game is — genre, inspirations, 4 macro phases, design philosophy |
| [`docs/design/core-loop.md`](docs/design/core-loop.md) | Run = life, prestige loop, run-vs-meta state, run types, the time/aging clock |
| [`docs/design/scaling.md`](docs/design/scaling.md) | Cost/production curves, growth rates, prestige formulas *(design math, not yet built)* |
| [`docs/design/ui-ux.md`](docs/design/ui-ux.md) | Color tokens, typography, number formatting, animation tiers, layouts, sidebar |
| [`docs/design/roadmap.md`](docs/design/roadmap.md) | 5-sprint UI/UX plan, each item annotated done/partial/pending |
| [`docs/architecture/architecture.md`](docs/architecture/architecture.md) | Stores, services, data layer, effect/event/unlock systems, intended-vs-wired, gaps |
| [`docs/architecture/conventions.md`](docs/architecture/conventions.md) | Naming, domain-terminology table, coding patterns, do-not list, comms style |
| [`docs/meta-design/meta-design.md`](docs/meta-design/meta-design.md) | **PARKED** fourth-wall layer: karma ledger, UI revelation, behavior→response catalog |

Superseded raw docs are archived outside the repo at `../IdleCultivationFront-archive/`. Scratch/reference material lives in `docs/archive/`.

> **Source of truth rule:** when a doc conflicts with the code, the code wins. Docs describe intent and conventions; the code is the real state.

---

## Getting started

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the build
npm run lint      # eslint
```

Requires Node 18+. Path alias `@/` → `src/`. Dark mode by default.
