import { EventBus } from "./EventBus";
import { UnlockEvaluator } from "./UnlockEvaluator";
import { useGameStore } from "../stores/gameStore";
import { unlockables } from "../data/unlocks";

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
