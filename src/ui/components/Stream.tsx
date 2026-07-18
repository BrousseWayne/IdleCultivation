import { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useGameStore, formatIncomeEntry, mergeIncome } from "@/game/stores/gameStore";
import { PALETTE, STAT_COLORS } from "@/game/data/sectionColors";
import { formatNumber } from "@/game/utils/formatNumber";
import type { LogEntry, StreamTheme, Stats } from "@/game/types/domain";

const THEME_LABEL: Record<StreamTheme, string> = {
  ambient: "Ambient",
  income: "Earnings",
  event: "Events",
  dialogue: "Talk",
  travel: "Travel",
};
// Themes draw from the single palette source. income = jade (positive, matches
// the sidebar); ambient is neutral.
const THEME_HEX: Record<StreamTheme, string> = {
  ambient: "#5E6862",
  income: PALETTE.jade,
  event: PALETTE.cinnabar,
  dialogue: PALETTE.violet,
  travel: PALETTE.sky,
};

type Row = { entry: LogEntry; count: number };

function entryKey(entry: LogEntry): string {
  return entry.key ?? `${entry.theme}|${entry.tone ?? ""}|${entry.text}`;
}

// Income rows merge by source within a contiguous run of earnings — the
// sample window is "since the last narrative beat", so alternating
// activities still fold into one growing total per source. Non-income rows
// collapse only when consecutive and identical.
function deduplicate(entries: LogEntry[]): Row[] {
  const rows: Row[] = [];
  for (const entry of entries) {
    if (entry.income) {
      let merged = false;
      for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        if (!row.entry.income) break; // run boundary: a narrative beat
        if (row.entry.income.source === entry.income.source) {
          row.entry = formatIncomeEntry(mergeIncome(row.entry.income, entry.income));
          merged = true;
          break;
        }
      }
      if (!merged) rows.push({ entry, count: 1 });
    } else {
      const prev = rows[rows.length - 1];
      if (prev && entryKey(prev.entry) === entryKey(entry)) {
        prev.count += 1;
      } else {
        rows.push({ entry, count: 1 });
      }
    }
  }
  return rows;
}

// The log body, reusable outside the right rail (e.g. on Explore).
// Renders the flushed log plus the live income buffer as a pending block.
export function StreamLog({ hidden, className }: { hidden?: Set<StreamTheme>; className?: string }) {
  const streamLog = useGameStore((state) => state.streamLog);
  const logBuffer = useGameStore((state) => state.logBuffer);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [streamLog, logBuffer]);

  const rows = deduplicate([...streamLog, ...logBuffer.map(formatIncomeEntry)]);

  return (
    <div ref={bodyRef} className={`overflow-y-auto ${className ?? ""}`}>
      {rows.map(({ entry, count }, i) => {
        if (hidden?.has(entry.theme)) return null;
        const isSelf = entry.tone === "self";
        const isNpc = entry.tone === "npc";
        return (
          <div key={i} className="py-[2px] leading-snug">
            {entry.income ? (
              <span className="text-sm font-[family-name:var(--font-sans)] text-ink-2">
                <span className="font-semibold" style={{ color: THEME_HEX.income }}>{entry.income.source}</span>
                {entry.income.count > 1 && <span className="font-mono text-xs"> ×{entry.income.count}</span>}
                {entry.income.coin > 0 && <>{" · earned "}{formatNumber(entry.income.coin)}{" copper"}</>}
                {(Object.entries(entry.income.stats ?? {}) as [Stats, number][]).map(([stat, amount]) => (
                  <span key={stat}>
                    {" · "}
                    <span className={STAT_COLORS[stat]}>+{formatNumber(amount)} {stat}</span>
                  </span>
                ))}
                .
              </span>
            ) : (
              <span className={`text-sm font-[family-name:var(--font-sans)] ${isSelf || isNpc ? "text-ink" : "text-ink-2 italic"}`}>
                {isNpc && entry.speaker && <span className="text-[10px] uppercase tracking-widest mr-1.5 text-accent-violet not-italic">{entry.speaker}</span>}
                {isSelf && entry.speaker && <span className="text-[10px] uppercase tracking-widest mr-1.5 text-accent-jade not-italic">{entry.speaker}</span>}
                {entry.text}
                {count > 1 && <span className="text-ink-3 font-mono text-xs"> ×{count}</span>}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Filter chips + clear + log: the full thread, embeddable anywhere.
export function ThreadView({ className }: { className?: string }) {
  const [hidden, setHidden] = useState<Set<StreamTheme>>(new Set());
  const streamLog = useGameStore((state) => state.streamLog);
  const clearLog = useGameStore((state) => state.clearLog);

  const themesPresent = Array.from(new Set(streamLog.map((entry) => entry.theme))) as StreamTheme[];

  const toggle = (theme: StreamTheme) =>
    setHidden((hiddenThemes) => {
      const next = new Set(hiddenThemes);
      if (next.has(theme)) next.delete(theme);
      else next.add(theme);
      return next;
    });

  return (
    <div className={`flex flex-col min-h-0 ${className ?? ""}`}>
      {themesPresent.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap pb-2 shrink-0">
          {themesPresent.map((theme) => {
            const isHidden = hidden.has(theme);
            return (
              <button
                key={theme}
                onClick={() => toggle(theme)}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide transition-opacity"
                style={{ color: THEME_HEX[theme], opacity: isHidden ? 0.3 : 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_HEX[theme] }} />
                {THEME_LABEL[theme]}
              </button>
            );
          })}
          <button onClick={clearLog} className="ml-auto text-ink-3 hover:text-accent-cinnabar" title="clear log">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <StreamLog hidden={hidden} className="flex-1 pr-1" />
    </div>
  );
}
