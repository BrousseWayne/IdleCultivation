import type { UnlockableDefinition } from "@/game/types/domain";

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
    unlockConditions: [{ type: "stat", stat: "Strength", operator: ">=", value: 20 }],
  },
];
