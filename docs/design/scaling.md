---
purpose: Intended progression and scaling math (cost/production curves, prestige formulas, softcaps, big-number libs, per-phase pacing) for the four-phase cultivation idle game
status: draft
last-verified: 2026-05-30
related: [docs/design/core-loop.md]
---

> NOT IMPLEMENTED. Everything below is design intent from `docs/design/scaling.md`. None of these formulas, exponents, growth rates, softcaps, or library choices exist in the codebase yet. Status = draft/intended.

## Key facts

### Core principle
- Costs must grow faster than production. Exponential costs eventually outpace any polynomial production function regardless of exponents — this asymmetry forces prestige resets and is the entire genre's engine. Maps onto xianxia: tribulation barriers force reincarnation cycles.

### Cost scaling formulas
- Linear (early game only): `cost(n) = base + n × increment`. For first few mortal upgrades; trivial once multiplicative systems appear.
- Exponential (workhorse): `cost(n) = base_cost × growth_rate^n`. **growth_rate sweet spot = 1.07–1.15.** Cookie Clicker 1.15, AdVenture Capitalist 1.07, Clicker Heroes 1.07. Examples: Qi Refining `cost = 10 × 1.10^level`; Foundation Establishment `cost = 1000 × 1.12^level`.
- Bulk-buy cost: `bulk_cost(n) = base × rate^owned × (rate^n − 1) / (rate − 1)`.
- Max-affordable: `max_buyable = floor(log_r(currency × (r − 1) / (base × r^owned) + 1))`.
- Super-exponential (prestige-forcing walls): `cost(n) = base × rate^(n²)` (quadratic exponent); `cost(n) = base × rate^(rate^n)` (double exponential).
- AD reference: after Break Infinity, dimension costs gain ×10 multiplier per purchase on top of exponential (reducible to ×2 with upgrades). Galaxy costs three tiers — normal linear `80 + galaxies × 60`; distant quadratic penalty adds `(galaxies − 99)² × 2` above 100 galaxies; remote exponential base `1.002^galaxy` above 800.
- Cosmic phase double-exponential (Exponential Idle style): `cost = 2^(2^(a×(level−1) + b))`.

### Production functions
- Standard model (Cookie Clicker / AdVenture Capitalist): `income = Σ(count_i × production_base_i × multipliers_i)`. Linear in count, stacked multipliers.
- Derivative chain model (Antimatter Dimensions): `d(Dim_n)/dt = Dim_{n+1} × tickspeed_multiplier`; `d(Currency)/dt = Dim_1 × tickspeed_multiplier`. Higher-tier generators produce lower-tier ones (8th → 7th → ... → 1st → Antimatter). With m active tiers, production grows roughly as `t^m/m!` — polynomial approximating exponential, but bounded so exponential costs eventually win.
- Cultivation mapping: Body Cultivation → Qi, Spirit → Body efficiency, Soul → Spirit efficiency. Each new realm adds a derivative layer.

### Multiplier stacking
- Additive: `total = base × (1 + bonus_1 + bonus_2 + ...)`. Diminishing marginal value. Use for minor passives.
- Multiplicative: `total = base × (1 + bonus_1) × (1 + bonus_2) × ...`. Independent value per source; the standard for most systems.
- Exponential: `total = base^(1 + sum_of_bonuses)`. Very powerful, needs softcaps; reserve for prestige-layer interactions.

