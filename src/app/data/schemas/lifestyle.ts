import { z } from "zod";
import { UnlockConditionSchema } from "./unlockCondition.ts";

const CostSchema = z.object({
  currency: z.enum(["Bronze", "Silver", "Gold", "Platinum"]),
  amount: z.number(),
  period: z.enum(["daily", "weekly", "monthly", "annual", "oneTime"]).optional(),
});

const LifestyleBonusSchema = z.object({
  xp: z.number().optional(),
  mortality: z.number().optional(),
});

const LifestyleOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  costs: z.array(CostSchema),
  unlocked: z.boolean(),
  bonuses: LifestyleBonusSchema,
  unlockConditions: z.array(UnlockConditionSchema).optional(),
});

const LifestyleCategoryDataSchema = z.object({
  category: z.enum(["Housing", "Meals", "Transportation"]),
  description: z.string(),
  options: z.array(LifestyleOptionSchema),
});

export const LifestyleArraySchema = z.array(LifestyleCategoryDataSchema);
