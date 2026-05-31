import { create } from "zustand";
import type { Activity } from "@/game/types/domain";

interface ActivityState {
  activityQueue: Activity[];
  allocatedActivities: Record<string, number>;
  completionCounts: Record<string, number>;
  activityXp: Record<string, number>;
  repeatActivities: boolean;
  selectedLocation: string;

  enqueueActivity: (activity: Activity) => void;
  dequeueActivity: () => void;
  clearQueue: () => void;

  setAllocatedActivities: (allocated: Record<string, number>) => void;
  allocateTime: (activityKey: string, timeCost: number) => void;
  deallocateTime: (activityKey: string, timeCost: number) => void;

  setRepeatActivities: (repeat: boolean) => void;
  setSelectedLocation: (location: string) => void;

  currentActivityStartTick: number | null;
  setCurrentActivityStartTick: (tick: number | null) => void;

  addCompletion: (activityKey: string) => void;
  addXp: (activityKey: string, amount: number) => void;
  reset: () => void;
}

const initialActivityState = {
  activityQueue: [] as Activity[],
  allocatedActivities: {} as Record<string, number>,
  completionCounts: {} as Record<string, number>,
  activityXp: {} as Record<string, number>,
  repeatActivities: true,
  selectedLocation: "Eastern Continent",
  currentActivityStartTick: null as number | null,
};

export const useActivityStore = create<ActivityState>((set) => ({
  ...initialActivityState,
  setCurrentActivityStartTick: (tick) => set({ currentActivityStartTick: tick }),

  enqueueActivity: (activity) =>
    set((state) => ({
      activityQueue: [...state.activityQueue, { ...activity, queueId: `${activity.key}-${Date.now()}-${Math.random()}` }],
    })),

  dequeueActivity: () =>
    set((state) => ({
      activityQueue: state.activityQueue.slice(1),
    })),

  clearQueue: () => set({ activityQueue: [] }),

  setAllocatedActivities: (allocated) =>
    set({ allocatedActivities: allocated }),

  allocateTime: (activityKey, timeCost) =>
    set((state) => ({
      allocatedActivities: {
        ...state.allocatedActivities,
        [activityKey]: (state.allocatedActivities[activityKey] || 0) + timeCost,
      },
    })),

  deallocateTime: (activityKey, timeCost) =>
    set((state) => ({
      allocatedActivities: {
        ...state.allocatedActivities,
        [activityKey]: Math.max(
          0,
          (state.allocatedActivities[activityKey] || 0) - timeCost
        ),
      },
    })),

  setRepeatActivities: (repeat) => set({ repeatActivities: repeat }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),

  addCompletion: (activityKey) =>
    set((state) => ({
      completionCounts: {
        ...state.completionCounts,
        [activityKey]: (state.completionCounts[activityKey] || 0) + 1,
      },
    })),

  addXp: (activityKey, amount) =>
    set((state) => ({
      activityXp: {
        ...state.activityXp,
        [activityKey]: (state.activityXp[activityKey] || 0) + amount,
      },
    })),

  reset: () => set(initialActivityState),
}));
