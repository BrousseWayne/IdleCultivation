import type { ActivityCategory, Stats } from "@/game/types/domain";

// Chrome iconography is calligraphic characters rendered as text (font-glyph),
// tinted by their dedicated hue — no icon library in the chrome.
export const CATEGORY_GLYPHS: Record<ActivityCategory, string> = {
  work: "工",
  training: "武",
  study: "學",
  social: "交",
  life: "家",
  hobby: "藝",
  adventure: "險",
};

export const STAT_GLYPHS: Record<Stats, string> = {
  Strength: "力",
  Dexterity: "敏",
};

// 文 — the wen, the copper cash coin prices are written in. Mortal-phase money
// is copper; taels of silver (兩) are reserved for future large-sum content.
export const MONEY_GLYPH = "文";
export const SELF_GLYPH = "己";
export const MORTAL_GLYPH = "凡";
