import { z } from "zod";
import { UnlockConditionSchema } from "./unlockCondition.ts";

const UnlockableDefinitionSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("activity_category"),
    target: z.enum(["work", "training", "study", "social", "life", "hobby", "adventure"]),
    unlockConditions: z.array(UnlockConditionSchema),
  }),
  z.object({
    id: z.string(),
    type: z.literal("navigation_tab"),
    target: z.enum(["Explore", "Inventory", "Activities", "Quests", "Lifestyle", "Travel", "Stats", "Recap", "Story"]),
    unlockConditions: z.array(UnlockConditionSchema),
  }),
]);

export const UnlockablesArraySchema = z.array(UnlockableDefinitionSchema);
