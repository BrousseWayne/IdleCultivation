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
  return queue.reduce((total, block) => (block.key === key ? total + block.units : total), 0);
}

export function totalUnits(queue: QueueBlock[]): number {
  return queue.reduce((total, block) => total + block.units, 0);
}

// key of the flattened unit at `index`, or undefined if past the end (idle).
export function unitKeyAt(queue: QueueBlock[], index: number): string | undefined {
  let offset = 0;
  for (const block of queue) {
    if (index < offset + block.units) return block.key;
    offset += block.units;
  }
  return undefined;
}

// block array index containing the flattened unit at `index`, or -1.
export function blockAt(queue: QueueBlock[], index: number): number {
  let offset = 0;
  for (let i = 0; i < queue.length; i++) {
    if (index < offset + queue[i].units) return i;
    offset += queue[i].units;
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
  for (let blockIndex = queue.length - 1; blockIndex >= 0; blockIndex--) {
    const block = queue[blockIndex];
    if (block.key !== key) continue;
    if (block.units === 1) return queue.filter((_, index) => index !== blockIndex);
    return queue.map((candidate, index) => (index === blockIndex ? { ...candidate, units: candidate.units - 1 } : candidate));
  }
  return queue;
}

export const useActivityStore = create<ActivityState>((set) => ({
  ...initialActivityState,

  pushUnit: (key) => set((state) => ({ queue: pushUnit(state.queue, key) })),
  popUnit: (key) =>
    set((state) => {
      const oldKey = unitKeyAt(state.queue, state.scheduleIndex);
      const queue = popUnit(state.queue, key);
      const scheduleIndex = Math.min(state.scheduleIndex, totalUnits(queue));
      if (unitKeyAt(queue, scheduleIndex) !== oldKey) {
        return { queue, scheduleIndex, runningTicks: 0 };
      }
      return { queue, scheduleIndex };
    }),

  clearQueue: () => set({ queue: [], scheduleIndex: 0, runningTicks: 0 }),
  setRunningTicks: (ticks) => set({ runningTicks: ticks }),
  advanceSchedule: () => set((state) => ({ scheduleIndex: state.scheduleIndex + 1, runningTicks: 0 })),
  resetSchedule: () => set({ scheduleIndex: 0, runningTicks: 0 }),

  setRepeatActivities: (repeat) => set({ repeatActivities: repeat }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),

  addCompletion: (key) =>
    set((state) => ({ completionCounts: { ...state.completionCounts, [key]: (state.completionCounts[key] || 0) + 1 } })),
  addXp: (key, amount) =>
    set((state) => ({ activityXp: { ...state.activityXp, [key]: (state.activityXp[key] || 0) + amount } })),

  reset: () => set({ ...initialActivityState }),
}));
