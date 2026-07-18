import type { Effect } from "@/game/types/effects";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useGameStore } from "@/game/stores/gameStore";
import { useUnlockStore } from "@/game/stores/unlockStore";
import { EventBus } from "@/game/services/EventBus";
import { assertNever } from "@/game/utils/assertNever";

// Applies authored Effect lists to the stores. The single switch is the whole
// contract: adding an Effect variant without a case here breaks the build.

function apply(effect: Effect): void {
  switch (effect.type) {
    case "grant_currency":
      useInventoryStore.getState().addCurrency(effect.amount);
      EventBus.emit({ type: "inventory:currency-changed", payload: { amount: effect.amount } });
      break;

    case "spend_currency":
      useInventoryStore.getState().subtractCurrency(effect.amount);
      EventBus.emit({ type: "inventory:currency-changed", payload: { amount: -effect.amount } });
      break;

    case "grant_stat": {
      const cultivator = useCultivatorStore.getState();
      const oldValue = cultivator.stats[effect.stat] || 0;
      cultivator.incrementStat(effect.stat, effect.amount);
      EventBus.emit({
        type: "cultivator:stat-changed",
        payload: { stat: effect.stat, oldValue, newValue: oldValue + effect.amount },
      });
      break;
    }

    case "log":
      useGameStore.getState().addEventLog(effect.message);
      break;

    case "damage":
      useCultivatorStore.getState().takeDamage(effect.amount);
      break;

    case "heal":
      useCultivatorStore.getState().heal(effect.amount);
      break;

    case "unlock_category":
      useUnlockStore.getState().unlockCategory(effect.category);
      break;

    case "unlock_nav":
      useUnlockStore.getState().unlockNavigation(effect.tab);
      break;

    case "unlock_activity":
      useUnlockStore.getState().unlockActivity(effect.key);
      break;

    case "unlock_place":
      useUnlockStore.getState().unlockPlace(effect.key);
      break;

    default:
      assertNever(effect, "EffectExecutor");
  }
}

export const EffectExecutor = {
  execute(effects: readonly Effect[]): void {
    for (const effect of effects) {
      apply(effect);
    }
  },
};
