# Idle Cultivation - Exhaustive Codebase Reference

> **Purpose**: This document provides AI assistants with complete context about the project's architecture, game mechanics, and codebase structure. It is auto-loaded at the start of each Claude Code session.

---

## 1. PROJECT OVERVIEW & GAME CONCEPT

### What is Idle Cultivation?

**Idle Cultivation** is a browser-based **idle/incremental game** with a **Chinese xianxia (cultivation/immortality) theme**. Players begin as a humble 12-year-old farmer and progress through various stages of cultivation to eventually become an immortal.

### Core Gameplay Loop

```
┌─────────────────────────────────────────────────────────────┐
│  1. PLAN: Allocate daily time budget to activities          │
│     ↓                                                       │
│  2. EXECUTE: Game clock runs, activities complete           │
│     ↓                                                       │
│  3. REWARD: Earn currency or stat gains                     │
│     ↓                                                       │
│  4. IMPROVE: Spend on lifestyle upgrades (housing/meals)    │
│     ↓                                                       │
│  5. EXPLORE: Travel to new locations, discover quests       │
│     ↓                                                       │
│  6. PROGRESS: Age increases, cultivation advances           │
│     └──────────────────────────────────────────────────→ REPEAT
└─────────────────────────────────────────────────────────────┘
```

### Key Game Pillars

1. **Time Management**: Players have 24 time points/day to allocate across activities
2. **Idle Progression**: Game runs automatically; activities execute in queue
3. **Resource Economy**: Earn tiered currencies, manage income vs expenses
4. **Lifestyle Choices**: Housing, meals, and transportation affect XP and mortality
5. **Exploration**: 8 world locations with travel times and connections
6. **Mortality System**: Player ages; death occurs when age ≥ lifespan

---

## 2. TECH STACK & CONFIGURATION

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| TypeScript | ~5.8 | Type safety |
| Vite | 7.1 | Build tool & dev server |
| Tailwind CSS | 4.1 | Utility-first styling |
| Zustand | 5.0 | Lightweight state management |
| React Router | 7.8 | Client-side routing |
| shadcn/ui | - | Component library (New York style) |
| Lucide React | 0.454 | Icon library |

### Path Aliases

```typescript
"@/*" → "./src/*"
"@/components" → "./src/components"
"@/app" → "./src/app"
"@/hooks" → "./src/app/hooks"
"@/lib" → "./src/app/lib"
"@/ui" → "./src/components/ui"
```

