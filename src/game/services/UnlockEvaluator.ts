import type { ComparisonOperator, UnlockCondition, UnlockableEntity } from "@/game/types/unlocks";
import { getActivityXpProgress } from "@/game/utils/activityXp";
import { assertNever } from "@/game/utils/assertNever";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useGameStore } from "@/game/stores/gameStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useActivityStore } from "@/game/stores/activityStore";

// Data-driven, event-driven unlock evaluation. A pool of registered
// unlockables is re-checked on relevant events (plus once per day); a
// satisfied entry fires its onUnlock exactly once and leaves the pool.

const unlockables = new Map<string, UnlockableEntity>();
const unlockedIds = new Set<string>();

function compareValues(left: number, operator: ComparisonOperator, right: number): boolean {
  switch (operator) {
    case ">=":
      return left >= right;
    case ">":
      return left > right;
    case "<=":
      return left <= right;
    case "<":
      return left < right;
    case "==":
      return left === right;
  }
}

function evaluateCondition(condition: UnlockCondition): boolean {
  switch (condition.type) {
    case "stat": {
      const stats = useCultivatorStore.getState().stats;
      return compareValues(stats[condition.stat] || 0, condition.operator, condition.value);
    }
    case "age": {
      const age = useCultivatorStore.getState().age;
      return compareValues(age, condition.operator, condition.value);
    }
    case "activity_completions": {
      const completions =
        useActivityStore.getState().completionCounts[condition.activityKey] || 0;
      return completions >= condition.count;
    }
    case "activity_level": {
      const xp = useActivityStore.getState().activityXp[condition.activityKey] || 0;
      return getActivityXpProgress(xp).level >= condition.level;
    }
    case "currency": {
      const amount = useInventoryStore.getState().currency;
      return compareValues(amount, condition.operator, condition.value);
    }
    case "day": {
      const day = useGameStore.getState().day;
      return compareValues(day, condition.operator, condition.value);
    }
    case "and":
      return condition.conditions.every((child) => evaluateCondition(child));
    case "or":
      return condition.conditions.some((child) => evaluateCondition(child));
    default:
      assertNever(condition, "UnlockEvaluator");
      return false;
  }
}

export const UnlockEvaluator = {
  registerUnlockable(entity: UnlockableEntity): void {
    unlockables.set(entity.id, entity);
  },

  evaluate(conditions: readonly UnlockCondition[]): boolean {
    return conditions.every((condition) => evaluateCondition(condition));
  },

  checkAll(): void {
    unlockables.forEach((entity, id) => {
      if (unlockedIds.has(id)) return;

      if (UnlockEvaluator.evaluate(entity.unlockConditions)) {
        try {
          entity.onUnlock();
        } catch (error) {
          console.error(`[UnlockEvaluator] onUnlock failed for ${id}:`, error);
        }
        unlockedIds.add(id);
        unlockables.delete(id);
      }
    });
  },

  clear(): void {
    unlockables.clear();
    unlockedIds.clear();
  },
};
