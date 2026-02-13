import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useActivityStore } from "../stores/activityStore";
import { useGameStore } from "../stores/gameStore";
import { CATEGORY_COLORS } from "../data/sectionColors";

const colorMap: Record<string, string> = {
  'accent-jade': '#5FB4A0',
  'accent-gold': '#D4AF6A',
  'accent-cinnabar': '#E07856',
  'accent-violet': '#B59ACF',
  'accent-emerald': '#52B788',
  'accent-lotus': '#D88FB8',
  'accent-sky': '#6BA3D4',
};

export function QueueBar() {
  const [collapsed, setCollapsed] = useState(false);
  const activityQueue = useActivityStore((s) => s.activityQueue);
  const allocatedActivities = useActivityStore((s) => s.allocatedActivities);
  const currentTime = useGameStore((s) => s.timePoints);
  const maxTime = useGameStore((s) => s.maxTimePoints);

  const totalAllocated = Object.values(allocatedActivities).reduce((sum, h) => sum + h, 0);
  const timeSpent = maxTime - currentTime;

  if (activityQueue.length === 0) {
    return (
      <div className="fixed bottom-0 left-60 right-0 h-12 bg-black/95 backdrop-blur-sm border-t border-slate-800/30 z-40 flex items-center justify-center">
        <span className="text-sm text-slate-500">No activities scheduled</span>
      </div>
    );
  }

  const currentActivity = activityQueue[0];
  const currentCategoryColor = CATEGORY_COLORS[currentActivity.category];
  const currentColor = colorMap[currentCategoryColor] || colorMap['accent-jade'];
  const totalQueueTime = activityQueue.reduce((sum, a) => sum + a.timeCost, 0);

  return (
    <div className="fixed bottom-0 left-60 right-0 bg-black/95 backdrop-blur-sm border-t border-slate-800/30 z-40">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-3 px-6 py-2.5 hover:bg-slate-900/30 transition-colors"
      >
        {currentActivity && (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-md border-2"
              style={{ borderColor: currentColor }}
            >
              <currentActivity.icon className="w-4 h-4" style={{ color: currentColor }} />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold" style={{ color: currentColor }}>
                {currentActivity.name}
              </div>
              <div className="text-[10px] text-slate-600">
                {allocatedActivities[currentActivity.key]?.toFixed(0) || 0}h remaining
              </div>
            </div>
          </div>
        )}
        <div className="flex-1" />
        <span className="text-xs text-slate-500 font-mono">
          {timeSpent.toFixed(0)}h / {totalAllocated}h used
        </span>
        {collapsed ? (
          <ChevronUp className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        )}
      </button>

      {!collapsed && (
        <div className="px-6 pb-2.5">
          {/* Queue bar showing activities in order */}
          <div className="relative h-4 bg-slate-900/30 rounded-full overflow-hidden flex shadow-inner">
            {activityQueue.map((activity, index) => {
              const percentage = (activity.timeCost / totalQueueTime) * 100;
              const categoryColor = CATEGORY_COLORS[activity.category];
              const bgColor = colorMap[categoryColor] || colorMap['accent-jade'];
              const isCurrent = index === 0;

              return (
                <div
                  key={activity.queueId || `${activity.key}-${index}`}
                  style={{
                    width: `${percentage}%`,
                    background: isCurrent
                      ? `linear-gradient(90deg, ${bgColor}FF 0%, ${bgColor}DD 100%)`
                      : `linear-gradient(180deg, ${bgColor}AA, ${bgColor}77)`,
                    opacity: isCurrent ? 1 : 0.7,
                    transition: 'width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s ease-out',
                  }}
                  className="relative flex items-center justify-center first:rounded-l-full last:rounded-r-full hover:opacity-100 animate-in fade-in slide-in-from-right-2 duration-300"
                  title={`${activity.name}: ${activity.timeCost}h`}
                >
                  {percentage > 8 && (
                    <activity.icon className="w-3 h-3 text-white/90" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
