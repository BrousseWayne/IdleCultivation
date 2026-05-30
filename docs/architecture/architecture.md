---
purpose: Source of truth for the wired runtime architecture — Zustand stores, services, the effect/event/unlock discriminated-union systems, and the run-vs-meta state model.
status: active
last-verified: 2026-05-30
related: [docs/architecture/conventions.md, docs/design/core-loop.md]
---

## Key facts

- WIRED: FIVE Zustand stores exist — `cultivatorStore`, `gameStore`, `activityStore`, `inventoryStore`, `notificationStore` (`src/app/stores/`). (Older docs said 4; `notificationStore` was added and is correct at 5.)
- WIRED: Stores never import each other. Cross-store communication goes through `EventBus` (`src/app/services/EventBus.ts`), a synchronous in-memory pub-sub keyed by string event type.
- WIRED: `EntityRegistry` (`src/app/services/EntityRegistry.ts`) is a singleton seeded imperatively in `src/main.tsx` BEFORE React mounts — `activity`, `item`, `location`, `navigation` maps. O(1) `get`/`getAll`/`has` by `type+id`.
- WIRED: `UnlockEvaluator` (`src/app/services/UnlockEvaluator.ts`) — data-driven, event-driven (no polling). Unlockables registered in `gameEventListeners.ts`; `checkAll()` is called from EventBus handlers (`activity:completed`, `cultivator:stat-changed`, and periodically inside `game:tick`). A satisfied unlockable fires `onUnlock()` once, is added to `unlockedIds`, and is DELETED from the pool.
- WIRED: `EffectExecutor` (`src/app/services/EffectExecutor.ts`) applies an `Effect[]` discriminated union by switching on `effect.type` and calling store actions directly.
- KNOWN GAP (per ruling C3): `Effect` carries a `currency: Currency` field on `grant_currency`/`spend_currency`, but `EffectExecutor` IGNORES it and always routes to the single `inventory.spiritStones` integer via `addSpiritStones`/`subtractSpiritStones`.
- INTENDED, NOT WIRED (C3): four distinct currency balances (Bronze/Silver/Gold/Platinum). The `Currency` type exists (`domain.ts`) and README advertises it, but the store holds ONE `spiritStones` number — no per-currency balances.
- WIRED: `SaveManager` (`src/app/services/SaveManager.ts`) — localStorage key `cultivation-save`, `SAVE_VERSION = 1`, 30s autosave interval. Snapshots four stores (NOT `notificationStore`). Load/start-autosave called in `main.tsx`.
- WIRED: Game tick loop lives in `gameStore` (`startGameLoop`/`tick`), driven by `setInterval` at 24 ticks/sec × `gameSpeed`; 24 ticks = 1 in-game day. Each tick emits `game:tick` on the EventBus.
- WIRED: Activity completion timing is driven by a React effect `useActivityExecutor` inside `GameStateProvider` (`src/app/contexts/gameStateContext.tsx`) reacting to `ticks`, NOT by the EventBus.
- WIRED: JSON + Zod schema layer is staged in `src/app/data/json/` + `src/app/data/schemas/`. SIX data files parse JSON through Zod at import: `items`, `locations`, `lifestyle`, `story`, `quests`, `unlocks(unlockables)`. (Ruling C noted "only unlockables.json wired" — verified reality is broader; documented below.) Activities remain pure TS (`activity.ts`) because they carry icons/functions.
- INTENDED, NOT WIRED (C2): two-layer state model. Run-state stores are real. Meta-state (prestige currencies, karma/luck, permanent unlocks) does NOT exist in code — no `ascension`, `transcendence`, `immortalJade`, or meta store anywhere.

## State management: five Zustand stores

State lives in five `create()` Zustand stores under `src/app/stores/`. Components subscribe to slices directly; services and other stores read via `useXxxStore.getState()` and write via actions or `setState`.

- `cultivatorStore` — run-scoped player: `age`, `lifespan`, `vitality`/`satiety`/`mortality` (each a `{max,current}` ResourceBar), `stats` (`Record<Stats, number>` where `Stats = "Strength" | "Dexterity"`), `hasFallen`. Actions: `incrementStat`, `takeDamage`, `heal`, `incrementAge`, `reset`.
- `gameStore` — the largest store: tick/time (`ticks`, `day`, `gameSpeed`, `intervalId`, `isPlaying`), intro/run flags (`introComplete`, `runBackground`), the time-budget system (`timePoints`/`maxTimePoints`/`timeScale`), calendar selection state, `navigationUnlocks` + `activityCategoryUnlocks`, `eventLog`, and the game-loop + unlock-application actions. Owns `startGameLoop`/`stopGameLoop`/`tick`, `startRun`, and `reincarnate`.
- `activityStore` — `activityQueue` (Activity[]), `allocatedActivities`, `completionCounts`, `activityXp`, `repeatActivities`, `currentActivityStartTick`. `completeCurrentActivity()` computes XP via `xpScalingFn`, scales `grant_currency`/`grant_stat` effect amounts by level (`scaleEffectAmount`), runs them through `EffectExecutor`, re-queues if `repeatActivities` and budget remains, then emits `activity:completed`.
- `inventoryStore` — single `spiritStones: number`, `inventoryItems`, `equippedItems` (six slots), `dailyExpenses`/`dailyIncome`. `equipItem` resolves the item through `EntityRegistry.get("item", ...)`.
- `notificationStore` — transient UI notifications with auto-dismiss timers. NOT persisted by SaveManager.

### Run-state vs meta-state (INTENDED, partially built)

