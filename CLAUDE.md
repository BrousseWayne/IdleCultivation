# Idle Cultivation Game

## Recent Refactor Summary (Jan 2026)

**Phase 1: Store Migration (COMPLETED)**
- ✅ All 4 Zustand stores created and functional
  - `cultivatorStore`: Player stats (age, vitality, satiety, mortality, stats)
  - `gameStore`: Time system, unlocks, calendar, navigation, explore state
  - `activityStore`: Queue management, allocations, rewards
  - `inventoryStore`: Spirit stones, items, equipment
- ✅ All custom hooks deleted (useActivityQueue, useGameClock, useInventoryManager, usePlayerResources, usePlayerState)
- ✅ GameStateContext reduced to minimal GameStateProvider (only runs activity executor)
- ✅ All pages/components migrated to use stores directly

**Phase 2: Services Layer (COMPLETED)**
- ✅ EntityRegistry service - O(1) entity lookups
  - Replaced all `.find()` operations with registry lookups
  - Indexes activities, items, locations, navigation by ID
- ✅ EventBus service - Pub-sub pattern for decoupling
  - Type-safe events with discriminated unions
  - Removed tight coupling between stores
  - Events: `activity:reward-earned`, `activity:completed`, `cultivator:stat-changed`, `game:tick`
- ✅ UnlockEvaluator service - Data-driven unlock conditions
  - Supports stat, age, activity_completions, spirit_stones, day conditions
  - AND/OR composition for complex conditions
  - Event-driven evaluation (no polling)
  - Test unlockables: "study" at age 15, "social" at 20 Strength

**Current State:**
- Data still in TypeScript files (activity.ts, items.ts, etc.) - not JSON yet
- Services layer complete and functional
- All entity lookups use EntityRegistry (O(1) performance)
- Stores communicate via EventBus (decoupled)
- Unlock system ready for data-driven conditions

---

## Project Vision

A run-based idle/incremental game set in a xianxia (Chinese cultivation fantasy) world. The player starts as a mortal, grinds through cultivation realms, dies, reincarnates with bonuses, and eventually achieves true immortality.

### Core Inspirations
- **Antimatter Dimensions**: Big numbers, automation layers, stacked prestige
- **Progress Knight**: Life sim structure, skills/jobs, XP multipliers persist
- **Increlution**: Queue-based actions, instinct levels, story-driven
- **Tales of Immortal**: Procedural artifacts/techniques, roguelike elements
- **Top Tier Providence / RMJI / BTTH**: Cultivation realm progression, alchemy, artifacts

### Game Phases
- **Early**: Mortal life sim - survival, jobs, skills, managing expenses
- **Mid**: Cultivation unlocks, automation, first prestige (death/reincarnation)
- **Late**: Multiple prestige layers, cosmic timescales (millions of years)
- **Endgame**: True immortality, universe-scale resources

### Design Principles
- **Diegetic mechanics**: Everything explainable in-world (automation = disciples/formations, not "autobuyers")
- **Story text**: Use xianxia novel tone ("broken English" cultivation novel style)
- **UI text**: Always clear and unambiguous
- **Tropes are features**: Young masters, jade beauties, heavenly tribulations - embrace the clichés

---

## Architecture

### State Management: Zustand Stores

Zustand is simpler than Redux/Context. Each store is a hook with state + actions.

**Why Zustand over Context:**
- Components only re-render when their subscribed slice changes
- No provider nesting hell
- Actions live inside the store (no separate reducers)
- Works outside React (services can read/write state)

**Start with 4 core stores** (expand later as needed):

```
src/app/stores/
├── cultivatorStore.ts  # Player: vitality, age, qi, realm, stats
├── inventoryStore.ts   # Items, artifacts, spirit stones
├── activityStore.ts    # Queue, current activity, allocations
├── gameStore.ts        # Time, unlocks, flags, story log
```

