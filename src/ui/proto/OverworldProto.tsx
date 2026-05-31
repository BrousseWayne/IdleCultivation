import { useState } from "react";
import { ScrollText, Lock } from "lucide-react";
import { PROTO_PLACES, PROTO_START, PROTO_LOG, type ProtoPlace } from "@/ui/proto/mockCity";

const kindColor: Record<string, string> = {
  activity: "text-accent-jade",
  talk: "text-accent-violet",
  shop: "text-accent-gold",
};

export function OverworldProto() {
  const [placeKey, setPlaceKey] = useState(PROTO_START);
  const [log, setLog] = useState<string[]>(PROTO_LOG);
  const place: ProtoPlace = PROTO_PLACES[placeKey];
  const all = Object.values(PROTO_PLACES);

  const travel = (dest: ProtoPlace) => {
    if (!dest.unlocked) {
      setLog((l) => [...l, `${dest.name} is barred to you.`]);
      return;
    }
    setPlaceKey(dest.key);
    setLog((l) => [...l, `You travel to ${dest.name}.`]);
  };
  const act = (label: string) => setLog((l) => [...l, `You: ${label}.`]);

  return (
    <div className="min-h-screen bg-black text-foreground dark p-8">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="text-xs text-slate-600 font-mono uppercase tracking-widest">
          proto · overworld map
        </div>

        {/* Map */}
        <div className="relative w-full h-72 rounded-lg border border-slate-800/50 bg-slate-950/40 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {all.flatMap((p) =>
              p.connections.map((c) => {
                const q = PROTO_PLACES[c];
                if (!q) return null;
                return (
                  <line
                    key={`${p.key}-${c}`}
                    x1={`${p.x}%`} y1={`${p.y}%`} x2={`${q.x}%`} y2={`${q.y}%`}
                    stroke="rgb(148 163 184 / 0.25)" strokeWidth="1.5" strokeDasharray="4,4"
                  />
                );
              })
            )}
          </svg>
          {all.map((p) => {
            const active = p.key === placeKey;
            return (
              <button
                key={p.key}
                onClick={() => travel(p)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
                style={{ left: `${p.x}%`, top: `${p.y}%`, zIndex: 1 }}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    active
                      ? "bg-accent-cinnabar border-accent-cinnabar shadow-lg shadow-accent-cinnabar/50 scale-125"
                      : p.unlocked
                      ? "bg-slate-700 border-slate-400 group-hover:bg-slate-500"
                      : "bg-slate-900 border-slate-700"
                  }`}
                />
                <span className={`text-[11px] whitespace-nowrap flex items-center gap-1 ${active ? "text-accent-cinnabar" : "text-slate-400"}`}>
                  {!p.unlocked && <Lock className="w-2.5 h-2.5" />}
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current place panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-800/50 p-4 space-y-3">
            <h2 className="text-xl font-[family-name:var(--font-display)] text-accent-cinnabar">{place.name}</h2>
            <p className="text-sm leading-relaxed text-slate-400 font-[family-name:var(--font-sans)]">{place.blurb}</p>
            <div className="space-y-1.5 pt-1">
              {place.moves.map((m) => (
                <button
                  key={m.key}
                  onClick={() => act(m.label)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md border border-slate-800/50 hover:border-accent-cinnabar/40 hover:bg-slate-900/40 transition-colors text-left"
                >
                  <m.icon className={`w-4 h-4 ${kindColor[m.kind]}`} />
                  <span className="text-sm text-slate-200">{m.label}</span>
                  <span className="ml-auto text-xs text-slate-500">{m.detail}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-600 uppercase tracking-widest">
              <ScrollText className="w-3.5 h-3.5" /> event log
            </div>
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {log.slice(-12).reverse().map((entry, i) => (
                <p key={i} className="text-sm text-slate-400 leading-relaxed border-l-2 border-accent-cinnabar/30 pl-3 font-[family-name:var(--font-sans)]">
                  {entry}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
