import { Plus, Minus, Clock } from "lucide-react";
import { useActivityStore, queuedUnits, unitKeyAt } from "@/game/stores/activityStore";
import { getActivityXpProgress, getFoilGradient } from "@/game/utils";
import { CATEGORY_COLOR_CLASSES, getCategoryHex } from "@/game/data/sectionColors";
import { CATEGORY_GLYPHS } from "@/game/data/glyphs";
import { EffectDisplay } from "@/ui/components/activities/EffectDisplay";
import { Glyph } from "@/ui/components/StatIcon";
import { useProjectedPercent } from "@/ui/hooks/useProjectedPercent";
import type { Activity } from "@/game/types/domain";

export function ActivityRow({ activity, onQueue, onUnqueue, index = 0 }: {
  activity: Activity;
  onQueue: (key: string) => void;
  onUnqueue: (key: string) => void;
  index?: number;
}) {
  const queue = useActivityStore((state) => state.queue);
  const scheduleIndex = useActivityStore((state) => state.scheduleIndex);
  const xp = useActivityStore((state) => state.activityXp[activity.key] || 0);
  const runningTicks = useActivityStore((state) => state.runningTicks);

  const units = queuedUnits(queue, activity.key);
  const allocated = units * activity.timeCost;
  const isRunning = unitKeyAt(queue, scheduleIndex) === activity.key;
  const colors = CATEGORY_COLOR_CLASSES[activity.category];
  const hex = getCategoryHex(activity.category);
  const zebra = index % 2 === 1;

  const progress = isRunning ? Math.min(runningTicks / activity.timeCost, 1) : 0;
  const interpolatedXp = xp + activity.xpPerCompletion() * progress;
  const { level, currentXp, xpForNext } = getActivityXpProgress(interpolatedXp);
  const xpPercent = useProjectedPercent(xpForNext > 0 ? (currentXp / xpForNext) * 100 : 0);

  return (
    <div className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md ${zebra ? "bg-panel" : ""}`}>
      <Glyph char={CATEGORY_GLYPHS[activity.category]} size={18} className={`w-[22px] text-center shrink-0 ${colors.text}`} />

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] text-ink truncate">{activity.name}</span>
          <div className="flex flex-wrap items-center gap-1 shrink-0">
            <EffectDisplay effects={activity.effects} level={level} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 w-1/2 min-w-0">
          <span className="text-[11px] text-ink-2 shrink-0">Lv {level}</span>
          <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
            <div className="h-full animate-shimmer" style={{ width: `${xpPercent}%`, background: getFoilGradient(hex), backgroundSize: "200% 100%" }} />
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
            className="w-7 h-7 flex items-center justify-center text-ink-2 hover:bg-panel-2 disabled:opacity-30 disabled:hover:bg-transparent">
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-px h-4 bg-line-2" />
          <button onClick={() => onQueue(activity.key)}
            className="w-7 h-7 flex items-center justify-center text-accent-jade hover:bg-panel-2">
            <Plus className="w-3 h-3" />
          </button>
        </span>
      </span>
    </div>
  );
}
