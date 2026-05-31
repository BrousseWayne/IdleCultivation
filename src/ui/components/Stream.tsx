import { useState, useRef, useEffect } from "react";
import { Trash2, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useGameStore } from "@/game/stores/gameStore";
import type { LogEntry, StreamTheme } from "@/game/types/domain";

const THEME_LABEL: Record<StreamTheme, string> = {
  ambient: "Ambient",
  income: "Earnings",
  event: "Events",
  dialogue: "Talk",
  travel: "Travel",
};
const THEME_HEX: Record<StreamTheme, string> = {
  ambient: "#64748b",
  income: "#D4AF6A",
  event: "#E07856",
  dialogue: "#B59ACF",
  travel: "#6BA3D4",
};

type Row = { entry: LogEntry; count: number };

function dedup(entries: LogEntry[]): Row[] {
  const rows: Row[] = [];
  for (const entry of entries) {
    const prev = rows[rows.length - 1];
    if (prev && prev.entry.text === entry.text && prev.entry.tone === entry.tone && prev.entry.theme === entry.theme) {
      prev.count += 1;
    } else {
      rows.push({ entry, count: 1 });
    }
  }
  return rows;
}

export function Stream() {
  const [open, setOpen] = useState(true);
  const [hidden, setHidden] = useState<Set<StreamTheme>>(new Set());
  const streamLog = useGameStore((s) => s.streamLog);
  const clearLog = useGameStore((s) => s.clearLog);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [streamLog, open]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="relative w-10 shrink-0 bg-slate-950/40 flex flex-col items-center pt-4 gap-2 text-slate-500 hover:text-slate-300"
        title="open the thread"
      >
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
        <PanelRightOpen className="relative w-4 h-4" />
        <span className="relative text-[10px] uppercase tracking-widest [writing-mode:vertical-rl]">the thread</span>
      </button>
    );
  }

  const rows = dedup(streamLog);
  const themesPresent = Array.from(new Set(streamLog.map((e) => e.theme))) as StreamTheme[];

  const toggle = (t: StreamTheme) =>
    setHidden((h) => {
      const n = new Set(h);
      n.has(t) ? n.delete(t) : n.add(t);
      return n;
    });

  return (
    <aside className="relative w-80 shrink-0 flex flex-col bg-slate-950/40">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
      <div className="relative flex-1 flex flex-col p-4 pb-16 min-h-0">
        <div className="flex items-center justify-between pb-2">
          <span className="text-[11px] text-slate-600 uppercase tracking-widest">the thread</span>
          <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300" title="collapse">
            <PanelRightClose className="w-4 h-4" />
          </button>
        </div>

        {themesPresent.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap pb-2">
            {themesPresent.map((t) => {
              const off = hidden.has(t);
              return (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide transition-opacity"
                  style={{ color: THEME_HEX[t], opacity: off ? 0.3 : 1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_HEX[t] }} />
                  {THEME_LABEL[t]}
                </button>
              );
            })}
            <button onClick={clearLog} className="ml-auto text-slate-600 hover:text-accent-cinnabar" title="clear log">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div ref={bodyRef} className="flex-1 overflow-y-auto pr-1">
          {rows.map(({ entry, count }, i) => {
            if (hidden.has(entry.theme)) return null;
            const isSelf = entry.tone === "self";
            const isNpc = entry.tone === "npc";
            return (
              <div key={i} className="pl-2.5 py-[3px] leading-snug border-l-2" style={{ borderColor: `${THEME_HEX[entry.theme]}55` }}>
                <span className={`text-[13px] font-[family-name:var(--font-sans)] ${isSelf ? "text-slate-300" : isNpc ? "text-slate-200" : "text-slate-400 italic"}`}>
                  {isNpc && entry.speaker && <span className="text-[10px] uppercase tracking-widest mr-1.5 text-accent-violet not-italic">{entry.speaker}</span>}
                  {isSelf && entry.speaker && <span className="text-[10px] uppercase tracking-widest mr-1.5 text-accent-jade not-italic">{entry.speaker}</span>}
                  {entry.text}
                  {count > 1 && <span className="text-slate-600 font-mono text-xs"> ×{count}</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
