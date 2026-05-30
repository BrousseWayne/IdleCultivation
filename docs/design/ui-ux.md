---
purpose: Canonical UI/UX and visual language reference — palette, typography, number formatting, animation tiers, navigation, per-page layouts, sidebar, and activity design tokens.
status: active
last-verified: 2026-05-30
related: [docs/design/roadmap.md]
---

## Key facts

- **Palette name**: "Jade Mountain". Colors map to Chinese cultural / xianxia associations (jade = immortality, cinnabar = tribulation/demonic, imperial gold = Golden Core 金丹, deep blue = heavenly dao). Principle: one accent color per game section, used sparingly.
- **Section accent colors** (apply via CSS custom properties + `[data-section]`):
  - Cultivation / Training — Jade teal `#2DD4BF`
  - Combat / Explore — Cinnabar red `#EF4444`
  - Resources / Money — Imperial gold `#F59E0B`
  - Health / Vitality — Emerald green `#10B981`
  - Quests / Story — Soft violet `#A78BFA`
  - Travel / Map — Sky blue `#3B82F6`
  - Lifestyle — Lotus pink `#F472B6`
  - Stats / Analytics — Moon silver `#94A3B8`
- **Background surface hierarchy** (semi-transparent white "mist" overlays for natural stacking depth):
  - `--bg-base: #0B0F14` (deepest background)
  - `--bg-surface: rgba(255,255,255,0.03)` (cards, panels)
  - `--bg-elevated: rgba(255,255,255,0.06)` (hover states)
  - `--bg-overlay: rgba(255,255,255,0.09)` (active panels, modals)
- **Accent usage rule**: accent applies only to page title underline/icon, primary action button, active nav indicator, and 3px left-edge card borders. ~90% of UI stays neutral.
- **Cultivation realm color progression** (for prestige layers / breakthrough palette shifts):
  - Qi Condensation — pale silver-blue `#94A3B8`
  - Foundation Establishment — teal `#14B8A6`
  - Core Formation — amber/gold `#F59E0B`
  - Nascent Soul — soft violet `#A78BFA`
  - Spirit Transformation — deep blue `#3B82F6`
  - Void Refinement — dark indigo `#6366F1`
  - Body Integration — emerald `#10B981`
  - Mahayana — crimson-to-gold gradient
- **Typography (three-tier)**:
  - Display — **Cinzel** (`'Cinzel', 'Noto Serif', Georgia, serif`), weights 400/600/700; realm names, section titles, game title. Use at `1.875rem`+ only, `letter-spacing: 0.05em`, `text-transform: uppercase` for realm names. Optional CJK alternative: **LXGW WenKai TC**.
  - Body — **Inter** (`'Inter', -apple-system, BlinkMacSystemFont, sans-serif`); UI labels, descriptions, nav, dialogue. Ships tabular numeric figures.
  - Number — **JetBrains Mono** (`'JetBrains Mono', 'Fira Code', 'Consolas', monospace`); every resource count, timer, statistic, big number. Apply via `.resource-number` with `font-weight: 500`, `letter-spacing: -0.02em`. Distinguishes 0/O and 1/l/I.
- **Text brightness levels (dark bg)**: primary `#E8ECF0`, secondary `#8B95A5`, muted `#4B5563`. Always `-webkit-font-smoothing: antialiased`.
- **Number formatting tiers (implement in order)**:
  1. Comma grouping under 1,000,000: `1,234,567`
  2. Suffix notation at 1M+: `1.23M`, `4.56B`, `789.01T`; after trillion use double-letter suffixes `aa, ab, ac … az, ba …` (Tap Titans convention)
  3. Scientific notation as a player option: `1.23e45`; offer Standard / Scientific / Engineering
  4. Always show 2 decimal places in abbreviated forms (`1.23M`, never `1.2M` or `1.234567M`) to prevent width jitter
