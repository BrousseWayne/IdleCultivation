import type { Effect } from "@/game/types/effects";
import { STAT_COLORS } from "@/game/data/sectionColors";
import { StatIcon, CurrencyIcon } from "@/ui/components/StatIcon";
import { formatNumber, scaleEffectAmount } from "@/game/utils";

interface EffectDisplayProps {
  effects: Effect[];
  level: number;
}

export function EffectDisplay({ effects, level }: EffectDisplayProps) {
  return (
    <>
      {effects.map((effect, i) => {
        if (effect.type === "grant_currency")
          return (
            <div
              key={i}
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-accent-silver/10 border border-accent-silver/20"
            >
              <CurrencyIcon className="text-accent-silver" size={10} />
              <span className="text-[10px] font-mono font-bold text-accent-silver">
                +{formatNumber(scaleEffectAmount(effect.amount, level))}
              </span>
            </div>
          );
        if (effect.type === "grant_stat")
          return (
            <div
              key={i}
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-slate-700/20 border border-slate-700/30"
            >
              <StatIcon stat={effect.stat} className={STAT_COLORS[effect.stat]} size={10} />
              <span className={`text-[10px] font-mono font-bold ${STAT_COLORS[effect.stat]}`}>
                +{formatNumber(scaleEffectAmount(effect.amount, level))}
              </span>
            </div>
          );
        return null;
      })}
    </>
  );
}
