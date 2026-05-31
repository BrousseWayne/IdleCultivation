import { useState } from "react";
import { ArrowRight, ScrollText } from "lucide-react";
import { PROTO_PLACES, PROTO_START, PROTO_LOG, type ProtoPlace } from "@/ui/proto/mockCity";

const kindColor: Record<string, string> = {
  activity: "text-accent-jade",
  talk: "text-accent-violet",
  shop: "text-accent-gold",
};

export function SceneProto() {
  const [placeKey, setPlaceKey] = useState(PROTO_START);
  const [log, setLog] = useState<string[]>(PROTO_LOG);
  const place: ProtoPlace = PROTO_PLACES[placeKey];

  const connections = place.connections.map((k) => PROTO_PLACES[k]);

  const act = (label: string) => setLog((l) => [...l, `You: ${label}.`]);
  const walk = (dest: ProtoPlace) => {
    if (!dest.unlocked) {
      setLog((l) => [...l, `You are turned away from ${dest.name}.`]);
      return;
    }
    setPlaceKey(dest.key);
    setLog((l) => [...l, `You make your way to ${dest.name}.`]);
  };

  return (
    <div className="min-h-screen bg-black text-foreground dark p-8 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-xs text-slate-600 font-mono uppercase tracking-widest">
          proto · scene / interactive fiction
        </div>

        <header className="flex items-baseline justify-between border-b border-slate-800/60 pb-2">
          <h1 className="text-2xl font-[family-name:var(--font-display)] text-accent-cinnabar">
            {place.name}
          </h1>
          <span className="text-xs text-slate-500 font-mono">day 3 · dusk</span>
        </header>

        <p className="text-[15px] leading-relaxed text-slate-300 font-[family-name:var(--font-sans)]">
          {place.blurb}
        </p>

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

        <section className="space-y-1.5">
          <div className="text-[11px] text-slate-600 uppercase tracking-widest">Go elsewhere</div>
          {connections.map((dest) => (
            <button
              key={dest.key}
              onClick={() => walk(dest)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md border transition-colors text-left ${
                dest.unlocked
                  ? "border-slate-800/50 hover:border-accent-sky/40 hover:bg-slate-900/40"
                  : "border-slate-900 opacity-40 cursor-not-allowed"
              }`}
            >
              <ArrowRight className="w-4 h-4 text-accent-sky" />
              <span className="text-sm text-slate-200">{dest.name}</span>
              {!dest.unlocked && <span className="ml-auto text-xs text-slate-600">barred</span>}
            </button>
          ))}
        </section>

        <section className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-600 uppercase tracking-widest">
            <ScrollText className="w-3.5 h-3.5" /> transcript
          </div>
          <div className="space-y-1 max-h-56 overflow-y-auto">
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
