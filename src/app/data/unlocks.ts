import type { UnlockCondition } from "../types/unlocks";
import type { ActivityCategory, NavigationItem } from "../types/domain";

export type UnlockableDefinition =
  | {
      id: string;
      unlockConditions: UnlockCondition[];
      type: "activity_category";
      target: ActivityCategory;
    }
  | {
      id: string;
      unlockConditions: UnlockCondition[];
      type: "navigation_tab";
      target: NavigationItem;
    };

export const unlockables: UnlockableDefinition[] = [
  {
    id: "category:study",
    type: "activity_category",
    target: "study",
    unlockConditions: [{ type: "age", operator: ">=", value: 15 }],
  },
  {
    id: "category:social",
    type: "activity_category",
    target: "social",
    unlockConditions: [
      { type: "stat", stat: "Strength", operator: ">=", value: 20 },
    ],
  },
];
