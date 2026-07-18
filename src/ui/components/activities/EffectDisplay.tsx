import type { Effect } from "@/game/types/effects";
import { STAT_COLORS, STAT_HEX } from "@/game/data/sectionColors";
import { StatIcon, CurrencyIcon } from "@/ui/components/StatIcon";
import { formatNumber, scaleEffectAmount, isDisclosed } from "@/game/utils";

interface EffectDisplayProps {
  effects: readonly Effect[];
  level: number;
}

type CurrencyEffect = Extract<Effect, { type: "grant_currency" }>;
type StatEffect = Extract<Effect, { type: "grant_stat" }>;

export function EffectDisplay({ effects, level }: EffectDisplayProps) {
  const currency = effects.filter((effect): effect is CurrencyEffect => effect.type === "grant_currency");
  const stats = effects.filter((effect): effect is StatEffect => effect.type === "grant_stat");
  // multi-stat box: hard-split border (MTG dual-color frame), equal segments
  const statCount = stats.length;
  const statGradient = `linear-gradient(to right, ${stats
    .map((statEffect, index) => `${STAT_HEX[statEffect.stat]} ${(index / statCount) * 100}%, ${STAT_HEX[statEffect.stat]} ${((index + 1) / statCount) * 100}%`)
    .join(", ")})`;

  return (
    <>
      {currency.map((effect, index) => (
        <div
          key={`currency-${index}`}
          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-accent-silver/10 border border-accent-silver/20"
        >
          <CurrencyIcon className="text-accent-silver" size={10} />
          <span className="text-[11px] font-mono font-bold text-accent-silver">
            {isDisclosed(effect) ? `+${formatNumber(scaleEffectAmount(effect.amount, level))}` : "+?"}
          </span>
        </div>
      ))}

      {stats.length > 0 && (
        <div className="rounded-sm p-px" style={{ background: statGradient }}>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-[3px]" style={{ background: "var(--bg-base)" }}>
            {stats.map((effect, index) => (
              <StatIcon key={index} stat={effect.stat} className={STAT_COLORS[effect.stat]} size={11} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
