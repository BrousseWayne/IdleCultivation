---
purpose: The reincarnation-driven core loop — how a run is structured, how time/aging/death work, and the gap between the intended two-layer state model and the current full-wipe reality.
status: active
last-verified: 2026-07-18
related: [docs/vision/identity.md, docs/architecture/architecture.md, docs/design/scaling.md]
---

## Key facts

- One run = one life. The player directs that life via choices, action queues, and event reactions. Death ends the run; reincarnation restarts it. The incremental game IS the reincarnation cycle. (vision)
- INTENDED — **information prestige**: the primary prestige reward is *knowledge*, not multipliers (Antimatter Dimensions structure: each layer teaches why the previous one exists). Mortal life teaches survival; immortal life teaches cultivation; higher realms teach why the mortal life actually mattered. Prestige chain: knowledge changes childhood → childhood changes destiny → destiny changes Heaven → Heaven changes reality → reality changes future prestiges.
- INTENDED — **Ironveil is the Root Realm**, never an obsolete tutorial. It is the causal origin of the reincarnation lineage; every prestige layer points back to it ("The Immortal World wasn't where I failed. I failed when I was twelve."). Ironveil is a puzzle that is never fully solved: new options appear across prestiges not because the city changed but because *the player* did ("What did the ox-cart elder whisper to you?").
- INTENDED — **incarnation choice as prestige start**: instead of "spend currency for starting bonuses", accumulated understanding lets the soul choose a different incarnation — born in Ironveil → a merchant family elsewhere → reincarnating with sect memories → descending as a heavenly fragment. The starting location is a cultivation choice, not a difficulty selector.
- INTENDED — **nested prestige layers**: Life → Death → Reincarnation → Cultivation → Ascension → Immortal World → Higher Heaven → Origin Realm → … Each layer reveals the previous one was incomplete; some late prestiges allow returning *further back* (because ordinary reincarnation into the Immortal World skips the mortal life whose causes turned out to matter).
- ENGINE CONSTRAINT (accepted 2026-07): the endgame simulates absurd magnitudes — hundreds of billions of years, whole sects/lineages generating in parallel, Antimatter-Dimensions-scale numbers. The tick-by-tick loop cannot scale there; the engine must eventually support **batched/closed-form time advancement** (compute N days analytically) and big-number arithmetic (`break_infinity.js`). The prerequisite is already held: a headless, deterministic, store-driven core whose tick loop is a swappable driver.
- INTENDED: Two state layers — **run state** (resets on death: vitality, age, inventory, realm, run-scoped stats) and **meta state** (persists forever: prestige currencies, permanent unlocks, hidden stats karma/luck/accumulated-choices). Next life is meant to be faster/richer because meta bonuses carry over. (vision)
- DECIDED (2026-07-19): the primary meta carry-over is **activity XP-speed** — reincarnation grants a persistent, across-runs multiplier on how fast activities accrue XP. This is **structural, not a bonus**: within a single life the progression curves are tuned to work *against* the player (one life does not finish the progression), so cross-run acceleration is the only thing that makes progress compound and lets later lives break walls a single life cannot — exactly the incremental-genre pattern (Progress Knight persistent multipliers, Increlution instinct levels). The tunable is the *rate* of acceleration, not whether it eventually overcomes a single life's wall (it is meant to). Feeds the scaling session — see scaling.md.
- CURRENT REALITY: There is **no meta-state layer**. `reincarnate()` wipes ALL state back to initial values and clears the save file. Nothing carries over between lives yet. The "bonuses carry over / next life is faster" promise is unimplemented. (gameStore.ts, gameEventListeners.ts, SaveManager.ts)
- INTENDED: Hidden stats (karma, luck, choices) are meta state shaping run variance invisibly. Not implemented — no such stats exist in the stores. (vision; absent in code)
- INTENDED: Run types — **grind runs** (set queue, go idle, farm a resource) and **push runs** (active play, reach new thresholds). The player picks the run's purpose. This is a design framing, not an enforced mechanic; there is no run-type flag in code. (vision)
- INTENDED: Automation-as-progression — automation unlocks progressively (disciples/formations diegetically), even in the mortal phase. Current code has a data-driven unlock system but no automation entities yet. (vision; UnlockEvaluator in code)
- CURRENT clock: the tick loop runs `24 ticks/sec * gameSpeed` via `setInterval`. 24 ticks = 1 day. 60 days = 1 year. (engine/gameLoop.ts)
- DECIDED (pacing session, 2026-07): this clock is the keeper — 1 day = 1 real second at ×1, life ≈ 48 min. No day/night cycle, no time-of-day mechanics (cut — unreadable at this speed). No routine-acceleration ("blur") for now. The year stays an abstract 60-day mortality counter (365 was rejected: days-per-year is a pacing dial, not calendar realism; revisit at 120 d/an only if seasonal content ever lands). DECIDED: **interactive events pause the clock** — the loop stops while an event demanding a choice is open, and resumes on resolution (passive announcements never pause). At 1 day = 1s, anything less would burn days while the player reads.
- CURRENT schedule: the activity `queue` is a **daily schedule** (an ordered plan), not a draining queue. A `scheduleIndex` tracks the running unit; on each day roll, if `repeatActivities`, the index resets to 0 and the plan replays. A plan shorter than 24h leaves the rest of the day idle. (engine/gameLoop.ts, activityStore.ts)
- CURRENT time budget: **derived, not a resource.** `maxTimePoints = 24` (a day's hours); free hours = `24 − scheduledHours(queue)`; queueing is rejected past 24h. No draining/refill; the old `timePoints` resource and `timeScale` multiplier were removed. (engine/gameLoop.ts, gameStore.ts)
- CURRENT aging: age derives from the clock — each tick the engine compares `age` against `initialAge + floor(day / 60)` and catches up one year at a time. There is no separate aging state to persist, so a save/load can never shift a birthday (the old `lastAgeDay` module variable caused a spurious age-up on every reload; removed 2026-07-18). Starting age = 12, starting lifespan = 60. (engine/gameLoop.ts, constant.ts)
- CURRENT death: when `age >= lifespan` (and not already fallen), `hasFallen` is set true, the loop stops, and `cultivator:death` is emitted. Death does NOT auto-reincarnate; the player triggers `reincarnate()` from the death overlay (which then wipes and reboots a fresh run). (engine/gameLoop.ts)
- NOTE: vision says ~1 min/year for an ~80-min mortal life. At gameSpeed 1, one year = 60 days × 24 ticks ÷ 24 ticks/sec = 60 seconds = 1 min/year, matching the vision target. (vision vs engine/gameLoop.ts)

## The Core Loop (intended)

A run is one life. The player starts with a procedural background (farmer, orphan, soldier's son) and directs the life through choices, action queues, and event reactions. Death ends the run. Reincarnation acts as prestige: meta bonuses are meant to carry forward so each subsequent life is faster and richer. The reincarnation cycle is the incremental progression itself — this is the design's central conceit, borrowed from Progress Knight's life-sim-with-persistent-multipliers structure and Antimatter Dimensions' stacked prestige layers. (Procedural backgrounds and event reactions described here are vision-level; the tick/aging/death plumbing below is what currently exists.)

## State layers: intended vs current reality

INTENDED (vision): a two-layer architecture.
- **Run state** resets on death: vitality, age, inventory, realm, run-scoped stats.
- **Meta state** persists forever: prestige currencies, permanent unlocks, and hidden stats (karma, luck, accumulated choices) that invisibly shape run variance.

CURRENT REALITY (code): the meta layer does not exist. The four Zustand stores (cultivator, inventory, activity, game) are all run-scoped. On reincarnation:
- `reincarnate()` (exported from `engine/gameLoop.ts`) stops the loop, resets aging, resets all four stores, emits `cultivator:reincarnated`, then calls `bootRun()` to start a fresh life immediately.
- The `cultivator:reincarnated` listener calls `SaveManager.clearSave()` (removes the save from localStorage).

The net effect is a full wipe: every store returns to initial values and the save is deleted. No prestige currency, no permanent unlock, and no hidden stat survives a death. Anything in the vision describing carry-over, acceleration, or hidden meta stats is intended-but-unbuilt.

## Run types and automation (intended)

The vision frames two play modes the player chooses between: grind runs (configure the action queue, go idle, farm a specific resource) and push runs (active play aimed at crossing new thresholds). These are design intentions, not enforced systems — there is no run-type flag or distinct code path; the same loop serves both, and the difference is purely how the player engages.

Automation is intended to unlock progressively and to be diegetic (disciples, formations) rather than an explicit "automation" toggle. The data-driven unlock system (`UnlockEvaluator`, registered in `gameEventListeners.ts`) is the mechanism through which such progression would surface, but no automation entities are implemented yet.

## Time and aging model (current reality)

The clock is the authoritative source for progression and is fully implemented:

- The `GameLoop` class (`engine/gameLoop.ts`) creates a `setInterval` firing at `1000 / (24 * gameSpeed)` ms, i.e. 24 ticks per real second at speed 1. `setSpeed()` tears down and rebuilds the interval to apply a new speed live.
- `timeSystem()` increments `ticks`; every 24 ticks rolls `day` forward by 1. `runTick()` emits `game:tick` with `{ ticks, day }` at the end.
- `agingSystem()` derives the expected age from the day counter (`initialAge + floor(day / DAYS_PER_YEAR)`) and calls `incrementAge()` (at most one year per tick) until age matches, running unlock checks after each increment. So 60 days = 1 year, and aging is a pure function of the clock — no aging state exists outside the stores.
- Death check runs immediately after each age increment: if `!hasFallen && age >= lifespan`, it sets `hasFallen = true`, stops the loop, and emits `cultivator:death`. With starting values age 12 / lifespan 60, an untouched mortal life runs from year 12 to year 60.

### Daily schedule and the time budget

Day-to-day play is a **schedule**, not a consume-once queue:

- The `queue` (`QueueBlock[]`) is the player's plan for a day, edited with +/− (`pushUnit`/`popUnit`). It does not drain as it runs.
- `scheduleIndex` points at the unit currently executing. `activitySystem()` advances `runningTicks` and, on hitting the activity's `timeCost`, fires its effects and bumps the index. Once the index passes the end of the plan, the rest of the day is idle.
- On a day roll, `dayRollSystem()` resets the index to 0 **iff** `repeatActivities` is on — replaying the same schedule each dawn. With repeat off, the plan runs once, then the cultivator idles (the clock keeps ticking).
- The time budget is derived, not stored: `maxTimePoints = 24`, free hours = `24 − scheduledHours(queue)`. At most 24h of activities can be scheduled; unscheduled hours are where rest/sleep/survival will later live. This replaced an earlier draining `timePoints` pool that never refilled.

Reincarnation is a separate, explicit action from death. Death stops the loop and flags `hasFallen`; it does not trigger `reincarnate()`. The player (or UI) must invoke `reincarnate()` to wipe and restart. This matches the vision time target: at speed 1, one year ≈ 60 real seconds (~1 min/year), so a 48-year mortal lifespan is roughly 48 minutes of real time (vision quotes ~80 min for a full mortal life, implying either a longer intended lifespan or higher year counts than the current 12→60 defaults).
