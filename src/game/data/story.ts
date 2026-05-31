import type { CalendarEvent, StoryEntry } from "@/game/types/domain";
import { StoryDataSchema } from "@/game/data/schemas/index.ts";
import rawStory from "@/game/data/json/story.json";

const data = StoryDataSchema.parse(rawStory);

export const storyEntries: StoryEntry[] = data.storyEntries;
export const events: CalendarEvent[] = data.events;
