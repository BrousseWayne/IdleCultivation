---
purpose: Canonical UI/UX and visual language reference — palette, ink-stone neutrals, glyph iconography, typography, number formatting, animation tiers, navigation (tabs), chrome layout (day bar, Self card, Thread drawer), per-page layouts.
status: active
last-verified: 2026-07-17
related: [docs/design/roadmap.md]
---

## Key facts

- **Palette**: one consolidated set, single source of truth — `PALETTE` in `src/game/data/sectionColors.ts` mirrored by `--accent-*` / `--stat-*` in `globals.css`. Governing rule: **one hue = one meaning** (no hue does two jobs).
- **Reserved hues (state/system — never decorative)**:
  - jade `#5FB4A0` — positive + brand (active nav, primary action, income, healthy/full)
  - gold `#D4AF6A` — caution (mid HP/satiety, warnings)
  - cinnabar `#E07856` — negative (expense, hurt, hungry, death)
  - silver `#AFBCCB` — money (single currency unit). Deliberately COOL-toned: against the warm ink-stone neutrals it reads metallic (moonlight silver). The old `#94A3B8` was Tailwind slate-400 — i.e. the old neutral itself — so money blended into the chrome.
- **Free / wayfinding hues** (categories, places, stream themes):
  - violet `#B59ACF` — mind (study) · sky `#6BA3D4` — world/travel (work, hobby, life, places) · lotus `#D98AA8` — people (social) · indigo `#6E73C9` — body (training, adventure)
- **Dedicated stat palette** (separate from the 8 UI hues, `--stat-*`): Strength `#CB4B5F`, Dexterity `#7FB85A`.
- **Neutral ramp (one)** — the "ink-stone" ramp: warm green-black, NOT blue slate. Text `--ink` `#E4E7E1` / `--ink-2` `#98A29A` / `--ink-3` `#5E6862`; surfaces `--panel-0` `#0D100E` (deepest chrome: header, tabs, drawer) / `--panel` `#121513` (cards) / `--panel-2` `#191D1A` (hover/wells); borders `--line` `#222724` / `--line-2` `#2E342F`; background `#0A0C0B`. Tokens, not raw `slate-*`; surfaces are opaque.
- **Accent usage rule**: ~90% neutral; color carries meaning (state, money, category wayfinding, active nav), never decoration. Jade is the ONLY accent with real presence (active tab, actionable, positive); category hues appear only as small marks (glyph tint, segment fills in the day bar) — never as chrome. Structural anti-clown guard: max 2 accents + neutrals per zone. No per-section rainbow, no `[data-section]` mechanism.
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
- **Canonical navigation = horizontal text-only tabs** under the queue bar (see Navigation section) — the earlier sidebar-grid canon is superseded. Chrome order top→bottom: header → queue/day bar → tabs → content + Self rail → Thread drawer. Progressive tab-unlock schedule is **intended design**.
- **Chrome iconography = calligraphic glyphs**, not an icon library: Unicode characters rendered as text in `--font-glyph` (LXGW WenKai TC, CDN in `index.html`; Kaiti fallbacks), tinted by their dedicated hue. Core set lives in `src/game/data/glyphs.ts`: 力 Strength · 敏 Dexterity · 文 Money (copper wen — mortal-phase currency; 兩 taels of silver reserved for future large sums) · 工 work · 武 training · 學 study · 交 social · 家 life · 藝 hobby · 險 adventure · 凡 Mortal rank · 己 Self. Content data carries its own glyph strings (`Place.glyph`, `PlaceAction.glyph`): places 巷 streets · 坊 labor yard · 市 market; actions 言 talk · 食 food. Page headers: 業 Activities · 囊 Inventory · 務 Quests · 家 Lifestyle · 途 Travel · 衡 Stats · 曆 Recap · 書 Story. Lucide survives ONLY as functional controls (play/pause, settings, trash, chevrons, +/−, X, lock, clock, check) and in `src/ui/proto/`.
- **Activity design tokens** (`activityDesignTokens.ts`) were removed with the ActivityRow redesign — activity styling now lives in the components + `sectionColors.ts`.

## Color system

The palette is deliberately small and disciplined: **one hue = one meaning.** Four reserved hues carry state/system semantics and are never used decoratively — jade (positive/brand), gold (caution), cinnabar (negative), silver (money). Four free hues handle wayfinding only — violet (mind), sky (world/travel), lotus (people), indigo (body) — and map the activity categories onto four axes (study→violet; social→lotus; training/adventure→indigo; work/hobby/life→sky). Stats sit outside both groups in their own dedicated palette (Strength crimson, Dexterity green).

Single source of truth: `PALETTE` (hex) in `sectionColors.ts` is mirrored by the `--accent-*` / `--stat-*` CSS vars in `globals.css`; nothing else hard-codes accent hex. Neutrals are one ink-stone ramp (warm green-black — the material of a xianxia inkstone, deliberately not the default blue-slate dark dashboard) exposed as tokens (`--ink*`, `--panel*`, `--line*`) — components reference the tokens, not raw `slate-*` classes.

~90% of the UI stays neutral. Color appears only where it means something: state feedback, money, category wayfinding, the active nav item (jade). There is no per-section accent rainbow and no `[data-section]` switching — section/nav chrome is neutral with a jade active indicator.

