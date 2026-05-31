import { z } from "zod";

const ActiveQuestSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  progress: z.number(),
  reward: z.string(),
  timeLeft: z.string(),
});

const CompletedQuestSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  reward: z.string(),
  completedDate: z.string(),
});

export const QuestsDataSchema = z.object({
  activeQuests: z.array(ActiveQuestSchema),
  completedQuests: z.array(CompletedQuestSchema),
});
