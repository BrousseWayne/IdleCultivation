import { Plus, Minus } from "lucide-react";
import { useActivityStore, queuedUnits, unitKeyAt } from "@/game/stores/activityStore";
import { useGameStore } from "@/game/stores/gameStore";
import { queueActivity, unqueueActivity } from "@/game/engine/gameLoop";
import { EntityRegistry } from "@/game/services";
import { getActivityXpProgress, getFoilGradient } from "@/game/utils";
import { CATEGORY_COLOR_CLASSES, getCategoryHex } from "@/game/data/sectionColors";
import { EffectDisplay } from "@/ui/components/activities/EffectDisplay";
import type { Activity } from "@/game/types/domain";

// shared queue/unqueue with stream logging — used by Explore + Activities
export function useActivityActions() {
  const pushLog = useGameStore((s) => s.pushLog);
  const queue = (key: string) => {
    const a = EntityRegistry.get("activity", key);
    if (a && queueActivity(key)) {
      pushLog({ text: `You set out to ${a.name.toLowerCase()}.`, theme: "ambient" });
    }
  };
  const unqueue = (key: string) => { unqueueActivity(key); };
  return { queue, unqueue };
}

export function ActivityRow({ activity, onQueue, onUnqueue }: {
  activity: Activity;
  onQueue: (key: string) => void;
  onUnqueue: (key: string) => void;
}) {
  const queue = useActivityStore((s) => s.queue);
  const scheduleIndex = useActivityStore((s) => s.scheduleIndex);
  const xp = useActivityStore((s) => s.activityXp[activity.key] || 0);
  const runningTicks = useActivityStore((s) => s.runningTicks);

  const units = queuedUnits(queue, activity.key);
  const allocated = units * activity.timeCost;
  const isRunning = unitKeyAt(queue, scheduleIndex) === activity.key;
  const colors = CATEGORY_COLOR_CLASSES[activity.category];

  const progress = isRunning ? Math.min(runningTicks / activity.timeCost, 1) : 0;
  const interpolatedXp = xp + activity.xpScalingFn() * progress;
  const { level, currentXp, xpForNext } = getActivityXpProgress(interpolatedXp);
  const xpPct = xpForNext > 0 ? (currentXp / xpForNext) * 100 : 0;

  return (
    <div className={`rounded-md border overflow-hidden transition-colors ${isRunning ? colors.border : "border-line hover:border-line-2"}`}>
      <div className="w-full flex items-center gap-3 px-3 py-2.5">
        <activity.icon className={`w-4 h-4 shrink-0 ${colors.text}`} />
        <span className="w-44 truncate text-sm text-ink shrink-0">{activity.name}</span>
        <span className="w-12 shrink-0 text-[11px] font-bold text-ink-2">Lv {level}</span>

        <div className="flex flex-wrap gap-1 min-w-0">
          <EffectDisplay effects={activity.effects} level={level} />
        </div>

        <span className="ml-auto flex items-center gap-3 text-xs text-ink-3 shrink-0">
          <span>{activity.timeCost}h{allocated > 0 && <span className="text-accent-jade"> · {allocated}h</span>}</span>
          <span className="flex items-center gap-1">
            <button onClick={() => onUnqueue(activity.key)} disabled={allocated < activity.timeCost}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-panel-2 disabled:opacity-30 disabled:hover:bg-transparent">
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={() => onQueue(activity.key)}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-panel-2 text-accent-jade">
              <Plus className="w-3 h-3" />
            </button>
          </span>
        </span>
      </div>

      {/* xp level bar */}
      <div className="h-px w-full bg-slate-900/60 relative overflow-hidden">
        <div className="h-full absolute left-0 top-0 transition-all" style={{ width: `${xpPct}%` }}>
          <div className="absolute inset-0 animate-shimmer" style={{ background: getFoilGradient(getCategoryHex(activity.category)), backgroundSize: "200% 100%" }} />
        </div>
      </div>
    </div>
  );
}
