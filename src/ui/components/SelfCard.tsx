import { useMemo } from "react";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useActivityStore } from "@/game/stores/activityStore";
import { STAT_COLORS } from "@/game/data/sectionColors";
import { SELF_GLYPH } from "@/game/data/glyphs";
import { describeStat } from "@/game/data/stats";
import { formatNumber } from "@/game/utils/formatNumber";
import { projectQueueGains } from "@/game/utils";
import { useLerpNumber } from "@/ui/hooks/useLerpNumber";
import { Glyph, StatIcon, CurrencyIcon } from "@/ui/components/StatIcon";
import { text } from "@/game/content/text";
import type { Stats } from "@/game/types/domain";

// A mortal has no precise self-knowledge: internal states read as words, not
// numbers. Tones use the reserved state scale: jade -> gold -> cinnabar.
type Tier = { min: number; word: string; tone: string };

const VITALITY_TIERS: Tier[] = [
  { min: 90, word: "Healthy", tone: "text-accent-jade" },
  { min: 70, word: "Bruised", tone: "text-accent-jade" },
  { min: 45, word: "Wounded", tone: "text-accent-gold" },
  { min: 20, word: "Badly hurt", tone: "text-accent-cinnabar" },
  { min: 0, word: "Near death", tone: "text-accent-cinnabar" },
];

const SATIETY_TIERS: Tier[] = [
  { min: 90, word: "Full", tone: "text-accent-jade" },
  { min: 65, word: "Sated", tone: "text-accent-jade" },
  { min: 40, word: "Peckish", tone: "text-accent-gold" },
  { min: 15, word: "Hungry", tone: "text-accent-cinnabar" },
  { min: 0, word: "Starving", tone: "text-accent-cinnabar" },
];

function pickTier(tiers: Tier[], percent: number): Tier {
  return tiers.find((tier) => percent >= tier.min) ?? tiers[tiers.length - 1];
}

function Row({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-baseline text-[13.5px] py-0.5">
      <span className="text-ink-2">{label}</span>
      {children}
    </div>
  );
}

export function SelfCard() {
  const age = useCultivatorStore((state) => state.age);
  const vitality = useCultivatorStore((state) => state.vitality);
  const satiety = useCultivatorStore((state) => state.satiety);
  const stats = useCultivatorStore((state) => state.stats);
  const currency = useInventoryStore((state) => state.currency);
  const queue = useActivityStore((state) => state.queue);
  const activityXp = useActivityStore((state) => state.activityXp);

  const projected = useMemo(() => projectQueueGains(queue, activityXp), [queue, activityXp]);
  const dailyIncome = projected.coin;

  const dailyExpenses = 0;

  const lerpAge = useLerpNumber(age);
  const lerpMoney = useLerpNumber(currency);

  const vitalityTier = pickTier(VITALITY_TIERS, (vitality.current / vitality.max) * 100);
  const satietyTier = pickTier(SATIETY_TIERS, (satiety.current / satiety.max) * 100);

  const statEntries = Object.entries(stats) as [Stats, number][];
  const hasStats = statEntries.some(([, value]) => value > 0);

  return (
    <div className="bg-panel border border-line-2 rounded-lg px-3 py-3">
      <div className="flex items-center gap-2 mb-2">
        <Glyph char={SELF_GLYPH} size={15} className="text-ink-3" />
        <span className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.14em] uppercase text-ink-3">
          {text("self.title")}
        </span>
      </div>

      <Row label={text("self.label.age")}>
        <span className="text-ink font-mono font-bold">{lerpAge}</span>
      </Row>
      <Row label={text("self.label.body")}>
        <span className={`font-semibold ${vitalityTier.tone}`}>{vitalityTier.word}</span>
      </Row>
      <Row label={text("self.label.belly")}>
        <span className={`font-semibold ${satietyTier.tone}`}>{satietyTier.word}</span>
      </Row>

      <hr className="border-line my-2" />

      <Row
        label={
          <span className="flex items-center gap-2">
            <CurrencyIcon className="text-accent-silver" size={15} />
            {text("self.label.money")}
          </span>
        }
      >
        <span className="font-mono font-bold text-accent-silver">{formatNumber(Math.floor(lerpMoney))}</span>
      </Row>
      <Row label={text("self.label.income")}>
        <span className="font-mono text-accent-jade">
          {(dailyIncome > 0 || !projected.coinUndisclosed) && `+${formatNumber(dailyIncome)}`}
          {projected.coinUndisclosed && <span className="text-ink-3">{dailyIncome > 0 ? " +?" : "+?"}</span>}
        </span>
      </Row>
      {dailyExpenses > 0 && (
        <Row label={text("self.label.upkeep")}>
          <span className="font-mono text-accent-cinnabar">−{formatNumber(dailyExpenses)}</span>
        </Row>
      )}

      {hasStats && (
        <>
          <hr className="border-line my-2" />
          {statEntries
            .filter(([, value]) => value > 0)
            .map(([stat, value]) => (
              <Row
                key={stat}
                label={
                  <span className="flex items-center gap-2">
                    <StatIcon stat={stat} className={STAT_COLORS[stat]} size={16} />
                    {stat}
                  </span>
                }
              >
                <span className="font-semibold text-ink">{describeStat(stat, value)}</span>
              </Row>
            ))}
        </>
      )}
    </div>
  );
}
