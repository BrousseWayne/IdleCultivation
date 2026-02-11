import type { CalendarEvent, StoryEntry } from "../types/domain";
import { StoryDataSchema } from "./schemas/index.ts";
import rawStory from "./json/story.json";

const data = StoryDataSchema.parse(rawStory);

export const storyEntries: StoryEntry[] = data.storyEntries;
export const events: CalendarEvent[] = data.events;
