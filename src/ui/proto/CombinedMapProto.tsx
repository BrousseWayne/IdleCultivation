import { useState } from "react";
import { ScrollText, Lock } from "lucide-react";
import { PROTO_PLACES, PROTO_START, PROTO_LOG, type ProtoPlace } from "@/ui/proto/mockCity";

const kindColor: Record<string, string> = {
  activity: "text-accent-jade",
  talk: "text-accent-violet",
  shop: "text-accent-gold",
};

// city as district plots (distinct from the region travel dot-graph)
export function CombinedMapProto() {
  const [placeKey, setPlaceKey] = useState(PROTO_START);
  const [log, setLog] = useState<string[]>(PROTO_LOG);
  const place: ProtoPlace = PROTO_PLACES[placeKey];
  const all = Object.values(PROTO_PLACES);

  const jump = (dest: ProtoPlace) => {
    if (!dest.unlocked) { setLog((l) => [...l, `${dest.name} is barred to you.`]); return; }
    setPlaceKey(dest.key);
    setLog((l) => [...l, `You head to ${dest.name}.`]);
  };
  const act = (label: string) => setLog((l) => [...l, `You: ${label}.`]);

  return (
    <div className="min-h-screen bg-black text-foreground dark p-8 flex justify-center">
      <div className="w-full max-w-2xl space-y-5">
        <div className="text-xs text-slate-600 font-mono uppercase tracking-widest">
          proto · city district plots + scene
        </div>

        {/* district plots — a stylized city ward, click a plot to go there */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {all.map((p) => {
            const active = p.key === placeKey;
            return (
              <button
                key={p.key}
                onClick={() => jump(p)}
                disabled={!p.unlocked}
                className={`relative h-20 rounded-md border p-2 text-left transition-all overflow-hidden ${
                  active
                    ? "border-accent-cinnabar bg-accent-cinnabar/10"
                    : p.unlocked
                    ? "border-slate-800/60 bg-slate-950/60 hover:border-slate-600 hover:bg-slate-900/60"
                    : "border-slate-900 bg-slate-950/30 cursor-not-allowed"
                }`}
              >
                {/* faux rooftops */}
                <div className="absolute inset-x-0 bottom-0 h-8 flex items-end gap-0.5 px-1 opacity-30">
                  {[6, 10, 7, 12, 8, 5].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${active ? "bg-accent-cinnabar/50" : "bg-slate-700"}`} style={{ height: `${h * 2}px` }} />
                  ))}
                </div>
                <div className={`relative text-xs font-semibold flex items-center gap-1 ${active ? "text-accent-cinnabar" : p.unlocked ? "text-slate-300" : "text-slate-600"}`}>
                  {!p.unlocked && <Lock className="w-3 h-3" />}
                  {p.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* scene */}
        <header className="flex items-baseline justify-between border-t border-slate-800/40 pt-3">
          <h1 className="text-2xl font-[family-name:var(--font-display)] text-accent-cinnabar">{place.name}</h1>
          <span className="text-xs text-slate-500 font-mono">day 3 · dusk</span>
        </header>

        <p className="text-[15px] leading-relaxed text-slate-300 font-[family-name:var(--font-sans)]">{place.blurb}</p>

        <section className="space-y-1.5">
          <div className="text-[11px] text-slate-600 uppercase tracking-widest">What you can do</div>
          {place.moves.map((m) => (
            <button
              key={m.key}
              onClick={() => act(m.label)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md border border-slate-800/50 hover:border-accent-cinnabar/40 hover:bg-slate-900/40 transition-colors text-left"
            >
              <m.icon className={`w-4 h-4 ${kindColor[m.kind]}`} />
              <span className="text-sm text-slate-200">{m.label}</span>
              <span className="ml-auto text-xs text-slate-500">{m.detail}</span>
            </button>
          ))}
        </section>

        <section className="space-y-2 pt-1">
          <div className="flex items-center gap-2 text-[11px] text-slate-600 uppercase tracking-widest">
            <ScrollText className="w-3.5 h-3.5" /> transcript
          </div>
          <div className="space-y-1 max-h-44 overflow-y-auto">
            {log.slice(-12).reverse().map((entry, i) => (
              <p key={i} className="text-sm text-slate-400 leading-relaxed border-l-2 border-accent-cinnabar/30 pl-3 font-[family-name:var(--font-sans)]">
                {entry}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