### Softcaps / hardcaps
- Power softcap (most common): if `value ≤ threshold` then `effective = value`; if `value > threshold` then `effective = threshold × (value / threshold)^power` with `power < 1`. Example threshold=100, power=0.5: raw 400 → `100 × (400/100)^0.5 = 200`. Modding Tree defaults: softcap start 1e7, power 0.5.
- Logarithmic softcap (aggressive): `effective = cap + log(value / cap) × scale`. Doubling past cap gives same fixed increment.
- Layered softcaps (AD style), applied sequentially: `value_1 = softcap(raw, 1e10, power=0.8)`; `value_2 = softcap(value_1, 1e20, power=0.5)`; `value_3 = softcap(value_2, 1e50, power=0.25)`. AD Time Dilation raises all dimension/tickspeed multiplier exponents to `^0.75` (softcap on the exponent itself): a 1e10000 multiplier becomes 1e1000.
- Exponential decay toward maximum: `effective = max_value × (1 − e^(−C × input))`. Approaches `max_value` asymptotically; tunable via C and max_value. For hidden stats: `effective_luck = 0.99 × (1 − e^(−0.001 × karma_points))`.

### Prestige reward formulas
- AD Infinity Points: `IP = 10^(floor(log₁₀(antimatter)) / 308 − 0.75)`. The 308 divisor: every extra factor of 10^308 antimatter yields ×10 more IP. Time Study 111 drops divisor to 285. At Infinity (1.79e308) ≈ 1.778 IP.
- AD Eternity Points: `EP = 5^(floor(log₁₀(IP)) / 308 − 0.7)`. Flatter than IP. Each prestige layer applies root/log compression to the previous layer.
- Prestige formula spectrum (game | formula | input | exponent | earn-to-double):
  - Realm Grinder | `(√(1 + 8c/10¹²) − 1) / 2` | max currency | ~0.5 | 4×
  - AdVenture Capitalist | `150 × √(c/10¹⁵)` | lifetime | 0.5 | 3–4×
  - Cookie Clicker | `∛(c/10¹²)` | lifetime | 0.333 | 8×
  - Egg, Inc. | `(c/10⁶)^0.14` | this run | ~0.14 | 128×
  - AD (IP) | `10^(log₁₀(c)/308 − 0.75)` | this run | ~1/308 of log | 10^308× for 10×
- Higher exponent (0.5) → push runs rewarded; low exponent (0.14) → grind runs rewarded.

### Per-phase prestige exponents (THE key per-phase numbers)
- Mortal/Wuxia (karmic merit): exponent **~0.4**. `karma = (lifetime_qi / 10⁶)^0.4`. Earn-to-double ~6×. Frequent reincarnation.
- Immortal Cultivation (dao comprehension): exponent **~0.3**. `dao = (lifetime_spirit / 10¹²)^0.3`. Earn-to-double ~10×. Longer cycles.
- Supreme Ascension (heavenly merit): exponent **~0.2**. `merit = (lifetime_dao / threshold)^0.2`. Earn-to-double ~30×.
- Cosmic Cultivation (primordial essence): exponent **~0.15**. `essence = (lifetime_merit / threshold)^0.15`. Earn-to-double ~100×+. Eon-scale.
- Progression slows earn-to-double from ~6× (mortal) to ~100×+ (cosmic).

### Per-phase cost/production summary
- Mortal/Wuxia (runs ~80 min): cost exponential rate 1.08–1.12 (`cost = base × 1.10^level`); production standard additive/multiplicative `Qi = (base_rate × technique_level) × meditation_mult × spiritual_root_mult`; transition wall = super-exponential Immortal Tribulation no mortal Qi can overcome.
- Immortal Cultivation (runs ~hours): cost steeper exponential rate 1.12–1.18 + polynomial components; production derivative chain `d(Qi)/dt = Spirit_level × technique_mult × tickspeed`.
- Supreme Ascension (runs ~days): cost super-exponential `cost = base × rate^(level^1.5)` + galaxy-style tiered scaling; production full derivative chain + cross-realm synergies with layered softcaps `^0.8` above 10¹⁰, `^0.5` above 10²⁰, `^0.25` above 10⁵⁰.
- Cosmic Cultivation (runs ~weeks): cost double-exponential `cost = 2^(2^(a×level + b))` or tetration; production maximal derivative chain + cross-phase synergies; Time Dilation equivalent reduces all multiplier exponents to `^0.75`.