### NPM Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build → /dist
npm run lint     # ESLint check
npm run preview  # Preview production build
```

### Key Config Files

- `vite.config.ts` - Vite + React + Tailwind plugins
- `tsconfig.json` - TypeScript with strict mode
- `components.json` - shadcn/ui configuration (New York style, neutral colors)
- `eslint.config.js` - ESLint with TypeScript + React rules

---

## 3. GAME SYSTEMS & BUSINESS LOGIC

### 3.1 Player Stats & Lifecycle

**Initial State** (from `src/app/data/constant.ts`):
```typescript
initialPlayerAge = 12
initialPlayerLifespan = 60
initialPlayerHp = { max: 100, current: 100 }
initialPlayerSatiety = { max: 100, current: 100 }
initialPlayerMortality = { max: 100, current: 1 }
initialPlayerMoney = 10 (Bronze)
```

**Stats System**:
- **Strength**: Gained from training activities (e.g., "Lift Weights")
- **Dexterity**: Defined but not yet implemented

**Death Condition**: `age >= lifespan` (player dies)

### 3.2 Currency System (4 Tiers)

| Currency | Color | Typical Use |
|----------|-------|-------------|
| Bronze | Orange | Entry-level rewards (begging: 100 Bronze) |
| Silver | Slate | Mid-tier purchases |
| Gold | Yellow | Premium items |
| Platinum | Cyan | Legendary items |

### 3.3 Activity System

**Categories** (7 total):
- `work` - Earn money (unlocked by default)
- `training` - Gain stats (unlocked by default)
- `study` - Learn skills
- `social` - Build relationships
- `life` - Daily necessities
- `hobby` - Recreation
- `adventure` - Combat/exploration

**Current Activities**:

| Activity | Category | Time Cost | Reward |
|----------|----------|-----------|--------|
| Beg | work | 8 hours | 100 Bronze |
| Lift Weights | training | 4 hours | +5 Strength |

**Execution Flow**:
1. Player allocates hours → deducts from `timePoints`
2. Activity enqueued into `activityQueue`
3. Game clock ticks (24 ticks = 1 day)
4. When `ticks >= timeCost`: activity completes
5. Reward applied, activity dequeued
6. If `repeatActivities` enabled: re-queue

### 3.4 Lifestyle System

**Categories with Options** (from `src/app/data/lifestyle.ts`):

**Housing** (affects XP & mortality):
| Option | Cost | XP Bonus | Mortality |
|--------|------|----------|-----------|
| Streets | Free | -0.5 | +0.2 |
| Shabby Tent | 100 Bronze | - | +0.1 |
| Simple Cottage | 5 Silver | +0.1 | - |

**Meals** (affects XP):
| Option | Cost | XP Bonus | Mortality |
|--------|------|----------|-----------|
| Bread & Water | 5 Bronze/day | - | - |
| Spirit Rice | 2 Silver/day | +0.1 | - |
| Immortal Banquet | 1 Gold/week | +0.5 | -0.05 |

**Transportation** (affects safety):
| Option | Cost | XP Bonus | Mortality |
|--------|------|----------|-----------|
| Walking | Free | - | +0.05 |
| Spirit Horse | 50 Silver + 1 Silver/day | - | -0.05 |
| Flying Sword | 5 Gold + 2 Silver/day | +0.05 | -0.1 |

### 3.5 Inventory & Equipment

**Equipment Slots** (6):
- Weapon, Armor, Helmet, Boots, Ring, Amulet

**Rarity Tiers**:
- Common (slate)
- Rare (blue)
- Epic (purple)
- Legendary (yellow)

**Initial Items** (from `src/app/data/items.ts`):
- Iron Sword (weapon, common, equipped)
- Leather Armor (armor, common, equipped)
- Health Potion (consumable, common)
- Spirit Ring (ring, rare)
- Cultivation Manual (book, epic)

### 3.6 World & Exploration

**Locations** (8 total, from `src/app/data/locations.ts`):

| Location | Travel Time | Description |
|----------|-------------|-------------|
| Eastern Continent | 0 (start) | Peaceful farmlands |
| Central Plains | 6 | Trade hub |
| Northern Mountains | 8 | Dangerous, rare herbs |
| Western Desert | 12 | Ancient ruins |
| Southern Seas | 16 | Mysterious islands |
| Forbidden Valley | 24 | Legendary ground |
| Underworld Gates | 36 | Dark realm |
| Sky Realm | 48 | Floating islands |

Locations have connections (graph structure) for travel.

### 3.7 Quest System

**Structure** (from `src/app/data/quests.ts`):
- Active quests: progress %, time remaining, reward
- Completed quests: title, completion date, reward

**Example Quests**:
- "Clear the Forest" - 60% complete, 2 days left, 150 Spirit Stones
- "Gather Rare Herbs" - 35% complete, 4 days left, Elixir of Minor Healing

### 3.8 Story & Narrative

**Entry Types** (from `src/app/data/story.ts`):
| Type | Color | Purpose |
|------|-------|---------|
| narrative | Purple | Background/context |
| discovery | Yellow | Finding items/knowledge |
| journey | Blue | Travel events |
| achievement | Green | Milestones |
| combat | Red | Battle results |

---

## 4. ARCHITECTURE & STATE MANAGEMENT

### 4.1 State Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   GameStateContext                          │
│  (React Context - Central Hub)                              │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Player      │  │ Time        │  │ Activities  │         │
│  │ - stats     │  │ - ticks     │  │ - queue     │         │
│  │ - age       │  │ - day       │  │ - allocated │         │
│  │ - hp/sat    │  │ - speed     │  │ - repeat    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Navigation  │  │ Calendar    │  │ Exploration │         │
│  │ - unlocks   │  │ - view      │  │ - location  │         │
│  │ - selected  │  │ - date      │  │ - eventLog  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────┐                                           │
│  │ Inventory   │                                           │
│  │ - items     │                                           │
│  │ - equipped  │                                           │
│  └─────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
            │
            │ Isolated resource state
            ▼
┌─────────────────────────────────────────────────────────────┐
│              usePlayerResourcesStore (Zustand)              │
│  - playerMoney                                              │
│  - addMoney() / subtractMoney() / setPlayerMoney()          │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useGameClock` | `hooks/useGameClock.ts` | Game time (ticks, days, play/pause) |
| `usePlayerState` | `hooks/usePlayerState.ts` | Player vitals (age, hp, satiety, mortality) |
| `usePlayerResources` | `hooks/usePlayerResources.ts` | Currency management |
| `useActivityQueue` | `hooks/useActivityQueue.ts` | FIFO activity queue |
| `useInventoryManager` | `hooks/useInventoryManager.ts` | Items & equipment |

