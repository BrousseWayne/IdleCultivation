import { useState } from "react";
import { ScrollText, Lock, MapPin } from "lucide-react";
import { PROTO_PLACES, PROTO_START, PROTO_LOG, type ProtoPlace } from "@/ui/proto/mockCity";

const kindColor: Record<string, string> = {
  activity: "text-accent-jade",
  talk: "text-accent-violet",
  shop: "text-accent-gold",
};

export function RailProto() {
  const [placeKey, setPlaceKey] = useState(PROTO_START);
  const [log, setLog] = useState<string[]>(PROTO_LOG);
  const place: ProtoPlace = PROTO_PLACES[placeKey];
  const all = Object.values(PROTO_PLACES);

  const jump = (dest: ProtoPlace) => {
    if (!dest.unlocked) return;
    setPlaceKey(dest.key);
    setLog((l) => [...l, `You head to ${dest.name}.`]);
  };
  const act = (label: string) => setLog((l) => [...l, `You: ${label}.`]);

  return (
    <div className="min-h-screen bg-black text-foreground dark p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="text-xs text-slate-600 font-mono uppercase tracking-widest">
          proto · persistent place-rail + scene
        </div>

        <div className="flex gap-5">
          {/* Rail */}
          <nav className="w-44 shrink-0 space-y-1">
            <div className="flex items-center gap-2 text-[11px] text-slate-600 uppercase tracking-widest px-2 pb-1">
              <MapPin className="w-3.5 h-3.5" /> Ironveil
            </div>
            {all.map((p) => {
              const active = p.key === placeKey;
              return (
                <button
                  key={p.key}
                  onClick={() => jump(p)}
                  disabled={!p.unlocked}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left text-sm transition-colors ${
                    active
                      ? "bg-accent-cinnabar/15 text-accent-cinnabar"
                      : p.unlocked
                      ? "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                      : "text-slate-700 cursor-not-allowed"
                  }`}
                >
                  {!p.unlocked && <Lock className="w-3 h-3" />}
                  {p.name}
                </button>
              );
            })}
          </nav>

          {/* Scene */}
          <div className="flex-1 space-y-5">
            <header className="border-b border-slate-800/60 pb-2">
              <h1 className="text-2xl font-[family-name:var(--font-display)] text-accent-cinnabar">{place.name}</h1>
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
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {log.slice(-12).reverse().map((entry, i) => (
                  <p key={i} className="text-sm text-slate-400 leading-relaxed border-l-2 border-accent-cinnabar/30 pl-3 font-[family-name:var(--font-sans)]">
                    {entry}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
