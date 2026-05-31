import { EventBus } from "@/game/services/EventBus";
import { UnlockEvaluator } from "@/game/services/UnlockEvaluator";
import { SaveManager } from "@/game/services/SaveManager";
import { useGameStore } from "@/game/stores/gameStore";
import { useNotificationStore } from "@/game/stores/notificationStore";
import { unlockables } from "@/game/data/unlocks";
import { activityData } from "@/game/data/activity";
import { sidebarData } from "@/game/data/navigation";

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
          activity.unlocked = true;
        },
      });
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

  EventBus.on("notification:push", ({ payload }) => {
    useNotificationStore.getState().push(payload.message, payload.notificationType);
  });

  EventBus.on("cultivator:reincarnated", () => {
    SaveManager.clearSave();
  });
}
