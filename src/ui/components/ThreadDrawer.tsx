import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { useGameStore, formatIncomeEntry } from "@/game/stores/gameStore";
import { useEventStore } from "@/game/stores/eventStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { getActiveEvent, chooseOption, isChoiceAvailable } from "@/game/engine/events";
import { ThreadView } from "@/ui/components/Stream";

// Bottom drawer for the global narrative stream. Collapsed it keeps a
// one-line ticker (latest entry) so the game's voice never disappears.
// When a narrative event takes stage, the drawer forces open, the clock is
// paused by the engine, and the event's choices render at the bottom.
export function ThreadDrawer() {
  const [open, setOpen] = useState(false);
  const streamLog = useGameStore((state) => state.streamLog);
  const logBuffer = useGameStore((state) => state.logBuffer);
  const active = useEventStore((state) => state.active);
  useInventoryStore((state) => state.currency); // re-evaluate choice affordability

  const entries = logBuffer.length
    ? [...streamLog, ...logBuffer.map(formatIncomeEntry)]
    : streamLog;
  const latest = entries[entries.length - 1];

  const staged = active ? getActiveEvent() : null;
  const isOpen = open || !!staged;

  return (
    <div className={`border-t bg-panel-0 shrink-0 ${staged ? "border-accent-jade/40" : "border-line"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-panel-2 transition-colors"
      >
        <span className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.14em] uppercase text-ink-3 whitespace-nowrap">
          The Thread
        </span>
        {staged ? (
          <span className="flex-1 text-[13px] text-accent-jade truncate">{staged.definition.title}</span>
        ) : (
          <span className="flex-1 text-[13px] text-ink-2 italic truncate">{latest?.text ?? ""}</span>
        )}
        <ChevronUp className={`w-3.5 h-3.5 text-ink-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="px-4 pb-3 h-56 flex flex-col">
          <ThreadView className="flex-1 min-h-0" />
          {staged?.step.choices && (
            <div className="pt-2.5 border-t border-line flex flex-col gap-1.5 shrink-0">
              {staged.step.choices.map((choice, i) => {
                const available = isChoiceAvailable(choice);
                return (
                  <button
                    key={i}
                    onClick={() => available && chooseOption(i)}
                    disabled={!available}
                    className={`text-left text-[13.5px] px-3 py-1.5 rounded-md border transition-colors ${
                      available
                        ? "border-line-2 text-ink hover:border-accent-jade/50 hover:bg-panel-2"
                        : "border-line text-ink-3 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
