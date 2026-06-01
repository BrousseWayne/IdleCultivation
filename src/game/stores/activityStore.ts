import { create } from "zustand";
import type { QueueBlock } from "@/game/types/domain";

interface ActivityState {
  queue: QueueBlock[];
  runningTicks: number;
  scheduleIndex: number;
  completionCounts: Record<string, number>;
  activityXp: Record<string, number>;
  repeatActivities: boolean;
  selectedLocation: string;

  pushUnit: (key: string) => void;
  popUnit: (key: string) => void;
  setQueue: (queue: QueueBlock[]) => void;
  clearQueue: () => void;
  setRunningTicks: (ticks: number) => void;
  advanceSchedule: () => void;
  resetSchedule: () => void;

  setRepeatActivities: (repeat: boolean) => void;
  setSelectedLocation: (location: string) => void;

  addCompletion: (key: string) => void;
  addXp: (key: string, amount: number) => void;
  reset: () => void;
}

const initialActivityState = {
  queue: [] as QueueBlock[],
  runningTicks: 0,
  scheduleIndex: 0,
  completionCounts: {} as Record<string, number>,
  activityXp: {} as Record<string, number>,
  repeatActivities: true,
  selectedLocation: "Eastern Continent",
};

// --- pure helpers (also reused by UI/engine via the store snapshot) ---
export function queuedUnits(queue: QueueBlock[], key: string): number {
  return queue.reduce((n, b) => (b.key === key ? n + b.units : n), 0);
}

export function totalUnits(queue: QueueBlock[]): number {
  return queue.reduce((n, b) => n + b.units, 0);
}

// key of the flattened unit at `index`, or undefined if past the end (idle).
export function unitKeyAt(queue: QueueBlock[], index: number): string | undefined {
  let acc = 0;
  for (const b of queue) {
    if (index < acc + b.units) return b.key;
    acc += b.units;
  }
  return undefined;
}

// block array index containing the flattened unit at `index`, or -1.
export function blockAt(queue: QueueBlock[], index: number): number {
  let acc = 0;
  for (let i = 0; i < queue.length; i++) {
    if (index < acc + queue[i].units) return i;
    acc += queue[i].units;
  }
  return -1;
}

function pushUnit(queue: QueueBlock[], key: string): QueueBlock[] {
  const last = queue[queue.length - 1];
  if (last && last.key === key) {
    return [...queue.slice(0, -1), { key, units: last.units + 1 }];
  }
  return [...queue, { key, units: 1 }];
}

// remove the last-queued unit of key (back-to-front). Returns unchanged if absent.
function popUnit(queue: QueueBlock[], key: string): QueueBlock[] {
  for (let i = queue.length - 1; i >= 0; i--) {
    const block = queue[i];
    if (block.key !== key) continue;
    if (block.units === 1) return queue.filter((_, j) => j !== i);
    return queue.map((b, j) => (j === i ? { ...b, units: b.units - 1 } : b));
  }
  return queue;
}

export const useActivityStore = create<ActivityState>((set) => ({
  ...initialActivityState,

  pushUnit: (key) => set((s) => ({ queue: pushUnit(s.queue, key) })),
  popUnit: (key) =>
    set((s) => {
      const oldKey = unitKeyAt(s.queue, s.scheduleIndex);
      const queue = popUnit(s.queue, key);
      const scheduleIndex = Math.min(s.scheduleIndex, totalUnits(queue));
      if (unitKeyAt(queue, scheduleIndex) !== oldKey) {
        return { queue, scheduleIndex, runningTicks: 0 };
      }
      return { queue, scheduleIndex };
    }),

  setQueue: (queue) => set({ queue }),
  clearQueue: () => set({ queue: [], scheduleIndex: 0, runningTicks: 0 }),
  setRunningTicks: (ticks) => set({ runningTicks: ticks }),
  advanceSchedule: () => set((s) => ({ scheduleIndex: s.scheduleIndex + 1, runningTicks: 0 })),
  resetSchedule: () => set({ scheduleIndex: 0, runningTicks: 0 }),

  setRepeatActivities: (repeat) => set({ repeatActivities: repeat }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),

  addCompletion: (key) =>
    set((s) => ({ completionCounts: { ...s.completionCounts, [key]: (s.completionCounts[key] || 0) + 1 } })),
  addXp: (key, amount) =>
    set((s) => ({ activityXp: { ...s.activityXp, [key]: (s.activityXp[key] || 0) + amount } })),

  reset: () => set(initialActivityState),
}));