Cultivation realms carry their own future color progression (silver-blue → teal → gold → violet → blue → indigo → emerald → crimson-gold gradient) for prestige-layer theming and breakthrough shifts — intended, not yet wired.

## Typography

Three fonts, each with a distinct role. **Cinzel** (classical serif, gravitas of ancient texts) for display: realm names, section titles, game title — used at `1.875rem`+ with uppercasing and letter-spacing for realm names. **Inter** for body text (labels, descriptions, navigation, dialogue) — chosen for dark-background readability and built-in tabular figures. **JetBrains Mono** for all numeric content (resource counts, timers, statistics) — monospace alignment and unambiguous glyphs for data-dense displays, applied via a `.resource-number` class.

Dark-background text uses the ink ramp tiers (`--ink` / `--ink-2` / `--ink-3`), always with antialiased smoothing. A fourth face is live: **LXGW WenKai TC** as `--font-glyph`, used exclusively for the calligraphic glyph iconography (loaded from CDN in `index.html`, falling back to system Kaiti faces).

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

**Horizontal text-only tabs are the canonical navigation** (`src/ui/layout/TabsNav.tsx`), sitting below the queue/day bar. This supersedes the earlier sidebar-grid canon: the sidebar clashed nav with status data, looked empty at game start (2-3 unlocked tabs), and horizontal tabs + future subtabs is the proven pattern for endgame growth (Antimatter Dimensions). No icons in tabs — active tab is jade text + jade bottom border; locked tabs are completely hidden. The nine pages group semantically: Core loop (Explore · Activities · Travel), Character (Inventory · Stats · Lifestyle), Progress (Quests · Story · Recap).

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

## Self card (right rail) and Thread drawer

The old sidebar is gone; its two jobs split into two dedicated surfaces:

**Self card** (`src/ui/components/SelfCard.tsx`) — a framed card (`--panel` on the page background, `--line-2` border) in a persistent right rail (~w-72), capped by the 己 glyph + "SELF". It is the character sheet at a glance and has the full page height to grow (realm, qi, karma… as they unlock):

- Age as a bare number (no lifespan; a mortal can't know when they die). Body and Belly as qualitative **words**, not bars or numbers (Healthy…Near death / Full…Starving), toned on the reserved state scale jade → gold → cinnabar. Mortality is hidden for now.
- Money (文, copper wen, monospace) and Income (jade). Upkeep (cinnabar) renders only once real expenses exist — no fake `−0` line.
- Attributes (shown once a stat > 0) — stat glyph (力/敏 in dedicated color) + a qualitative descriptor word (`describeStat`). No number.

**Thread drawer** (`src/ui/components/ThreadDrawer.tsx`) — the global narrative stream lives in a bottom drawer on every page. Collapsed (default) it keeps a one-line **ticker** showing the latest entry — the game's voice never disappears — plus a chevron; expanded it shows the full `ThreadView` (filter chips, clear, scrollable log, ~h-56). The old per-page right-rail Stream and the Explore-inline thread are removed.

The drawer is also **the stage for narrative events**: when an interactive event fires, the drawer forces open (jade top border, event title in the bar), the clock pauses, the event text streams into the log, and the step's choices render as buttons under it — locked choices (`requires` unmet, unaffordable costs) stay visible but disabled.

Guiding principle — **a mortal has no precise self-data.** Internal values (vitality, satiety, stats) read as words/glyphs; only external, countable things (coin, age) read as numbers. Numeric self-knowledge is a later reveal (a stable job / salary). Progressive disclosure hides sections until relevant.

## Activity rows

`ActivityRow` (`src/ui/components/`) is the shared row used by both Explore and Activities. Category color comes from `CATEGORY_COLOR_CLASSES` / `getCategoryHex`; the category mark is its glyph (工/武/學/交…) tinted in the category hue.

Row layout: category glyph · fixed-width activity **name** (so the level column aligns across rows) · visible **`Lv N`** · effect previews · time/allocation · −/＋ buttons. Borders and chrome use the neutral tokens (`border-line`, `hover:border-line-2`, `hover:bg-panel-2`).

**Effect previews** encode the external/internal split:
- Currency reward — 文 glyph + numeric amount (copper is countable).
- Stat reward — the stat's dedicated-color **glyph only** (力/敏): no name, no number, no magnitude. A mortal can't quantify their own growth; numbers arrive with the later job/salary reveal.

There is **no** per-row completion counter (`×N`) — that data is still tracked (death recap, unlock conditions) but not shown.

**XP bar** (bottom of the row): a thin foil-shimmer fill growing 0–100% toward the next activity level.

## Queue bar — the day bar

Sticky directly under the header, **above the tabs** (game state outranks navigation chrome). The core idea: **the track IS the 24h day**, not just the queued time. Scheduled blocks render inside it — width = hours/24, solid category-hue fill for the done portion over an 14%-alpha pending tint, category glyph centered, ×N for merged units, glow on the active segment (segments too fast to read as a sweep pop full with a flash instead). The unscheduled remainder renders as empty track labeled "Nh free" — free hours are visible, not implied. Empty schedule shows "24h free — plan the day" centered in the track.

Top row: current activity name (category color) + duration, or "Resting / day's work done" past the end; right side shows `N queued · Xh · Yh free` and the Trash clear button. Constant height in every state so the page never jumps.
