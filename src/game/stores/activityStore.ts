import { create } from "zustand";
import type { QueueBlock } from "@/game/types/domain";

interface ActivityState {
  queue: QueueBlock[];
  runningTicks: number; // ticks elapsed into the current head unit
  completionCounts: Record<string, number>;
  activityXp: Record<string, number>;
  repeatActivities: boolean;
  selectedLocation: string;

  pushUnit: (key: string) => void;
  popUnit: (key: string) => void;
  consumeHeadUnit: () => void; // one unit of the head block finished
  setQueue: (queue: QueueBlock[]) => void;
  clearQueue: () => void;
  setRunningTicks: (ticks: number) => void;

  setRepeatActivities: (repeat: boolean) => void;
  setSelectedLocation: (location: string) => void;

  addCompletion: (key: string) => void;
  addXp: (key: string, amount: number) => void;
  reset: () => void;
}

const initialActivityState = {
  queue: [] as QueueBlock[],
  runningTicks: 0,
  completionCounts: {} as Record<string, number>,
  activityXp: {} as Record<string, number>,
  repeatActivities: true,
  selectedLocation: "Eastern Continent",
};

// --- pure helpers (also reused by UI/engine via the store snapshot) ---
export function queuedUnits(queue: QueueBlock[], key: string): number {
  return queue.reduce((n, b) => (b.key === key ? n + b.units : n), 0);
}

function pushUnit(queue: QueueBlock[], key: string): QueueBlock[] {
  const last = queue[queue.length - 1];
  if (last && last.key === key) {
    return [...queue.slice(0, -1), { key, units: last.units + 1 }];
  }
  return [...queue, { key, units: 1 }];
}

// remove the last queued unit of key; never the unit currently running
// (head block index 0, its first unit). Returns unchanged if nothing removable.
function popUnit(queue: QueueBlock[], key: string): QueueBlock[] {
  for (let i = queue.length - 1; i >= 0; i--) {
    const block = queue[i];
    if (block.key !== key) continue;
    // the running unit is block 0's first unit; protect it
    const isHead = i === 0;
    const removableUnits = isHead ? block.units - 1 : block.units;
    if (removableUnits <= 0) continue;
    if (block.units === 1) return queue.filter((_, j) => j !== i);
    return queue.map((b, j) => (j === i ? { ...b, units: b.units - 1 } : b));
  }
  return queue;
}

export const useActivityStore = create<ActivityState>((set) => ({
  ...initialActivityState,

  pushUnit: (key) => set((s) => ({ queue: pushUnit(s.queue, key) })),
  popUnit: (key) => set((s) => ({ queue: popUnit(s.queue, key) })),

  consumeHeadUnit: () =>
    set((s) => {
      const head = s.queue[0];
      if (!head) return s;
      const queue =
        head.units > 1
          ? [{ key: head.key, units: head.units - 1 }, ...s.queue.slice(1)]
          : s.queue.slice(1);
      return { queue, runningTicks: 0 };
    }),

  setQueue: (queue) => set({ queue }),
  clearQueue: () => set({ queue: [], runningTicks: 0 }),
  setRunningTicks: (ticks) => set({ runningTicks: ticks }),

  setRepeatActivities: (repeat) => set({ repeatActivities: repeat }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),

  addCompletion: (key) =>
    set((s) => ({ completionCounts: { ...s.completionCounts, [key]: (s.completionCounts[key] || 0) + 1 } })),
  addXp: (key, amount) =>
    set((s) => ({ activityXp: { ...s.activityXp, [key]: (s.activityXp[key] || 0) + amount } })),

  reset: () => set(initialActivityState),
}));
