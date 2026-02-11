# Idle Cultivation

An immersive idle/incremental game with a cultivation theme. Embark on a journey from a humble farmer to an immortal cultivator, managing resources, completing quests, exploring locations, and progressing through your cultivation path.

## Features

- **Cultivation System**: Progress through cultivation stages and improve your character
- **Activity Queue**: Queue and manage multiple activities for idle progression
- **Resource Management**: Track and manage multiple currencies (Bronze, Silver, Gold, Platinum) and stats
- **Quest System**: Complete quests to earn rewards and advance the story
- **Exploration**: Travel between different locations with unique characteristics
- **Inventory Management**: Collect and equip items with different rarities
- **Lifestyle Choices**: Customize your living conditions, meals, and transportation
- **Story Progression**: Follow your character's journey through narrative entries
- **Stats Tracking**: Monitor your character's progress and statistics
- **Calendar System**: Track events and recap your journey

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons
- **date-fns** - Date utilities

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd IdleCultivationFront
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── contexts/          # GameStateProvider (minimal)
│   ├── data/              # Game data (activities, items, locations, quests, etc.)
│   ├── layout/            # Layout components
│   │   ├── components/    # Stats panel components
│   │   ├── layout.tsx
│   │   ├── layoutHeader.tsx
│   │   ├── navigationSidebar.tsx
│   │   └── timeZone.tsx
│   ├── pages/             # Page components
│   │   ├── activities.tsx
│   │   ├── calendar.tsx
│   │   ├── explore.tsx
│   │   ├── inventory.tsx
│   │   ├── lifestyle.tsx
│   │   ├── quests.tsx
│   │   ├── stats.tsx
│   │   ├── story.tsx
│   │   └── travel.tsx
│   ├── stores/            # Zustand stores (state management)
│   │   ├── cultivatorStore.ts   # Player stats (vitality, age, stats)
│   │   ├── gameStore.ts         # Time, unlocks, calendar, navigation
│   │   ├── activityStore.ts     # Queue, allocations, rewards
│   │   └── inventoryStore.ts    # Spirit stones, items, equipment
│   ├── types/             # TypeScript type definitions
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # Reusable UI components (badge, button, card, etc.)
└── main.tsx               # Application entry point
```

## Available Pages

- **Explore** - Discover new areas and locations
- **Inventory** - Manage your items and equipment
- **Activities** - Queue and manage cultivation activities
- **Quests** - View and complete quests
- **Lifestyle** - Customize your living conditions
- **Travel** - Navigate between different locations
- **Stats** - View detailed character statistics
- **Recap** - Calendar view of events and progress
- **Story** - Read your cultivation journey narrative

## Development

The project uses:

- Path aliases (`@/` points to `src/`)
- TypeScript for type safety
- ESLint for code quality
- Dark mode by default

## License

[Add your license here]
