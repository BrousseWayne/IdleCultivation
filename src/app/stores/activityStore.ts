import { create } from "zustand";
import type { ActivityModel, Reward } from "../types/domain";
import { EventBus } from "../services";

interface ActivityState {
  activityQueue: ActivityModel[];
  allocatedActivities: Record<string, number>;
  completionCounts: Record<string, number>;
  repeatActivities: boolean;
  selectedLocation: string;

  enqueueActivity: (activity: ActivityModel) => void;
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
      activityQueue: [...state.activityQueue, activity],
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
    const { activityQueue, applyReward, deallocateTime, dequeueActivity } =
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

    EventBus.emit({
      type: "activity:completed",
      payload: { activityKey: currentActivity.key },
    });
  },
}));
