# Phase 2: Services Layer Implementation Plan

## Overview

Implement 3 core services to decouple stores, optimize data access, and create a data-driven unlock system.

**Goal:** Replace tight coupling and linear searches with a service layer that follows the architecture defined in CLAUDE.md.

---

## Current Problems

1. **Tight Coupling:** activityStore directly calls inventoryStore/cultivatorStore via `.getState()` (activityStore.ts:75, 77)
2. **O(n) Lookups:** 13 `.find()` operations for entity lookups (activities, items, locations)
3. **Dead Unlock Code:** `unlockNavigationTab()` and `unlockActivityCategory()` exist but never called
4. **No Unlock System:** Everything hardcoded as unlocked, no conditional progression
5. **Scattered Logic:** Unlock filtering in multiple components (navigationSidebar.tsx:14, activities.tsx:133)

---

## Architecture Design

### 1. EntityRegistry Service

**Purpose:** O(1) entity lookups replacing `.find()` operations

**Implementation:**
```typescript
// src/app/services/EntityRegistry.ts
type EntityType = 'activity' | 'item' | 'location' | 'navigation';

class EntityRegistryService {
  private registries = new Map<EntityType, Map<string, any>>();

  register<T>(type: EntityType, id: string, entity: T): void
  get<T>(type: EntityType, id: string): T | undefined
  getAll<T>(type: EntityType): T[]
  has(type: EntityType, id: string): boolean
}
```

**Key Decisions:**
- Use `Map` for O(1) performance
- Normalize keys at registration (activity.key → id, item.id → string id)
- Immutable after initialization
- Type-safe accessors

**Initialization:** Called once at app startup, populates from data files

**Migration:**
- Replace 4 `.find()` calls in:
  - activities.tsx:38
  - inventoryStore.ts:67
  - travel.tsx:10, 77

---

### 2. EventBus Service

**Purpose:** Decouple stores via pub-sub pattern

**Implementation:**
```typescript
// src/app/services/EventBus.ts
type GameEvent =
  | { type: 'activity:reward-earned', payload: { reward: Reward } }
  | { type: 'cultivator:stat-changed', payload: { stat: Stats, value: number } }
  | { type: 'game:tick', payload: { ticks: number, day: number } }
  // ... more events

class EventBusService {
  private listeners = new Map<string, Set<EventHandler>>();

  on(eventType: string, handler: EventHandler): void
  off(eventType: string, handler: EventHandler): void
  emit(event: GameEvent): void
  once(eventType: string, handler: EventHandler): void
}
```

**Key Decisions:**
- String-based events with `domain:action` naming
- Synchronous execution (simpler, matches current behavior)
- Type-safe event payloads via discriminated unions
- Central listener registration in `gameEventListeners.ts`

**Migration Pattern:**

Before:
```typescript
// activityStore.ts:75
useInventoryStore.getState().addSpiritStones(reward.amount);
```

After:
```typescript
// activityStore.ts
EventBus.emit({ type: 'activity:reward-earned', payload: { reward } });

// gameEventListeners.ts
EventBus.on('activity:reward-earned', ({ payload }) => {
  if ("currency" in payload.reward) {
    useInventoryStore.getState().addSpiritStones(payload.reward.amount);
  }
});
```

**Benefits:**
- activityStore no longer imports other stores
- Reward logic centralized
- UnlockEvaluator can listen to all state changes

---

### 3. UnlockEvaluator Service

**Purpose:** Data-driven unlock system with conditional progression

**Implementation:**
```typescript
// src/app/services/UnlockEvaluator.ts
type UnlockCondition =
  | { type: 'stat', stat: Stats, operator: '>=' | '>' | '<', value: number }
  | { type: 'age', operator: '>=' | '>' | '<', value: number }
  | { type: 'activity_completions', activityKey: string, count: number }
  | { type: 'and', conditions: UnlockCondition[] }
  | { type: 'or', conditions: UnlockCondition[] }

class UnlockEvaluatorService {
  private unlockables = new Map<string, UnlockableEntity>();

  registerUnlockable(entity: UnlockableEntity, onUnlock: () => void): void
  evaluate(conditions: UnlockCondition[]): boolean
  checkAll(): void // Re-evaluate all unlockables
}
```

