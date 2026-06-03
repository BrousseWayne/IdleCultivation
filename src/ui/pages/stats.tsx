import { Progress } from "@/components/ui/progress";
import { User, BarChart3 } from "lucide-react";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useEtherealShimmer } from "@/ui/hooks/useEtherealShimmer";
import { EtherealEffect } from "@/ui/components/EtherealEffect";
import { PageHeader } from "@/ui/components/PageHeader";
import { text } from "@/game/content/text";
import { StatIcon } from "@/ui/components/StatIcon";
import { STAT_COLORS } from "@/game/data/sectionColors";
import { describeStat } from "@/game/data/stats";
import type { Stats } from "@/game/types/domain";

const ProgressRow = ({
  label,
  current,
  max,
  colorClass,
  effect,
}: {
  label: string;
  current: number;
  max: number;
  colorClass: string;
  effect?: "sparkle" | "holographic" | "prismatic" | null;
}) => (
  <div className="py-1.5">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-slate-400">{label}</span>
      <EtherealEffect effect={effect || null}>
        <span className={`font-mono text-sm ${colorClass}`}>
          {current}/{max}
        </span>
      </EtherealEffect>
    </div>
    <Progress
      value={(current / max) * 100}
      className={`h-1.5 bg-slate-800 [&>div]:${colorClass.replace("text-", "bg-")}`}
    />
  </div>
);

export const RenderStatsPage = () => {
  const stats = useCultivatorStore((s) => s.stats);
  const vitality = useCultivatorStore((s) => s.vitality);
  const satiety = useCultivatorStore((s) => s.satiety);
  const mortality = useCultivatorStore((s) => s.mortality);
  const age = useCultivatorStore((s) => s.age);
  const { getEffect } = useEtherealShimmer();

  return (
    <div className="space-y-6">
      <PageHeader
        icon={BarChart3}
        title={text("page.stats.title")}
        color="text-accent-silver"
        subtitle={text("page.stats.subtitle")}
      />

      <div className="space-y-6">
        <section>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-200 mb-2">
            <User className="w-4 h-4 text-accent-silver" />
            {text("stats.section.core")}
          </h3>
          <div className="bg-card/30 border border-border/30 rounded-md px-4 py-1">
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-slate-400">{text("stat.age")}</span>
              <span className="font-mono text-sm text-accent-jade">
                <EtherealEffect effect={getEffect("age")}>{age}</EtherealEffect>
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
            {(Object.entries(stats) as [Stats, number][]).map(([stat, value]) => (
              <div key={stat}>
                <div className="flex justify-between items-center py-1.5">
                  <StatIcon stat={stat} className={STAT_COLORS[stat]} size={18} />
                  <span className={`text-sm font-semibold ${STAT_COLORS[stat]}`}>{describeStat(stat, value)}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
              </div>
            ))}
            <ProgressRow label={text("stat.hp")} current={vitality.current} max={vitality.max} colorClass="text-accent-jade" effect={getEffect("vitality")} />
            <ProgressRow label={text("stat.satiety")} current={satiety.current} max={satiety.max} colorClass="text-accent-gold" effect={getEffect("satiety")} />
            <ProgressRow label={text("stat.mortality")} current={mortality.current} max={mortality.max} colorClass="text-accent-cinnabar" effect={getEffect("mortality")} />
          </div>
        </section>

      </div>
    </div>
  );
};
