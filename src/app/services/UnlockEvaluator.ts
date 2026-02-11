import type { UnlockCondition, UnlockableEntity } from "../types/unlocks";
import { useCultivatorStore } from "../stores/cultivatorStore";
import { useGameStore } from "../stores/gameStore";
import { useInventoryStore } from "../stores/inventoryStore";
import { useActivityStore } from "../stores/activityStore";

class UnlockEvaluatorService {
  private unlockables = new Map<string, UnlockableEntity>();
  private unlockedIds = new Set<string>();

  registerUnlockable(entity: UnlockableEntity): void {
    this.unlockables.set(entity.id, entity);
  }

  private compareValues(
    a: number,
    operator: ">=" | ">" | "<=" | "<" | "==",
    b: number
  ): boolean {
    switch (operator) {
      case ">=":
        return a >= b;
      case ">":
        return a > b;
      case "<=":
        return a <= b;
      case "<":
        return a < b;
      case "==":
        return a === b;
      default:
        return false;
    }
  }

  private evaluateCondition(condition: UnlockCondition): boolean {
    switch (condition.type) {
      case "stat": {
        const stats = useCultivatorStore.getState().stats;
        const value = stats[condition.stat] || 0;
        return this.compareValues(value, condition.operator, condition.value);
      }
      case "age": {
        const age = useCultivatorStore.getState().age;
        return this.compareValues(age, condition.operator, condition.value);
      }
      case "activity_completions": {
        const completions =
          useActivityStore.getState().completionCounts[condition.activityKey] ||
          0;
        return completions >= condition.count;
      }
      case "spirit_stones": {
        const stones = useInventoryStore.getState().spiritStones;
        return this.compareValues(stones, condition.operator, condition.value);
      }
      case "day": {
        const day = useGameStore.getState().day;
        return this.compareValues(day, condition.operator, condition.value);
      }
      case "and": {
        return condition.conditions.every((c) => this.evaluateCondition(c));
      }
      case "or": {
        return condition.conditions.some((c) => this.evaluateCondition(c));
      }
      default:
        console.warn("UnlockEvaluator: Unknown condition type", condition);
        return false;
    }
  }

  evaluate(conditions: UnlockCondition[]): boolean {
    return conditions.every((c) => this.evaluateCondition(c));
  }

  checkAll(): void {
    this.unlockables.forEach((entity, id) => {
      if (this.unlockedIds.has(id)) return;

      if (this.evaluate(entity.unlockConditions)) {
        console.log(`[UnlockEvaluator] Unlocked: ${id}`);
        entity.onUnlock();
        this.unlockedIds.add(id);
        this.unlockables.delete(id);
      }
    });
  }

  clear(): void {
    this.unlockables.clear();
    this.unlockedIds.clear();
  }
}

export const UnlockEvaluator = new UnlockEvaluatorService();
