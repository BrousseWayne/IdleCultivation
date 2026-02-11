import { z } from "zod";

const StoryEntrySchema = z.object({
  time: z.string(),
  entry: z.string(),
  type: z.enum(["narrative", "discovery", "journey", "achievement", "combat"]),
});

const CalendarEventSchema = z.object({
  date: z.number(),
  type: z.enum(["past", "future"]),
  activity: z.string(),
  result: z.string(),
  category: z.string(),
});

export const StoryDataSchema = z.object({
  storyEntries: z.array(StoryEntrySchema),
  events: z.array(CalendarEventSchema),
});
