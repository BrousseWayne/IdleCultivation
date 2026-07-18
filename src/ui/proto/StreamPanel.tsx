import { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { PROTO_EVENT, type ProtoLine, type ProtoTheme } from "@/ui/proto/mockCity";

export type StreamEntry =
  | { kind: "line"; line: ProtoLine }
  | { kind: "choices"; choices: { label: string; reply: ProtoLine[] }[] };

const THEME_LABEL: Record<ProtoTheme, string> = {
  ambient: "Ambient",
  income: "Earnings",
  event: "Events",
  dialogue: "Talk",
  travel: "Travel",
};
const THEME_HEX: Record<ProtoTheme, string> = {
  ambient: "#64748b",
  income: "#D4AF6A",
  event: "#E07856",
  dialogue: "#B59ACF",
  travel: "#6BA3D4",
};

// eslint-disable-next-line react-refresh/only-export-components
export function useStream(seed: string[]) {
  const [entries, setEntries] = useState<StreamEntry[]>(
    seed.map((t) => ({ kind: "line", line: { speaker: "", text: t, tone: "narration", theme: "ambient" } }))
  );
  const pushLine = (line: ProtoLine) => setEntries((e) => [...e, { kind: "line", line }]);
  const pushNarration = (text: string, theme: ProtoTheme = "ambient") =>
    pushLine({ speaker: "", text, tone: "narration", theme });
  const fireEvent = () => {
    setEntries((e) => [
      ...e,
      ...PROTO_EVENT.lines.map((line) => ({ kind: "line" as const, line: { ...line, theme: "event" as ProtoTheme } })),
      { kind: "choices" as const, choices: PROTO_EVENT.choices },
    ]);
  };
  const resolveChoice = (idx: number, choiceIdx: number) => {
    setEntries((e) => {
      const entry = e[idx];
      if (entry.kind !== "choices") return e;
      const reply = entry.choices[choiceIdx].reply;
      const next = e.slice(0, idx).concat(e.slice(idx + 1));
      return [...next, ...reply.map((line) => ({ kind: "line" as const, line: { ...line, theme: "event" as ProtoTheme } }))];
    });
  };
  const clear = () => setEntries([]);
  return { entries, pushLine, pushNarration, fireEvent, resolveChoice, clear };
}

type Row =
  | { kind: "line"; line: ProtoLine; count: number }
  | { kind: "choices"; entryIdx: number; choices: { label: string; reply: ProtoLine[] }[] };

// dedup consecutive identical lines (same text+tone+theme) into ×N
function buildRows(entries: StreamEntry[]): Row[] {
  const rows: Row[] = [];
  entries.forEach((entry, i) => {
    if (entry.kind === "choices") {
      rows.push({ kind: "choices", entryIdx: i, choices: entry.choices });
      return;
    }
    const prev = rows[rows.length - 1];
    if (
      prev && prev.kind === "line" &&
      prev.line.text === entry.line.text &&
      prev.line.tone === entry.line.tone &&
      prev.line.theme === entry.line.theme
    ) {
      prev.count += 1;
    } else {
      rows.push({ kind: "line", line: entry.line, count: 1 });
    }
  });
  return rows;
}

export function StreamView({
  entries,
  onChoice,
  onClear,
}: {
  entries: StreamEntry[];
  onChoice: (entryIdx: number, choiceIdx: number) => void;
  onClear?: () => void;
}) {
  const [hidden, setHidden] = useState<Set<ProtoTheme>>(new Set());
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const rows = buildRows(entries);
  const themesPresent = Array.from(
    new Set(entries.flatMap((e) => (e.kind === "line" ? [e.line.theme ?? "ambient"] : [])))
  ) as ProtoTheme[];

  const toggle = (t: ProtoTheme) =>
    setHidden((h) => {
      const n = new Set(h);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });

  return (
    <div className="flex flex-col h-full">
      {/* filter chips + clear */}
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
        {onClear && (
          <button onClick={onClear} className="ml-auto text-slate-600 hover:text-accent-cinnabar" title="clear log">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div ref={bodyRef} className="flex-1 overflow-y-auto pr-1">
        {rows.map((r, i) => {
          if (r.kind === "choices") {
            return (
              <div key={i} className="space-y-1.5 py-2">
                {r.choices.map((c, ci) => (
                  <button
                    key={ci}
                    onClick={() => onChoice(r.entryIdx, ci)}
                    className="w-full text-left px-3 py-2 rounded-md border border-accent-violet/30 hover:border-accent-violet/60 hover:bg-accent-violet/5 transition-colors text-sm text-slate-300 font-[family-name:var(--font-sans)]"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            );
          }
          const theme = r.line.theme ?? "ambient";
          if (hidden.has(theme)) return null;
          const isSelf = r.line.tone === "self";
          const isNpc = r.line.tone === "npc";
          return (
            <div
              key={i}
              className="pl-2.5 py-[3px] leading-snug border-l-2"
              style={{ borderColor: `${THEME_HEX[theme]}55` }}
            >
              <span className={`text-[13px] font-[family-name:var(--font-sans)] ${isSelf ? "text-slate-300" : isNpc ? "text-slate-200" : "text-slate-400 italic"}`}>
                {isNpc && <span className="text-[10px] uppercase tracking-widest mr-1.5 text-accent-violet not-italic">{r.line.speaker}</span>}
                {isSelf && <span className="text-[10px] uppercase tracking-widest mr-1.5 text-accent-jade not-italic">{r.line.speaker}</span>}
                {r.line.text}
                {r.count > 1 && <span className="text-slate-600 font-mono text-xs"> ×{r.count}</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
