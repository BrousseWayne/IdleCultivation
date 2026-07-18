# Fresh-Eyes Exploration Map — 2026-07-18

Working notes from the Part-3 exploration mandate (new agent). Not a source-of-truth doc —
a map of flows, verified facts, findings, and held-loosely hypotheses with confidence levels.
Everything marked VERIFIED was confirmed in source or empirically (tests / simulate / browser).

## 1. The four flows, from memory (all traced in source)

**Tick.** `gameLoop` (module singleton, `setInterval` at 24×speed Hz) → `runTick()`:
`timeSystem` (ticks++, day roll every 24) → `activitySystem` (advance `runningTicks` on the
unit at `scheduleIndex`; on `timeCost` reached → `completeActivity`: level-scaled effects via
`EffectExecutor`, XP, `pushIncome`, `activity:completed`, `rollActivityOutcome`) →
`dayRollSystem` on roll (replay schedule if repeat, `UnlockEvaluator.checkAll`,
`rollDailyEvents`) → `agingSystem` (age +1 every 60 days vs module var `lastAgeDay`; death
when age ≥ lifespan: `hasFallen`, stop loop, `cultivator:death`) → emit `game:tick`.

**Activity.** UI `+` → `queueActivity` (rejects past 24h derived budget) → `pushUnit` (blocks
merge). Completion pays at the level held when the work was done; XP benefits the next one.
Rewards scale ×(1 + 0.1(level−1)), level ≈ √(xp/50), unbounded.