**Basic Zustand Pattern:**
```typescript
import { create } from 'zustand'

interface CultivatorState {
  vitality: number
  qi: number
  realm: string
  takeDamage: (amount: number) => void
  cultivate: (qiGain: number) => void
}

export const useCultivatorStore = create<CultivatorState>((set) => ({
  vitality: 100,
  qi: 0,
  realm: 'Mortal',

  takeDamage: (amount) => set((state) => ({
    vitality: Math.max(0, state.vitality - amount)
  })),

  cultivate: (qiGain) => set((state) => ({
    qi: state.qi + qiGain
  })),
}))
```

**Using in Components:**
```typescript
function VitalityBar() {
  const vitality = useCultivatorStore((state) => state.vitality)
  return <ProgressBar value={vitality} max={100} />
}

function CultivateButton() {
  const cultivate = useCultivatorStore((state) => state.cultivate)
  return <button onClick={() => cultivate(10)}>Cultivate</button>
}
```

**Using Outside React (in services or other stores):**
```typescript
const currentQi = useCultivatorStore.getState().qi
useCultivatorStore.getState().takeDamage(50)
```

**Cross-Store Communication (EventBus Pattern):**
```typescript
// In activityStore.ts - emit events
applyReward: (reward) => {
  EventBus.emit({ type: "activity:reward-earned", payload: { reward } });
}

// In gameEventListeners.ts - handle events
EventBus.on("activity:reward-earned", ({ payload }) => {
  if ("currency" in payload.reward) {
    useInventoryStore.getState().addSpiritStones(payload.reward.amount);
  } else if ("stat" in payload.reward) {
    useCultivatorStore.getState().setStats({
      ...cultivatorStore.stats,
      [payload.reward.stat]: currentValue + payload.reward.amount
    });
  }
});
```

Stores are now decoupled - activityStore no longer imports other stores.

### Data Format: TypeScript (migrating to JSON)

**Current State:** Game content is in TypeScript files with typed exports.

```
src/app/data/
├── activity.ts      # Activity definitions with icons
├── items.ts         # Items, artifacts, consumables
├── constant.ts      # Initial values and constants
├── lifestyle.ts     # Lifestyle-related data
├── locations.ts     # World map, areas
├── navigation.ts    # Navigation structure
├── quests.ts        # Quest data
├── story.ts         # Story events
```

**Current Pattern**:
```typescript
import { activityData } from '../data/activity'
const activities: Activity[] = activityData
```

**Future Target:** Move to JSON for content-only data (items, realms, events), keep TS for data with functions/icons.

### Entity Registry (IMPLEMENTED)

Central lookup for all game entities with O(1) performance.

```typescript
// Usage
const item = EntityRegistry.get<InventoryItem>('item', String(itemId));
const activity = EntityRegistry.get<Activity>('activity', activityKey);
const location = EntityRegistry.get('location', locationName);

// API
EntityRegistry.register(type, id, entity)  // Register entity
EntityRegistry.get<T>(type, id)           // Get entity (O(1))
EntityRegistry.getAll<T>(type)            // Get all of type
EntityRegistry.has(type, id)              // Check exists
```

**Implementation:** Map-based storage in `src/app/services/EntityRegistry.ts`
**Initialized in:** `main.tsx` before React mounts
**Entities indexed:** activities, items, locations, navigation

### Event Bus (IMPLEMENTED)

Pub-sub system for decoupled cross-store communication with type-safe events.

```typescript
// Emit events
EventBus.emit({ type: 'activity:completed', payload: { activityKey: 'beg' } });
EventBus.emit({ type: 'cultivator:stat-changed', payload: { stat: 'Strength', oldValue: 10, newValue: 15 } });

// Listen to events
EventBus.on('activity:completed', ({ payload }) => {
  console.log(`Activity ${payload.activityKey} completed`);
});

// API
EventBus.on(eventType, handler)     // Register listener
EventBus.off(eventType, handler)    // Remove listener
EventBus.emit(event)                // Emit event
EventBus.once(eventType, handler)   // One-time listener
```