The intended model is two layers: run-state (resets on death/reincarnation) and meta-state (persists forever — prestige currencies, hidden stats, permanent unlocks). Verified in code: only run-state exists. `reincarnate()` in `gameStore` stops the loop, emits `cultivator:reincarnated`, and resets `gameStore` to initial; the `cultivator:reincarnated` handler in `gameEventListeners.ts` resets cultivator/activity/inventory stores and clears the save. There is no meta store and no prestige currency persistence — meta-state is planned, not implemented.

## Services layer

Singletons under `src/app/services/`, re-exported from `index.ts` (`EntityRegistry`, `EventBus`, `UnlockEvaluator`, `EffectExecutor`, `SaveManager`, `initializeGameEventListeners`).

### EntityRegistry

Map-of-maps keyed by entity type (`activity`/`item`/`location`/`navigation`). Seeded in `main.tsx` immediately at module load — `activityData`, `items`, `locations`, `sidebarData` are registered before `createRoot`. Provides typed `get`/`getAll`/`has`/`register`/`clear`. Also exposed on `window.EntityRegistry` for debugging.

### EventBus

`Map<string, Set<EventHandler>>` pub-sub. `emit` looks up handlers by `event.type` and calls each in a try/catch (a throwing handler is logged, others still run). Supports `on`/`off`/`once`/`clear`. Events are a discriminated union in `src/app/types/events.ts`: `cultivator:stat-changed`, `activity:completed`, `game:tick`, `player:peered_at_fate`, `cultivator:death`, `cultivator:reincarnated`, `notification:push`. Naming is `domain:action`.

### UnlockEvaluator

Holds `unlockables: Map<id, UnlockableEntity>` and an `unlockedIds` set. `evaluateCondition` recursively resolves the `UnlockCondition` union (`stat`, `age`, `activity_completions`, `spirit_stones`, `day`, and the composite `and`/`or`) by reading live store state via `getState()`. `evaluate` requires ALL top-level conditions true. `checkAll()` iterates the pool, fires `onUnlock()` once per satisfied entity, records it, and removes it from the pool so it's never re-evaluated. Evaluation is event-driven — there is no polling loop.

### EffectExecutor

`execute(Effect[])` loops and `apply`s each by `effect.type`. Mapped cases: `grant_currency`/`spend_currency` → `inventory.addSpiritStones`/`subtractSpiritStones`; `grant_stat` → `cultivator.incrementStat` plus emit `cultivator:stat-changed`; `log` → `gameStore.addEventLog`; `damage`/`heal` → cultivator; `unlock_category`/`unlock_nav` → gameStore unlock actions. The `currency` field on the two currency effects is read off the type but never used — all currency flows into the single `spiritStones` balance (the C3 gap).

### SaveManager

Serializes a versioned snapshot of cultivator/game/activity/inventory to `localStorage["cultivation-save"]`. The activity queue is persisted as activity KEYS and rehydrated on load by resolving each key through `EntityRegistry` (so the registry must be seeded first — which `main.tsx` guarantees by ordering registration before `SaveManager.load()`). `eventLog` is capped to the last 200 entries. `startAutoSave` runs `save()` every 30s. Also provides `exportSave`/`importSave`/`clearSave`/`wipeSave`. `notificationStore` is intentionally not saved.

## Boot sequence (src/main.tsx)

1. Register all entities into `EntityRegistry` (activities, items, locations, navigation).
2. `initializeGameEventListeners()` — registers unlockables (from `unlockables` JSON, plus per-activity and per-nav `unlockConditions`) and wires EventBus handlers (unlock checks on `activity:completed`/`cultivator:stat-changed`, notification push, reincarnation reset, and per-tick aging/death/unlock logic).
3. `SaveManager.load()` then `SaveManager.startAutoSave()`.
4. If `introComplete`, `startGameLoop()`.
5. Mount React Router routes.

## Tick loop and aging

`gameStore.tick()` increments `ticks`, rolls `day` every 24 ticks, and emits `game:tick`. The `game:tick` handler in `gameEventListeners.ts` ages the cultivator every 60 days, runs `UnlockEvaluator.checkAll()` on age/decade boundaries, and — when `age >= lifespan` — sets `hasFallen`, stops the loop, and emits `cultivator:death`. Activity progress is tracked separately by `useActivityExecutor` in `GameStateProvider`, which compares `ticks - currentActivityStartTick` against the activity's `timeCost`.

## Data layer and the JSON + Zod staging

Game content lives in `src/app/data/`. Two formats coexist:

- Pure TypeScript (carries icons/functions): `activity.ts`, `constant.ts`, `navigation.ts`, `sectionColors.ts`, `intro.ts`, `exploreLocations.ts`.
- JSON validated by Zod at import time: `json/*.json` parsed through `schemas/*` via `XxxArraySchema.parse(...)`. Six consumers are wired — `items`, `locations`, `lifestyle`, `story`, `quests`, and `unlocks` (unlockables). Of these, `items` and `locations` flow into `EntityRegistry` at boot, and `unlockables` flow into `UnlockEvaluator`; `lifestyle`/`story`/`quests` are parsed and exported for page consumption. The discriminated-union types these JSON files conform to (`UnlockableDefinition`, `UnlockCondition`, etc.) live in `src/app/types/`. The long-term intent is to migrate remaining pure-data TS to JSON while keeping TS only for data needing functions/icons.

## Discriminated-union systems

Three core unions drive data-driven behavior, all in `src/app/types/`:

- `Effect` (`effects.ts`) — what an activity/event does. Consumed by `EffectExecutor`.
- `GameEvent` (`events.ts`) — what flows over the `EventBus`.
- `UnlockCondition` + `UnlockableDefinition` (`unlocks.ts`, `domain.ts`) — when content unlocks. Consumed by `UnlockEvaluator`.

Using closed unions plus exhaustive `switch` keeps the executor/evaluator/event handlers honest: adding a variant surfaces every site that must handle it.
