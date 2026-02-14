import type { Effect } from "../../types/effects";
import { CURRENCY_COLORS, STAT_COLORS } from "../../data/sectionColors";
import { StatIcon, CurrencyIcon } from "../StatIcon";
import { formatNumber, scaleEffectAmount } from "../../utils";

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
              className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm ${CURRENCY_COLORS[effect.currency].replace('text-', 'bg-')}/10 border border-${CURRENCY_COLORS[effect.currency].replace('text-', '')}/20`}
            >
              <CurrencyIcon currency={effect.currency} className={CURRENCY_COLORS[effect.currency]} size={10} />
              <span className={`text-[10px] font-mono font-bold ${CURRENCY_COLORS[effect.currency]}`}>
                +{formatNumber(scaleEffectAmount(effect.amount, level))}
              </span>
            </div>
          );
        if (effect.type === "grant_stat")
          return (
            <div
              key={i}
              className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm ${STAT_COLORS[effect.stat].replace('text-', 'bg-')}/10 border border-${STAT_COLORS[effect.stat].replace('text-', '')}/20`}
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
