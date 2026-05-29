import { useCultivatorStore } from "../stores/cultivatorStore";
import { useGameStore } from "../stores/gameStore";
import { useActivityStore } from "../stores/activityStore";
import { backgroundDefinitions } from "../data/intro";

export const DeathOverlay = () => {
  const age = useCultivatorStore((s) => s.age);
  const stats = useCultivatorStore((s) => s.stats);
  const reincarnate = useGameStore((s) => s.reincarnate);
  const runBackground = useGameStore((s) => s.runBackground);
  const completionCounts = useActivityStore((s) => s.completionCounts);

  const totalActivities = Object.values(completionCounts).reduce(
    (sum, n) => sum + n,
    0
  );

  const backgroundDef = runBackground
    ? backgroundDefinitions[runBackground]
    : null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="max-w-sm w-full px-8 py-12 flex flex-col gap-8">
        <div className="space-y-2">
          <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
            Cultivation Ended
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            The candle burns out. The flame remembers.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Years lived</span>
            <span className="text-slate-200 font-mono">{age}</span>
          </div>

          {backgroundDef && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Origin</span>
              <span className="text-slate-200">{backgroundDef.name}</span>
            </div>
          )}

          {Object.entries(stats).map(([stat, value]) => (
            <div key={stat} className="flex justify-between text-sm">
              <span className="text-slate-500">{stat}</span>
              <span className="text-slate-200 font-mono">{value}</span>
            </div>
          ))}

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Activities completed</span>
            <span className="text-slate-200 font-mono">{totalActivities}</span>
          </div>
        </div>

        <button
          onClick={reincarnate}
          className="self-start px-6 py-3 border border-accent-violet/40 text-accent-violet text-sm rounded-md hover:bg-accent-violet/10 transition-colors"
        >
          Begin a new cycle
        </button>
      </div>
    </div>
  );
};
