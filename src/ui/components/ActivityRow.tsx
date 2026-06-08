import { Plus, Minus, Clock } from "lucide-react";
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

export function ActivityRow({ activity, onQueue, onUnqueue, index = 0 }: {
  activity: Activity;
  onQueue: (key: string) => void;
  onUnqueue: (key: string) => void;
  index?: number;
}) {
  const queue = useActivityStore((s) => s.queue);
  const scheduleIndex = useActivityStore((s) => s.scheduleIndex);
  const xp = useActivityStore((s) => s.activityXp[activity.key] || 0);
  const runningTicks = useActivityStore((s) => s.runningTicks);

  const units = queuedUnits(queue, activity.key);
  const allocated = units * activity.timeCost;
  const isRunning = unitKeyAt(queue, scheduleIndex) === activity.key;
  const colors = CATEGORY_COLOR_CLASSES[activity.category];
  const hex = getCategoryHex(activity.category);
  const zebra = index % 2 === 1;

  const progress = isRunning ? Math.min(runningTicks / activity.timeCost, 1) : 0;
  const interpolatedXp = xp + activity.xpScalingFn() * progress;
  const { level, currentXp, xpForNext } = getActivityXpProgress(interpolatedXp);
  const xpPct = xpForNext > 0 ? (currentXp / xpForNext) * 100 : 0;

  return (
    <div className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md ${zebra ? "bg-panel" : ""}`}>
      <activity.icon className={`w-4 h-4 shrink-0 ${colors.text}`} />

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] text-ink truncate">{activity.name}</span>
          <div className="flex flex-wrap items-center gap-1 shrink-0">
            <EffectDisplay effects={activity.effects} level={level} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 w-1/2 min-w-0">
          <span className="text-[10px] text-ink-3 shrink-0">Lv {level}</span>
          <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
            <div className="h-full animate-shimmer" style={{ width: `${xpPct}%`, background: getFoilGradient(hex), backgroundSize: "200% 100%" }} />
          </div>
        </div>
      </div>

      <span className="flex items-center gap-2.5 shrink-0">
        <span className="flex items-center gap-1 text-[13px] font-mono font-semibold text-ink-2">
          <Clock className="w-3 h-3 text-ink-3" />
          {activity.timeCost}h{allocated > 0 && <span className="text-accent-jade"> ·{allocated}h</span>}
        </span>
        <span className="flex items-center rounded-md border border-line-2 overflow-hidden">
          <button onClick={() => onUnqueue(activity.key)} disabled={allocated < activity.timeCost}
            className="w-6 h-5 flex items-center justify-center text-ink-2 hover:bg-panel-2 disabled:opacity-30 disabled:hover:bg-transparent">
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-px h-3.5 bg-line-2" />
          <button onClick={() => onQueue(activity.key)}
            className="w-6 h-5 flex items-center justify-center text-accent-jade hover:bg-panel-2">
            <Plus className="w-3 h-3" />
          </button>
        </span>
      </span>
    </div>
  );
}
