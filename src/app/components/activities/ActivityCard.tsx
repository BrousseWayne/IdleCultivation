import { Minus, Plus } from "lucide-react";
import type { Activity } from "../../types/domain";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CATEGORY_COLOR_CLASSES, getCategoryHex } from "../../data/sectionColors";
import { useActivityStore } from "../../stores/activityStore";
import { useGameStore } from "../../stores/gameStore";
import { getActivityXpProgress, getFoilGradient } from "../../utils";
import { ACTIVITY_DESIGN } from "../../styles/activityDesignTokens";
import { EffectDisplay } from "./EffectDisplay";

interface ActivityCardProps {
  activity: Activity;
  activities: Record<string, number>;
  completions: number;
  totalXp: number;
  allocateActivity: (activityKey: string, delta: number) => void;
}

export function ActivityCard({
  activity,
  activities,
  completions,
  totalXp,
  allocateActivity,
}: ActivityCardProps) {
  const allocated = activities[activity.key] || 0;
  const progress = activity.timeCost > 0 ? Math.min((allocated / activity.timeCost) * 100, 100) : 0;
  const currentActivity = useActivityStore((s) => s.activityQueue[0]);
  const isRunning = currentActivity?.key === activity.key;
  const colors = CATEGORY_COLOR_CLASSES[activity.category];
  const ticks = useGameStore((s) => s.ticks);
  const startTick = useActivityStore((s) => s.currentActivityStartTick);

  const activityProgress = isRunning && startTick !== null
    ? Math.min((ticks - startTick) / activity.timeCost, 1)
    : 0;
  const xpGain = activity.baseXp;
  const interpolatedXp = totalXp + (xpGain * activityProgress);
  const { level, currentXp, xpForNext } = getActivityXpProgress(interpolatedXp);
  const xpPct = xpForNext > 0 ? (currentXp / xpForNext) * 100 : 0;

  return (
    <div className="relative group">
      <div className={`flex items-center ${ACTIVITY_DESIGN.spacing.card.gap} ${ACTIVITY_DESIGN.spacing.card.padding} bg-card/30 rounded-md ${ACTIVITY_DESIGN.states.hover.card} ${ACTIVITY_DESIGN.transitions.standard} ${ACTIVITY_DESIGN.states.running.borderWidth} ${isRunning ? colors.border : colors.borderFaded}`}>
        <activity.icon className={`${ACTIVITY_DESIGN.icon.card} ${colors.text} shrink-0`} />
        <div className={`flex items-center ${ACTIVITY_DESIGN.spacing.card.innerGap} w-28 shrink-0`}>
          <span className={`${ACTIVITY_DESIGN.typography.name.card} truncate`}>{activity.name}</span>
          <span className={`${ACTIVITY_DESIGN.typography.level} shrink-0`}>Lv.{level}</span>
        </div>
        <div className={`flex-1 flex flex-wrap ${ACTIVITY_DESIGN.effects.gap} min-w-0`}>
          <EffectDisplay effects={activity.effects} level={level} />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => allocateActivity(activity.key, -1)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className={`${ACTIVITY_DESIGN.typography.allocation} w-8 text-center ${colors.text}`}>{allocated}h</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => allocateActivity(activity.key, 1)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        {completions > 0 && (
          <span className={ACTIVITY_DESIGN.typography.completions}>x{completions}</span>
        )}
        <span className={ACTIVITY_DESIGN.typography.time}>{activity.timeCost}h</span>
      </div>
      <div className="space-y-px">
        <div className={`${ACTIVITY_DESIGN.progressBar.allocation.height} w-full ${ACTIVITY_DESIGN.progressBar.allocation.track} overflow-hidden`}>
          <Progress
            value={progress}
            striped={progress > 0}
            className={`${ACTIVITY_DESIGN.progressBar.allocation.height} ${ACTIVITY_DESIGN.progressBar.allocation.track} ${colors.progress}`}
          />
        </div>
        <div className={`${ACTIVITY_DESIGN.progressBar.xp.height} w-full ${ACTIVITY_DESIGN.progressBar.xp.track} rounded-b overflow-hidden relative`}>
          <div
            className={`h-full ${ACTIVITY_DESIGN.transitions.allocation} absolute left-0 top-0`}
            style={{ width: `${xpPct}%` }}
          >
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background: getFoilGradient(getCategoryHex(activity.category)),
                backgroundSize: ACTIVITY_DESIGN.progressBar.xp.shimmerSize,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
