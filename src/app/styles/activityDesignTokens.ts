/**
 * Activity Design System
 * Unified design tokens for consistent activity representation across the app
 */

export const ACTIVITY_DESIGN = {
  // Icon sizes
  icon: {
    card: 'w-4 h-4',
    queue: 'w-3 h-3',
    queueBar: 'w-3 h-3',
  },

  // Typography
  typography: {
    name: {
      card: 'text-xs font-semibold',
      queue: 'text-xs',
      queueBar: 'text-xs font-semibold',
    },
    level: 'text-[10px] font-bold text-accent-gold',
    time: 'text-[10px] text-slate-500 font-mono',
    completions: 'text-[10px] text-slate-600 font-mono',
    allocation: 'text-xs font-mono font-bold',
  },

  // Spacing
  spacing: {
    card: {
      padding: 'px-3 py-2',
      gap: 'gap-3',
      innerGap: 'gap-1.5',
    },
    queue: {
      padding: 'px-2 py-1',
      gap: 'gap-2',
    },
  },

  // Progress bars
  progressBar: {
    allocation: {
      height: 'h-0.5',
      track: 'bg-slate-800/50',
    },
    xp: {
      height: 'h-[1.2px]',
      track: 'bg-slate-800/30',
      shimmerSize: '400% 100%',
      animationDuration: '6s',
    },
  },

  // Effects display
  effects: {
    iconSize: 12,
    gap: 'gap-1',
    fontSize: 'font-mono',
  },

  // States
  states: {
    running: {
      opacity: 'opacity-100',
      borderWidth: 'border-l-3',
    },
    idle: {
      opacity: 'opacity-70',
      borderWidth: 'border-l-3',
    },
    hover: {
      card: 'hover:bg-card/50',
      queue: 'hover:opacity-100',
    },
  },

  // Transitions
  transitions: {
    standard: 'transition-all duration-300',
    quick: 'transition-all duration-150',
    allocation: 'transition-all duration-300',
  },
} as const;
