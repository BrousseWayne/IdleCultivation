# Phase B — Synthesis & Proposed Scaling Model

**Provenance convention (per the evidence standard):** every quantitative claim below is tagged either
- **`[PA: <tag>]`** — grounded in the Phase-A corpus, carrying that game's original source tag (SOURCE/WIKI/COMMUNITY/INFERRED); or
- **`[DESIGN]`** — our own design choice. Grounded in reasoning but *not* found in any reference game. Absolute scales flagged `[DESIGN — scale free]` are arbitrary units; only the **ratios** are load-bearing.

No number appears that isn't one of these two.

---

## Part 1 — Cross-game patterns (Q1–Q10)

**Q1 — Per-activity output-per-level.** The corpus converges on a striking point: reference games rarely put an explicit asymptote on a *single* activity's output multiplier. The diminishing-returns *feel* comes from the **XP-requirement curve** compounding (PK `1.01^n` [PA: PK SOURCE], Increlution rising per-level XP [PA: COMMUNITY]), not from an output softcap. Where a per-action mastery span exists and is measurable — Melvor's Mastery — it's modest, roughly ×1.5–2 of yield across the full 1→99 range [PA: Melvor WIKI]. The clean exponential-saturation form we're proposing appears in *no* game; games favour power/root softcaps. **Which end fits us:** a bounded, asymptotic per-activity multiplier is *more aggressive* diminishing-returns than any reference game applies to one skill — which is exactly what "grinding one activity plateaus" demands. Magnitude of the span should stay small (Melvor's ×1.5–2 is the empirical anchor; our `cap=2` → veteran ×3 sits just above it, defensible).

**Q2 — Tier dominance.** Unanimous finding: **no game codes a tier-dominance invariant.** Dominance is engineered empirically via large base gaps — PK Arcane steps ×10/tier, Common ×2–5/tier [PA: PK SOURCE]; Clicker Heroes DPS:cost ratio climbs 10:1 → 28,113:1 [PA: CH WIKI]. There is genuine *overlap* during transitions in AD/Realm Grinder (a maxed lower tier can briefly beat a fresh higher one). **Which end fits us:** we want the *stricter* explicit invariant, because "unlocking the next tier is always the real lever" is a stated pillar. The corpus tells us the price: the invariant is only satisfiable if base steps exceed `(1+cap)` — PK's ×2 steps would *violate* it at `cap=2`, its ×10 steps satisfy it comfortably.

**Q3 — Persistent-across-runs progression.** Strongest-precedented lever in the whole audit. Two twins do exactly what we want: **PK** attaches a permanent per-task multiplier `1 + maxLevel/10` keyed to all-time max level [PA: PK SOURCE], and **Increlution** persists instinct levels at ×1.01 each, "shifting the XP curve by 2.5 levels per instinct level" [PA: COMMUNITY]. Both attach the bonus to the *same activity* (per-activity memory) — our model precisely. The rest of the genre uses a global prestige multiplier instead. **Which end fits us:** per-activity memory (PK/Increlution), optionally layered with a global merit-fed term. The critical balance insight the corpus surfaces: these are **XP multipliers**, not output multipliers — they compress time-to-plateau without raising the plateau.

**Q4 — Reward randomness / variance.** Decisive negative result. Many games use RNG rewards — Melvor drop tables & doubling [PA: Melvor WIKI], Clicker Heroes primal spawns [PA: CH WIKI], Cookie golden cookies [PA: CC WIKI], Egg drones [PA: Egg WIKI] — and in **every single case progression raises the mean / expected reward. Not one reduces variance.** **Which end fits us:** none of them. Variance-reduction begging is unprecedented; we design it fresh (Part 2) and flag it as an invention (Part 4).

**Q5 — Prestige gain formulas.** Exponents cluster tightly in **0.14–0.5**: Cookie cube-root 0.33 [PA: CC WIKI], AdCap/Realm square-root 0.5 [PA: AdCap/Realm WIKI], Egg banded 0.15→0.21 [PA: Egg WIKI], AD log-based [PA: AD WIKI]. Input basis splits: lifetime-total (Cookie, AdCap), this-run (AD, Egg), all-time-max (PK). Earn-to-double follows mechanically from the exponent (sqrt→4×, cube-root→8×, Egg-top→~26×). **Which end fits us:** the draft's mortal `0.4` sits between cube-root and sqrt, giving earn-to-double `2^(1/0.4) = 5.66×` — which matches the draft's own "~6×" target exactly. Internally consistent; keep it. This-run input basis (each life judged on its own deeds) is the most thematically apt and matches Egg/AdCap.

**Q6 — Cost curves.** The **1.07–1.15 band is confirmed** for the per-unit-building canon — Cookie 1.15 [PA: CC WIKI], AdCap 1.07 [PA: AdCap COMMUNITY], Clicker Heroes 1.07 [PA: CH WIKI]. **But the caveat matters more than the confirmation:** our closest twin, PK, has *no* per-unit exponential — it uses flat tiered property expenses (~×7–12/tier) and the `1.01^n` XP requirement [PA: PK SOURCE]. **Which end fits us:** the mortal phase is queue/activity-based, not shop-based, so the 1.07–1.15 band does **not** apply yet. Mortal costs should be **magnitude-tiered** (steps indexed to the COIN table) plus a PK-style XP requirement. Reserve the 1.07–1.15 exponential for later phases when repeatable purchases appear, and AD's ×10-per-buy super-exponential for the cosmic big-number phase [PA: AD WIKI].

**Q7 — Softcaps / hardcaps.** Real games favour **power/root softcaps** — Modding Tree default `gain^0.5` beyond `e1e7` [PA: MT SOURCE], AD Time Dilation exponent `^0.75` [PA: AD WIKI] — applied to either the *value* (Modding Tree) or, aggressively, the *exponent* (AD). Milestone/checkpoint step-bonuses (Melvor mastery pool) are the other common form [PA: Melvor WIKI]. **Which end fits us:** our `m(L)` is a *value* softcap of the exponential-saturation kind — legitimate but uncommon; we pick it deliberately for its hard asymptote. For later-phase runaway control, AD's exponent softcap (`^0.75`) is the model.

**Q8 — Offline vs active.** Genre norm is capped offline accrual with active faster — Melvor computes elapsed time to a **24-hour cap** [PA: Melvor WIKI]; AD's Max-All and Clicker Heroes' active builds confirm active > idle, but **no universal 2–5× constant** was found in code. Increlution deliberately has *no* offline (the queue pauses) [PA: Increlution SOURCE-equiv]. **Which end fits us:** a queue game with ~80-minute lives shouldn't demand active presence. Recommend same-rate queue execution offline, capped (Melvor 24h precedent); the "active edge" is decision quality (re-planning, catching events), not a flat multiplier.

**Q9 — Big numbers.** Uniform ladder: native float → `break_infinity.js` (~1.8e308 ceiling) → `break_eternity.js` (AD, Prestige Tree) [PA: AD/MT WIKI/SOURCE], with scientific→named notation bands. **Which end fits us:** mortal copper values are tiny (tens to low thousands) — native numbers, no library. The library switch belongs to later phases as production crosses the ~1e15 safe-integer and ~1e308 float limits.

**Q10 — Anti-pitfall levers.** Three recurring mechanisms: **milestone cadence** (Melvor mastery-pool checkpoints [PA: WIKI], Clicker Heroes guaranteed primals at zones 100/110/120/130 [PA: WIKI]); **runaway control** (AD exponent softcap, Modding Tree `gain^0.5`); **prestige-trap avoidance** — persistent multipliers make each reset faster (PK max-level memory [PA: SOURCE], Realm Grinder "R1 ≈ half of R0" [PA: WIKI]), overspend warnings (AdCap angel-confirm dialogs [PA: WIKI]), and diminishing-prestige-rate that *encourages* frequent resets (Egg [PA: WIKI]). **Which end fits us:** all three map directly (detailed in Part 2's model and Part 3).

---

## Part 2 — Proposed mortal-phase model

### 2.1 `m(L)` — per-activity mastery multiplier

**Chosen form** (as drafted): a value-softcap with a hard asymptote.
```
m(L) = 1 + cap · (1 − e^(−L/τ))          →  asymptote 1 + cap
```
**Constants:**
- **`cap = 2`** (veteran ≈ ×3 novice). `[DESIGN]`, anchored to evidence: Melvor's measured per-action mastery span is ~×1.5–2 [PA: Melvor WIKI]; PK's within-run job multiplier reaches ×2–10 but is gated by reachable levels [PA: PK SOURCE/INFERRED]. `cap=2` sits just above Melvor's empirical ceiling and at the conservative end of PK — a "triple a novice" span that rewards grind without overtaking tiers. Dial to `1.5` (veteran ×2.5) if you want stricter dominance (see 2.2).
- **`τ = 12` levels.** `[DESIGN]`. Sets how fast the plateau bites: L=12 → 63% of span; L=24 → 86%; L=36 → 95%; L=60 → 99%. Most mastery lands by ~level 36, so grinding an activity past that is nearly flat — the intended plateau. Smaller τ = earlier plateau.

**Supporting XP curve** (needed for `L` to be meaningful; borrowed from PK, the closest twin):
```
xpReq(L) = xp₀ · (L + 1) · r^L          r = 1.02
```
`[DESIGN]`, extending PK's documented `1.01^n` form [PA: PK SOURCE]; `r` nudged to 1.02 for a slightly steeper mortal plateau. Tunable in `[1.01, 1.05]`.

**Sample values** (`cap=2, τ=12`): m(0)=1.00, m(12)=2.26, m(24)=2.73, m(36)=2.90, m(60)=2.99.

### 2.2 Tier-dominance inequality over COIN magnitudes

```
base(N) · (1 + cap)  <  base(N+1)
```
With `cap=2`: **`base(N+1) > 3 · base(N)`** — every magnitude step must strictly exceed ×3. `[DESIGN — invariant]`; grounded in the observation that PK's ×2 tier steps would *violate* this while its ×10 Arcane steps satisfy it [PA: PK SOURCE].

**Check against your placeholder table** (5, 20, 60, 200, 800): steps ×4, **×3**, ×3.33, ×4. The small→medium ×3 step is *exactly* the boundary — a maxed small activity (20×3=60) *ties* a novice medium (60), which is a tie, not strict dominance. **Fix:** widen to ×4 across the board (33% headroom), or drop `cap` to 1.9.

### 2.3 Re-based COIN table (subsistence anchor)

**Anchor law** (as drafted): *one day of begging ≈ one day of poor food*. So the subsistence unit `s` = mean beg reward = daily poor-food cost = the `trivial` magnitude. `[DESIGN]` — no reference game anchors to a subsistence cost (Part 4); PK's Beggar(5)/Tent(15) is structural coincidence, not documented intent [PA: PK INFERRED].

**Chosen scale:** `s = 10 copper/day`. `[DESIGN — scale free]` (absolute value arbitrary; keeps the whole mortal phase in readable 10s–1000s, native-number-safe, and leaves room below `trivial` for sub-subsistence items). Steps set to ×4 for tier-dominance headroom (2.2):

| magnitude | value (copper) | meaning |
|---|---|---|
| **trivial** | **10** | one day poor food = mean of one day begging = **subsistence unit `s`** |
| small | 40 | surplus of a day's honest low work |
| medium | 160 | a skilled day / small deal |
| large | 640 | a major transaction |
| windfall | 2560 | rare life-changing sum |

**Food sink headroom** (the design requires room for it): poor food = `trivial` = 10/day; better tiers of food naturally price at `small`/`medium` — leaving the surplus of honest work (small − food = 30/day) as the real economic engine, while a pure beggar breaks even at subsistence. The **Strength/Dexterity table (minor 1, moderate 3, major 8)** is independent of copper and untouched; its ×3/×2.67 steps are fine for a bounded two-stat system.

### 2.4 Begging variance model (our invention — Q4 gave no precedent)

A **Bernoulli** model that holds the mean and shrinks the spread — the *inverse* of the standard crit/drop RNG (which holds nothing and raises the mean). `[DESIGN — invention]`.

```
P(bad day | L) = (1 − p₀) · e^(−L/τ_v)          p₀ = 0.5,  τ_v = 10
p(L)           = 1 − P(bad day | L)              (success probability)
reward(good)   = s / p(L)                         reward(bad) = 0
```
**Properties:**
- **Mean is flat at subsistence for all L:** `E[reward] = p·(s/p) = s = 10`. Never a wealth engine. ✓
- **Variance collapses with mastery:** `Var = s²·(1−p)/p → 0` as `p → 1`. ✓

| level | P(bad) | good-day reward | outcome | sd (copper) |
|---|---|---|---|---|
| 0 (novice) | 0.50 | 20 | feast-or-famine: 20 or 0 | 10.0 |
| 10 | 0.18 | 12.3 | 12.3 (82%) or 0 | 4.0 |
| 30 (veteran) | 0.025 | 10.3 | ~10.3 (97.5%) or 0 | 1.6 |

A novice beggar starves half the time; a veteran reliably scrapes subsistence. Mastery buys *fewer catastrophic days*, never a raise. `τ_v = 10` keeps begging escapable-but-survivable — you don't *master* the gutter, you just stop starving.

### 2.5 Reincarnation XP-speed multiplier

**Headline form** (safe default):
```
xpSpeed = 1 + κ · ln(1 + M / M₀)          κ ≈ 0.35,  M = accumulated karmic merit
```
`[DESIGN]`, synthesised from the two documented twins — PK's `1 + maxLevel/10` [PA: PK SOURCE] and Increlution instinct ×1.01/level [PA: COMMUNITY] — with logarithmic damping.

**Karmic merit earned per life** (Q5 formula, this-run input basis like Egg/AdCap):
```
merit = floor( (coinThisLife / C_m)^0.4 )          C_m = 1000
```
`[DESIGN]`; exponent `0.4` is the draft value validated in Part 1. Illustrative: a competent first life (~30k copper) yields ~4 merit; a strong life (~300k) ~10; **earn-to-double = 5.66×** [PA: derived from exponent-cluster, Egg/Cookie/AdCap WIKI]. Set `M₀ ≈ 4` (one solid life).

**How it feeds the next run:** every activity's XP-per-rep is multiplied by `xpSpeed`, so later lives climb the `m(L)` curve faster, reach the plateau sooner, and reinvest freed time in higher tiers.

**Why it stays balance-safe (two guards):**
1. **`m(L)` is bounded.** Output ceiling = `base·(1+cap)` regardless of XP speed. Faster XP only *compresses time-to-plateau; it never raises the plateau.* This is the direct answer to "a life-3 player with accelerated XP must still face a meaningful curve" — the curve's *height* is unchanged; further progress must come from **tier unlocks**.
2. **Log damping.** `xpSpeed` caps around ×3–4 even after ~1000 lifetimes of merit (`κ=0.35`: M=100·M₀ → ×2.6; M=1000·M₀ → ×3.4). No runaway.

**Essential companion rule** (surfaced by the balance analysis, not optional): **tier unlocks must carry non-XP gates** — age windows, prior-tier completion, coin/stat thresholds, story beats — so acceleration deepens within-activity grind without collapsing the tier ladder. `[DESIGN]`, grounded in the stated constraint that acceleration "must not break within-life balance."

**Calibration spectrum** (the "which end fits" call is yours to playtest):
- *Safe (recommended start):* the log form above, max ~×4.
- *Stronger meta-axis:* `xpSpeed = 1 + κ·√(M/M₀)` or PK-linear `1 + Lmax_a/C` per activity — reaches ×10–17 like PK's real ×16.9 at maxLevel 159 [PA: PK SOURCE/WIKI]. **Only safe with robust non-XP tier gates in place.** Adopt after gating is validated.

*Diegetic framing:* accumulated karma sharpens instinct and talent across lifetimes — Increlution's instinct and PK's max-level memory made narrative.

---

## Part 3 — Four-phase skeleton

Exponents calibrated to the harvested 0.14–0.5 cluster [PA: Q5 WIKI], staged **downward** to stretch earn-to-double from ~6× to ~100×+ (the draft's intent). Immortal/Supreme/Cosmic rows are a **directional architecture sketch** — only the Mortal phase exists; later production models are grounded in the referenced patterns but not committed design.

| phase | time scale | cost growth-rate band | production model | prestige currency | exponent | earn-to-double | big numbers |
|---|---|---|---|---|---|---|---|
| **Mortal** | ~80-min lives | magnitude-tiered ×4 + XP-req `1.02^L` [PA: PK SOURCE] `[DESIGN]` | additive: Σ `base_a·m(L_a)` per scheduled hour | karmic merit | **0.40** | **5.66×** | native float |
| **Immortal** | years/centuries | per-unit **1.07–1.10** [PA: AdCap/CH WIKI] | ×-multiplier cultivation stacks (Realm-Grinder factional [PA: WIKI]) + qi resource | (next-tier merit) | **0.30** | **10.1×** | native float |
| **Supreme** | millennia | **1.10–1.15** (Cookie band [PA: CC WIKI]) + exponent softcap `^0.75` [PA: AD WIKI] | stacked-prestige multipliers (AD Infinity/Eternity [PA: WIKI]) | (ascension currency) | **0.20** | **32×** | `break_infinity.js` [PA: AD SOURCE] |
| **Cosmic** | eons | super-exponential **×10/buy** (AD dimensions [PA: WIKI]) + layered exponent softcaps | dimension-style production chains (AD 8-dim [PA: WIKI]) | (cosmic currency) | **0.15** | **101.6×** | `break_eternity.js` [PA: MT/AD SOURCE] |

Earn-to-double = `2^(1/exp)`. The exponent shrink is the intended lever: each phase makes prestige progressively grindier, stretching the meta-loop as timescales expand.

---

## Part 4 — Gaps & our inventions (plainly stated)

Where we're off the reference map, and how far:

1. **Variance-reduction begging — pure invention.** No reference game reduces variance with progression; *every* RNG system raises the mean instead [PA: Melvor/CH/Cookie/Egg WIKI]. Our Bernoulli hold-mean/shrink-spread model (2.4) has no precedent. Fully off-map.

2. **Subsistence anchoring — invention (near-precedent only).** No game pegs its economy to a survival/food cost. PK's Beggar/Tent proximity is coincidence, not documented intent [PA: PK INFERRED]. Anchoring the entire COIN table to daily food cost (2.3) is ours.

3. **Diegetic reincarnation-XP — semi-precedented.** The *mechanic* is on-map: PK max-level memory `1+maxLevel/10` [PA: SOURCE] and Increlution instinct ×1.01/level [PA: COMMUNITY] are direct twins. The **log-of-merit damping** and the **narrative-karma framing** are our synthesis. Mechanic borrowed; specific form and story ours.

4. **Coded tier-dominance invariant — invention.** No game *codes* `base(N)·(1+cap) < base(N+1)`; all engineer dominance via base gaps [PA: PK/CH INFERRED]. Enforcing it as a hard table constraint (2.2) is ours — though, happily, your placeholder magnitudes nearly satisfy it already.

5. **Asymptotic (exponential-saturation) mastery softcap — rare choice, not invention.** Games favour power/root softcaps [PA: MT `gain^0.5`, AD `^0.75` WIKI]. The bounded `1+cap·(1−e^(−L/τ))` value-softcap (2.1) is a legitimate but uncommon pick, chosen for its hard veteran ceiling.

6. **Prestige-exponent *shrink schedule* — partially off-map.** Each individual exponent (0.4/0.3/0.2/0.15) is grounded in a real game [PA: Q5 WIKI], but **no game stages a downward exponent across phases** — Egg actually ramps *up* (0.15→0.21) [PA: WIKI]. The staged shrink (Part 3) is our architecture, assembled from real point-values. **Playtest flag:** the cosmic 101.6× earn-to-double is at the grindy Egg-end of the spectrum — watch for reset fatigue there.

---
*End of Phase B. All quantitative claims carry a `[PA: …]` or `[DESIGN]` tag per the evidence standard; absolute copper/level scales are flagged scale-free where their value is arbitrary and only the ratio is load-bearing.*
