---
purpose: Live 5-sprint UI/UX implementation roadmap, annotated with shipped-vs-pending status verified against code.
status: active
last-verified: 2026-07-17
related: [docs/design/ui-ux.md]
---

## Key facts
- Roadmap derives from `docs/vision/big-design-analysis.md` ("Prioritized action plan", Sprints 1-5). This doc tracks delivery status per item, verified against source.
- NOTE (2026-07-17): the chrome was redesigned after this plan was written — sidebar replaced by horizontal tabs + Self card + Thread drawer, ink-stone neutrals, glyph iconography, 24h day bar (see `ui-ux.md`). Sidebar-related items below are historical.
- Sprint 1 (Foundation): largely DONE. Accent color CSS tokens, Cinzel/Crimson Text/JetBrains Mono fonts (loaded in `index.html`), K/M/B/T+ suffix formatting (`formatNumber.ts`), button press feedback (`active:scale-[0.97]` in `button.tsx`), and breathing/pulse glow keyframes all shipped. PARTIAL: `[data-section]` attribute mechanism NOT used (accent colors exist as tokens/utility classes only); `font-variant-numeric: tabular-nums` NOT applied anywhere (alignment relies on `font-mono` instead).
- Sprint 2 (Feedback loops): MIXED. Progress stripe animation BUILT but currently UNUSED (`progress-striped` class + `striped` prop on `Progress` exist; no component passes `striped` since the activity-row redesign). Number lerp DONE (`useLerpNumber` in header + sidebar); `useSmoothProgress` smooths the queue-bar progress. Sidebar redesign DONE (rate-of-change income/expense/net, mini progress bars, pulse-danger). PENDING: floating number popups, completion flash, and tab-unlock animation/"NEW" badge are all DEFINED as CSS keyframes (`float-up`, `flash-complete`, `unlock-flash`) but have NO component usage.
- Sprint 3 (Layout differentiation): PARTIAL. Stats uses table-style `StatRow` (not cards) — DONE. Travel has an SVG node map — DONE. Inventory uses an icon grid + hover tooltip — DONE. Activities moved from cards to `ActivityRow` rows — DONE (no slider/stepper control; +/− unit queueing instead). PENDING: loadout/preset saving, keyboard tab-navigation shortcuts.
- Sprint 4 (Ceremony/polish): MOSTLY PENDING. `DeathOverlay` component exists (death visual). PENDING: full rebirth sequence, realm color-scheme transition, confetti (`canvas-confetti` not installed), progressive tab disclosure, XP/day metrics, resource projections. NOTE: `prefers-reduced-motion` fallback partially DONE (covers stripe/breathe/float-up/unlock-flash only).
- Sprint 5 (Advanced systems): PENDING almost entirely. No notation options, no `break_infinity.js` (not in deps), no notification dots, no automation unlocks, no ambient particle effects. A `/Recap` route exists (renders the calendar page, `src/ui/pages/calendar.tsx`) but the vertical-timeline recap per plan is not built.

## Sprint 1 — Foundation
Source estimate: 8-12 hours.

- Section accent color system via CSS custom properties: **PARTIAL**. Eight accent tokens (`--accent-jade`, `--accent-gold`, `--accent-cinnabar`, `--accent-silver`, `--accent-violet`, `--accent-sky`, `--accent-lotus`, `--accent-indigo`) are defined from the `PALETTE` source in `sectionColors.ts` and exposed as Tailwind colors. The planned `[data-section]` attribute wiring is NOT present — sections apply accents through explicit utility classes (e.g. `text-accent-jade`), not a single `data-section` switch.
- JetBrains Mono for numbers: **PARTIAL**. JetBrains Mono is loaded (`index.html`) and set as `--font-mono`; `font-mono` is applied across number-bearing components (sidebar, header, stat panels, queue). However `font-variant-numeric: tabular-nums` is NOT applied anywhere, so the explicit jitter-prevention line from the plan is missing (monospace alignment substitutes for it).
- Cinzel for titles/realm names: **DONE**. Loaded in `index.html`, set as `--font-display`, applied via `font-display` on `PageHeader`, `layoutHeader`, and several pages.
- Number formatting (comma grouping + K/M/B/T suffixes): **DONE**. `formatNumber.ts` does `toLocaleString` under 1M then suffix notation; extends beyond T to `Qa/Qi/Sx/Sp/Oc` with fixed 2 decimals. Exceeds the plan's K/M/B/T baseline.
- Button press feedback: **DONE**. `active:scale-[0.97]` with `transition-all` on the base button variant in `src/components/ui/button.tsx`.
- Breathing glow on actionable elements: **DONE**. `breathe`, `pulse-glow`, and `pulse-danger` keyframes with `animate-*` utilities; `animate-breathe`/`animate-pulse-glow` used in `layoutHeader` and `travel`.

