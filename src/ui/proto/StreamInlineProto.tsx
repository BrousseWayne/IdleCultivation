import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { PROTO_PLACES, PROTO_START, PROTO_LOG, PROTO_EVENT, type ProtoPlace, type ProtoLine } from "@/ui/proto/mockCity";

const kindColor: Record<string, string> = {
  activity: "text-accent-jade",
  talk: "text-accent-violet",
  shop: "text-accent-gold",
};

type Entry =
  | { kind: "line"; line: ProtoLine }
  | { kind: "choices"; choices: { label: string; reply: ProtoLine[] }[] };

// Explore IS the stream: narration + actions live in one scrolling column.
export function StreamInlineProto() {
  const [placeKey, setPlaceKey] = useState(PROTO_START);
  const [entries, setEntries] = useState<Entry[]>(
    PROTO_LOG.map((t) => ({ kind: "line", line: { speaker: "", text: t, tone: "narration" } }))
  );
  const place: ProtoPlace = PROTO_PLACES[placeKey];

  const pushNarration = (text: string) =>
    setEntries((e) => [...e, { kind: "line", line: { speaker: "", text, tone: "narration" } }]);

  const walk = (dest: ProtoPlace) => {
    if (!dest.unlocked) { pushNarration(`${dest.name} is barred to you.`); return; }
    setPlaceKey(dest.key);
    pushNarration(`You make your way to ${dest.name}. ${dest.blurb}`);
  };
  const move = (label: string, kind: string) => {
    if (kind === "talk") {
      setEntries((e) => [
        ...e,
        ...PROTO_EVENT.lines.map((line) => ({ kind: "line" as const, line })),
        { kind: "choices" as const, choices: PROTO_EVENT.choices },
      ]);
      return;
    }
    pushNarration(`You ${label.toLowerCase()}.`);
  };
  const resolve = (idx: number, ci: number) =>
    setEntries((e) => {
      const entry = e[idx];
      if (entry.kind !== "choices") return e;
      const reply = entry.choices[ci].reply;
      return e.slice(0, idx).concat(e.slice(idx + 1)).concat(reply.map((line) => ({ kind: "line" as const, line })));
    });

  return (
    <div className="min-h-screen bg-black text-foreground dark p-8 flex justify-center">
      <div className="w-full max-w-2xl space-y-5">
        <div className="text-xs text-slate-600 font-mono uppercase tracking-widest">proto · explore IS the stream</div>
        <header className="flex items-baseline justify-between border-b border-slate-800/60 pb-2">
          <h1 className="text-2xl font-[family-name:var(--font-display)] text-accent-cinnabar">{place.name}</h1>
          <span className="text-xs text-slate-500 font-mono">day 3 · dusk</span>
        </header>

        {/* the one column: narration + dialogue flow */}
        <div className="space-y-2.5 min-h-[180px]">
          {entries.map((entry, i) =>
            entry.kind === "line" ? (
              <p key={i} className={`text-[15px] leading-relaxed font-[family-name:var(--font-sans)] ${entry.line.tone === "self" ? "text-slate-300" : entry.line.tone === "npc" ? "text-slate-200" : "text-slate-400 italic"}`}>
                {entry.line.tone === "npc" && <span className="text-[11px] uppercase tracking-widest mr-2 text-accent-violet">{entry.line.speaker}</span>}
                {entry.line.tone === "self" && <span className="text-[11px] uppercase tracking-widest mr-2 text-accent-jade">{entry.line.speaker}</span>}
                {entry.line.text}
              </p>
            ) : (
              <div key={i} className="space-y-1.5 py-1">
                {entry.choices.map((c, ci) => (
                  <button key={ci} onClick={() => resolve(i, ci)}
                    className="w-full text-left px-3 py-2 rounded-md border border-accent-violet/30 hover:border-accent-violet/60 hover:bg-accent-violet/5 transition-colors text-sm text-slate-300 font-[family-name:var(--font-sans)]">
                    {c.label}
                  </button>
                ))}
              </div>
            )
          )}
        </div>

        {/* actions docked at the bottom of the scene, always reachable */}
        <div className="border-t border-slate-800/40 pt-4 space-y-1.5">
          <div className="text-[11px] text-slate-600 uppercase tracking-widest">What you can do</div>
          {place.moves.map((m) => (
            <button key={m.key} onClick={() => move(m.label, m.kind)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md border border-slate-800/50 hover:border-accent-cinnabar/40 hover:bg-slate-900/40 transition-colors text-left">
              <m.icon className={`w-4 h-4 ${kindColor[m.kind]}`} />
              <span className="text-sm text-slate-200">{m.label}</span>
              <span className="ml-auto text-xs text-slate-500">{m.detail}</span>
            </button>
          ))}
          <div className="flex gap-1.5 flex-wrap pt-1">
            {place.connections.map((k) => PROTO_PLACES[k]).map((dest) => (
              <button key={dest.key} onClick={() => walk(dest)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-colors ${dest.unlocked ? "text-accent-sky hover:bg-accent-sky/10" : "text-slate-700 cursor-not-allowed"}`}>
                {dest.unlocked ? <ArrowRight className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                {dest.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