**Key Decisions:**
- Conditions as data, not code
- Event-driven evaluation (not polling)
- Support AND/OR composition
- One-time unlocks (remove after unlocking)

**Evaluation Flow:**

1. **Registration (app startup):**
```typescript
activityData.forEach(activity => {
  if (activity.unlockConditions) {
    UnlockEvaluator.registerUnlockable({
      id: `activity:${activity.key}`,
      unlockConditions: activity.unlockConditions
    }, () => {
      useGameStore.getState().unlockActivityCategory(activity.category);
    });
  }
});
```

2. **Automatic checks (event-driven):**
```typescript
// In gameEventListeners.ts
EventBus.on('cultivator:stat-changed', () => UnlockEvaluator.checkAll());
EventBus.on('activity:completed', () => UnlockEvaluator.checkAll());
EventBus.on('game:tick', () => UnlockEvaluator.checkAll());
```

**Example Unlock Condition:**
```typescript
// Unlock "study" category at age 15 with 10 Strength
{
  key: "readScrolls",
  category: "study",
  unlocked: false,
  unlockConditions: [
    { type: 'age', operator: '>=', value: 15 },
    { type: 'stat', stat: 'Strength', operator: '>=', value: 10 }
  ]
}
```

**Migration Strategy:**
- Keep `unlocked: boolean` field for backward compatibility
- Add optional `unlockConditions` field to Activity/LifestyleOption types
- UnlockEvaluator sets `unlocked: true` when conditions met
- Components continue filtering by `unlocked` field

---

## Implementation Phases

### Phase 2A: EntityRegistry (Day 1)

**Files to Create:**
- `src/app/services/EntityRegistry.ts` (~150 lines)
- `src/app/services/index.ts` (barrel export)

**Steps:**
1. Create EntityRegistry service with Map-based storage
2. Add initialization function that reads from data files
3. Call initialization in main.tsx before React root mounts
4. Add type-safe getters: `getActivity()`, `getItem()`, `getLocation()`
5. Test via console: `window.EntityRegistry.get('activity', 'beg')`

**Files to Modify:**
- `activities.tsx:38` - Replace `.find()` with `EntityRegistry.getActivity(key)`
- `inventoryStore.ts:67` - Replace `.find()` with `EntityRegistry.getItem(id)`
- `travel.tsx:10, 77` - Replace `.find()` with `EntityRegistry.getLocation(name)`

**Verification:** All pages load without errors, entity lookups work

---

### Phase 2B: EventBus (Days 2-3)

**Files to Create:**
- `src/app/services/EventBus.ts` (~80 lines)
- `src/app/services/gameEventListeners.ts` (~100 lines)
- `src/app/types/events.ts` (event type definitions)

**Steps:**
1. Create EventBus service with Map<string, Set<handler>> storage
2. Define GameEvent discriminated union in types/events.ts
3. Create gameEventListeners.ts with empty listeners initially
4. Initialize EventBus and listeners in main.tsx
5. Add temporary console.log to all event handlers for debugging

**Files to Modify:**
- `activityStore.ts:73-84` - Emit `activity:reward-earned` event instead of direct calls
- `gameEventListeners.ts` - Listen to `activity:reward-earned`, apply rewards to stores

**Verification:**
- Complete activity → spirit stones increase (check inventory)
- Complete activity → stat increases (check stats panel)
- Console shows event fired

---

### Phase 2C: UnlockEvaluator (Days 4-5)

**Files to Create:**
- `src/app/services/UnlockEvaluator.ts` (~200 lines)
- `src/app/types/unlocks.ts` (condition type definitions)

**Steps:**
1. Create UnlockCondition types (stat, age, activity_completions, and, or)
2. Create UnlockEvaluator service with evaluation logic
3. Add completion tracking to activityStore (new state: `completionCounts: Record<ActivityKeys, number>`)
4. Register all existing unlockables (even if conditions are empty)
5. Add event listeners to trigger checkAll() on relevant events
6. Create test unlock: "study category unlocks at age 15"

