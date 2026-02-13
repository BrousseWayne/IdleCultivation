import { create } from "zustand";
import type { Activity } from "../types/domain";
import type { Effect } from "../types/effects";
import { EventBus } from "../services";
import { EffectExecutor } from "../services/EffectExecutor";

interface ActivityState {
  activityQueue: Activity[];
  allocatedActivities: Record<string, number>;
  completionCounts: Record<string, number>;
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

  completeCurrentActivity: () => void;
  applyEffects: (effects: Effect[]) => void;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activityQueue: [],
  allocatedActivities: {},
  completionCounts: {},
  repeatActivities: true,
  selectedLocation: "Eastern Continent",
  currentActivityStartTick: null,
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

  applyEffects: (effects) => {
    EffectExecutor.execute(effects);
  },

  completeCurrentActivity: () => {
    const { activityQueue, applyEffects, deallocateTime, dequeueActivity, enqueueActivity, repeatActivities, allocatedActivities } =
      get();
    if (activityQueue.length === 0) return;

    const currentActivity = activityQueue[0];

    set((state) => ({
      completionCounts: {
        ...state.completionCounts,
        [currentActivity.key]:
          (state.completionCounts[currentActivity.key] || 0) + 1,
      },
    }));

    applyEffects(currentActivity.effects);
    deallocateTime(currentActivity.key, currentActivity.timeCost);
    dequeueActivity();

    // Re-queue if repeat is enabled and there are still allocated hours
    if (repeatActivities && allocatedActivities[currentActivity.key] >= currentActivity.timeCost) {
      enqueueActivity(currentActivity);
    }

    EventBus.emit({
      type: "activity:completed",
      payload: { activityKey: currentActivity.key },
    });
  },
}));
