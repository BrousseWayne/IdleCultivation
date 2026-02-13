import { EventBus } from "./EventBus";
import { UnlockEvaluator } from "./UnlockEvaluator";
import { useGameStore } from "../stores/gameStore";
import { unlockables } from "../data/unlocks";
import { activityData } from "../data/activity";
import { lifestyleOptions } from "../data/lifestyle";
import { sidebarData } from "../data/navigation";

export function initializeGameEventListeners() {
  for (const def of unlockables) {
    UnlockEvaluator.registerUnlockable({
      id: def.id,
      unlockConditions: def.unlockConditions,
      onUnlock: () => {
        if (def.type === "activity_category") {
          useGameStore.getState().unlockActivityCategory(def.target);
        } else if (def.type === "navigation_tab") {
          useGameStore.getState().unlockNavigationTab(def.target);
        }
      },
    });
  }

  for (const activity of activityData) {
    if (activity.unlockConditions && !activity.unlocked) {
      UnlockEvaluator.registerUnlockable({
        id: `activity:${activity.key}`,
        unlockConditions: activity.unlockConditions,
        onUnlock: () => {
          console.log(`[UnlockEvaluator] Unlocked activity: ${activity.key}`);
        },
      });
    }
  }

  for (const category of lifestyleOptions) {
    for (const option of category.options) {
      if (option.unlockConditions && !option.unlocked) {
        UnlockEvaluator.registerUnlockable({
          id: `lifestyle:${option.id}`,
          unlockConditions: option.unlockConditions,
          onUnlock: () => {
            console.log(`[UnlockEvaluator] Unlocked lifestyle: ${option.id}`);
          },
        });
      }
    }
  }

  for (const nav of sidebarData) {
    if (nav.unlockConditions) {
      UnlockEvaluator.registerUnlockable({
        id: `navigation:${nav.name}`,
        unlockConditions: nav.unlockConditions,
        onUnlock: () => {
          useGameStore.getState().unlockNavigationTab(nav.name);
        },
      });
    }
  }

  EventBus.on("activity:completed", ({ payload }) => {
    console.log("[EventBus] activity:completed", payload.activityKey);
    UnlockEvaluator.checkAll();
  });

  EventBus.on("cultivator:stat-changed", () => {
    UnlockEvaluator.checkAll();
  });

  EventBus.on("game:tick", ({ payload }) => {
    if (payload.day % 10 === 0) {
      UnlockEvaluator.checkAll();
    }
  });
}
