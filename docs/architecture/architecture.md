---
purpose: Source of truth for the wired runtime architecture — Zustand stores, services, the effect/event/unlock discriminated-union systems, and the run-vs-meta state model.
status: active
last-verified: 2026-06-03
related: [docs/architecture/conventions.md, docs/design/core-loop.md]
---

## Key facts

- WIRED: code is split into `src/game/` (headless logic — stores, services, engine, data, types, utils) and `src/ui/` (React — pages, components, layout, hooks). `@/` → `src/`. (Older docs said `src/app/`; that layout no longer exists.)
- WIRED: FIVE Zustand stores — `cultivatorStore`, `gameStore`, `activityStore`, `inventoryStore`, `notificationStore` (`src/game/stores/`).
- WIRED: Stores never import each other. Cross-store communication goes through `EventBus` (`src/game/services/EventBus.ts`). The engine/service layer (`engine/gameLoop.ts`, `EffectExecutor`, `gameEventListeners`) is the orchestrator that IS allowed to read every store via `getState()` and emit on the bus.
- WIRED: the tick loop lives in `src/game/engine/gameLoop.ts` — a `GameLoop` class (`setInterval` at 24 ticks/sec × `gameSpeed`) driving `runTick()`, NOT in `gameStore`. Each tick runs `timeSystem → activitySystem → (dayRollSystem on a day roll) → agingSystem`, then emits `game:tick`. 24 ticks = 1 in-game day.
- WIRED: activities are an ordered **daily schedule**, not a draining queue. `activityStore.queue: QueueBlock[]` is a stable plan (adjacent same-key blocks merge); `scheduleIndex` tracks the unit currently running. `activitySystem` advances the index on completion and idles once it passes the end. On a day roll, if `repeatActivities`, `dayRollSystem` resets the index to 0 (replay the day). The queue does not get consumed.
- WIRED: the time budget is **derived, not a resource**. `maxTimePoints = 24` (one day's hours). Free hours = `maxTimePoints − scheduledHours(queue)`. `queueActivity` rejects anything that would push the schedule past 24h. There is no allocate/deallocate/refill; the old draining `timePoints` and the `timeScale` multiplier were removed.
- WIRED: `EntityRegistry` (`src/game/services/EntityRegistry.ts`) — singleton seeded imperatively in `src/main.tsx` BEFORE React mounts (`activity`/`item`/`location`/`navigation`). O(1) `get`/`getAll`/`has`.
- WIRED: `UnlockEvaluator` — data-driven, event-driven (no polling). `checkAll()` runs on `activity:completed`, `cultivator:stat-changed`, and at aging/decade boundaries. A satisfied unlockable fires `onUnlock()` once, then is deleted from the pool.
- WIRED: `EffectExecutor` applies an `Effect[]` discriminated union by switching on `effect.type` and calling store actions directly.
- CURRENCY: a single flat unit ("silver"). The old Bronze/Silver/Gold/Platinum denomination system was removed — `Currency` type and `data/currency.ts` (`toCurrency`/`CURRENCY_VALUE`) are gone, `Effect.grant_currency`/`spend_currency` carry only `amount`, and `renderMoney()` shows one silver number. `UnlockEvaluator`'s old `spirit_stones` condition is now `currency`.
- WIRED: `SaveManager` (`src/game/services/SaveManager.ts`) — localStorage `cultivation-save`, `SAVE_VERSION = 1`, 30s autosave. Snapshots cultivator/game/activity/inventory (NOT `notificationStore`); persists `scheduleIndex`.
- REMOVED: the JSON + Zod data-staging layer. There is no `data/json/` or `data/schemas/`; ALL content is pure TS (commit "convert remaining JSON data to typed TS, drop zod").
- INTENDED, NOT WIRED: the two-layer state model. Run-state stores are real; there is no meta-state layer (prestige currencies, karma/luck, permanent unlocks). `reincarnate()` full-wipes every store and auto-reboots a fresh run.

## State management: five Zustand stores

State lives in five `create()` Zustand stores under `src/game/stores/`. Components subscribe to slices directly; services and the engine read via `useXxxStore.getState()` and write via actions or `setState`.

- `cultivatorStore` — run-scoped player: `age`, `lifespan`, `vitality`/`satiety`/`mortality` (each a `{max,current}` ResourceBar), `stats` (`Record<Stats, number>` where `Stats = "Strength" | "Dexterity"`), `hasFallen`. Actions: `incrementStat`, `takeDamage`, `heal`, `incrementAge`, `reset`. (The three ResourceBars are display-only today — nothing drains them yet.)
- `gameStore` — tick/time (`ticks`, `day`, `gameSpeed`, `isPlaying`), intro/run flags (`introComplete`, `runBackground`), `maxTimePoints` (=24; free hours are derived from the schedule, not stored), the persistent `streamLog`, `currentPlaceKey`, calendar-selection state, and `navigationUnlocks` + `activityCategoryUnlocks` with their unlock actions. The tick loop and `reincarnate` live in `engine/gameLoop.ts`; `startRun` only sets `introComplete`/`runBackground`.
- `activityStore` — `queue: QueueBlock[]` (the day's ordered schedule; adjacent same-key blocks merge), `scheduleIndex` (unit currently running), `runningTicks`, `completionCounts`, `activityXp`, `repeatActivities`. Editing actions `pushUnit`/`popUnit`/`clearQueue`; execution actions `advanceSchedule`/`resetSchedule`/`setRunningTicks`; pure helpers `queuedUnits`/`totalUnits`/`unitKeyAt`/`blockAt`. Completion logic (XP, level-scaled effects, `EffectExecutor`, `activity:completed`) lives in `engine/gameLoop.ts`.
- `inventoryStore` — single `currency: number` (one flat silver unit), `inventoryItems`, `equippedItems` (six slots), `dailyExpenses`/`dailyIncome`. `equipItem` resolves the item through `EntityRegistry.get("item", ...)`.
- `notificationStore` — transient UI notifications with auto-dismiss timers. NOT persisted by SaveManager.

### Run-state vs meta-state (INTENDED, partially built)

The intended model is two layers: run-state (resets on death/reincarnation) and meta-state (persists forever — prestige currencies, hidden stats, permanent unlocks). Verified in code: only run-state exists. `reincarnate()` (in `engine/gameLoop.ts`) stops the loop, resets aging, resets all four stores, emits `cultivator:reincarnated` (whose handler clears the save), then calls `bootRun()` to start a fresh life immediately. There is no meta store and no prestige persistence — meta-state is planned, not implemented.

## Services layer

Singletons under `src/game/services/`, re-exported from `index.ts` (`EntityRegistry`, `EventBus`, `UnlockEvaluator`, `EffectExecutor`, `SaveManager`, `initializeGameEventListeners`).

### EntityRegistry

Map-of-maps keyed by entity type (`activity`/`item`/`location`/`navigation`). Seeded in `main.tsx` immediately at module load — `activityData`, `items`, `locations`, `sidebarData` are registered before `createRoot`. Provides typed `get`/`getAll`/`has`/`register`/`clear`. Also exposed on `window.EntityRegistry` for debugging.

### EventBus

`Map<string, Set<EventHandler>>` pub-sub. `emit` looks up handlers by `event.type` and calls each in a try/catch (a throwing handler is logged, others still run). Supports `on`/`off`/`once`/`clear`. Events are a discriminated union in `src/game/types/events.ts`: `cultivator:stat-changed`, `activity:completed`, `game:tick`, `player:peered_at_fate`, `cultivator:death`, `cultivator:reincarnated`, `notification:push`. Naming is `domain:action`. (`player:peered_at_fate` and `notification:push` have no live emitter today.)

### UnlockEvaluator

Holds `unlockables: Map<id, UnlockableEntity>` and an `unlockedIds` set. `evaluateCondition` recursively resolves the `UnlockCondition` union (`stat`, `age`, `activity_completions`, `currency`, `day`, and the composite `and`/`or`) by reading live store state via `getState()`. `evaluate` requires ALL top-level conditions true. `checkAll()` iterates the pool, fires `onUnlock()` once per satisfied entity, records it, and removes it from the pool so it's never re-evaluated. Evaluation is event-driven — there is no polling loop.

### EffectExecutor

`execute(Effect[])` loops and `apply`s each by `effect.type`. Mapped cases: `grant_currency`/`spend_currency` → `inventory.addCurrency`/`subtractCurrency` with the raw `amount`; `grant_stat` → `cultivator.incrementStat` plus emit `cultivator:stat-changed`; `log` → `gameStore.addEventLog`; `damage`/`heal` → cultivator; `unlock_category`/`unlock_nav` → gameStore unlock actions.

### SaveManager

Serializes a versioned snapshot of cultivator/game/activity/inventory to `localStorage["cultivation-save"]`. The activity `queue` is persisted directly as `QueueBlock[]` (key + units) alongside `scheduleIndex` and `runningTicks`; load restores via `setState` (registry is still seeded first in `main.tsx`). `streamLog` is capped to the last 200 entries. `startAutoSave` runs `save()` every 30s. Also provides `exportSave`/`importSave`/`clearSave`/`wipeSave`. `notificationStore` is intentionally not saved.

## Boot sequence (src/main.tsx)

1. Register all entities into `EntityRegistry` (activities, items, locations, navigation).
2. `initializeGameEventListeners()` — registers unlockables (from `data/unlocks.ts`, plus per-activity and per-nav `unlockConditions`) and wires EventBus handlers (unlock checks on `activity:completed`/`cultivator:stat-changed`, notification push, reincarnation save-clear).
3. `SaveManager.load()` then `SaveManager.startAutoSave()`.
4. `bootRun()` — seeds the default background + opening narration when `!introComplete`, then `gameLoop.start()`.
5. Mount React Router routes.

## Tick loop and aging

`runTick()` (in `engine/gameLoop.ts`) runs four systems per tick:

- `timeSystem` — advances `ticks`; rolls `day` every 24 ticks; reports `rolledDay`.
- `activitySystem` — finds the unit at `scheduleIndex`, advances `runningTicks`, and on reaching the activity's `timeCost` completes it (effects + `activity:completed`) and bumps `scheduleIndex`. Past the end of the schedule it idles (does nothing).
- `dayRollSystem` (only on a day roll) — if `repeatActivities`, resets `scheduleIndex` to 0, replaying the day's schedule.
- `agingSystem` — ages the cultivator every 60 days, runs `UnlockEvaluator.checkAll()` at age/decade boundaries, and on `age >= lifespan` sets `hasFallen`, stops the loop, and emits `cultivator:death`.

The loop does NOT auto-stop on an empty or finished schedule — time keeps passing (needed for daily replay and, later, aging/survival pressure).

## Data layer

Game content lives in `src/game/data/`, all **pure TypeScript** — the earlier JSON + Zod staging layer was dropped (no `data/json/` or `data/schemas/`).

- Live content: `activity.ts`, `places.ts`, `navigation.ts`, `unlocks.ts`, `constant.ts`, `intro.ts` (background/intro), `sectionColors.ts` (palette source), `stats.ts` (stat descriptors).
- Empty shells awaiting authoring: `lifestyle.ts`, `quests.ts`, `story.ts`.
- Legacy mock data still read by scaffold pages: `items.ts`, `locations.ts` (the old cosmic Travel map).

The discriminated-union types this data conforms to (`Effect`, `UnlockCondition`, `UnlockableDefinition`, etc.) live in `src/game/types/`.

## Discriminated-union systems

Three core unions drive data-driven behavior, all in `src/game/types/`:

- `Effect` (`effects.ts`) — what an activity/event does. Consumed by `EffectExecutor`.
- `GameEvent` (`events.ts`) — what flows over the `EventBus`.
- `UnlockCondition` + `UnlockableDefinition` (`unlocks.ts`, `domain.ts`) — when content unlocks. Consumed by `UnlockEvaluator`.

Using closed unions plus exhaustive `switch` keeps the executor/evaluator/event handlers honest: adding a variant surfaces every site that must handle it.