**Narrative event.** Eligibility = recurrence bookkeeping (`eventStore`) + optional placeKey +
`UnlockEvaluator.evaluate(conditions)`; chance via `rng.roll(CHANCE_PROBABILITY)`.
Interrupt/ambient roll at dawn (first eligible in data order wins, one per day, interrupts
shadow ambients); activityOutcome rolls on completion; dialogue binds to a place action
(takes priority over the action's plain effects). Non-ambient: recurrence consumed at fire,
loop stopped, `eventStore.active` set, steps walk via `goto` (compile-checked), choices gated
by `requires` + spend-cost affordability; resolve → clock resumes iff it was running.

**Save/boot.** `main.tsx`: registerContent → dev `validateContent` (throws) →
listeners/unlockables → `SaveManager.load` (v1 migration; restore iterates the persistence
manifest; unlock flags merge OVER data defaults) → autosave 30s → `bootRun` (fresh run:
reseed rng, opening narration, `startRun(orphan)`) → `gameLoop.start` (refuses if an event
holds the stage — mid-event reloads work). Reincarnate: stop, `resetAging`, `resetRunState`
(reseed + reset all 6 stores), clearSave, re-register unlockables, bootRun.

Load-bearing walls held everywhere I looked: stores never import stores; engine/services
orchestrate via `getState()` + EventBus; content through `define*` + `when`; randomness
through `rng`; run-scoped state through the manifest. Predictability test passes: I can say
where a feature should live.

## 2. Bugs found (evidence-backed)

> STATUS 2026-07-18 (same day, after "ok lets go"): B1, B2, B4, B5, B6 are FIXED and
> verified end-to-end in Chrome (aging stable across reload at day 100; death save +
> overlay restore + frozen clock + reincarnate; flush on tab-hide observed). B3
> (training unlock path) is a content-design decision — still open below.

- **B1 — Reload aging bug. VERIFIED empirically.** `lastAgeDay` is a module variable, never
  persisted, only reset by `resetAging()`. Any reload with saved `day ≥ 60` makes the first
  tick see `day − 0 ≥ 60` → spurious `incrementAge()`. Repro: save at day 100/age 13, reload
  → age 14 immediately (next legit aging was day 120). Each mid-life reload steals up to 59
  days (~1 real minute of a 48-minute life). Cleanest fix candidate: derive age from `day`
  (kill the module state) or persist `lastAgeDay` in the manifest.
- **B2 — Save-loss window. VERIFIED empirically.** Autosave every 30s, no save on
  `beforeunload`/`visibilitychange`, none on death. 30 real seconds = 30 in-game days. I lost
  18 days in play by navigating. Compounds with B1 (the reload that loses time also ages you).
- **B3 — `training` category unreachable. VERIFIED.** `INITIALLY_UNLOCKED = ["work"]`;
  standalone unlockables cover only study (age≥15) and social (STR≥20); no content carries
  `unlock_category: training`. `liftWeights`, `bodyConditioning`, `footworkDrills` are dead
  content; Dexterity is reachable only via `studyFormations` (readClassics×5).
- **B4 — `uncertain: true` has no variance behind it. VERIFIED.** Beg displays "+?" and pays a
  deterministic 100. No activity outcome touches `rng`. The UI promises fortune's whim; the
  engine pays a salary.
- **B5 — Unclamped spends outside `costs`. VERIFIED in source.** Only choice `costs` are
  affordability-gated (`isChoiceAvailable`); step-level `effects` or choice `effects`
  containing `spend_currency` execute unconditionally and `subtractCurrency` doesn't clamp →
  authored content can drive copper negative. Matters the day the batch lands.
- **B6 — `hasFallen` not in the persistence manifest. VERIFIED.** A save autosaved on the
  death screen reloads into a live game (no overlay) and re-dies via B1. Minor today.

## 3. Design-level findings

- **F1 — The economy has one axis and no consumer. VERIFIED by simulate.** Income policy:
  87.4M copper at death (age 60); training policy: 17.2M and STR 226k. Only sink: a 5-copper
  skewer that grants nothing. Stats gate two unlocks (social at STR 20) then do nothing.
  Levels only scale the same rewards. The mortal loop is currently monotone accumulation with
  no decisions after the first hour.
- **F2 — Activity amounts live OUTSIDE the tuning table. VERIFIED.** `balance.ts` claims to be
  "the single tuning table", but `activityData` carries raw amounts (beg 100/8h,
  networkMerchants 500/6h ≈ 83/h). The generation prompt tells the batch author "a full day
  of begging earns roughly one day of poor food" — wired reality is ~20–60 meals/day of beg.
  COIN.windfall (800) ≈ 1.5 days of level-1 mining. If the batch is imported against today's
  scale, every magnitude is noise. The economy re-base is a *prerequisite* of the batch
  import, not a later balancing pass. (Cheap first move: put activity amounts on the same
  balance table; decide the base scale in the scaling session.)
- **F3 — Interrupt ordering bias. VERIFIED in source.** One event/day, first eligible in data
  order, interrupts starve ambients. Fine at 1 event; with ~20, file order becomes a hidden
  priority system and common-chance day-1 interrupts fire ~every 5 real seconds while
  eligible. Post-import, worth a simulate pass on event pressure (the sim already resolves
  events via first-choice policy).
- **F4 — Mock content contradicts the fiction on live tabs. VERIFIED in browser.** The
  destitute 12-year-old starts owning Iron Sword / Leather Armor / Health Potion / Spirit
  Ring / Cultivation Manual (equipped weapon+armor!) on a visible Inventory tab. Recap shows
  a Sun–Sat 7-weekday grid over 30-day months, year = 2 months. Story unlocks at day 10 to an
  empty page — an unlock that reveals nothing, the inverse of the intended surprise.
  Travel's cosmic map is at least hidden.
- **F5 — Survival constants are stubs. VERIFIED.** `RESERVED_SLEEP_HOURS`,
  `DAILY_SATIETY_DRAIN`, `STARVATION_VITALITY_DAMAGE`, `DEFAULT_MEAL_ID/LODGING_ID` have zero
  consumers. survival-and-lifestyle.md is stale (last-verified 2026-06-02, still says "no
  event system").
- **F6 — The intro interview data is live but orphaned. VERIFIED.** `introDialogue` +
  `resolveBackground` sit in `data/intro.ts` with their only consumer in `_parked/elder-intro`.
  Every run is `orphan` via `DEFAULT_BACKGROUND`.
- **F7 — Meta-state plumbing note. VERIFIED.** Reincarnation = `clearSave()` (whole save
  deleted) + all-store reset. A meta layer needs either its own storage key or a manifest
  flag (`survivesReincarnation`) honored by both `resetRunState` and the reincarnation
  save-clear. The manifest is the natural seam; the clearSave-everything behavior is the one
  thing in its way.

## 4. Hypotheses, held loosely (confidence)

- **H1 (high).** Smallest honest survival slice: daily satiety drain + 2–3 standing diet
  tiers as recurring cost/boost + the first-night interrupt event (day-1, once). The wired
  event system covers the onboarding beat exactly as the doc hoped; only the upkeep runtime
  is missing (a `lifestyleStore` + one manifest entry + a drain in `dayRollSystem`).
- **H2 (medium).** The honest first meta-slice is *information, not multipliers*: a Record of
  Previous Lives (death recap rows + maybe first-fired-event memory) that survives
  reincarnation. Matches "information prestige" better than a karma currency, needs only the
  F7 plumbing, and makes the death screen a hook instead of a dead end. Event-sourcing feels
  premature for this slice — a plain meta section suffices; revisit when causes/multi-life
  conditions land.
- **H3 (medium-high).** Thread order: (1) economy re-base + B-fixes, (2) survival slice,
  (3) batch import, (4) scaling session with simulate, (5) meta slice. Rationale: the batch's
  first-night event belongs to survival; batch magnitudes need the re-based economy;
  importing 20 events then re-tuning twice is waste. This *reorders* the kickoff's list.
- **H4 (low).** At current pacing, `study` at age 15 (~3 real minutes) and social at STR 20
  (~10 completions of mineOre) make the first 10 minutes nearly decision-free once beg is
  queued. Suspect the first-hour curve needs the batch + survival before judging.

## 5. Open questions for the design dialogue

- What is copper FOR in a mortal life? (Sink design beyond upkeep: bribes, tuition,
  equipment, event choice-gates — the batch will create demand surface.)
- Should stats stay two-axis (STR/DEX) through the whole mortal phase?
- Training category: unlock path (event? completions? age?) — or is its absence intentional
  until a "first training montage" beat?
- Base economy scale: is "1 day of begging ≈ 1 day of food" the law (→ beg ≈ COIN.trivial),
  or is food deliberately trivial?
- Does the Recap calendar survive at all, or wait for the real Recap (previous-lives
  timeline) that meta-state enables?
