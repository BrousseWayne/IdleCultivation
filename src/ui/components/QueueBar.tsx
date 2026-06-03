import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Moon } from "lucide-react";
import { useActivityStore, unitKeyAt } from "@/game/stores/activityStore";
import { getCategoryHex } from "@/game/data/sectionColors";
import { EntityRegistry } from "@/game/services";
import { text } from "@/game/content/text";

export function QueueBar() {
  const [collapsed, setCollapsed] = useState(false);
  const queue = useActivityStore((s) => s.queue);
  const runningTicks = useActivityStore((s) => s.runningTicks);
  const scheduleIndex = useActivityStore((s) => s.scheduleIndex);
  const clearQueue = useActivityStore((s) => s.clearQueue);

  if (queue.length === 0) {
    return (
      <div className="sticky top-0 z-40 h-14 bg-black/95 backdrop-blur-sm border-b border-line flex items-center justify-center">
        <span className="text-sm text-ink-3">{text("queue.empty")}</span>
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
  const headColor = head ? getCategoryHex(head.category) : undefined;
  const headHours = head ? head.timeCost - runningTicks : 0;

  return (
    <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-line">
      <div className="flex items-stretch">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex-1 flex items-center gap-3 px-6 min-h-14 hover:bg-panel-2 transition-colors"
        >
          {/* constant-height head block — same footprint whether running or idle */}
          <div
            className="w-8 h-8 flex items-center justify-center rounded-md border-2 shrink-0"
            style={{ borderColor: headColor ?? "var(--line-2)" }}
          >
            {head ? (
              <head.icon className="w-4 h-4" style={{ color: headColor }} />
            ) : (
              <Moon className="w-4 h-4 text-ink-3" />
            )}
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold" style={head ? { color: headColor } : undefined}>
              {head ? head.name : text("queue.resting")}
            </div>
            <div className="text-[10px] text-ink-3">
              {head ? `${headHours}h remaining` : text("queue.idleHint")}
            </div>
          </div>
          <div className="flex-1" />
          <span className="text-xs text-ink-3 font-mono">{segments.length} queued · {totalQueueTime}h</span>
          {collapsed ? <ChevronUp className="w-4 h-4 text-ink-3" /> : <ChevronDown className="w-4 h-4 text-ink-3" />}
        </button>
        <button
          onClick={clearQueue}
          title={text("queue.clear")}
          className="px-4 flex items-center text-ink-3 hover:text-accent-cinnabar border-l border-line transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {!collapsed && (
        <div className="px-6 pb-2.5">
          <div className="relative h-4 bg-panel rounded-full overflow-hidden flex shadow-inner">
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
                    <div className="absolute inset-0 bg-black/60" style={{ width: `${100 - currentProgress}%`, marginLeft: `${currentProgress}%`, transition: "none" }} />
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
