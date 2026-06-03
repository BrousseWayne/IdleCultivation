import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useActivityStore, unitKeyAt } from "@/game/stores/activityStore";
import { getCategoryHex } from "@/game/data/sectionColors";
import { EntityRegistry } from "@/game/services";
import { text } from "@/game/content/text";

export function QueueBar() {
  const [collapsed, setCollapsed] = useState(false);
  const queue = useActivityStore((s) => s.queue);
  const runningTicks = useActivityStore((s) => s.runningTicks);
  const scheduleIndex = useActivityStore((s) => s.scheduleIndex);

  if (queue.length === 0) {
    return (
      <div className="sticky top-0 z-40 h-12 bg-black/95 backdrop-blur-sm border-b border-slate-800/30 flex items-center justify-center">
        <span className="text-sm text-slate-500">{text("queue.empty")}</span>
      </div>
    );
  }

  // expand blocks into per-unit segments for the progress bar
  const segments = queue.flatMap((b) => {
    const a = EntityRegistry.get("activity", b.key);
    if (!a) return [];
    return Array.from({ length: b.units }, () => a);
  });
  const totalQueueTime = segments.reduce((sum, a) => sum + a.timeCost, 0);

  const currentKey = unitKeyAt(queue, scheduleIndex);
  const head = currentKey ? EntityRegistry.get("activity", currentKey) : undefined;
  const headColor = head ? getCategoryHex(head.category) : "#888";
  const headHours = head ? head.timeCost - runningTicks : 0;

  return (
    <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-slate-800/30">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-3 px-6 py-2.5 hover:bg-slate-900/30 transition-colors"
      >
        {head && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-md border-2" style={{ borderColor: headColor }}>
              <head.icon className="w-4 h-4" style={{ color: headColor }} />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold" style={{ color: headColor }}>{head.name}</div>
              <div className="text-[10px] text-slate-600">{headHours}h remaining</div>
            </div>
          </div>
        )}
        {!head && (
          <span className="text-xs text-slate-500 italic">{text("queue.resting")}</span>
        )}
        <div className="flex-1" />
        <span className="text-xs text-slate-500 font-mono">{segments.length} queued · {totalQueueTime}h</span>
        {collapsed ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </button>

      {!collapsed && (
        <div className="px-6 pb-2.5">
          <div className="relative h-4 bg-slate-900/30 rounded-full overflow-hidden flex shadow-inner">
            {segments.map((activity, index) => {
              const percentage = totalQueueTime > 0 ? (activity.timeCost / totalQueueTime) * 100 : 0;
              const bgColor = getCategoryHex(activity.category);
              const isCurrent = index === scheduleIndex;
              const currentProgress = isCurrent ? Math.min((runningTicks / activity.timeCost) * 100, 100) : 0;
              return (
                <div
                  key={`${activity.key}-${index}`}
                  style={{
                    width: `${percentage}%`,
                    background: isCurrent
                      ? `linear-gradient(90deg, ${bgColor}FF 0%, ${bgColor}DD 100%)`
                      : `linear-gradient(180deg, ${bgColor}AA, ${bgColor}77)`,
                    opacity: isCurrent ? 1 : 0.7,
                    transition: "width 0.3s ease-out, opacity 0.3s ease-out",
                    willChange: "width",
                  }}
                  className="relative flex items-center justify-center first:rounded-l-full last:rounded-r-full hover:opacity-100 overflow-hidden"
                  title={`${activity.name}: ${activity.timeCost}h`}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 bg-slate-900/60" style={{ width: `${100 - currentProgress}%`, marginLeft: `${currentProgress}%`, transition: "none" }} />
                  )}
                  {percentage > 8 && <activity.icon className="w-3 h-3 text-white/90 relative z-10" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