**Files to Modify:**
- `types/domain.ts` - Add `unlockConditions?: UnlockCondition[]` to Activity, LifestyleOption, SidebarNavigation
- `activityStore.ts` - Add `completionCounts` state, increment in `completeCurrentActivity()`
- `gameEventListeners.ts` - Add listeners for unlock checks
- `activity.ts` - Add first test unlock condition (optional field)

**Verification:**
- Start game → "study" category locked
- Advance age to 15 → "study" category unlocks automatically
- Unlock appears in UI
- gameStore unlock actions called

---

### Phase 2D: Integration & Testing (Day 6)

**Steps:**
1. Remove all remaining `.find()` calls
2. Remove all direct store-to-store calls
3. Test all pages load and work correctly
4. Test unlock flow with multiple conditions
5. Add unlock notifications (optional: toast or event log entry)
6. Document event types and unlock patterns in CLAUDE.md

**Testing Checklist:**
- [ ] Activities page loads
- [ ] Activity allocation works
- [ ] Activity completion grants rewards
- [ ] Inventory item equipping works
- [ ] Travel location selection works
- [ ] Unlock conditions trigger correctly
- [ ] No console errors
- [ ] No broken imports

---

## File Structure

**New Files:**
```
src/app/services/
├── EntityRegistry.ts          # Entity lookup (150 lines)
├── EventBus.ts                # Pub-sub system (80 lines)
├── UnlockEvaluator.ts         # Unlock conditions (200 lines)
├── gameEventListeners.ts      # Event listener setup (100 lines)
└── index.ts                   # Barrel export

src/app/types/
├── events.ts                  # GameEvent types
└── unlocks.ts                 # UnlockCondition types
```

**Modified Files:**
```
src/app/
├── main.tsx                   # Initialize services
├── types/domain.ts            # Add unlockConditions field
├── stores/activityStore.ts    # Emit events, track completions
├── stores/inventoryStore.ts   # Use EntityRegistry
├── pages/activities.tsx       # Use EntityRegistry
├── pages/travel.tsx           # Use EntityRegistry
```

**Total:** 5 new files, 6 modified files

---

## Critical Implementation Details

### EntityRegistry Initialization

```typescript
// main.tsx
import { EntityRegistry } from './app/services';
import { activityData } from './app/data/activity';
import { items } from './app/data/items';
import { locations } from './app/data/locations';
import { sidebarData } from './app/data/navigation';

// Initialize before React root
activityData.forEach(a => EntityRegistry.register('activity', a.key, a));
items.forEach(i => EntityRegistry.register('item', String(i.id), i));
locations.forEach(l => EntityRegistry.register('location', l.name, l));
sidebarData.forEach(n => EntityRegistry.register('navigation', n.name, n));

// Then mount React
```

### EventBus Listener Setup

```typescript
// gameEventListeners.ts
import { EventBus } from './EventBus';
import { useInventoryStore, useCultivatorStore } from '../stores';
import { UnlockEvaluator } from './UnlockEvaluator';

export function initializeGameEventListeners() {
  // Reward application
  EventBus.on('activity:reward-earned', ({ payload }) => {
    if ("currency" in payload.reward) {
      useInventoryStore.getState().addSpiritStones(payload.reward.amount);
    } else if ("stat" in payload.reward) {
      const cultivator = useCultivatorStore.getState();
      cultivator.setStats({
        ...cultivator.stats,
        [payload.reward.stat]: (cultivator.stats[payload.reward.stat] || 0) + payload.reward.amount
      });
    }
  });

  // Unlock checks
  EventBus.on('cultivator:stat-changed', () => UnlockEvaluator.checkAll());
  EventBus.on('activity:completed', () => UnlockEvaluator.checkAll());
  EventBus.on('game:tick', () => UnlockEvaluator.checkAll());
}
```

### UnlockEvaluator Registration

```typescript
// In initializeGameEventListeners() or separate function
activityData.forEach(activity => {
  if (activity.unlockConditions) {
    UnlockEvaluator.registerUnlockable({
      id: `activity:${activity.key}`,
      unlockConditions: activity.unlockConditions
    }, () => {
      useGameStore.getState().unlockActivityCategory(activity.category);
      console.log(`Unlocked activity: ${activity.name}`);
    });
  }
});
```

