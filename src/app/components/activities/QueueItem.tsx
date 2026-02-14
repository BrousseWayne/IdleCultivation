import type { Activity } from "../../types/domain";
import { getCategoryHex } from "../../data/sectionColors";
import { ACTIVITY_DESIGN } from "../../styles/activityDesignTokens";

interface QueueItemProps {
  activity: Activity;
  index: number;
  isCurrent: boolean;
}

export function QueueItem({ activity, index, isCurrent }: QueueItemProps) {
  const hex = getCategoryHex(activity.category);

  return (
    <div
      className={`flex items-center ${ACTIVITY_DESIGN.spacing.queue.gap} ${ACTIVITY_DESIGN.spacing.queue.padding} rounded ${
        isCurrent ? "bg-slate-800/60" : "bg-slate-800/20"
      } ${ACTIVITY_DESIGN.transitions.quick} ${ACTIVITY_DESIGN.states.hover.queue}`}
    >
      <span className="text-slate-600 font-mono w-4 text-right text-[10px]">{index + 1}.</span>
      <activity.icon className={`${ACTIVITY_DESIGN.icon.queue} shrink-0`} style={{ color: hex }} />
      <span className={`${ACTIVITY_DESIGN.typography.name.queue} ${isCurrent ? "font-semibold text-slate-200" : "text-slate-400"} truncate`}>
        {activity.name}
      </span>
      <span className={`ml-auto ${ACTIVITY_DESIGN.typography.time}`}>{activity.timeCost}h</span>
      {isCurrent && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-jade animate-pulse shrink-0" />
      )}
    </div>
  );
}
