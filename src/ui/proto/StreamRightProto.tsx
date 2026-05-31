import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { PROTO_PLACES, PROTO_START, PROTO_LOG, type ProtoPlace } from "@/ui/proto/mockCity";
import { useStream, StreamView } from "@/ui/proto/StreamPanel";

const kindColor: Record<string, string> = {
  activity: "text-accent-jade",
  talk: "text-accent-violet",
  shop: "text-accent-gold",
};

export function StreamRightProto() {
  const [placeKey, setPlaceKey] = useState(PROTO_START);
  const place: ProtoPlace = PROTO_PLACES[placeKey];
  const stream = useStream(PROTO_LOG);

  const walk = (dest: ProtoPlace) => {
    if (!dest.unlocked) { stream.pushNarration(`${dest.name} is barred to you.`); return; }
    setPlaceKey(dest.key);
    stream.pushNarration(`You make your way to ${dest.name}.`);
  };
  const move = (label: string, kind: string) => {
    if (kind === "talk") { stream.fireEvent(); return; } // talk fires the canned event into the stream
    stream.pushNarration(`You ${label.toLowerCase()}.`);
  };

  return (
    <div className="h-screen bg-black text-foreground dark flex">
      {/* main content: place + actions */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-xl space-y-5">
          <div className="text-xs text-slate-600 font-mono uppercase tracking-widest">proto · right-side stream</div>
          <header className="flex items-baseline justify-between border-b border-slate-800/60 pb-2">
            <h1 className="text-2xl font-[family-name:var(--font-display)] text-accent-cinnabar">{place.name}</h1>
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

          <section className="space-y-1.5">
            <div className="text-[11px] text-slate-600 uppercase tracking-widest">Go elsewhere</div>
            {place.connections.map((k) => PROTO_PLACES[k]).map((dest) => (
              <button key={dest.key} onClick={() => walk(dest)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md border transition-colors text-left ${dest.unlocked ? "border-slate-800/50 hover:border-accent-sky/40 hover:bg-slate-900/40" : "border-slate-900 opacity-40 cursor-not-allowed"}`}>
                {dest.unlocked ? <ArrowRight className="w-4 h-4 text-accent-sky" /> : <Lock className="w-4 h-4 text-slate-600" />}
                <span className="text-sm text-slate-200">{dest.name}</span>
              </button>
            ))}
          </section>
        </div>
      </div>

      {/* persistent stream — always visible */}
      <aside className="w-80 shrink-0 border-l border-slate-800/50 bg-slate-950/40 p-5">
        <StreamView entries={stream.entries} onChoice={stream.resolveChoice} onClear={stream.clear} />
      </aside>
    </div>
  );
}