## Sprint 2 — Feedback loops
Source estimate: 10-15 hours.

- Progress bar stripe animation: **BUILT, UNUSED**. `progress-striped` (45deg repeating gradient + `stripe-move` keyframe) in `globals.css`; `Progress` exposes a `striped` prop; no component currently passes it (dropped in the activity-row redesign).
- Floating number popups: **PENDING**. `float-up` keyframe and `.animate-float-up` exist in `globals.css` but no component renders floating popups (no usage outside CSS).
- Progress bar completion flash: **PENDING**. `flash-complete` keyframe defined in `globals.css`; no `animate-flash`/`flash-complete` usage in any page or component.
- Number interpolation (lerp): **DONE**. `useLerpNumber` (rAF, 10%/frame, snaps within 0.5) used in `layoutHeader.tsx` and `sidebar.tsx`.
- Tab unlock animation + "NEW" badge + toast: **PENDING**. `unlock-flash` keyframe and `.animate-unlock-flash` exist but are unused; no NEW badge / toast logic found.
- Sidebar redesign: **DONE**. Sidebar shows Income/Expenses/Net as color-coded rate lines (`+/-…g`, emerald/cinnabar), uses `formatNumber`, mini `Progress` bars (with `striped`/`animate-pulse-danger` for danger states), and lerped values. Note: `dailyExpenses` is currently hardcoded to 0.

## Sprint 3 — Layout differentiation
Source estimate: 12-18 hours.

- Activities slider-based layout (remove cards): **PARTIAL**. Cards are gone — `activities.tsx` renders `ActivityRow` rows with +/− unit queueing; no slider/stepper time-allocation control.
- Activity loadout saving (3-5 presets): **PENDING**. No preset/loadout mechanism located.
- SVG node map for Travel: **DONE**. `travel.tsx` renders inline `<svg>` with `<path>` connectors and nodes.
- Stats table/definition-list layout: **DONE**. `stats.tsx` uses a `StatRow` (label | value) row component rather than cards.
- Inventory icon grid + tooltips: **DONE**. `inventory.tsx` uses a responsive `grid` of item slots with a hover tooltip block.
- Keyboard shortcuts for tab navigation: **PENDING**. No `keydown`/hotkey handlers found in `src/ui`.

## Sprint 4 — Ceremony and polish
Source estimate: 10-15 hours.

- Death/rebirth animation sequence: **PARTIAL**. A `DeathOverlay.tsx` component exists (referenced via `layout.tsx`), providing a death visual. The full sequenced ceremony (vignette → shake → fade → reward screen → fade in) is not confirmed as fully implemented; treat as partial/in-progress.
- Cultivation realm color-scheme transitions: **PENDING**. Realm-progression palette is documented but no runtime CSS-variable swap on breakthrough found.
- Confetti on breakthrough (`canvas-confetti`): **PENDING**. Library not present in deps; no confetti usage.
- `prefers-reduced-motion` fallbacks: **PARTIAL**. A media query exists but only disables `progress-striped`, `animate-breathe`, `animate-float-up`, `animate-unlock-flash` — not the full set of animations (pulse-glow, shimmer, heavenly/divine/reality effects, etc. are not covered).
- Progressive tab disclosure (hide unearned tabs): **PENDING** (unlock infrastructure exists via UnlockEvaluator, but tab-hiding per this plan not verified as wired).
- XP/day efficiency metrics on activities: **PENDING**. Not found on activity UI.
- Resource projection previews on Activities: **PENDING**.

## Sprint 5 — Advanced systems
Source estimate: 15-20 hours.

- Notation options (Scientific/Engineering/Standard): **PENDING**. No notation toggle or `@antimatter-dimensions/notations` integration.
- `break_infinity.js` integration: **PENDING**. Not in dependencies.
- Notification dots on tabs: **PENDING**.
- Automation unlocks as progression rewards: **PENDING**.
- Recap page as vertical timeline: **PARTIAL**. A `/Recap` route exists (unlock-gated, renders `src/ui/pages/calendar.tsx`); the vertical-timeline life recap per plan is not built.
- Ambient particle effects tied to realm: **PENDING**. (Decorative `heavenly`/`divine`/`reality` keyframes exist for the Heavenly Veil effect system but are not realm-tied ambient particles per this plan.)
