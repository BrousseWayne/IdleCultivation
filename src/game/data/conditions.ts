import type { Stats } from "@/game/types/domain";
import type { ComparisonOperator, UnlockCondition } from "@/game/types/unlocks";

// The unlock grammar, as an embedded DSL: authored conditions read like a
// sentence while staying plain UnlockCondition objects underneath — so the
// compiler still checks every activity key and the evaluator needs no parser.
//
//   unlockConditions: [when.level("mineOre", 5)]
//   when.all(when.age(">=", 15), when.coin(">=", 100))
//   when.any(when.stat("Strength", ">=", 20), when.completions("beg", 50))
//
// Key-free builders return UnlockCondition<never> so they compose into any
// key-constrained context; key-carrying builders keep their literal key, which
// is what lets defineEvents/defineUnlockables reject typos at compile time.

export const when = {
  stat(stat: Stats, operator: ComparisonOperator, value: number): UnlockCondition<never> {
    return { type: "stat", stat, operator, value };
  },
  age(operator: ComparisonOperator, value: number): UnlockCondition<never> {
    return { type: "age", operator, value };
  },
  day(operator: ComparisonOperator, value: number): UnlockCondition<never> {
    return { type: "day", operator, value };
  },
  coin(operator: ComparisonOperator, value: number): UnlockCondition<never> {
    return { type: "currency", operator, value };
  },
  completions<TActivityKey extends string>(
    activityKey: TActivityKey,
    count: number
  ): UnlockCondition<TActivityKey> {
    return { type: "activity_completions", activityKey, count };
  },
  level<TActivityKey extends string>(
    activityKey: TActivityKey,
    level: number
  ): UnlockCondition<TActivityKey> {
    return { type: "activity_level", activityKey, level };
  },
  all<TActivityKey extends string>(
    ...conditions: readonly UnlockCondition<TActivityKey>[]
  ): UnlockCondition<TActivityKey> {
    return { type: "and", conditions };
  },
  any<TActivityKey extends string>(
    ...conditions: readonly UnlockCondition<TActivityKey>[]
  ): UnlockCondition<TActivityKey> {
    return { type: "or", conditions };
  },
};
