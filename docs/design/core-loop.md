---
purpose: The reincarnation-driven core loop — how a run is structured, how time/aging/death work, and the gap between the intended two-layer state model and the current full-wipe reality.
status: active
last-verified: 2026-05-30
related: [docs/vision/identity.md, docs/architecture/architecture.md, docs/design/scaling.md]
---

## Key facts

- One run = one life. The player directs that life via choices, action queues, and event reactions. Death ends the run; reincarnation restarts it. The incremental game IS the reincarnation cycle. (vision)
- INTENDED: Two state layers — **run state** (resets on death: vitality, age, inventory, realm, run-scoped stats) and **meta state** (persists forever: prestige currencies, permanent unlocks, hidden stats karma/luck/accumulated-choices). Next life is meant to be faster/richer because meta bonuses carry over. (vision)
- CURRENT REALITY: There is **no meta-state layer**. `reincarnate()` wipes ALL state back to initial values and clears the save file. Nothing carries over between lives yet. The "bonuses carry over / next life is faster" promise is unimplemented. (gameStore.ts, gameEventListeners.ts, SaveManager.ts)
- INTENDED: Hidden stats (karma, luck, choices) are meta state shaping run variance invisibly. Not implemented — no such stats exist in the stores. (vision; absent in code)
- INTENDED: Run types — **grind runs** (set queue, go idle, farm a resource) and **push runs** (active play, reach new thresholds). The player picks the run's purpose. This is a design framing, not an enforced mechanic; there is no run-type flag in code. (vision)
- INTENDED: Automation-as-progression — automation unlocks progressively (disciples/formations diegetically), even in the mortal phase. Current code has a data-driven unlock system but no automation entities yet. (vision; UnlockEvaluator in code)
- CURRENT clock: game loop runs `24 ticks/sec * gameSpeed` via `setInterval`. 24 ticks = 1 day. 60 days = 1 year. (gameStore.ts, gameEventListeners.ts)
- CURRENT aging: every 60 in-game days the cultivator's `age` increments by 1 (`incrementAge`, +1 per year). Starting age = 12, starting lifespan = 60. (gameEventListeners.ts, cultivatorStore.ts, constant.ts)
- CURRENT death: when `age >= lifespan` (and not already fallen), `hasFallen` is set true, the game loop stops, and `cultivator:death` is emitted. Death does NOT auto-reincarnate; `reincarnate()` is a separate explicit call. (gameEventListeners.ts, gameStore.ts)
- NOTE: vision says ~1 min/year for an ~80-min mortal life. At gameSpeed 1, one year = 60 days × 24 ticks ÷ 24 ticks/sec = 60 seconds = 1 min/year, matching the vision target. (vision vs gameStore.ts)

## The Core Loop (intended)

A run is one life. The player starts with a procedural background (farmer, orphan, soldier's son) and directs the life through choices, action queues, and event reactions. Death ends the run. Reincarnation acts as prestige: meta bonuses are meant to carry forward so each subsequent life is faster and richer. The reincarnation cycle is the incremental progression itself — this is the design's central conceit, borrowed from Progress Knight's life-sim-with-persistent-multipliers structure and Antimatter Dimensions' stacked prestige layers. (Procedural backgrounds and event reactions described here are vision-level; the tick/aging/death plumbing below is what currently exists.)

## State layers: intended vs current reality

INTENDED (vision): a two-layer architecture.
- **Run state** resets on death: vitality, age, inventory, realm, run-scoped stats.
- **Meta state** persists forever: prestige currencies, permanent unlocks, and hidden stats (karma, luck, accumulated choices) that invisibly shape run variance.

CURRENT REALITY (code): the meta layer does not exist. The four Zustand stores (cultivator, inventory, activity, game) are all run-scoped. On reincarnation:
- `gameStore.reincarnate()` stops the loop, emits `cultivator:reincarnated`, and resets the game store to `createInitialGameState()`.
- The `cultivator:reincarnated` listener resets the cultivator, activity, and inventory stores, resets the aging counter (`lastAgeDay = 0`), and calls `SaveManager.clearSave()` (removes the save from localStorage).

The net effect is a full wipe: every store returns to initial values and the save is deleted. No prestige currency, no permanent unlock, and no hidden stat survives a death. Anything in the vision describing carry-over, acceleration, or hidden meta stats is intended-but-unbuilt.

## Run types and automation (intended)

The vision frames two play modes the player chooses between: grind runs (configure the action queue, go idle, farm a specific resource) and push runs (active play aimed at crossing new thresholds). These are design intentions, not enforced systems — there is no run-type flag or distinct code path; the same loop serves both, and the difference is purely how the player engages.

Automation is intended to unlock progressively and to be diegetic (disciples, formations) rather than an explicit "automation" toggle. The data-driven unlock system (`UnlockEvaluator`, registered in `gameEventListeners.ts`) is the mechanism through which such progression would surface, but no automation entities are implemented yet.

## Time and aging model (current reality)

The clock is the authoritative source for progression and is fully implemented:

- `startGameLoop()` creates a `setInterval` firing at `1000 / (24 * gameSpeed)` ms, i.e. 24 ticks per real second at speed 1. `setGameSpeed()` tears down and rebuilds the interval to apply a new speed live.
- Each `tick()` increments `ticks`; every 24 ticks rolls `day` forward by 1, and emits `game:tick` with `{ ticks, day }`.
- The aging listener in `gameEventListeners.ts` tracks `lastAgeDay`. When `day - lastAgeDay >= 60`, it calls `incrementAge()` (age +1), advances `lastAgeDay`, and runs unlock checks. So 60 days = 1 year. (On non-aging ticks, unlocks are re-checked every 10th day.)
- Death check runs immediately after each age increment: if `!hasFallen && age >= lifespan`, it sets `hasFallen = true`, stops the loop, and emits `cultivator:death` with the age. With starting values age 12 / lifespan 60, an untouched mortal life runs from year 12 to year 60.

Reincarnation is a separate, explicit action from death. Death stops the loop and flags `hasFallen`; it does not trigger `reincarnate()`. The player (or UI) must invoke `reincarnate()` to wipe and restart. This matches the vision time target: at speed 1, one year ≈ 60 real seconds (~1 min/year), so a 48-year mortal lifespan is roughly 48 minutes of real time (vision quotes ~80 min for a full mortal life, implying either a longer intended lifespan or higher year counts than the current 12→60 defaults).
