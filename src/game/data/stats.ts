import type { Stats } from "@/game/types/domain";

// A mortal reads their faculties as words, not numbers, and each faculty has its
// own ladder. This is the qualitative representation of a stat value; numeric
// self-knowledge is a later reveal (a stable job / salary). Thresholds tunable.
const STAT_TIERS: Record<Stats, { min: number; word: string }[]> = {
  Strength: [
    { min: 10000, word: "Mighty" },
    { min: 5000, word: "Strong" },
    { min: 200, word: "Sturdy" },
    { min: 50, word: "Wiry" },
    { min: 0, word: "Feeble" },
  ],
  Dexterity: [
    { min: 10000, word: "Fleet" },
    { min: 5000, word: "Deft" },
    { min: 200, word: "Nimble" },
    { min: 50, word: "Spry" },
    { min: 0, word: "Clumsy" },
  ],
};

export function describeStat(stat: Stats, value: number): string {
  const tiers = STAT_TIERS[stat];
  return (tiers.find((tier) => value >= tier.min) ?? tiers[tiers.length - 1]).word;
}
