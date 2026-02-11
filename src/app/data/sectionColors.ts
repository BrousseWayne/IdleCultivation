import type { NavigationItem, ActivityCategory } from "../types/domain";

export const SECTION_COLORS: Record<NavigationItem, string> = {
  Activities: "accent-jade",
  Explore: "accent-cinnabar",
  Inventory: "accent-gold",
  Quests: "accent-violet",
  Lifestyle: "accent-lotus",
  Travel: "accent-sky",
  Stats: "accent-silver",
  Recap: "accent-sky",
  Story: "accent-violet",
};

export const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  work: "accent-gold",
  training: "accent-jade",
  study: "accent-violet",
  social: "accent-lotus",
  life: "accent-emerald",
  hobby: "accent-sky",
  adventure: "accent-cinnabar",
};