- **Number libraries**: `break_infinity.js` (numbers > `Number.MAX_VALUE` ~1.8e308), `@antimatter-dimensions/notations` (ready-made formatters), `break_eternity.js` (tetration-scale only).
- **Number animation**: prefer linear interpolation (10% lerp per frame via `requestAnimationFrame`) over CountUp-style. Animate resource totals & milestone counters; **snap** (don't animate) per-second rates and values updating >5×/sec.
- **Animation perf constraints**: animate only `transform` and `opacity` (GPU-composited). Limit concurrent animations to 20–30 elements. Use `will-change: transform` sparingly. Always provide `prefers-reduced-motion` fallback disabling non-essential animation.
- **Canonical navigation = sidebar grid** (see Navigation section). Progressive tab-unlock schedule is **intended design**.
- **Activity design tokens** are verified accurate against `src/app/styles/activityDesignTokens.ts` (`ACTIVITY_DESIGN`).

## Color system

The Jade Mountain palette assigns each game section a distinct accent color so players orient by color (spatial wayfinding). Each accent is genre-authentic: jade teal for cultivation/spiritual energy, cinnabar red for combat/tribulations, imperial gold for resources/Golden Core, emerald for vitality, soft violet for quests/story, sky blue for travel, lotus pink for lifestyle, moon silver for stats.

Surfaces use a "mist" hierarchy of semi-transparent white overlays on a near-black base (`#0B0F14`) rather than hard-coded grays, so panels stack into natural depth. Accent color is applied sparingly — only to the page-title underline or icon, the primary action button, the active navigation indicator, and a 3px colored left border on cards. The remaining ~90% of the UI stays neutral. Section accents are driven by CSS custom properties keyed off a `[data-section]` attribute.

Cultivation realms carry their own color progression (silver-blue → teal → gold → violet → blue → indigo → emerald → crimson-gold gradient), used for prestige-layer theming and for breakthrough color-scheme shifts where CSS custom properties transition over ~1s to the new realm's palette.

## Typography

Three fonts, each with a distinct role. **Cinzel** (classical serif, gravitas of ancient texts) for display: realm names, section titles, game title — used at `1.875rem`+ with uppercasing and letter-spacing for realm names. **Inter** for body text (labels, descriptions, navigation, dialogue) — chosen for dark-background readability and built-in tabular figures. **JetBrains Mono** for all numeric content (resource counts, timers, statistics) — monospace alignment and unambiguous glyphs for data-dense displays, applied via a `.resource-number` class.

Dark-background text uses three brightness tiers: primary `#E8ECF0`, secondary `#8B95A5`, muted `#4B5563`, always with antialiased smoothing. `LXGW WenKai TC` is an optional calligraphic CJK display font that can substitute for Cinzel for authentic xianxia typography with full CJK coverage.

## Number formatting

Number display is treated as a first-class design concern. Implement formatting in four tiers: comma grouping below 1M, suffix notation (`1.23M`/`4.56B`/`789.01T`, then double-letter suffixes past trillion), scientific notation as an opt-in player setting (offering Standard / Scientific / Engineering covers ~95% of preference), and always 2 decimal places in abbreviated forms to keep container widths stable.

For extreme scaling, `break_infinity.js` handles values beyond `Number.MAX_VALUE`; `@antimatter-dimensions/notations` provides ready-made formatters; `break_eternity.js` is reserved for tetration-scale numbers. For motion, use lightweight linear interpolation (10% per frame toward target) on resource totals and milestone counters; snap rather than animate fast-changing values (>5 updates/sec) and per-second rates. Milestone gains can use CSS floating-number popups (translate Y −60px, fade 1→0 over 1s, color-coded, `pointer-events: none`, object-pooled to ~15 max).

## Animation tiers

Only `transform` and `opacity` are animated (GPU-composited, no layout recalc). Concurrent animations are capped at 20–30 elements, `will-change` used sparingly, and a `prefers-reduced-motion` fallback always disables non-essential motion.

**Tier 1 — immediate (~30 min each):**
- Button press feedback: `transform: scale(0.95)` on `:active`, 50ms transition.
- Breathing glow on actionable elements: 2s `ease-in-out infinite` cycling `box-shadow` intensity (e.g. "Advance Day" when time is allocated).
- `font-variant-numeric: tabular-nums` to stop number jitter (one CSS line).
- Progress-bar stripe animation: diagonal repeating-gradient moving via `background-position`, 1s linear infinite, on active progress bars.

**Tier 2 — first sprint (1–3 h each):**
- Floating number popups (CSS keyframe, translateY −60px + fade over 1s, green/red color-coded, object-pooled).
- Progress-bar completion flash: 0.5s brightness pulse (`filter: brightness(2)` → `brightness(1)`) + glow expansion.
- Tab unlock animation: 0.3s scale 0→1 `ease-out` + "NEW" badge auto-dismissed on first visit + confirming toast.
- Number interpolation (lerp) for primary resource displays.

**Tier 3 — polish (2–5 h each):**
- Prestige/rebirth ceremony: button pulse → 0.5s white screen flash → clip-path circle wipe → confetti burst → new UI fade-in. Duration inversely scales with prestige frequency (first rebirth full ~2.5s; after 10th abbreviate to ~0.3s; auto-prestige none). Use `canvas-confetti` (~6KB).
- Color-scheme shift on breakthrough: transition CSS custom properties over 1s to the new realm palette.
- Screen shake for major events (tribulation, breakthrough, boss) — ~0.4s translateX alternation keyframe.
- Ambient particle effects (tsParticles), particle count under 50, tied to current realm color.

## Navigation

The **sidebar grid is the canonical navigation layout**. (A horizontal tab bar below the top bar was considered as an alternative and is rejected.) The nine pages group semantically: Core loop (Explore · Activities · Travel), Character (Inventory · Stats · Lifestyle), Progress (Quests · Story · Recap).

Progressive tab disclosure is **intended design** — the game starts gated and reveals tabs as milestones are hit. (The current code starting mostly all-unlocked is an interim state, not the target.) Locked tabs are completely hidden, not grayed out, creating genuine surprise; scope can be hinted without spoilers (e.g. "3/7 areas discovered").

**Intended progressive unlock schedule:**

| Milestone | Tab unlocked | Sidebar addition |
|-----------|-------------|-----------------|
| Game start | Explore, Activities | Age, HP, Satiety |
| First item found | Inventory | — |
| First day completed | Stats | Money, Income/Expenses |
| Second location discovered | Travel | — |
| First quest offered | Quests | — |
| Age/cultivation milestone | Lifestyle | Housing, Meal Quality, XP Multiplier |
| First death/rebirth | Recap, Story (full) | Mortality indicator, full sidebar |

Keyboard shortcuts are expected: `1`–`9` or mnemonic letters (E/I/A/Q/L/T/S/R/Y), surfaced in tab tooltips. Notification dots appear on tabs with actionable content (unallocated time points on Activities, completable quest on Quests).

## Per-page layouts

Layout follows content type, not a uniform card grid — cards suit heterogeneous collections (quests) but waste space and flatten distinction for homogeneous data (stats, resources).

- **Activities (time allocation)** — slider/form control interface, not cards. Each activity row: name, slider/stepper, hour readout, outcome preview (`+$20` / `+12 XP`). Bottom summary bar shows proportional time split as a segmented color bar. Preset buttons ("All Work", "All Training", "Balanced") and loadout saving (3–5 presets). Zero-sum constraint enforced visually (linked sliders against Available Time Points). Show XP/day efficiency per activity and resource projections before committing.
- **Explore** — panel layout with section dividers. Full-width atmospheric location description, compact action-button grid below, discovery log as simple rows. Reads like a xianxia novel, not a dashboard.
- **Inventory** — grid of small item slots with icons; hover tooltip reveals details. Equipment via character silhouette with draggable slots.
- **Quests** — small cards (genuinely heterogeneous content) with colored left border by quest type, progress bar, reward icons; sort by completability.
- **Lifestyle** — inline toggle groups / radio selections by category (Housing, Meals, Transportation); cost and benefit on the same line per option.
- **Travel** — SVG node map (circles + connecting lines) with list-view toggle for accessibility. Discovered = full color + label; adjacent undiscovered = gray "?" silhouette; unknown = hidden. Current location = breathing glow. Travel cost shown as time points consumed, integrating with Activities. Fits one viewport initially, no pan/zoom until world expands.
- **Stats** — two-column table/definition list (stat name | value) grouped under category headers; bold key stats; show rate of change (`+2.3/day`).
- **Recap** — vertical timeline of previous lives; each life a collapsible section with headline stats (age reached, realm, cause of death, achievements).
- **Story** — clean text layout, generous margins, Cinzel headers + Inter body, minimal chrome, progressive text reveal.

## Sidebar design

The sidebar is the persistent stat monitor; rates of change matter as much as current values. Organize into three collapsible sections with subtle dividers:

- **Character** — Age as a lifespan progress bar (current/max), HP bar (current/max), Satiety bar with rate of change (`-5/day`), Mortality as a traffic-light indicator (green/yellow/red).
- **Economy** — Money in monospace, Income and Expenses on separate lines, Net as a color-coded delta (green positive / red negative). Housing and Meal Quality as compact labels.
- **Cultivation** — current realm, XP Multiplier, cultivation progress bar toward next breakthrough.

Principles: every stat with a rate shows that rate, color-coded; mini progress bars for HP/Satiety/Age/Lifespan are the most glanceable indicators; tooltips on every value reveal breakdowns; conditional display hides stats until mechanically relevant (XP Multiplier hidden pre-cultivation, Mortality hidden until relevant). On mobile, collapse to a pull-down drawer showing Age, HP, Money. The desktop sidebar should never require scrolling — if it does, tighten the hierarchy.

## Activity design system (verified vs activityDesignTokens.ts)

Unified tokens (`ACTIVITY_DESIGN`) for consistent activity representation across cards, queue lists, and the bottom queue bar. Import from `src/app/styles/activityDesignTokens.ts`.

**Icon sizes**: Card `w-4 h-4` (16px); Queue `w-3 h-3` (12px); Queue Bar `w-3 h-3` (12px). Cards are primary UI and get larger icons; queue items are compact.

**Typography**:

| Element | Class | Usage |
|---------|-------|-------|
| Card Name | `text-xs font-semibold` | Activity cards |
| Queue Name | `text-xs` | Queue list items |
| Level Badge | `text-[10px] font-bold text-accent-gold` | All contexts |
| Time | `text-[10px] text-slate-500 font-mono` | All views |
| Completions | `text-[10px] text-slate-600 font-mono` | x{count} indicator |
| Allocation | `text-xs font-mono font-bold` | Hours allocated |

Mono font for numeric values (time, counts), sans-serif for names.

**Spacing** — Activity cards: padding `px-3 py-2`, main gap `gap-3`, inner gap `gap-1.5`. Queue items: padding `px-2 py-1`, gap `gap-2`. Cards use ~1.5× the spacing of queue items.

**Progress bars** — Allocation bar (top): height `0.5px` (`h-0.5`), track `bg-slate-800/50`, fill category-colored and striped when active. XP bar (bottom): height `1.2px` (`h-[1.2px]`), track `bg-slate-800/30` (always visible, full width), fill foil-shimmer gradient growing 0–100%, shimmer size `400% 100%`, animation `6s linear infinite`.

**States & transitions** — Running: cards intensify border color (`border-l-3`), queue darkens background + pulsing dot. Hover: cards `hover:bg-card/50`, queue `hover:opacity-100`. Transition timings: standard `300ms` (meaningful state changes), quick `150ms` (hover), allocation `300ms` (progress fills).

**Effects display** — icon size `12px`, gap `gap-1` (4px), `font-mono` for values; currency and stat icons use consistent 12px size.
