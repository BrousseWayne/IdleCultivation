import type { Effect } from "@/game/types/effects";
import { STAT_COLORS, STAT_HEX } from "@/game/data/sectionColors";
import { StatIcon, CurrencyIcon } from "@/ui/components/StatIcon";
import { formatNumber, scaleEffectAmount } from "@/game/utils";

interface EffectDisplayProps {
  effects: Effect[];
  level: number;
}

type CurrencyEffect = Extract<Effect, { type: "grant_currency" }>;
type StatEffect = Extract<Effect, { type: "grant_stat" }>;

export function EffectDisplay({ effects, level }: EffectDisplayProps) {
  const currency = effects.filter((e): e is CurrencyEffect => e.type === "grant_currency");
  const stats = effects.filter((e): e is StatEffect => e.type === "grant_stat");
  // multi-stat box: hard-split border (MTG dual-color frame), equal segments
  const n = stats.length;
  const statGradient = `linear-gradient(to right, ${stats
    .map((s, i) => `${STAT_HEX[s.stat]} ${(i / n) * 100}%, ${STAT_HEX[s.stat]} ${((i + 1) / n) * 100}%`)
    .join(", ")})`;

  return (
    <>
      {currency.map((effect, i) => (
        <div
          key={`c${i}`}
          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-accent-silver/10 border border-accent-silver/20"
        >
          <CurrencyIcon className="text-accent-silver" size={10} />
          <span className="text-[10px] font-mono font-bold text-accent-silver">
            {effect.uncertain ? "+?" : `+${formatNumber(scaleEffectAmount(effect.amount, level))}`}
          </span>
        </div>
      ))}

      {stats.length > 0 && (
        <div className="rounded-sm p-px" style={{ background: statGradient }}>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-[3px]" style={{ background: "#0B0F14" }}>
            {stats.map((effect, i) => (
              <StatIcon key={i} stat={effect.stat} className={STAT_COLORS[effect.stat]} size={11} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
