---
purpose: Canonical UI/UX and visual language reference — palette, typography, number formatting, animation tiers, navigation, per-page layouts, sidebar, and activity design tokens.
status: active
last-verified: 2026-06-03
related: [docs/design/roadmap.md]
---

## Key facts

- **Palette**: one consolidated set, single source of truth — `PALETTE` in `src/game/data/sectionColors.ts` mirrored by `--accent-*` / `--stat-*` in `globals.css`. Governing rule: **one hue = one meaning** (no hue does two jobs).
- **Reserved hues (state/system — never decorative)**:
  - jade `#5FB4A0` — positive + brand (active nav, primary action, income, healthy/full)
  - gold `#D4AF6A` — caution (mid HP/satiety, warnings)
  - cinnabar `#E07856` — negative (expense, hurt, hungry, death)
  - silver `#94A3B8` — money (single currency unit)
- **Free / wayfinding hues** (categories, places, stream themes):
  - violet `#B59ACF` — mind (study) · sky `#6BA3D4` — world/travel (work, hobby, life, places) · lotus `#D98AA8` — people (social) · indigo `#6E73C9` — body (training, adventure)
- **Dedicated stat palette** (separate from the 8 UI hues, `--stat-*`): Strength `#CB4B5F`, Dexterity `#7FB85A`.
- **Neutral ramp (one)** — tokens, not raw `slate-*`: text `--ink` `#E2E8F0` / `--ink-2` `#94A3B8` / `--ink-3` `#64748B`; surfaces `--panel-0` (deepest chrome, e.g. sidebar) / `--panel` (cards) / `--panel-2` (hover); borders `--line` / `--line-2`. Surfaces are dark translucent (not the old white "mist" overlays).
- **Accent usage rule**: ~90% neutral; color carries meaning (state, money, category wayfinding, active nav), never decoration. Nav: active = jade, inactive = muted; sidebar section bars are neutral. No per-section rainbow, no `[data-section]` mechanism.
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
  - Body — intended **Inter**, but `--font-sans` is currently **Crimson Text** (serif) in `globals.css`; UI labels, descriptions, nav, dialogue.
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

The palette is deliberately small and disciplined: **one hue = one meaning.** Four reserved hues carry state/system semantics and are never used decoratively — jade (positive/brand), gold (caution), cinnabar (negative), silver (money). Four free hues handle wayfinding only — violet (mind), sky (world/travel), lotus (people), indigo (body) — and map the activity categories onto four axes (study→violet; social→lotus; training/adventure→indigo; work/hobby/life→sky). Stats sit outside both groups in their own dedicated palette (Strength crimson, Dexterity green).

Single source of truth: `PALETTE` (hex) in `sectionColors.ts` is mirrored by the `--accent-*` / `--stat-*` CSS vars in `globals.css`; nothing else hard-codes accent hex. Neutrals are one slate-based ramp exposed as tokens (`--ink*`, `--panel*`, `--line*`) — components reference the tokens, not raw `slate-*` classes.

~90% of the UI stays neutral. Color appears only where it means something: state feedback, money, category wayfinding, the active nav item (jade). There is no per-section accent rainbow and no `[data-section]` switching — section/nav chrome is neutral with a jade active indicator.

Cultivation realms carry their own future color progression (silver-blue → teal → gold → violet → blue → indigo → emerald → crimson-gold gradient) for prestige-layer theming and breakthrough shifts — intended, not yet wired.

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
- **Stats** — definition-list rows. Attributes show as stat icon + descriptor word (no name/number), consistent with the sidebar. (Vitals — HP/Satiety/Mortality — still render as numeric bars here; a later vitals pass should word-ify them like the sidebar.)
- **Recap** — vertical timeline of previous lives; each life a collapsible section with headline stats (age reached, realm, cause of death, achievements).
- **Story** — clean text layout, generous margins, Cinzel headers + Inter body, minimal chrome, progressive text reveal.

## Sidebar design

The sidebar is the persistent status monitor. Sections have neutral header bars (no per-section color):

- **Status** — Age as a bare number (no lifespan; a mortal can't know when they die). HP and Satiety as qualitative **words**, not bars or numbers (Healthy…Near death / Full…Starving), toned on the reserved state scale jade → gold → cinnabar. Mortality is hidden for now.
- **Resources** — Money in silver monospace; Income (jade) and Expenses (cinnabar) on separate lines; Net as a color-coded delta.
- **Attributes** (shown once a stat > 0) — each stat as its dedicated-color icon + a qualitative descriptor word (`describeStat`: Strength Feeble…Mighty, Dexterity Clumsy…Fleet). No stat name, no number.

Guiding principle — **a mortal has no precise self-data.** Internal values (vitality, satiety, stats) read as words/icons; only external, countable things (coin, age) read as numbers. Numeric self-knowledge is a later reveal (a stable job / salary). Progressive disclosure hides sections until relevant.

## Activity rows

`ActivityRow` (`src/ui/components/`) is the shared row used by both Explore and Activities. (An older `ACTIVITY_DESIGN` token map exists at `src/ui/styles/activityDesignTokens.ts`; the live row no longer drives off it — category color comes from `CATEGORY_COLOR_CLASSES` / `getCategoryHex`.)

Row layout: category-colored icon · fixed-width activity **name** (so the level column aligns across rows) · visible **`Lv N`** · effect previews · time/allocation · −/＋ buttons. Borders and chrome use the neutral tokens (`border-line`, `hover:border-line-2`, `hover:bg-panel-2`); the running row takes its category's left-border color.

**Effect previews** encode the external/internal split:
- Currency reward — silver coin icon + numeric amount (coin is countable).
- Stat reward — the stat's dedicated-color **icon only**: no name, no number, no magnitude. A mortal can't quantify their own growth; numbers arrive with the later job/salary reveal.

There is **no** per-row completion counter (`×N`) — that data is still tracked (death recap, unlock conditions) but not shown.

**XP bar** (bottom of the row): a thin foil-shimmer fill growing 0–100% toward the next activity level.

## Queue bar

A sticky bar at the **top of the gamezone** (just under the header) — the active schedule is the first thing the player sees. Constant height in every state so the page never jumps: running shows the current activity (category-colored icon + name + hours remaining); idle/resting shows a moon + "Resting" with the same footprint. A segmented progress bar shows the day's schedule; a Trash button clears the schedule (`clearQueue`).