### Reference-game prestige formulas
- Progress Knight XP: `xp_to_next_level = 100 × (level + 1) × 1.01^level` (doubles ~every 70 levels). Reincarnation bonus: `multiplier = 1 + maxLevel / 10` (only rises when surpassing previous record). Concentration/meditation interaction: `boost = (1 + 0.01 × conc_level) × (1 + 0.01 × med_level)`. Cultivation template: `dao_multiplier = 1 + (max_realm_reached × realm_weight) / 10`.
- Increlution dual-track: generation levels (temporary, reset on death) ×1.05/level, XP base 9.9, geometric growth base ~1.11; instinct levels (permanent) ×1.01/level, XP base 25, geometric growth base ~1.02. XP quadratic in time: `X(t) ≈ E × m × t² / (2x)` (doubling time → 4× XP, rewards specialization).
- The Prestige Tree (TMT) three formula types: "normal" `gain = (baseResource / requires)^exponent` (Prestige layer = `√(points / 10)`); "static" `cost = base^(total^exponent)`; "custom" dev-defined.

### Big-number libraries
- **break_infinity.js**: numbers up to **1e(9×10¹⁵)**, stores mantissa + exponent separately (`value = mantissa × 10^exponent`); drop-in for decimal.js, optimized for speed (15–17 sig digits). For Immortal/Supreme tiers.
- **break_eternity.js**: numbers up to **10↑↑10^308** (tetration towers), three-field `sign × 10↑↑layer(magnitude)` (Layer 0 = regular number, Layer 1 = 10^mag, Layer 2 = 10^(10^mag), ...). For Cosmic Cultivation.
- Number display by range: <1,000 plain; 1K–999T suffix (1.5M); 10¹⁵–10³⁰⁸ scientific (1.23e45); 10³⁰⁸–10³⁰⁰⁰ scientific (1.23e1000); 10³⁰⁰⁰+ double scientific (ee3.5).

### Hidden stats / karma-luck loop
- `effective_luck = max_luck × (1 − e^(−0.001 × karma))`
- `breakthrough_chance = base_chance × (1 + effective_luck)`
- `treasure_quality = base_quality × (1 + 0.5 × effective_luck)`
- `spiritual_root_floor = min_root + (max_root − min_root) × effective_luck^0.5`
- 1000 karma ≈ 63% max luck; 3000 karma ≈ 95%.

### Grind vs push balancing
- Grind runs dominate: per-run-earnings currency + low exponent (Egg Inc. 0.14).
- Push runs dominate: max-achievement currency (Realm Grinder) or high exponent.
- Both-viable design: `base_karma = (this_life_qi / threshold)^0.4`; `breakthrough_bonus = max(0, (peak_realm − previous_peak_realm)) × bonus_per_realm`; `total_karma = base_karma + breakthrough_bonus`.
- Active vs idle reward ratio ~2–5× (e.g. active cultivation 3× Qi/sec, auto-cultivation 1× Qi/sec).

## Why costs are exponential and production is polynomial

The genre's whole loop depends on one inequality: exponential beats polynomial in the limit. If production could keep pace with cost indefinitely, there would be no wall, no reason to reset, and no prestige. By keeping cost curves exponential (or super-exponential at phase boundaries) and production curves polynomial (even the AD-style derivative chain only *approximates* exponential via `t^m/m!`), the game guarantees a wall always arrives. In xianxia terms the wall is the tribulation, and the reset is reincarnation — the math and the fiction are the same object.

The growth-rate band 1.07–1.15 is the empirically-tuned zone where exponential costs feel steep but not punishing. Lower (1.07) gives gentle, grindy pacing; higher (1.15) makes each purchase a noticeable commitment. The design pushes rate upward as phases advance (1.08–1.12 mortal → 1.12–1.18 immortal → super-exponential beyond) so each phase feels heavier than the last.

## Why the derivative chain maps to cultivation realms