### 4.3 Game Clock Mechanics

```typescript
// Default: 24 ticks per second, adjustable via gameSpeed
useGameClock(ticksPerSecond = 24, gameSpeed = 1)

// Tick interval calculation:
interval = 1000 / (ticksPerSecond * gameSpeed)

// Day increments every 24 ticks
// Higher gameSpeed = faster progression
```

### 4.4 Activity Execution (in GameStateContext)

```typescript
useActivityExecutor():
  - Watches: ticks, activityQueue, isPlaying
  - When queue not empty and playing:
    - Track startTick
    - When (ticks - startTick) >= activity.timeCost:
      - dequeue activity
      - deallocate hours from allocatedActivities
      - applyActivityReward(reward)
  - When queue empty: pause game
```

---

## 5. FILE STRUCTURE & MANIFEST

### Directory Tree

```
src/
├── main.tsx                    # Entry point, routing setup
├── globals.css                 # Global styles
├── vite-env.d.ts
│
├── app/
│   ├── contexts/
│   │   └── gameStateContext.tsx    # Central state provider
│   │
│   ├── types/
│   │   ├── domain.ts               # Game domain types
│   │   └── states.ts               # Player/UI state types
│   │
│   ├── data/
│   │   ├── activity.ts             # Activity definitions
│   │   ├── constant.ts             # Game constants
│   │   ├── items.ts                # Item database
│   │   ├── lifestyle.ts            # Lifestyle options
│   │   ├── locations.ts            # World locations
│   │   ├── navigation.ts           # Nav menu config
│   │   ├── quests.ts               # Quest data
│   │   └── story.ts                # Narrative entries
│   │
│   ├── stores/
│   │   └── playerResourcesStore.ts # Zustand money store
│   │
│   ├── hooks/
│   │   ├── useActivityQueue.ts
│   │   ├── useGameClock.ts
│   │   ├── useInventoryManager.ts
│   │   ├── usePlayerResources.ts
│   │   └── usePlayerState.ts
│   │
│   ├── lib/
│   │   └── utils.ts                # Helper utilities (cn, etc.)
│   │
│   ├── layout/
│   │   ├── layout.tsx              # Main layout wrapper
│   │   ├── layoutHeader.tsx        # Top header
│   │   ├── navigationSidebar.tsx   # Left nav
│   │   ├── timeZone.tsx            # Time controls
│   │   ├── globals.css
│   │   └── components/
│   │       └── StatsPanel/
│   │           ├── statsPanel.tsx
│   │           ├── statusCard.tsx
│   │           ├── resourcesCard.tsx
│   │           └── livingConditionsCard.tsx
│   │
│   └── pages/
│       ├── explore.tsx             # Location exploration
│       ├── inventory.tsx           # Item management
│       ├── activities.tsx          # Activity allocation
│       ├── quests.tsx              # Quest tracking
│       ├── lifestyle.tsx           # Lifestyle choices
│       ├── travel.tsx              # World map
│       ├── stats.tsx               # Character stats
│       ├── calendar.tsx            # Event chronicle
│       └── story.tsx               # Narrative log
│
└── components/
    └── ui/                         # shadcn/ui components
        ├── badge.tsx
        ├── button.tsx
        ├── card.tsx
        ├── progress.tsx
        └── switch.tsx
```

---

## 6. UI LAYER & PAGES

### Route Structure

```
/ (Layout wrapper with GameStateProvider)
├── /Explore      → RenderExplorePage
├── /Inventory    → RenderInventoryPage
├── /Activities   → RenderActivitiesPage
├── /Quests       → RenderQuestsPage
├── /Lifestyle    → RenderLifestylePage
├── /Travel       → RenderTravelPage
├── /Stats        → RenderStatsPage
├── /Recap        → RenderCalendarPage
└── /Story        → RenderStoryPage
```

### Page Descriptions

