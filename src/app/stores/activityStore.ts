import { create } from "zustand";
import type { Activity, Reward } from "../types/domain";
import { EventBus } from "../services";

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

  completeCurrentActivity: () => void;
  applyReward: (reward: Reward) => void;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activityQueue: [],
  allocatedActivities: {},
  completionCounts: {},
  repeatActivities: true,
  selectedLocation: "Eastern Continent",

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

  applyReward: (reward) => {
    EventBus.emit({ type: "activity:reward-earned", payload: { reward } });
  },

  completeCurrentActivity: () => {
    const { activityQueue, applyReward, deallocateTime, dequeueActivity, enqueueActivity, repeatActivities, allocatedActivities } =
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

    applyReward(currentActivity.reward);
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
