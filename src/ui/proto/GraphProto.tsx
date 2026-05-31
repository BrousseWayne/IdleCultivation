import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { PROTO_PLACES, PROTO_START, PROTO_LOG, type ProtoPlace } from "@/ui/proto/mockCity";
import { useStream, StreamView } from "@/ui/proto/StreamPanel";

const kindColor: Record<string, string> = {
  activity: "text-accent-jade",
  talk: "text-accent-violet",
  shop: "text-accent-gold",
};

// Revamped: compact colored city graph (icon nodes) + scene + persistent stream.
export function GraphProto() {
  const [placeKey, setPlaceKey] = useState(PROTO_START);
  const [streamOpen, setStreamOpen] = useState(true);
  const place: ProtoPlace = PROTO_PLACES[placeKey];
  const all = Object.values(PROTO_PLACES);
  const stream = useStream(PROTO_LOG);

  const go = (dest: ProtoPlace) => {
    if (!dest.unlocked) { stream.pushNarration(`${dest.name} is barred to you.`, "travel"); return; }
    setPlaceKey(dest.key);
    stream.pushNarration(`You head to ${dest.name}.`, "travel");
  };
  const move = (label: string, kind: string) => {
    if (kind === "talk") { stream.fireEvent(); return; }
    if (kind === "activity") { stream.pushNarration(`You earned 3 copper.`, "income"); return; }
    stream.pushNarration(`You ${label.toLowerCase()}.`);
  };

  return (
    <div className="h-screen bg-black text-foreground dark flex">
      {/* left: compact city graph + scene */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl space-y-5">
          <div className="text-xs text-slate-600 font-mono uppercase tracking-widest">proto · revamped graph + scene + stream</div>

          {/* compact colored graph, icon nodes */}
          <div className="relative w-full h-44 rounded-lg border border-slate-800/50 bg-gradient-to-br from-slate-950 to-slate-900/30 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              {all.flatMap((p) =>
                p.connections.map((c) => {
                  const q = PROTO_PLACES[c];
                  if (!q) return null;
                  return (
                    <line key={`${p.key}-${c}`} x1={`${p.x}%`} y1={`${p.y}%`} x2={`${q.x}%`} y2={`${q.y}%`}
                      stroke="rgb(148 163 184 / 0.18)" strokeWidth="1.5" />
                  );
                })
              )}
            </svg>
            {all.map((p) => {
              const active = p.key === placeKey;
              const Icon = p.icon;
              return (
                <button key={p.key} onClick={() => go(p)} disabled={!p.unlocked}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, zIndex: 1 }}>
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all"
                    style={{
                      borderColor: active ? p.color : p.unlocked ? `${p.color}66` : "#1e293b",
                      backgroundColor: active ? `${p.color}22` : "rgba(2,6,23,0.8)",
                      boxShadow: active ? `0 0 14px ${p.color}66` : "none",
                      transform: active ? "scale(1.12)" : "scale(1)",
                      opacity: p.unlocked ? 1 : 0.45,
                    }}>
                    <Icon className="w-4 h-4" style={{ color: p.unlocked ? p.color : "#475569" }} />
                  </span>
                  <span className="text-[10px] whitespace-nowrap" style={{ color: active ? p.color : "#94a3b8" }}>
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* scene */}
          <header className="flex items-baseline justify-between border-b border-slate-800/60 pb-2">
            <h1 className="text-2xl font-[family-name:var(--font-display)]" style={{ color: place.color }}>{place.name}</h1>
            <span className="text-xs text-slate-500 font-mono">day 3 · dusk</span>
          </header>
          <p className="text-[15px] leading-relaxed text-slate-300 font-[family-name:var(--font-sans)]">{place.blurb}</p>

          <section className="space-y-1.5">
            <div className="text-[11px] text-slate-600 uppercase tracking-widest">What you can do</div>
            {place.moves.map((m) => (
              <button key={m.key} onClick={() => move(m.label, m.kind)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md border border-slate-800/50 hover:border-accent-cinnabar/40 hover:bg-slate-900/40 transition-colors text-left">
                <m.icon className={`w-4 h-4 ${kindColor[m.kind]}`} />
                <span className="text-sm text-slate-200">{m.label}</span>
                <span className="ml-auto text-xs text-slate-500">{m.detail}</span>
              </button>
            ))}
          </section>
        </div>
      </div>

      {/* persistent, collapsible stream — soft wide gradient seam */}
      {streamOpen ? (
        <aside className="relative w-80 shrink-0 flex flex-col bg-slate-950/40">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
          <div className="relative flex-1 flex flex-col p-5 min-h-0">
            <div className="flex items-center justify-between pb-2">
              <span className="text-[11px] text-slate-600 uppercase tracking-widest">the thread</span>
              <button onClick={() => setStreamOpen(false)} className="text-slate-500 hover:text-slate-300" title="collapse">
                <PanelRightClose className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <StreamView entries={stream.entries} onChoice={stream.resolveChoice} onClear={stream.clear} />
            </div>
          </div>
        </aside>
      ) : (
        <button
          onClick={() => setStreamOpen(true)}
          className="relative w-10 shrink-0 bg-slate-950/40 flex flex-col items-center pt-5 gap-2 text-slate-500 hover:text-slate-300"
          title="open the thread"
        >
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
          <PanelRightOpen className="relative w-4 h-4" />
          <span className="relative text-[10px] uppercase tracking-widest [writing-mode:vertical-rl]">the thread</span>
        </button>
      )}
    </div>
  );
}