| Page | Purpose | Key Features |
|------|---------|--------------|
| Explore | Location activities | Shop, NPC encounters, combat UI |
| Inventory | Equipment management | 6 equipment slots, item list |
| Activities | Time allocation | Category sections, +/- hour controls |
| Quests | Quest tracking | Active/completed sections |
| Lifestyle | Life choices | Housing, meals, transport options |
| Travel | World navigation | SVG map, location selection |
| Stats | Character sheet | Cultivation progress, skills |
| Calendar | Event chronicle | Multi-scale view (era/decade/year/month) |
| Story | Narrative journal | Typed entries with colors |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Header (title, rank badge, settings)                        │
├─────────────────────────────────────────────────────────────┤
│ TimeZone (time points, day, play/pause, speed, repeat)      │
├──────────────┬──────────────────────────┬───────────────────┤
│ Navigation   │                          │ Stats Panel       │
│ Sidebar      │      Page Content        │ - Status Card     │
│ (left)       │      (center)            │ - Resources Card  │
│ 28rem width  │                          │ - Living Card     │
│              │                          │                   │
└──────────────┴──────────────────────────┴───────────────────┘
```

### Design System

**Colors**:
- Background: Black/slate-900-950
- Primary: Purple/violet-400-500
- HP: Green
- Satiety: Orange
- Mortality: Red
- Stats: Blue (DEX), Yellow (STR)
- Currency: Bronze (orange), Silver (slate), Gold (yellow), Platinum (cyan)

**Patterns**:
- Card-based layouts
- Progress bars for all gauges
- Collapsible sections with chevron icons
- Lucide icons throughout

---

## 7. TYPE DEFINITIONS

### Domain Types (`src/app/types/domain.ts`)

```typescript
type Currency = "Bronze" | "Silver" | "Gold" | "Platinum"
type Stats = "Strength" | "Dexterity"
type Period = "daily" | "weekly" | "monthly" | "annual" | "oneTime"

type Reward =
  | { amount: number; currency: Currency }
  | { amount: number; stat: Stats }

type Cost = {
  amount: number
  currency: Currency
  period?: Period
}

type ActivityModel = {
  key: ActivityKeys
  level: number
  timeCost: number
  unlocked: boolean
  reward: Reward
  xpScalingFn: () => number
}

type InventoryItem = {
  id: string
  name: string
  type: string
  rarity: "common" | "rare" | "epic" | "legendary"
  equipped: boolean
}

type NavigationItem =
  | "Explore" | "Inventory" | "Activities" | "Quests"
  | "Lifestyle" | "Travel" | "Stats" | "Recap" | "Story"

type ActivityCategory =
  | "work" | "training" | "study" | "social"
  | "life" | "hobby" | "adventure"
```

### State Types (`src/app/types/states.ts`)

```typescript
type PlayerState = {
  age: number
  lifespan: number
  hp: { max: number; current: number }
  satiety: { max: number; current: number }
  mortality: { max: number; current: number }
}

type EquippedItems = {
  weapon: InventoryItem | null
  armor: InventoryItem | null
  helmet: InventoryItem | null
  boots: InventoryItem | null
  ring: InventoryItem | null
  amulet: InventoryItem | null
}
```

---

## 8. CURRENT DEVELOPMENT STATUS

### Implemented ✅
- Activity queue system
- Basic activities (Beg, Lift Weights)
- Currency management
- Lifestyle system structure
- Inventory & equipment slots
- Quest display
- World locations & travel
- Story/narrative system
- Game clock & time controls
- All 9 pages with UI

### Work in Progress ⚠️
- Stat rewards (commented out in code)
- Location-specific activities
- More activity types
- Cultivation level system
- Complex XP scaling formulas
- Combat system (UI exists, logic incomplete)

### Recent Commits
- `14c18cf` - Creates more hooks, main view up again
- `889ff4d` - Broken refacto
- `6e2c941` - Minor UI fixes
- `e2672a4` - Create custom hooks, reward broken for now

---

## 9. QUICK REFERENCE

### Key Files to Modify

| Task | Primary File(s) |
|------|----------------|
| Add new activity | `src/app/data/activity.ts` |
| Modify game constants | `src/app/data/constant.ts` |
| Add new item | `src/app/data/items.ts` |
| Change lifestyle options | `src/app/data/lifestyle.ts` |
| Add location | `src/app/data/locations.ts` |
| Modify state logic | `src/app/contexts/gameStateContext.tsx` |
| Add new hook | `src/app/hooks/` |
| Add new page | `src/app/pages/` + update `main.tsx` routes |
| Modify layout | `src/app/layout/` |
| Add UI component | `src/components/ui/` |

### Import Patterns

```typescript
// Components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Hooks
import { useGameState } from "@/app/contexts/gameStateContext"

// Types
import type { ActivityModel, Reward } from "@/app/types/domain"

// Data
import { activities } from "@/app/data/activity"

// Utils
import { cn } from "@/app/lib/utils"
```

---

*Last updated: Generated by Claude Code*
