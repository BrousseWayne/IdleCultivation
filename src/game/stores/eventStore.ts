import { create } from "zustand";

// Run-scoped memory of the narrative event system: what has already been
// lived (recurrence bookkeeping) and the event currently on stage, if any.
// Reset on reincarnation; persisted by SaveManager.

export type ActiveEvent = { key: string; stepId: string };

interface EventState {
  fired: Record<string, boolean>; // once-events already lived
  cooldownUntil: Record<string, number>; // day at which the event re-arms
  lastCalendarFired: Record<string, number>; // last day a calendar event fired
  active: ActiveEvent | null;
  resumeOnResolve: boolean; // was the clock running when the event took stage

  markFired: (key: string) => void;
  setCooldown: (key: string, untilDay: number) => void;
  markCalendarFired: (key: string, day: number) => void;
  setActive: (active: ActiveEvent, resumeOnResolve: boolean) => void;
  setActiveStep: (stepId: string) => void;
  clearActive: () => void;
  reset: () => void;
}

const initialEventState = {
  fired: {} as Record<string, boolean>,
  cooldownUntil: {} as Record<string, number>,
  lastCalendarFired: {} as Record<string, number>,
  active: null as ActiveEvent | null,
  resumeOnResolve: false,
};

export const useEventStore = create<EventState>((set) => ({
  ...initialEventState,

  markFired: (key) => set((state) => ({ fired: { ...state.fired, [key]: true } })),
  setCooldown: (key, untilDay) =>
    set((state) => ({ cooldownUntil: { ...state.cooldownUntil, [key]: untilDay } })),
  markCalendarFired: (key, day) =>
    set((state) => ({ lastCalendarFired: { ...state.lastCalendarFired, [key]: day } })),
  setActive: (active, resumeOnResolve) => set({ active, resumeOnResolve }),
  setActiveStep: (stepId) =>
    set((state) => (state.active ? { active: { ...state.active, stepId } } : {})),
  clearActive: () => set({ active: null, resumeOnResolve: false }),

  reset: () => set({ ...initialEventState }),
}));
