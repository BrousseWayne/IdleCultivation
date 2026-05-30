import { EventBus } from "./EventBus";
import { UnlockEvaluator } from "./UnlockEvaluator";
import { SaveManager } from "./SaveManager";
import { gameLoop, resetAging } from "../engine/gameLoop";
import { useGameStore } from "../stores/gameStore";
import { useCultivatorStore } from "../stores/cultivatorStore";
import { useActivityStore } from "../stores/activityStore";
import { useInventoryStore } from "../stores/inventoryStore";
import { useNotificationStore } from "../stores/notificationStore";
import { unlockables } from "../data/unlocks";
import { activityData } from "../data/activity";
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
    gameLoop.stop();
    resetAging();
    useCultivatorStore.getState().reset();
    useActivityStore.getState().reset();
    useInventoryStore.getState().reset();
    SaveManager.clearSave();
  });
}
