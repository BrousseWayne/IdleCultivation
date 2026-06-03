import type { NavigationItem, ActivityCategory, Stats } from "@/game/types/domain";

// ---------------------------------------------------------------------------
// Palette — single source of truth (mirror these hexes in globals.css).
// Reserved roles (never decorative): jade=positive/brand, gold=caution,
// cinnabar=negative, silver=money.
// Free/wayfinding axes: violet=mind, sky=world, lotus=people, indigo=body.
// ---------------------------------------------------------------------------
export const PALETTE = {
  jade: "#5FB4A0",
  gold: "#D4AF6A",
  cinnabar: "#E07856",
  silver: "#94A3B8",
  violet: "#B59ACF",
  sky: "#6BA3D4",
  lotus: "#D98AA8",
  indigo: "#6E73C9",
} as const;

export const ACCENT_HEX: Record<string, string> = {
  "accent-jade": PALETTE.jade,
  "accent-gold": PALETTE.gold,
  "accent-cinnabar": PALETTE.cinnabar,
  "accent-silver": PALETTE.silver,
  "accent-violet": PALETTE.violet,
  "accent-sky": PALETTE.sky,
  "accent-lotus": PALETTE.lotus,
  "accent-indigo": PALETTE.indigo,
};

// Active nav uses the brand (jade); inactive is neutral. No per-section rainbow.
export const SECTION_COLORS: Record<NavigationItem, string> = {
  Activities: "accent-jade",
  Explore: "accent-jade",
  Inventory: "accent-jade",
  Quests: "accent-jade",
  Lifestyle: "accent-jade",
  Travel: "accent-jade",
  Stats: "accent-jade",
  Recap: "accent-jade",
  Story: "accent-jade",
};

// Category wayfinding draws ONLY from the free axes (mind/world/people/body).
export const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  work: "accent-sky",
  training: "accent-indigo",
  study: "accent-violet",
  social: "accent-lotus",
  life: "accent-sky",
  hobby: "accent-sky",
  adventure: "accent-indigo",
};

type ColorClasses = {
  text: string;
  border: string;
  borderFaded: string;
  progress: string;
};

// Literal class strings (not templated) so Tailwind's JIT generates them.
export const CATEGORY_COLOR_CLASSES: Record<ActivityCategory, ColorClasses> = {
  work: { text: "text-accent-sky", border: "border-l-accent-sky", borderFaded: "border-l-accent-sky/30 hover:border-l-accent-sky/60", progress: "[&>div]:bg-accent-sky" },
  training: { text: "text-accent-indigo", border: "border-l-accent-indigo", borderFaded: "border-l-accent-indigo/30 hover:border-l-accent-indigo/60", progress: "[&>div]:bg-accent-indigo" },
  study: { text: "text-accent-violet", border: "border-l-accent-violet", borderFaded: "border-l-accent-violet/30 hover:border-l-accent-violet/60", progress: "[&>div]:bg-accent-violet" },
  social: { text: "text-accent-lotus", border: "border-l-accent-lotus", borderFaded: "border-l-accent-lotus/30 hover:border-l-accent-lotus/60", progress: "[&>div]:bg-accent-lotus" },
  life: { text: "text-accent-sky", border: "border-l-accent-sky", borderFaded: "border-l-accent-sky/30 hover:border-l-accent-sky/60", progress: "[&>div]:bg-accent-sky" },
  hobby: { text: "text-accent-sky", border: "border-l-accent-sky", borderFaded: "border-l-accent-sky/30 hover:border-l-accent-sky/60", progress: "[&>div]:bg-accent-sky" },
  adventure: { text: "text-accent-indigo", border: "border-l-accent-indigo", borderFaded: "border-l-accent-indigo/30 hover:border-l-accent-indigo/60", progress: "[&>div]:bg-accent-indigo" },
};

// Stats are rendered icon-first and neutral (see StatIcon); no chromatic accent.
export const STAT_COLORS: Record<Stats, string> = {
  Strength: "text-slate-300",
  Dexterity: "text-slate-300",
};

export function getCategoryHex(category: ActivityCategory): string {
  return ACCENT_HEX[CATEGORY_COLORS[category]] || PALETTE.jade;
}
