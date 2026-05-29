# Activity Design System

## Overview

Unified design tokens for consistent activity representation across the entire application.

## Design Tokens

### Icon Sizes
- **Card**: `w-4 h-4` (16x16px) - Primary activity cards
- **Queue**: `w-3 h-3` (12x12px) - Queue list items
- **Queue Bar**: `w-3 h-3` (12x12px) - Bottom queue bar

**Rationale**: Cards are primary UI elements and get larger icons. Queue items are compact lists and use smaller icons.

### Typography

| Element | Class | Usage |
|---------|-------|-------|
| **Card Name** | `text-xs font-semibold` | Activity cards |
| **Queue Name** | `text-xs` | Queue list items |
| **Level Badge** | `text-[10px] font-bold text-accent-gold` | All contexts |
| **Time** | `text-[10px] text-slate-500 font-mono` | Standardized across all views |
| **Completions** | `text-[10px] text-slate-600 font-mono` | x{count} indicator |
| **Allocation** | `text-xs font-mono font-bold` | Hours allocated |

**Rationale**: Mono font for numeric values (time, counts), sans-serif for names. Consistent sizing hierarchy.

### Spacing

**Activity Cards**:
- Padding: `px-3 py-2` (12px horizontal, 8px vertical)
- Main gap: `gap-3` (12px between elements)
- Inner gap: `gap-1.5` (6px for tightly related elements)

**Queue Items**:
- Padding: `px-2 py-1` (8px horizontal, 4px vertical)
- Gap: `gap-2` (8px between elements)

**Rationale**: Cards use 1.5x spacing of queue items for better readability in main view. Queue is compact for density.

### Progress Bars

**Allocation Bar** (top):
- Height: `0.5px` (h-0.5)
- Track: `bg-slate-800/50`
- Fill: Category-colored, striped when active

**XP Bar** (bottom):
- Height: `1.2px` (h-[1.2px])
- Track: `bg-slate-800/30` (always visible, full width)
- Fill: Foil shimmer gradient, grows 0-100%
- Shimmer size: `400% 100%`
- Animation: `6s linear infinite`

**Rationale**: XP bar is slightly taller and more prominent. Track always visible shows total capacity.

### States & Transitions

**Running State**:
- Cards: Border color intensifies (border-l-3)
- Queue: Background darkens + pulsing dot

**Hover State**:
- Cards: `hover:bg-card/50`
- Queue: `hover:opacity-100`

**Transitions**:
- Standard: `300ms` (most UI changes)
- Quick: `150ms` (hover states)
- Allocation: `300ms` (progress bar fills)

**Rationale**: Longer transitions for meaningful state changes, shorter for instant feedback.

## Effects Display

- Icon size: `12px`
- Gap: `gap-1` (4px)
- Font: `font-mono` (numeric values)

Currency and stat icons use consistent 12px size with mono font for values.

## Usage

```tsx
import { ACTIVITY_DESIGN } from "../styles/activityDesignTokens";

// Icon
<activity.icon className={ACTIVITY_DESIGN.icon.card} />

// Typography
<span className={ACTIVITY_DESIGN.typography.name.card}>
  {activity.name}
</span>

// Progress bar
<div className={ACTIVITY_DESIGN.progressBar.xp.height}>
  ...
</div>
```

## Benefits

1. **Consistency**: All activity representations use same design language
2. **Maintainability**: Change once in tokens, updates everywhere
3. **Clarity**: Intentional differences between contexts (card vs queue)
4. **Scalability**: Easy to add new activity views (e.g., tooltips, modals)

## Future Considerations

When componentizing (extracting to separate files):
- Move `ActivityCard` to `/components/activities/ActivityCard.tsx`
- Move `QueueItem` to `/components/activities/QueueItem.tsx`
- Create `/components/activities/ActivityIcon.tsx` for shared icon logic
- Create `/components/activities/EffectBadge.tsx` for effect display

Design tokens will make this refactor seamless - just import and use.
