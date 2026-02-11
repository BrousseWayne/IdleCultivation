import { z } from "zod";

const operatorSchema = z.enum([">=", ">", "<=", "<", "=="]);

const baseConditionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("stat"), stat: z.enum(["Strength", "Dexterity"]), operator: operatorSchema, value: z.number() }),
  z.object({ type: z.literal("age"), operator: operatorSchema, value: z.number() }),
  z.object({ type: z.literal("activity_completions"), activityKey: z.string(), count: z.number() }),
  z.object({ type: z.literal("spirit_stones"), operator: operatorSchema, value: z.number() }),
  z.object({ type: z.literal("day"), operator: operatorSchema, value: z.number() }),
]);

export const UnlockConditionSchema: z.ZodType<unknown> = z.lazy(() =>
  z.union([
    baseConditionSchema,
    z.object({ type: z.literal("and"), conditions: z.array(UnlockConditionSchema) }),
    z.object({ type: z.literal("or"), conditions: z.array(UnlockConditionSchema) }),
  ])
);
