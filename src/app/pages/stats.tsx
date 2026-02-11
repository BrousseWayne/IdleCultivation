import { Progress } from "@/components/ui/progress";
import { Briefcase, Heart, User } from "lucide-react";
import { useCultivatorStore } from "../stores/cultivatorStore";

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
}: {
  label: string;
  current: number;
  max: number;
  colorClass: string;
}) => (
  <div className="py-1.5">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-slate-400">{label}</span>
      <span className={`font-mono text-sm ${colorClass}`}>
        {current}/{max}
      </span>
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

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-silver mb-2">
          Cultivator Statistics
        </h2>
        <p className="text-muted-foreground">
          Comprehensive overview of your cultivation progress and abilities
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-200 mb-2">
            <User className="w-4 h-4 text-accent-silver" />
            Core Stats
          </h3>
          <div className="bg-card/30 border border-border/30 rounded-md px-4 py-1">
            <StatRow label="Age / Lifespan" value={`${age} / ${lifespan}`} colorClass="text-accent-jade" />
            {Object.entries(stats).map(([stat, value]) => (
              <StatRow key={stat} label={stat} value={String(value)} colorClass="text-accent-cinnabar" />
            ))}
            <ProgressRow label="HP" current={vitality.current} max={vitality.max} colorClass="text-accent-emerald" />
            <ProgressRow label="Satiety" current={satiety.current} max={satiety.max} colorClass="text-accent-gold" />
            <ProgressRow label="Mortality" current={mortality.current} max={mortality.max} colorClass="text-accent-cinnabar" />
          </div>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-200 mb-2">
            <Briefcase className="w-4 h-4 text-accent-sky" />
            Skills & Abilities
          </h3>
          <div className="bg-card/30 border border-border/30 rounded-md px-4 py-1">
            <StatRow label="Crafting Skill" value="67/100" colorClass="text-accent-jade" />
            <StatRow label="Trading Skill" value="34/100" colorClass="text-accent-gold" />
            <StatRow label="Cooking Skill" value="45/100" colorClass="text-accent-lotus" />
            <StatRow label="Musical Skill" value="12/100" colorClass="text-accent-violet" />
          </div>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-200 mb-2">
            <Heart className="w-4 h-4 text-accent-lotus" />
            Social & Mental
          </h3>
          <div className="bg-card/30 border border-border/30 rounded-md px-4 py-1">
            <StatRow label="Relationship Points" value="156" colorClass="text-accent-lotus" />
            <StatRow label="Knowledge" value="89" colorClass="text-accent-sky" />
            <StatRow label="Strategic Thinking" value="43" colorClass="text-accent-silver" />
            <StatRow label="Artistic Skill" value="28" colorClass="text-accent-violet" />
          </div>
        </section>
      </div>
    </div>
  );
};
