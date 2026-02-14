export function getActivityXpProgress(totalXp: number): {
  level: number;
  currentXp: number;
  xpForNext: number;
} {
  let level = 1;
  let remaining = totalXp;
  while (remaining >= 100 * level) {
    remaining -= 100 * level;
    level++;
  }
  return { level, currentXp: remaining, xpForNext: 100 * level };
}

export function scaleEffectAmount(baseAmount: number, level: number): number {
  return Math.floor(baseAmount * (1 + 0.1 * (level - 1)));
}