**Event naming**: `domain:action` format (e.g., `activity:reward-earned`, `game:tick`)

**Implementation:** `src/app/services/EventBus.ts` with Map-based storage
**Events defined in:** `src/app/types/events.ts` (type-safe discriminated union)
**Listeners registered in:** `src/app/services/gameEventListeners.ts`

### Unlock System (IMPLEMENTED)

Data-driven unlock conditions with event-driven evaluation.

```typescript
// Register unlockable with conditions
UnlockEvaluator.registerUnlockable({
  id: "category:study",
  unlockConditions: [
    { type: "age", operator: ">=", value: 15 }
  ],
  onUnlock: () => {
    useGameStore.getState().unlockActivityCategory("study");
  }
});

// Unlock conditions can be complex
{
  type: "and",
  conditions: [
    { type: "stat", stat: "Strength", operator: ">=", value: 20 },
    { type: "activity_completions", activityKey: "liftWeights", count: 10 }
  ]
}
```

**Supported Conditions:**
- `stat`: Check player stats (Strength, Dexterity)
- `age`: Check player age
- `activity_completions`: Check how many times activity completed
- `spirit_stones`: Check spirit stone count
- `day`: Check game day
- `and`/`or`: Compose conditions

**Implementation:** `src/app/services/UnlockEvaluator.ts`
**Condition types:** `src/app/types/unlocks.ts`
**Evaluation:** Event-driven (on activity completion, stat change, game tick)
**One-time unlocks:** Removed from evaluation pool after unlocking

---

## Coding Patterns

### File Organization
```
src/app/
├── stores/          # ✅ Zustand stores (state)
├── services/        # ✅ Service layer (EventBus, EntityRegistry, UnlockEvaluator)
├── types/           # TypeScript interfaces (domain.ts, events.ts, unlocks.ts)
├── data/            # TypeScript game content (will migrate to JSON)
├── contexts/        # GameStateProvider (minimal, only activity executor)
├── pages/           # Route pages
├── layout/          # Layout components
├── components/      # Reusable UI components
```

**Services:**
- `EntityRegistry.ts` - O(1) entity lookups
- `EventBus.ts` - Pub-sub event system
- `UnlockEvaluator.ts` - Data-driven unlock conditions
- `gameEventListeners.ts` - Event listener registration
- `index.ts` - Barrel exports

**Note:** `hooks/` directory was deleted. All custom hooks migrated into stores.

### Naming Conventions
- Stores: `useXxxStore` (e.g., `useCultivatorStore`)
- Services: PascalCase singletons (e.g., `EventBus`, `EntityRegistry`, `UnlockEvaluator`)
- Types: PascalCase (e.g., `Activity`, `CultivationRealm`)
- Data files: camelCase.ts (e.g., `activity.ts`, `items.ts`)

### Type Safety
- All JSON data must have corresponding TypeScript types
- Use discriminated unions for variants (reward types, event types)
- Avoid `any` - use `unknown` with type guards if needed
- Entity IDs should be typed (`ActivityId`, `ItemId`) not plain strings

### Adding New Content

**New Activity**:
1. Add to `activities.json` with unlock conditions
2. Type already exists - no code changes needed
3. EntityRegistry auto-indexes on load

**New Game System** (e.g., Alchemy):
1. Decide: new store or extend existing? (Alchemy could extend `inventoryStore`)
2. Add `alchemy.json` for recipes/pills/herbs data
3. Add types to `types/alchemy.ts`
4. Create `AlchemyPage.tsx` for UI
5. Wire events to EventBus (`alchemy:pill-refined`, `alchemy:cauldron-exploded`)

---

## Domain Terminology

Use xianxia terms everywhere (code, data, UI):