---

## Trade-offs & Decisions

| Decision | Chosen Approach | Rationale |
|----------|----------------|-----------|
| EntityRegistry data structure | Map over Object | O(1) lookups, cleaner iteration, type support |
| EventBus execution | Synchronous | Simpler, matches current behavior, easier debugging |
| Unlock evaluation trigger | Event-driven | More efficient than polling, immediate feedback |
| Unlock condition storage | Data (not code) | Extensible, testable, no code changes for new unlocks |
| Type safety level | Strong (discriminated unions) | Catch errors at compile time, better IDE support |
| Backward compatibility | Keep `unlocked` field | Incremental migration, no big-bang changes |

---

## Performance Considerations

**EntityRegistry:**
- O(1) lookups vs current O(n) `.find()`
- 13 lookups eliminated → ~130 array iterations saved per render
- Negligible memory overhead (entities already loaded)

**EventBus:**
- O(n) handler execution where n = listeners per event
- Expected: 1-5 listeners per event type
- No performance concerns

**UnlockEvaluator:**
- Optimizations:
  1. Remove from evaluation pool once unlocked (one-time check)
  2. Cache evaluation results (re-evaluate only on state change)
  3. Batch checks (if >100 unlockables, throttle to every 10 ticks)
- Current scale: ~20 unlockables × ~3 conditions = 60 evaluations
- With optimizations: ~5-10 evaluations per relevant event

---

## Error Handling

**EntityRegistry:**
- Return `undefined` for missing entities (don't throw)
- Add `console.warn` in development for missing entities
- Components handle gracefully (show placeholder or skip)

**EventBus:**
- Wrap handlers in try-catch
- Log errors but continue executing other handlers
- Don't crash app if one handler fails

**UnlockEvaluator:**
- Invalid conditions default to `false` (fail closed)
- Log warnings for unknown condition types
- Don't crash if store data missing

---

## Testing Strategy

### Manual Testing (Primary)

**EntityRegistry:**
1. Open console: `EntityRegistry.get('activity', 'beg')` → returns activity
2. Load activities page → no errors
3. Allocate activity → works
4. Load travel page → locations display
5. Select location → works

**EventBus:**
1. Complete activity → check inventory increases
2. Complete activity → check stats increase
3. Open console → see event logs
4. Verify no "handler not found" errors

**UnlockEvaluator:**
1. Create test unlock: "study unlocks at age 15"
2. Start game at age 12 → study locked
3. Increment age to 15 → study unlocks
4. Check console for unlock log
5. Verify unlock appears in UI

### Regression Testing

- [ ] All pages load without errors
- [ ] Activity queue execution works
- [ ] Time allocation works
- [ ] Equipment system works
- [ ] Navigation works
- [ ] Stats display correctly

---

## Success Criteria

**Phase 2A Complete:**
- [ ] EntityRegistry service created and working
- [ ] All 4 `.find()` calls replaced with EntityRegistry
- [ ] No errors in console
- [ ] All entity lookups working

**Phase 2B Complete:**
- [ ] EventBus service created and working
- [ ] activityStore emits events instead of direct calls
- [ ] Rewards still apply correctly
- [ ] No tight coupling between stores

**Phase 2C Complete:**
- [ ] UnlockEvaluator service created and working
- [ ] First test unlock condition implemented
- [ ] Unlock triggers automatically
- [ ] gameStore unlock actions called

**Phase 2D Complete:**
- [ ] All services integrated
- [ ] All tests passing
- [ ] Documentation updated
- [ ] No regressions
- [ ] Ready for Phase 3 (Data Layer)

---

## Next Phase Preview

**Phase 3: Data Layer (Future)**
- Move pure data to JSON files (items, locations, realms)
- Keep TypeScript for data with functions (activities with icons)
- Add unlock conditions to all data files
- Validate JSON schemas at load time

**Phase 4: Advanced Systems (Future)**
- SaveManager for persistence
- Cultivation system (qi, realms, breakthroughs)
- Reincarnation/prestige mechanics
- Combat system with tribulations
