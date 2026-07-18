import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useGameStore } from "@/game/stores/gameStore";
import { useActivityStore } from "@/game/stores/activityStore";
import { backgroundDefinitions } from "@/game/data/intro";
import { reincarnate } from "@/game/engine/gameLoop";
import { text } from "@/game/content/text";

export const DeathOverlay = () => {
  const age = useCultivatorStore((state) => state.age);
  const stats = useCultivatorStore((state) => state.stats);
  const runBackground = useGameStore((state) => state.runBackground);
  const completionCounts = useActivityStore((state) => state.completionCounts);

  const totalActivities = Object.values(completionCounts).reduce(
    (sum, n) => sum + n,
    0
  );

  const backgroundDef = runBackground
    ? backgroundDefinitions[runBackground]
    : null;

  return (
    <div className="fixed inset-0 bg-background/90 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="max-w-sm w-full px-8 py-12 flex flex-col gap-8">
        <div className="space-y-2">
          <p className="text-xs text-ink-2 font-mono uppercase tracking-widest">
            {text("death.title")}
          </p>
          <p className="text-ink-2 text-sm leading-relaxed">
            {text("death.subtitle")}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-ink-2">{text("death.label.yearsLived")}</span>
            <span className="text-ink font-mono">{age}</span>
          </div>

          {backgroundDef && (
            <div className="flex justify-between text-sm">
              <span className="text-ink-2">{text("death.label.origin")}</span>
              <span className="text-ink">{backgroundDef.name}</span>
            </div>
          )}

          {Object.entries(stats).map(([stat, value]) => (
            <div key={stat} className="flex justify-between text-sm">
              <span className="text-ink-2">{stat}</span>
              <span className="text-ink font-mono">{value}</span>
            </div>
          ))}

          <div className="flex justify-between text-sm">
            <span className="text-ink-2">{text("death.label.activitiesCompleted")}</span>
            <span className="text-ink font-mono">{totalActivities}</span>
          </div>
        </div>

        <button
          onClick={reincarnate}
          className="self-start px-6 py-3 border border-accent-violet/40 text-accent-violet text-sm rounded-md hover:bg-accent-violet/10 transition-colors"
        >
          {text("death.action.newCycle")}
        </button>
      </div>
    </div>
  );
};
