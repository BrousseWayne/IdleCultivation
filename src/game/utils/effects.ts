import type { Effect } from "@/game/types/effects";
import type { QueueBlock, Stats } from "@/game/types/domain";
import { EntityRegistry } from "@/game/services/EntityRegistry";
import { getActivityXpProgress, scaleEffectAmount } from "@/game/utils/activityXp";

// Whether the player may see this effect's magnitude before it resolves.
// Undisclosed rewards render as "+?" everywhere and stay out of every
// projection — the actual amount only surfaces once it has been earned.
export function isDisclosed(effect: Effect): boolean {
  return !("uncertain" in effect && effect.uncertain);
}

export type QueueProjection = {
  coin: number; // disclosed coin only
  coinUndisclosed: boolean; // at least one hidden coin reward in the queue
  stats: Partial<Record<Stats, number>>;
};

// Single source for "what will this schedule yield" — every preview panel
// (projected gains, Self income) reads this so disclosure rules apply once.
export function projectQueueGains(
  queue: QueueBlock[],
  activityXp: Record<string, number>
): QueueProjection {
  let coin = 0;
  let coinUndisclosed = false;
  const stats: Partial<Record<Stats, number>> = {};

  for (const block of queue) {
    const activity = EntityRegistry.get("activity", block.key);
    if (!activity) continue;
    const { level } = getActivityXpProgress(activityXp[block.key] || 0);
    for (const effect of activity.effects) {
      if (effect.type === "grant_currency") {
        if (isDisclosed(effect)) {
          coin += scaleEffectAmount(effect.amount, level) * block.units;
        } else {
          coinUndisclosed = true;
        }
      } else if (effect.type === "grant_stat") {
        stats[effect.stat] =
          (stats[effect.stat] ?? 0) + scaleEffectAmount(effect.amount, level) * block.units;
      }
    }
  }
  return { coin, coinUndisclosed, stats };
}
