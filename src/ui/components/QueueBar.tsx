import { Trash2 } from "lucide-react";
import { useActivityStore, unitKeyAt, blockAt } from "@/game/stores/activityStore";
import { useGameStore } from "@/game/stores/gameStore";
import { getCategoryHex, CATEGORY_COLOR_CLASSES } from "@/game/data/sectionColors";
import { CATEGORY_GLYPHS } from "@/game/data/glyphs";
import { EntityRegistry } from "@/game/services";
import { text } from "@/game/content/text";
import { useSmoothProgress } from "@/ui/hooks/useSmoothProgress";
import { Glyph } from "@/ui/components/StatIcon";
import type { QueueBlock } from "@/game/types/domain";

// hours of schedule completed before the running unit, plus its elapsed ticks
function hoursDone(queue: QueueBlock[], scheduleIndex: number, runningTicks: number): number {
  let remaining = scheduleIndex;
  let hours = 0;
  for (const block of queue) {
    const activity = EntityRegistry.get("activity", block.key);
    if (!activity) continue;
    const units = Math.min(remaining, block.units);
    hours += units * activity.timeCost;
    remaining -= units;
    if (remaining <= 0) break;
  }
  return hours + runningTicks;
}

// The day bar: the track IS the 24h day. Scheduled blocks live inside it;
// the unscheduled remainder renders as empty track labeled with free hours.
export function QueueBar() {
  const queue = useActivityStore((state) => state.queue);
  const runningTicks = useActivityStore((state) => state.runningTicks);
  const scheduleIndex = useActivityStore((state) => state.scheduleIndex);
  const clearQueue = useActivityStore((state) => state.clearQueue);
  const maxTimePoints = useGameStore((state) => state.maxTimePoints);

  const blocks = queue
    .map((block) => {
      const activity = EntityRegistry.get("activity", block.key);
      return activity ? { block, activity, hours: activity.timeCost * block.units } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  const totalQueueTime = blocks.reduce((sum, entry) => sum + entry.hours, 0);
  const totalUnits = queue.reduce((sum, block) => sum + block.units, 0);
  const freeHours = Math.max(0, maxTimePoints - totalQueueTime);

  const donePercent = totalQueueTime > 0
    ? Math.min((hoursDone(queue, scheduleIndex, runningTicks) / totalQueueTime) * 100, 100)
    : 0;
  const { percent: displayPercent, completing } = useSmoothProgress(donePercent);
  const doneHours = totalQueueTime * (displayPercent / 100);

  const currentKey = unitKeyAt(queue, scheduleIndex);
  const head = currentKey ? EntityRegistry.get("activity", currentKey) : undefined;
  const headColor = head ? getCategoryHex(head.category) : undefined;
  const headBlockIndex = blockAt(queue, scheduleIndex);
  const headBlock = headBlockIndex >= 0 ? queue[headBlockIndex] : undefined;

  return (
    <div className="sticky top-12 z-40 bg-panel-0/95 backdrop-blur-sm border-b border-line px-4 pt-2 pb-2.5">
      <div className="flex items-baseline gap-2.5 mb-1.5">
        {queue.length === 0 ? (
          <span className="text-[13px] text-ink-2">{text("queue.empty")}</span>
        ) : head && headBlock ? (
          <>
            <span className="text-[13px] font-semibold" style={{ color: headColor }}>{head.name}</span>
            <span className="text-[11px] text-ink-3">
              {head.timeCost}h{headBlock.units > 1 ? ` × ${headBlock.units}` : ""}
            </span>
          </>
        ) : (
          <>
            <span className="text-[13px] font-semibold text-ink-2">{text("queue.resting")}</span>
            <span className="text-[11px] text-ink-3">{text("queue.idleHint")}</span>
          </>
        )}
        <span className="ml-auto text-[11px] text-ink-2 font-mono">
          {totalUnits > 0 && <>{totalUnits} queued · {totalQueueTime}h · </>}
          <span className="text-ink-3">{freeHours}h {text("queue.free")}</span>
        </span>
        {queue.length > 0 && (
          <button onClick={clearQueue} title={text("queue.clear")} className="text-ink-3 hover:text-accent-cinnabar self-center">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div
        data-testid="queue-bar"
        className="relative h-[22px] rounded-[5px] bg-panel-2 border border-line flex overflow-hidden"
        style={{ filter: completing ? "brightness(1.35)" : undefined, transition: "filter 120ms ease-out" }}
      >
        {queue.length === 0 ? (
          <span className="m-auto text-[10px] font-mono text-ink-3">
            {maxTimePoints}h {text("queue.free")} — {text("queue.planDay")}
          </span>
        ) : (
          <>
            {(() => {
              let start = 0;
              return blocks.map(({ block, activity, hours }, index) => {
                const widthPercent = (hours / maxTimePoints) * 100;
                const hex = getCategoryHex(activity.category);
                const glyph = CATEGORY_GLYPHS[activity.category];
                const doneWithin = Math.min(Math.max(doneHours - start, 0), hours);
                const crossed = doneWithin >= hours;
                const fillPercent = hours > 0 ? (doneWithin / hours) * 100 : 0;
                const isActive = doneWithin > 0 && !crossed;
                start += hours;
                return (
                  <div
                    key={`${block.key}-${index}`}
                    className="relative h-full flex items-center justify-center gap-1 overflow-hidden border-r border-background"
                    style={{ width: `${widthPercent}%`, background: `${hex}24` }}
                    title={`${activity.name}: ${block.units} × ${activity.timeCost}h`}
                  >
                    <div
                      key={crossed ? "done" : "run"}
                      className={`absolute inset-y-0 left-0 ${crossed ? "animate-flash-complete" : ""}`}
                      style={{
                        width: `${fillPercent}%`,
                        background: crossed
                          ? `linear-gradient(180deg, ${hex}FF, ${hex}C0)`
                          : `linear-gradient(180deg, ${hex}E6, ${hex}A6)`,
                        boxShadow: isActive ? `0 0 10px ${hex}88` : undefined,
                      }}
                    />
                    {widthPercent > 5 && (
                      <Glyph char={glyph} size={13} className={`relative ${crossed || isActive ? "text-white/90" : CATEGORY_COLOR_CLASSES[activity.category].text}`} />
                    )}
                    {widthPercent > 11 && block.units > 1 && (
                      <span className="relative text-[10px] font-mono text-white/80">×{block.units}</span>
                    )}
                  </div>
                );
              });
            })()}
            {freeHours > 0 && (
              <span className="ml-auto flex items-center pr-2.5 text-[10px] font-mono text-ink-3">
                {freeHours}h {text("queue.free")}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
