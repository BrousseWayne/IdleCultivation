# Idle Cultivation Game

## Project Vision

Genre blend: roguelike prestige loop + idle/incremental scaling + xianxia RPG life sim. Easy to learn, hard to master.

Full game design document: `docs/game-vision.md`

### Inspirations

- **Antimatter Dimensions**: Number scaling, stacked prestige layers, big numbers
- **Universal Paperclip**: Story unfolds through mechanics, new systems reveal as you progress
- **Increlution**: Queue-based action management, instinct levels
- **Progress Knight**: Life sim structure, skills/jobs, XP multipliers persist across runs
- **Xianxia novels (Top Tier Providence)**: Cultivation realms, alchemy, artifacts, tropes

### The Core Loop

- Each run = one life, starting at ~1 min/year (~80 min for a mortal life)
- Procedural background (farmer, orphan, soldier's son) — random start conditions
- Player directs the life through choices, action queues, event reactions
- Death = end of run. Reincarnation = prestige. Bonuses carry over.
- Next life is faster/richer. The incremental game IS the reincarnation cycle.

### Run Types (Non exhaustive)

- **Grind runs**: set up queue, go idle, farm a specific resource
- **Push runs**: active play, trying to reach new thresholds
- Automation unlocks progressively (even in mortal phase)

### Game Phases (There will be micro phases in each macro phases)

- **Early (Mortal/Wuxia)**: Small world, life sim, jobs/skills, survival. Multiple paths to checkpoints. First contact with martial arts.
- **Mid (Immortal Cultivation)**: World expands, lives span centuries, cultivation realms, alchemy, artifacts.
- **Late (Supreme Ascension)**: Cosmic scale, eons pass, universe-level resources.
- **Endgame (Cosmic Cultivation)**: True immortality, ultimate prestige layers.

### Design Philosophy

- Diegetic mechanics: everything explainable in-world (automation = disciples/formations)
- Story unfolds through mechanics, not exposition. New systems reveal as thresholds are hit.
- Freedom in progression: checkpoints exist, how you reach them is up to you
- Cultivation IS grinding — prestige acceleration + roguelike variance prevent monotony
- Hidden depth: hidden stats (karma, luck, choices) influence outcomes invisibly
- Xianxia tropes are features: young masters, jade beauties, heavenly tribulations
- **Story text**: xianxia novel tone ("broken English" cultivation novel style)
- **UI text**: always clear and unambiguous

---

## Architecture

### State Management: 4 Zustand Stores

```
src/app/stores/
├── cultivatorStore.ts  # Player: vitality, age, satiety, mortality, stats
├── inventoryStore.ts   # Spirit stones, items, equipment
├── activityStore.ts    # Queue, allocations, completion counts
├── gameStore.ts        # Time, unlocks, calendar, navigation, explore state
```

Components subscribe to store slices directly. Services access stores via `useXxxStore.getState()`.
Stores communicate via EventBus (no direct cross-store imports).

### State Layers (run vs meta)

- **Run state** (resets on death): vitality, age, inventory, realm, run-scoped stats — current stores
- **Meta state** (persists forever): prestige currencies, hidden stats (karma, luck, choices), permanent unlocks — not yet implemented

### Services Layer

```
src/app/services/
├── EntityRegistry.ts      # O(1) entity lookups by type+id
├── EventBus.ts            # Pub-sub for cross-store communication
├── UnlockEvaluator.ts     # Data-driven unlock conditions (stat, age, activity_completions, spirit_stones, day, and/or)
├── gameEventListeners.ts  # Event listener registration + unlockable registration
├── SaveManager.ts         # Persistence
├── index.ts               # Barrel exports
```

- **EntityRegistry**: `EntityRegistry.get<T>(type, id)` — Map-based, initialized in `main.tsx` before React mounts
- **EventBus**: `EventBus.emit(event)` / `EventBus.on(type, handler)` — event naming: `domain:action`
- **UnlockEvaluator**: data-driven conditions, event-driven evaluation (no polling), one-time unlocks removed from pool

Events defined in `src/app/types/events.ts` (discriminated union).
Unlock conditions defined in `src/app/types/unlocks.ts`.

### Data Layer

```
src/app/data/
├── activity.ts      # Activity definitions (TS — has icons/functions)
├── items.ts         # Items, artifacts, consumables
├── constant.ts      # Initial values and constants
├── lifestyle.ts     # Lifestyle options
├── locations.ts     # World locations
├── navigation.ts    # Navigation structure
├── quests.ts        # Quest data
├── story.ts         # Story events
├── unlocks.ts       # Unlockable definitions
├── sectionColors.ts # UI color mappings
├── exploreLocations.ts # Explore page data
```

Data is in TypeScript files. Future: pure data to JSON, keep TS for data with functions/icons.

---

## Coding Patterns

### File Organization

```
src/app/
├── stores/          # Zustand stores (state + actions)
├── services/        # Singletons (EventBus, EntityRegistry, UnlockEvaluator)
├── types/           # TypeScript interfaces (domain.ts, events.ts, unlocks.ts)
├── data/            # Game content (TS, migrating to JSON)
├── contexts/        # GameStateProvider (minimal — only runs activity executor)
├── pages/           # Route pages
├── layout/          # Layout components
├── components/      # Reusable UI components
docs/                # Game design documents (game-vision.md)
```

### Naming Conventions

- Stores: `useXxxStore` (e.g., `useCultivatorStore`)
- Services: PascalCase singletons (e.g., `EventBus`, `EntityRegistry`)
- Types: PascalCase (e.g., `Activity`, `CultivationRealm`)
- Data files: camelCase.ts (e.g., `activity.ts`, `items.ts`)

### Type Safety

- Use discriminated unions for variants (reward types, event types, unlock conditions)
- Avoid `any` — use `unknown` with type guards
- Entity IDs should be typed (`ActivityId`, `ItemId`) not plain strings

### Adding New Content

- **New Activity**: Add to `activity.ts`, EntityRegistry auto-indexes on load
- **New Game System**: New store or extend existing → data file → types → page → EventBus events

---

## Domain Terminology

Use xianxia terms everywhere (code, data, UI):

| Western Concept   | Xianxia Term            | Code Variable         |
| ----------------- | ----------------------- | --------------------- |
| Health            | Vitality                | `vitality`            |
| Mana/Energy       | Qi                      | `qi`                  |
| Max Mana          | Dantian Capacity        | `dantianCapacity`     |
| Level/Tier        | Realm                   | `realm`               |
| Sub-level         | Stage                   | `stage`               |
| Class/Build       | Dao Path                | `daoPath`             |
| Skill             | Technique               | `technique`           |
| Passive Skill     | Dao Insight             | `daoInsight`          |
| Spell             | Art                     | `art`                 |
| Ultimate          | Divine Art              | `divineArt`           |
| Equipment         | Artifact                | `artifact`            |
| Weapon            | Spiritual Weapon        | `weapon`              |
| Armor             | Protective Treasure     | `armor`               |
| Accessory         | Spirit Treasure         | `treasure`            |
| Currency          | Spirit Stones           | `spiritStones`        |
| Premium Currency  | Immortal Jade           | `immortalJade`        |
| XP                | Enlightenment           | `enlightenment`       |
| Death             | Passing / Falling       | `hasFallen`           |
| Respawn           | Reincarnation           | `reincarnate()`       |
| Prestige Layer 1  | Reincarnation           | `reincarnation`       |
| Prestige Layer 2  | Ascension               | `ascension`           |
| Prestige Layer 3+ | Transcendence           | `transcendence`       |
| Buff              | Blessing                | `blessing`            |
| Debuff            | Tribulation             | `tribulation`         |
| Boss              | Heavenly Tribulation    | `heavenlyTribulation` |
| NPC               | Fellow Daoist           | `npc` (ok for code)   |
| Loot              | Fortune / Karmic Reward | `fortune`             |

---

## What NOT To Do

- **Don't add state to components** — All state lives in Zustand stores
- **Don't recreate custom hooks** — Deleted for a reason, use stores directly
- **Don't use .find() for entity lookups** — Use EntityRegistry
- **Don't create direct store-to-store calls** — Use EventBus
- **Don't hardcode unlock conditions** — Use UnlockEvaluator with data-driven conditions
- **Don't scatter unlock logic** — Register unlockables in gameEventListeners.ts
- **Don't mix concerns** — Stores = state + actions, Components = UI only
- **Don't add features without unlocks** — Everything should be unlockable

---

## Next Steps

**Phase 3: Effect System + Data Layer (COMPLETED)**

1. [x] Effect System: `Effect[]` discriminated union + `EffectExecutor` service
2. [x] Migrated `ActivityModel.reward` → `ActivityModel.effects: Effect[]`
3. [x] EffectExecutor calls stores directly (replaced `activity:reward-earned` event)
4. [x] Unlocks migrated to JSON (`unlockables.json` + Zod schema)
5. [x] Unlock conditions wired into lifestyle, navigation, explore data
6. [x] Explore locations cleaned up: types → domain.ts, reward → Effect[]
7. [x] All entities with `unlockConditions` auto-registered in gameEventListeners

**Phase 4: Advanced Systems (FUTURE)**

1. [ ] Cultivation system (qi, realms, breakthroughs)
2. [ ] Reincarnation/prestige mechanics (run state vs meta state)
3. [ ] Combat system
4. [ ] Procedural background generation

---

## Testing Changes

- `npm run dev` — verify UI works
- Check browser console for errors
- Verify state updates propagate correctly
- Test activity queue execution
- Confirm navigation between pages works