| Western Concept | Xianxia Term | Code Variable |
|-----------------|--------------|---------------|
| Health | Vitality | `vitality` |
| Mana/Energy | Qi | `qi` |
| Max Mana | Dantian Capacity | `dantianCapacity` |
| Level/Tier | Realm | `realm` |
| Sub-level | Stage | `stage` |
| Class/Build | Dao Path | `daoPath` |
| Skill | Technique | `technique` |
| Passive Skill | Dao Insight | `daoInsight` |
| Spell | Art | `art` |
| Ultimate | Divine Art | `divineArt` |
| Equipment | Artifact | `artifact` |
| Weapon | Spiritual Weapon | `weapon` |
| Armor | Protective Treasure | `armor` |
| Accessory | Spirit Treasure | `treasure` |
| Currency | Spirit Stones | `spiritStones` |
| Premium Currency | Immortal Jade | `immortalJade` |
| XP | Enlightenment | `enlightenment` |
| Death | Passing / Falling | `hasFallen` |
| Respawn | Reincarnation | `reincarnate()` |
| Prestige Layer 1 | Reincarnation | `reincarnation` |
| Prestige Layer 2 | Ascension | `ascension` |
| Prestige Layer 3+ | Transcendence | `transcendence` |
| Buff | Blessing | `blessing` |
| Debuff | Tribulation | `tribulation` |
| Boss | Heavenly Tribulation | `heavenlyTribulation` |
| NPC | Fellow Daoist | `npc` (ok for code) |
| Loot | Fortune / Karmic Reward | `fortune` |

---

## What NOT To Do

- **Don't add state to components** - All state lives in Zustand stores
- **Don't recreate custom hooks** - Deleted for a reason, use stores directly
- **Don't use .find() for entity lookups** - Use EntityRegistry instead
- **Don't create direct store-to-store calls** - Use EventBus for cross-store communication
- **Don't hardcode unlock conditions** - Use UnlockEvaluator with data-driven conditions
- **Don't scatter unlock logic** - Register unlockables in gameEventListeners.ts
- **Don't mix concerns** - Stores = state + actions, Components = UI only
- **Don't over-engineer early** - Build incrementally, refactor when patterns emerge
- **Don't add features without unlocks** - Everything should be unlockable

---

## Next Steps

**Phase 1: Store Migration (COMPLETED ✅)**
1. ✅ Create 4 Zustand stores (cultivator, inventory, activity, game)
2. ✅ Migrate GameStateContext state into stores
3. ✅ Delete old custom hooks
4. ✅ Reduce GameStateContext to minimal provider

**Phase 2: Services Layer (COMPLETED ✅)**
1. ✅ Create `src/app/services/` directory
2. ✅ Implement EntityRegistry service
   - Index all activities, items, locations, navigation by ID/key
   - Replace all array `.find()` calls with registry lookups (O(1) performance)
3. ✅ Implement EventBus service
   - Type-safe pub-sub for cross-store communication
   - Replace direct store calls with events
   - Centralized event listeners in gameEventListeners.ts
4. ✅ Implement UnlockEvaluator service
   - Data-driven unlock conditions (stat, age, activity_completions, etc.)
   - Event-driven evaluation (no polling)
   - AND/OR composition support
   - Test unlockables implemented

**Phase 3: Data Layer (NEXT)**
1. [ ] Move pure data to JSON files (items, locations, realms, events)
2. [ ] Keep TypeScript for data with functions/icons (activities)
3. [ ] Add unlock conditions to data files
4. [ ] Validate JSON schemas at load time

**Phase 4: Advanced Systems (FUTURE)**
1. [ ] SaveManager for persistence
2. [ ] Cultivation system (qi, realms, breakthroughs)
3. [ ] Reincarnation/prestige mechanics
4. [ ] Combat system with tribulations

---

## Testing Changes

- Run `npm run dev` to verify UI works
- Check browser console for errors
- Verify state updates propagate correctly
- Test activity queue execution
- Confirm navigation between pages works
