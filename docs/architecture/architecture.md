---
purpose: Source of truth for the wired runtime architecture — Zustand stores, services, the effect/event/unlock discriminated-union systems, and the run-vs-meta state model.
status: active
last-verified: 2026-07-17
related: [docs/architecture/conventions.md, docs/design/core-loop.md]
---

## Key facts

- WIRED: code is split into `src/game/` (headless logic — stores, services, engine, data, types, utils) and `src/ui/` (React — pages, components, layout, hooks). `@/` → `src/`. (Older docs said `src/app/`; that layout no longer exists.)
- WIRED: SEVEN Zustand stores — `cultivatorStore`, `gameStore`, `activityStore`, `inventoryStore`, `unlockStore`, `eventStore`, `notificationStore` (`src/game/stores/`).
- WIRED: Stores never import each other. Cross-store communication goes through `EventBus` (`src/game/services/EventBus.ts`). The engine/service layer (`engine/gameLoop.ts`, `EffectExecutor`, `gameEventListeners`) is the orchestrator that IS allowed to read every store via `getState()` and emit on the bus.
- WIRED: all randomness flows through the seeded RNG (`engine/rng.ts`, mulberry32) — its state is persisted (manifest section `rng`) and reseeded on reincarnation/fresh boot. Same seed = same life: bugs reproduce, simulations are exact.
- WIRED: the simulation test suite (`src/game/tests/`, vitest, `npm test`) — the game core is headless, so whole lives are played per-test in milliseconds: death timing, schedule payouts, save/load roundtrip identity, announce-once idempotence, economy floors, event consumption, seed determinism. `npm run simulate -- --days=600 --policy=income` plays the game under a policy and prints the balancing curves (vite-node); `npm run check:content` runs the integrity validator headlessly. `registerContent()` (`src/game/bootstrap.ts`) is the shared boot used by main.tsx, tests, and the CLI.
- WIRED: all time constants live in `src/game/engine/time.ts` (1 tick = 1h, 24 ticks/day, 30 days/month, 60 days/year) — nothing else hard-codes a duration.
- WIRED: content is authored through `data/defineContent.ts` helpers (`defineActivities`/`definePlaces`/`defineUnlockables`/`defineEvents`): literal keys are preserved, the unions `ActivityKey`/`PlaceKey`/`PlaceActionKey` derive from the data, and cross-references in unlockables/events are COMPILE-checked. Conditions are written with the `when` grammar (`data/conditions.ts`). Narrative events are authored one `defineEvent()` at a time: steps are a `Record<stepId, step>` and a self-referential generic constrains `entry` and every `goto` to the graph's own keys — a dangling transition is a compile error. Content arrays and nested effect/condition lists are `readonly` — authored content is immutable by type.
- WIRED: the tick loop lives in `src/game/engine/gameLoop.ts` — the `gameLoop` module singleton (`setInterval` at 24 ticks/sec × `gameSpeed`) driving `runTick()`, NOT in `gameStore`. Each tick runs `timeSystem → activitySystem → (dayRollSystem on a day roll) → agingSystem`, then emits `game:tick`. 24 ticks = 1 in-game day.
- WIRED: activities are an ordered **daily schedule**, not a draining queue. `activityStore.queue: QueueBlock[]` is a stable plan (adjacent same-key blocks merge); `scheduleIndex` tracks the unit currently running. `activitySystem` advances the index on completion and idles once it passes the end. On a day roll, if `repeatActivities`, `dayRollSystem` resets the index to 0 (replay the day). The queue does not get consumed.
- WIRED: the time budget is **derived, not a resource**. `maxTimePoints = 24` (one day's hours). Free hours = `maxTimePoints − scheduledHours(queue)`. `queueActivity` rejects anything that would push the schedule past 24h. There is no allocate/deallocate/refill; the old draining `timePoints` and the `timeScale` multiplier were removed.
- WIRED: `EntityRegistry` (`src/game/services/EntityRegistry.ts`) — singleton seeded imperatively in `src/main.tsx` BEFORE React mounts (`activity`/`item`/`location`/`navigation`). O(1) `get`/`getAll`/`has`.
- WIRED: the unlock pipeline. ALL unlock state lives in `unlockStore` (navigation / categories / activities / places), initial values derived from the content data's `unlocked` flags. `allUnlockables()` (`data/unlocks.ts`) is the single derived pool: standalone defs (categories) + per-activity, per-nav, and per-place `unlockConditions` colocated with the content. One registration loop feeds `UnlockEvaluator`; one idempotent `applyUnlock()` (in `gameEventListeners.ts`) mutates the store and announces the unlock in the stream. `checkAll()` runs on `activity:completed`, `cultivator:stat-changed`, `inventory:currency-changed`, every day roll, and after each age increment. A satisfied unlockable fires once, then is deleted from the pool. UI gates through `unlockStore`: `TabsNav`/`RequireUnlock` on `navigation`, and `useActivityVisibility()` (activity AND its category unlocked) on both Activities and Explore.
- WIRED: `EffectExecutor` applies an `Effect[]` discriminated union by switching on `effect.type` and calling store actions directly.
- WIRED: the narrative event system. Schema in `types/gameEvents.ts` (four kinds: `interrupt` pauses + demands a choice; `dialogue` opens from a place action; `ambient` is pure stream texture; `activityOutcome` rolls on completion), content in `data/events.ts`, magnitudes from the single tuning table `data/balance.ts` (COIN/STAT/HP/CHANCE_PROBABILITY). Engine `engine/events.ts`: daily roll in `dayRollSystem`, activity roll in `completeActivity`, dialogue binding in `performPlaceAction` (first eligible in data order wins; falls back to the action's plain effects). Recurrence bookkeeping + active event live in `eventStore` (run-scoped, persisted, reset on reincarnation; recurrence is consumed at fire time so reloads can't re-farm). Interactive events stop the loop (`gameLoop.start` refuses while an event holds the stage, and while the cultivator has fallen) and play out in the Thread drawer, which forces open and renders the step's choices (`requires` unmet or unaffordable costs = visible but disabled). Authoring law, validator-enforced: `spend_currency` in event content is legal ONLY inside choice `costs` — costs are the one affordability-gated channel; a spend in step/choice `effects` would execute unconditionally.
- CURRENCY: a single flat unit — the **copper wen** (glyph 文; taels of silver 兩 reserved for future large-sum content). `Effect.grant_currency`/`spend_currency` carry only `amount`; stream text says "earned N copper". The old Bronze/Silver/Gold/Platinum denomination system was removed; `UnlockEvaluator`'s old `spirit_stones` condition is now `currency`.
- WIRED: `SaveManager` (`src/game/services/SaveManager.ts`) — localStorage `cultivation-save`, `SAVE_VERSION = 2` (v1 saves migrate on load), 30s autosave PLUS flush-on-exit (main.tsx registers `beforeunload` + `visibilitychange(hidden)` saves — at 1 day = 1s the 30s autosave alone could lose a month) and a save at the moment of death (`cultivator:death` listener). `hasFallen` is persisted, `gameLoop.start()` refuses while fallen, so reloading on the death screen restores it with the clock stopped. What gets saved/restored is declared per store in the **persistence manifest** (`services/persistence.ts`), which `SaveManager` and `reincarnate()` (via `resetRunState()`) both iterate; unlock flags merge OVER data defaults so content added after a save stays visible. `notificationStore` is intentionally absent from the manifest.
- REMOVED: the JSON + Zod data-staging layer. There is no `data/json/` or `data/schemas/`; ALL content is pure TS (commit "convert remaining JSON data to typed TS, drop zod").
- INTENDED, NOT WIRED: the two-layer state model. Run-state stores are real; there is no meta-state layer (prestige currencies, karma/luck, permanent unlocks). `reincarnate()` full-wipes every store and auto-reboots a fresh run.

## State management: seven Zustand stores

State lives in seven `create()` Zustand stores under `src/game/stores/`. Components subscribe to slices directly; services and the engine read via `useXxxStore.getState()` and write via actions or `setState`.

- `cultivatorStore` — run-scoped player: `age`, `lifespan`, `vitality`/`satiety`/`mortality` (each a `{max,current}` ResourceBar), `stats` (`Record<Stats, number>` where `Stats = "Strength" | "Dexterity"`), `hasFallen`. Actions: `incrementStat`, `takeDamage`, `heal`, `incrementAge`, `reset`, and `setHasFallen` (what the death path in `gameLoop.ts` uses). (The three ResourceBars are display-only today — nothing drains them yet.)
- `gameStore` — tick/time (`ticks`, `day`, `gameSpeed`, `isPlaying`), intro/run flags (`introComplete`, `runBackground`), `maxTimePoints` (=24; free hours are derived from the schedule, not stored), the persistent `streamLog`, `currentPlaceKey`, and calendar-selection state. The tick loop and `reincarnate` live in `engine/gameLoop.ts`; `startRun` only sets `introComplete`/`runBackground`.
- `activityStore` — `queue: QueueBlock[]` (the day's ordered schedule; adjacent same-key blocks merge), `scheduleIndex` (unit currently running), `runningTicks`, `completionCounts`, `activityXp`, `repeatActivities`. Editing actions `pushUnit`/`popUnit`/`clearQueue`; execution actions `advanceSchedule`/`resetSchedule`/`setRunningTicks`; pure helpers `queuedUnits`/`totalUnits`/`unitKeyAt`/`blockAt`. Completion logic (XP, level-scaled effects, `EffectExecutor`, `activity:completed`) lives in `engine/gameLoop.ts`; a `grant_currency` marked `uncertain` really rolls there — uniform in `[1−UNCERTAIN_SPREAD, 1+UNCERTAIN_SPREAD)` × the scaled amount, through `rng` (the UI's "+?" is a live gamble, excluded from projections).
- `inventoryStore` — single `currency: number` (copper wen), `inventoryItems`, `equippedItems` (six slots). `equipItem` resolves the item through `EntityRegistry.get("item", ...)`.
- `eventStore` — narrative-event memory: `fired`/`cooldownUntil`/`lastCalendarFired` recurrence bookkeeping plus the `active` staged event. Persisted via the manifest, reset on reincarnation.
- `unlockStore` — ALL unlock state: `navigation`, `categories`, `activities`, `places` records + `unlockNavigation`/`unlockCategory`/`unlockActivity`/`unlockPlace`/`reset`. Initial values derive from the content data's `unlocked` flags. Also exports the `useActivityVisibility()` selector (activity AND category unlocked).
- `notificationStore` — transient UI notifications with auto-dismiss timers. NOT persisted by SaveManager.

### Run-state vs meta-state (INTENDED, partially built)

The intended model is two layers: run-state (resets on death/reincarnation) and meta-state (persists forever — prestige currencies, hidden stats, permanent unlocks). Verified in code: only run-state exists. `reincarnate()` (in `engine/gameLoop.ts`) stops the loop, resets aging, resets all five run-scoped stores (cultivator/activity/inventory/unlock/game), emits `cultivator:reincarnated` (whose handler clears the save), then calls `bootRun()` to start a fresh life immediately. There is no meta store and no prestige persistence — meta-state is planned, not implemented.

## Services layer

Module singletons under `src/game/services/` (plain exported objects closing over module state — the class layer was removed), re-exported from `index.ts` (`EntityRegistry`, `EventBus`, `UnlockEvaluator`, `EffectExecutor`, `SaveManager`, `initializeGameEventListeners`). `services/persistence.ts` is the declarative persistence manifest: each run-scoped store declares what it saves and how it restores; `SaveManager.snapshot/restore` and `resetRunState()` (used by reincarnation) both iterate it — a new store is one manifest entry away from being saved AND wiped correctly.

### EntityRegistry

Map-of-maps keyed by entity type (`activity`/`item`/`location`/`navigation`). Seeded in `main.tsx` immediately at module load — `activityData`, `items`, `locations`, `sidebarData` are registered before `createRoot`. Provides typed `get`/`getAll`/`has`/`register`/`clear`. Also exposed on `window.EntityRegistry` for debugging.

### EventBus

`Map<string, Set<EventHandler>>` pub-sub. `emit` looks up handlers by `event.type` and calls each in a try/catch (a throwing handler is logged, others still run). Supports `on`/`off`/`once`/`clear`. Events are a discriminated union in `src/game/types/events.ts`: `cultivator:stat-changed`, `activity:completed`, `game:tick`, `inventory:currency-changed`, `player:peered_at_fate`, `cultivator:death`, `cultivator:reincarnated`, `notification:push`. Naming is `domain:action`. (`player:peered_at_fate` and `notification:push` have no live emitter today.)

### UnlockEvaluator

Holds `unlockables: Map<id, UnlockableEntity>` and an `unlockedIds` set. `evaluateCondition` recursively resolves the `UnlockCondition` union (`stat`, `age`, `activity_completions`, `activity_level`, `currency`, `day`, and the composite `and`/`or`) by reading live store state via `getState()`. `evaluate` requires ALL top-level conditions true. `checkAll()` iterates the pool, fires `onUnlock()` once per satisfied entity, records it, and removes it from the pool so it's never re-evaluated. Evaluation is event-driven (plus one cheap check per day roll) — there is no polling loop.

The pool is fed exclusively from `allUnlockables()` (`data/unlocks.ts`); the `onUnlock` handler is always `applyUnlock(def)` in `gameEventListeners.ts` — idempotent (already-unlocked targets no-op, so save-load re-fires stay silent) and responsible for the stream announcement. Adding gated content = author its entry with `unlocked: false` + `unlockConditions`; nothing else to wire.

### EffectExecutor

`execute(Effect[])` loops and `apply`s each by `effect.type`. Mapped cases: `grant_currency`/`spend_currency` → `inventory.addCurrency`/`subtractCurrency` with the raw `amount`; `grant_stat` → `cultivator.incrementStat` plus emit `cultivator:stat-changed`; `log` → `gameStore.addEventLog`; `damage`/`heal` → cultivator; `unlock_category`/`unlock_nav` → unlockStore actions; currency effects also emit `inventory:currency-changed`.

### SaveManager

Serializes a versioned snapshot of cultivator/game/activity/inventory/unlocks to `localStorage["cultivation-save"]` (`SAVE_VERSION = 2`; v1 saves migrate their in-section unlock fields on load). The activity `queue` is persisted directly as `QueueBlock[]` (key + units) alongside `scheduleIndex` and `runningTicks`; load restores via `setState` (registry is still seeded first in `main.tsx`). `streamLog` is capped to the last 200 entries. `startAutoSave` runs `save()` every 30s. Also provides `exportSave`/`importSave`/`clearSave`/`wipeSave`. `notificationStore` is intentionally not saved.

## UI wiring notes

- The app is wrapped in `ErrorBoundary` (`src/ui/components/ErrorBoundary.tsx` — the codebase's single class, required by React): a render crash shows a save-download screen instead of a white page.
- Chrome layout (`src/ui/layout/layout.tsx`), top→bottom: `Header` → `QueueBar` (the 24h day bar) → `TabsNav` (horizontal text tabs) → content + right rail (`SelfCard`) → `ThreadDrawer` (bottom drawer for the global stream, collapsed to a one-line ticker). There is no sidebar.
- Every page route in `main.tsx` is wrapped in `RequireUnlock` (`src/ui/components/RequireUnlock.tsx`): if the nav entry isn't in `unlockStore.navigation`, it redirects to `/Explore`. `TabsNav` also hides locked tabs entirely. This is the progressive-tab-disclosure mechanism.
- Chrome iconography is text glyphs (`src/game/data/glyphs.ts` + the `Glyph` component in `src/ui/components/StatIcon.tsx`), rendered in `--font-glyph` (LXGW WenKai TC via CDN in `index.html`).
- Shared UI hooks (`src/ui/hooks/`): `useActivityActions` (queue/unqueue with stream logging, shared by Explore + Activities), `useLerpNumber` (rAF number interpolation, header + Self card), `useSmoothProgress` (day-bar progress smoothing), `useEtherealShimmer` (decorative shimmer effect).
- `src/game/content/text.ts` — `text()` helper centralizing UI strings (used by the calendar/Recap page).
- `src/ui/proto/` — a suite of design prototypes (Scene/Overworld/Rail/Dialogue/Stream layouts, SeamLab…) mounted under `/proto/*` and `/poc` routes for experimentation. Not part of the game proper.
- Outside `src/`: `_parked/` (shelved code — Heavenly Veil zoom effect, elder intro screen), `mockups/` (color-standard.html), `prompts/` (Claude prompts for event generation and first-run interview).

## Boot sequence (src/main.tsx)

1. Register all entities into `EntityRegistry` (activities, items, locations, navigation). In dev, `validateContent()` then runs — any dangling key reference in the content data (place→activity, connections, unlock targets/conditions) throws a named error at boot instead of silently vanishing content.
2. `initializeGameEventListeners()` — registers `allUnlockables()` with the evaluator and wires EventBus handlers (unlock checks on `activity:completed`/`cultivator:stat-changed`/`inventory:currency-changed`, notification push, reincarnation save-clear + re-registration).
3. `SaveManager.load()` then `SaveManager.startAutoSave()`, plus the flush-on-exit listeners (`beforeunload`, `visibilitychange` → save when hidden).
4. `bootRun()` — seeds the default background + opening narration when `!introComplete`, then `gameLoop.start()`.
5. Mount React Router routes.

## Tick loop and aging

`runTick()` (in `engine/gameLoop.ts`) runs four systems per tick:

- `timeSystem` — advances `ticks`; rolls `day` every 24 ticks; reports `rolledDay`.
- `activitySystem` — finds the unit at `scheduleIndex`, advances `runningTicks`, and on reaching the activity's `timeCost` completes it (effects + `activity:completed`) and bumps `scheduleIndex`. Past the end of the schedule it idles (does nothing).
- `dayRollSystem` (only on a day roll) — if `repeatActivities`, resets `scheduleIndex` to 0, replaying the day's schedule.
- `agingSystem` — derives the expected age from the day counter (`initialAge + floor(day / DAYS_PER_YEAR)`; no module aging state, so save/load can't drift a birthday), increments toward it at most one year per tick with an unlock check per increment, and on `age >= lifespan` sets `hasFallen`, stops the loop, and emits `cultivator:death`.

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
