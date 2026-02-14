import { create } from "zustand";
import type { Activity } from "../types/domain";
import type { Effect } from "../types/effects";
import { EventBus } from "../services";
import { EffectExecutor } from "../services/EffectExecutor";
import { getActivityXpProgress, scaleEffectAmount } from "../utils/activityXp";

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

  completeCurrentActivity: () => void;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activityQueue: [],
  allocatedActivities: {},
  completionCounts: {},
  activityXp: {},
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

  completeCurrentActivity: () => {
    const { activityQueue, deallocateTime, dequeueActivity, enqueueActivity, repeatActivities, allocatedActivities } =
      get();
    if (activityQueue.length === 0) return;

    const currentActivity = activityQueue[0];
    const xpGain = currentActivity.xpScalingFn();
    const newXp = (get().activityXp[currentActivity.key] || 0) + xpGain;
    const { level } = getActivityXpProgress(newXp);

    set((state) => ({
      completionCounts: {
        ...state.completionCounts,
        [currentActivity.key]:
          (state.completionCounts[currentActivity.key] || 0) + 1,
      },
      activityXp: {
        ...state.activityXp,
        [currentActivity.key]: newXp,
      },
    }));

    const scaledEffects: Effect[] = currentActivity.effects.map((effect) => {
      if (effect.type === "grant_currency" || effect.type === "grant_stat") {
        return { ...effect, amount: scaleEffectAmount(effect.amount, level) };
      }
      return effect;
    });

    EffectExecutor.execute(scaledEffects);
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