The AD derivative chain — where tier n+1 produces tier n — produces polynomial-but-accelerating growth. Each newly unlocked tier adds a derivative, so production goes from linear to quadratic to cubic and so on. Mapping Body → Qi, Spirit → Body, Soul → Spirit means each unlocked realm literally adds an acceleration term, making each breakthrough feel transformative rather than incremental. This is also why production stays sub-exponential: the chain can be deep but never overtakes the exponential cost wall.

## Why prestige exponents shrink across phases

Each prestige layer applies a compression (root/log) to the previous layer's output. A fractional exponent like 0.4 means lifetime Qi has to grow 6× to double karma; an exponent of 0.15 means lifetime merit must grow ~100×+ to double essence. Shrinking the exponent from 0.4 (mortal) to 0.15 (cosmic) deliberately lengthens the earn-to-double ratio, which is what stretches run lengths from ~80 minutes to weeks. The cascading compressions also keep the numbers bounded so a big-number library is sufficient rather than necessary at every tier.

## Why softcaps exist and which kind to use where

Softcaps are the brakes against runaway inflation from stacked multipliers. Power softcaps (`^power`, power<1) give a gentle, never-ending taper — good for stat bonuses you still want to reward. Logarithmic softcaps impose a near-hard ceiling — good for single-lifetime Dao comprehension or stacking identical techniques. Layered softcaps stack power softcaps at escalating thresholds for a smooth deceleration instead of a cliff. The most elegant ceiling, per AD's Time Dilation, is softcapping the *exponent* (`^0.75`) rather than the value, because it tames astronomically large numbers (1e10000 → 1e1000) without feeling like a wall.

## Why big-number libraries are required

Runs span ~80-minute mortal lives to week-long cosmic epochs, so values will exceed JS's native 1.79e308. break_infinity.js (mantissa+exponent) covers up to 1e(9×10¹⁵), enough through Supreme Ascension. break_eternity.js (tetration, sign × 10↑↑layer(magnitude)) covers up to 10↑↑10^308 for the Cosmic phase. Display should evolve with scale and be given narrative anchors ("enough Qi to shatter a continent" over "1.5e47 Qi") because xianxia cosmology already provides mortal / earth-immortal / heavenly-immortal / primordial scale references.

## Why hidden stats use exponential decay

Karma and luck are softcapped meta-multipliers feeding probabilistic outcomes. The `max_luck × (1 − e^(−C × karma))` form guarantees karma always helps but never reaches certainty (asymptotic to max), preserving roguelike variance per life while still giving long-term meta progression. The decay constant 0.001 sets the curve: ~63% of max at 1000 karma, ~95% at 3000.

## Why grind and push runs must both stay viable

Pure per-run + low-exponent rewards encourage spamming short resets; pure max-achievement rewards encourage marathon pushes. The intended hybrid gives a reliable floor (`base_karma` from this life's Qi) plus a disproportionate `breakthrough_bonus` only when a new peak realm is reached. This simultaneously prevents the "never prestige" trap (bonuses are multiplicative, so they matter) and the "always prestige immediately" trap (bonus is tied to peak achievement, not the act of resetting), and it gives the player a natural optimal-reset signal: push until a new realm, then reincarnate.

## Phase transitions as new games sharing a save

Each macro phase should feel like a different game on the same save file (Universal Paperclip precedent). Previous currencies may become irrelevant (mortal Qi → Celestial Qi) provided new systems are compelling and at least one resource (karma/dao) persists across phases as a multiplier. The retention rule from AD/TMT: automate the old layer when the new one unlocks, shifting strategic depth upward each transition (mortal Qi farming auto-runs once Immortal Cultivation begins). Dramatic transition events make phase shifts feel earned. The recurring pitfalls to engineer against: runaway inflation (layered/exponent softcaps), dead zones (multiplier milestones every 25/50/100 units; flag if time-to-next-event exceeds 2–3× the running average), prestige traps, and the xianxia "wall of text" problem (progressive disclosure + a glossary for terminology).
