import type { NavigationItem, ActivityCategory, Currency, Stats } from "../types/domain";

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

type ColorClasses = {
  text: string;
  border: string;
  borderFaded: string;
  progress: string;
};

const colorClasses = (token: string): ColorClasses => ({
  text: `text-${token}`,
  border: `border-l-${token}`,
  borderFaded: `border-l-${token}/30 hover:border-l-${token}/60`,
  progress: `[&>div]:bg-${token}`,
});

export const CATEGORY_COLOR_CLASSES: Record<ActivityCategory, ColorClasses> = {
  work: colorClasses("accent-gold"),
  training: colorClasses("accent-jade"),
  study: colorClasses("accent-violet"),
  social: colorClasses("accent-lotus"),
  life: colorClasses("accent-emerald"),
  hobby: colorClasses("accent-sky"),
  adventure: colorClasses("accent-cinnabar"),
};

export const CURRENCY_COLORS: Record<Currency, string> = {
  Bronze: "text-orange-400",
  Silver: "text-slate-300",
  Gold: "text-accent-gold",
  Platinum: "text-cyan-400",
};

export const STAT_COLORS: Record<Stats, string> = {
  Strength: "text-red-400",
  Dexterity: "text-blue-400",
};

export function getCategoryHex(category: ActivityCategory): string {
  return ACCENT_HEX[CATEGORY_COLORS[category]] || '#5FB4A0';
}

export const ACCENT_HEX: Record<string, string> = {
  'accent-jade': '#5FB4A0',
  'accent-gold': '#D4AF6A',
  'accent-cinnabar': '#E07856',
  'accent-violet': '#B59ACF',
  'accent-emerald': '#52B788',
  'accent-lotus': '#D88FB8',
  'accent-sky': '#6BA3D4',
};
