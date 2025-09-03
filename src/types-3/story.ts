export type StoryType =
  | "narrative"
  | "discovery"
  | "journey"
  | "achievement"
  | "combat";

export interface StoryEntry {
  id: string;
  text: string;
  timestamp: string;
  type?: StoryType;
}
