import type { Stats } from "@/game/types/domain";

export type ComparisonOperator = ">=" | ">" | "<=" | "<" | "==";

// The condition vocabulary shared by unlockables, narrative events, and event
// choices. The generic key parameter lets content data narrow `activityKey`
// to the real union of authored activity keys (see data/defineContent.ts) —
// a typo'd reference then fails to COMPILE instead of failing at boot.
export type UnlockCondition<TActivityKey extends string = string> =
  | { type: "stat"; stat: Stats; operator: ComparisonOperator; value: number }
  | { type: "age"; operator: ComparisonOperator; value: number }
  | { type: "activity_completions"; activityKey: TActivityKey; count: number }
  | { type: "activity_level"; activityKey: TActivityKey; level: number }
  | { type: "currency"; operator: ComparisonOperator; value: number }
  | { type: "day"; operator: ComparisonOperator; value: number }
  | { type: "and"; conditions: readonly UnlockCondition<TActivityKey>[] }
  | { type: "or"; conditions: readonly UnlockCondition<TActivityKey>[] };

export interface UnlockableEntity {
  id: string;
  unlockConditions: readonly UnlockCondition[];
  onUnlock: () => void;
}
