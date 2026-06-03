import type { Effect } from "@/game/types/effects";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useGameStore } from "@/game/stores/gameStore";
import { EventBus } from "@/game/services/EventBus";

class EffectExecutorService {
  execute(effects: Effect[]): void {
    for (const effect of effects) {
      this.apply(effect);
    }
  }

  private apply(effect: Effect): void {
    switch (effect.type) {
      case "grant_currency":
        useInventoryStore.getState().addCurrency(effect.amount);
        break;

      case "spend_currency":
        useInventoryStore.getState().subtractCurrency(effect.amount);
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
        useGameStore.getState().unlockActivityCategory(effect.category);
        break;

      case "unlock_nav":
        useGameStore.getState().unlockNavigationTab(effect.tab);
        break;
    }
  }
}

export const EffectExecutor = new EffectExecutorService();
