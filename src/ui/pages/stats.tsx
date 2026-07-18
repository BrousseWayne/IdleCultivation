import { Progress } from "@/components/ui/progress";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useEtherealShimmer } from "@/ui/hooks/useEtherealShimmer";
import { EtherealEffect } from "@/ui/components/EtherealEffect";
import { PageHeader } from "@/ui/components/PageHeader";
import { text } from "@/game/content/text";
import { StatIcon, Glyph } from "@/ui/components/StatIcon";
import { STAT_COLORS } from "@/game/data/sectionColors";
import { describeStat } from "@/game/data/stats";
import type { Stats } from "@/game/types/domain";

const ProgressRow = ({
  label,
  current,
  max,
  colorClass,
  barClass,
  effect,
}: {
  label: string;
  current: number;
  max: number;
  colorClass: string;
  barClass: string;
  effect?: "sparkle" | "holographic" | "prismatic" | null;
}) => (
  <div className="py-1.5">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-ink-2">{label}</span>
      <EtherealEffect effect={effect || null}>
        <span className={`font-mono text-sm ${colorClass}`}>
          {current}/{max}
        </span>
      </EtherealEffect>
    </div>
    <Progress
      value={(current / max) * 100}
      className={`h-1.5 bg-panel-2 ${barClass}`}
    />
  </div>
);

export const RenderStatsPage = () => {
  const stats = useCultivatorStore((state) => state.stats);
  const vitality = useCultivatorStore((state) => state.vitality);
  const satiety = useCultivatorStore((state) => state.satiety);
  const mortality = useCultivatorStore((state) => state.mortality);
  const age = useCultivatorStore((state) => state.age);
  const { getEffect } = useEtherealShimmer();

  return (
    <div className="space-y-6">
      <PageHeader
        glyph="衡"
        title={text("page.stats.title")}
        color="text-accent-silver"
        subtitle={text("page.stats.subtitle")}
      />

      <div className="space-y-6">
        <section>
          <h3 className="flex items-center gap-2 text-base font-semibold text-ink mb-2">
            <Glyph char="身" size={16} className="text-accent-silver" />
            {text("stats.section.core")}
          </h3>
          <div className="bg-panel border border-line rounded-md px-4 py-1">
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-ink-2">{text("stat.age")}</span>
              <span className="font-mono text-sm text-accent-jade">
                <EtherealEffect effect={getEffect("age")}>{age}</EtherealEffect>
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-line-2 to-transparent" />
            {(Object.entries(stats) as [Stats, number][]).map(([stat, value]) => (
              <div key={stat}>
                <div className="flex justify-between items-center py-1.5">
                  <div className="flex items-center gap-2">
                    <StatIcon stat={stat} className={STAT_COLORS[stat]} size={18} />
                    <span className="text-sm text-ink-2">{stat}</span>
                  </div>
                  <span className="text-sm font-semibold text-ink">{describeStat(stat, value)}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-line-2 to-transparent" />
              </div>
            ))}
            <ProgressRow label={text("stat.hp")} current={vitality.current} max={vitality.max} colorClass="text-accent-jade" barClass="[&>div]:bg-accent-jade" effect={getEffect("vitality")} />
            <ProgressRow label={text("stat.satiety")} current={satiety.current} max={satiety.max} colorClass="text-accent-gold" barClass="[&>div]:bg-accent-gold" effect={getEffect("satiety")} />
            <ProgressRow label={text("stat.mortality")} current={mortality.current} max={mortality.max} colorClass="text-accent-cinnabar" barClass="[&>div]:bg-accent-cinnabar" effect={getEffect("mortality")} />
          </div>
        </section>

      </div>
    </div>
  );
};
