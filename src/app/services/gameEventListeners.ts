import { EventBus } from "./EventBus";
import { UnlockEvaluator } from "./UnlockEvaluator";
import { useInventoryStore } from "../stores/inventoryStore";
import { useCultivatorStore } from "../stores/cultivatorStore";
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

  EventBus.on("activity:reward-earned", ({ payload }) => {
    console.log("[EventBus] activity:reward-earned", payload);

    if ("currency" in payload.reward) {
      useInventoryStore.getState().addSpiritStones(payload.reward.amount);
    } else if ("stat" in payload.reward) {
      const cultivator = useCultivatorStore.getState();
      const oldValue = cultivator.stats[payload.reward.stat] || 0;
      const newValue = oldValue + payload.reward.amount;

      cultivator.incrementStat(payload.reward.stat, payload.reward.amount);

      EventBus.emit({
        type: "cultivator:stat-changed",
        payload: {
          stat: payload.reward.stat,
          oldValue,
          newValue,
        },
      });
    }
  });

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
