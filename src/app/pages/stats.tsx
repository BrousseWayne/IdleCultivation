import { Progress } from "@/components/ui/progress";
import { User, BarChart3 } from "lucide-react";
import { useCultivatorStore } from "../stores/cultivatorStore";
import { useEtherealShimmer } from "../hooks/useEtherealShimmer";
import { EtherealEffect } from "../components/EtherealEffect";
import { PageHeader } from "../components/PageHeader";

const StatRow = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string;
  colorClass: string;
}) => (
  <>
    <div className="flex justify-between items-center py-1.5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`font-mono text-sm ${colorClass}`}>{value}</span>
    </div>
    <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
  </>
);

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
  const lifespan = useCultivatorStore((s) => s.lifespan);
  const { getEffect } = useEtherealShimmer();

  return (
    <div className="space-y-6">
      <PageHeader
        icon={BarChart3}
        title="Cultivator Statistics"
        color="text-accent-silver"
        subtitle="Comprehensive overview of your cultivation progress and abilities"
      />

      <div className="space-y-6">
        <section>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-200 mb-2">
            <User className="w-4 h-4 text-accent-silver" />
            Core Stats
          </h3>
          <div className="bg-card/30 border border-border/30 rounded-md px-4 py-1">
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-slate-400">Age / Lifespan</span>
              <span className="font-mono text-sm text-accent-jade">
                <EtherealEffect effect={getEffect("age")}>{age}</EtherealEffect> / {lifespan}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
            {Object.entries(stats).map(([stat, value]) => (
              <StatRow key={stat} label={stat} value={String(value)} colorClass="text-accent-cinnabar" />
            ))}
            <ProgressRow label="HP" current={vitality.current} max={vitality.max} colorClass="text-accent-emerald" effect={getEffect("vitality")} />
            <ProgressRow label="Satiety" current={satiety.current} max={satiety.max} colorClass="text-accent-gold" effect={getEffect("satiety")} />
            <ProgressRow label="Mortality" current={mortality.current} max={mortality.max} colorClass="text-accent-cinnabar" effect={getEffect("mortality")} />
          </div>
        </section>

      </div>
    </div>
  );
};
