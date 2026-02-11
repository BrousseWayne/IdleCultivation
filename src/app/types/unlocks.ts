import type { Stats } from "./domain";

export type UnlockCondition =
  | { type: "stat"; stat: Stats; operator: ">=" | ">" | "<=" | "<" | "=="; value: number }
  | { type: "age"; operator: ">=" | ">" | "<=" | "<" | "=="; value: number }
  | { type: "activity_completions"; activityKey: string; count: number }
  | { type: "spirit_stones"; operator: ">=" | ">" | "<=" | "<" | "=="; value: number }
  | { type: "day"; operator: ">=" | ">" | "<=" | "<" | "=="; value: number }
  | { type: "and"; conditions: UnlockCondition[] }
  | { type: "or"; conditions: UnlockCondition[] };

export interface UnlockableEntity {
  id: string;
  unlockConditions: UnlockCondition[];
  onUnlock: () => void;
}
