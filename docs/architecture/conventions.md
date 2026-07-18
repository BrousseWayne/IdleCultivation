---
purpose: Canonical naming, domain terminology, coding patterns, type-safety rules, prohibitions, communication style, and tech stack for the Idle Cultivation game.
status: stable
last-verified: 2026-07-17
related: [docs/architecture/architecture.md]
---

## Key facts

- Tech stack: React 19, TypeScript, Vite, React Router 7, Tailwind CSS 4, Zustand, Radix UI, Lucide React.
- Path alias `@/` points to `src/`. Dark mode by default. ESLint for code quality.
- Stores named `useXxxStore`; services are PascalCase module singletons (plain objects + module state — no classes, with ONE sanctioned exception: `ErrorBoundary`, which React requires to be a class); types are PascalCase; data files are camelCase.ts.
- Randomness: never `Math.random()` in game logic — always `rng` (`engine/rng.ts`), so every run is replayable from its seed.
- Tests: the simulation suite (`npm test`) is the safety net — any change to engine/stores/services should keep it green, and new systems should land with simulation tests that play the game headlessly.
- Unlock conditions are authored through the `when` grammar (`data/conditions.ts`): `when.level("mineOre", 5)`, `when.all(...)`, `when.any(...)` — an embedded DSL over the `UnlockCondition` union, fully compiler-checked (no string parsing).
- Content is code: this game has no assets — adding content means writing typed data. The compiler is the level editor; `validateContent()` (dev boot) catches only what types can't (self-references, circular graphs).
- Use xianxia domain terms everywhere — code, data, and UI. (The terminology table below is forward-looking vocabulary; most terms have no code counterpart yet.)
- Type safety: discriminated unions for variants, `unknown` + type guards over `any`. Entity keys are REAL literal unions derived from the data (`ActivityKey`, `PlaceKey`, `PlaceActionKey` — see `data/defineContent.ts`): a typo'd cross-reference in content fails to compile.
- Source of truth: when CLAUDE.md / docs conflict with the actual codebase, the codebase wins.
- Communication: describe concrete approach (not aspirational pitch); absorb clarifications without praising them.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **React Router 7** — Client-side routing
- **Tailwind CSS 4** — Styling
- **Zustand** — State management
- **Radix UI** — Accessible component primitives
- **Lucide React** — Icons

Development conventions: path aliases (`@/` points to `src/`), TypeScript for type safety, ESLint for code quality, dark mode by default. Prerequisites are Node.js v18+ and npm or yarn.

## Naming Conventions

- Stores: `useXxxStore` (e.g., `useCultivatorStore`)
- Services: PascalCase singletons (e.g., `EventBus`, `EntityRegistry`)
- Types: PascalCase (e.g., `Activity`, `CultivationRealm`)
- Data files: camelCase.ts (e.g., `activity.ts`, `items.ts`)

## Domain Terminology

Use xianxia terms everywhere (code, data, UI). This table is the naming guide for content as it gets built — today only `vitality`, `hasFallen`, and `reincarnate()` exist in code; the rest is reserved vocabulary for future systems:

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
| Currency          | Copper wen 文 (mortal)  | `currency`            |
| Currency (later)  | Taels of silver 兩, then Spirit Stones | —      |
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

Note on text tone: story text uses xianxia novel tone ("broken English" cultivation novel style); UI text is always clear and unambiguous.

## Coding Patterns

### Type Safety

- Use discriminated unions for variants (reward types, event types, unlock conditions)
- Avoid `any` — use `unknown` with type guards
- Entity keys ARE typed: content is authored through `defineActivities`/`definePlaces`/`defineUnlockables`/`defineEvents` (`data/defineContent.ts`), which keep literal keys and derive the unions. Runtime code uses the plain-string defaults of the generic types; only authoring surfaces are strict.

### Adding New Content

- **New Activity**: add an entry inside `defineActivities` in `activity.ts` — registry, unlocks, keys, and visibility all follow.
- **New unlock condition on anything**: express it with the `when` grammar; keys autocomplete.
- **New Game System**: new store (declare it in `services/persistence.ts` — save + reincarnation follow automatically) → data file via a `define*` helper → types → page → EventBus events.

## What NOT To Do

- **Don't add state to components** — All state lives in Zustand stores
- **Don't recreate custom hooks** — Deleted for a reason, use stores directly
- **Don't use .find() for entity lookups** — Use EntityRegistry
- **Don't create direct store-to-store calls** — Use EventBus
- **Don't hardcode unlock conditions** — Use UnlockEvaluator with data-driven conditions
- **Don't scatter unlock logic** — Register unlockables in gameEventListeners.ts
- **Don't mix concerns** — Stores = state + actions, Components = UI only
- **Don't add features without unlocks** — Everything should be unlockable

## Source of Truth

When this document (or any design doc) conflicts with the actual codebase, the codebase wins. These documents describe intent and conventions — the code is the real state of things.

## Communication Style

- **Don't sell me on my own ideas.** When I describe what I want, respond with what you're going to build and how — not with aspirational marketing language about how it will "feel" or what experience it will evoke. Describe the concrete approach: the layout, the components, the visual direction. If something about the design is genuinely clever or worth calling out, say why in practical terms. Don't repackage my request back to me as an evocative pitch — if I ask for something, I don't need you to narrate the fantasy of using it. Just tell me the concrete design direction you're taking.
- **Don't treat normal clarification as a revelation.** When I add context, correct direction, or refine scope, just absorb it and adjust. Don't praise the input or announce the magnitude of its impact. If a clarification genuinely alters the approach in a way worth noting, explain what changed and why in concrete terms. Most of the time, the right response is to simply proceed with the updated direction.
