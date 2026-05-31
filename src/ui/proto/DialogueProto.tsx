import { useState, useEffect, useRef } from "react";
import { PROTO_DIALOGUE, type ProtoLine } from "@/ui/proto/mockCity";

function Line({ line }: { line: ProtoLine }) {
  if (line.tone === "narration") {
    return (
      <p className="text-[15px] leading-relaxed text-slate-500 italic font-[family-name:var(--font-sans)] py-1.5">
        {line.text}
      </p>
    );
  }
  const isSelf = line.tone === "self";
  return (
    <div className={`py-1.5 ${isSelf ? "text-right" : "text-left"}`}>
      <span className={`block text-[11px] uppercase tracking-widest mb-0.5 ${isSelf ? "text-accent-jade" : "text-accent-violet"}`}>
        {line.speaker}
      </span>
      <p className={`text-[15px] leading-relaxed font-[family-name:var(--font-sans)] ${isSelf ? "text-slate-300" : "text-slate-200"}`}>
        {line.text}
      </p>
    </div>
  );
}

export function DialogueProto() {
  const [shown, setShown] = useState<ProtoLine[]>([]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // reveal intro lines one at a time (paced)
  useEffect(() => {
    if (step < PROTO_DIALOGUE.intro.length) {
      const t = setTimeout(() => {
        setShown((s) => [...s, PROTO_DIALOGUE.intro[step]]);
        setStep((n) => n + 1);
      }, step === 0 ? 200 : 700);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [shown]);

  const choose = (i: number) => {
    setShown((s) => [...s, ...PROTO_DIALOGUE.choices[i].reply]);
    setDone(true);
  };

  const choicesReady = step >= PROTO_DIALOGUE.intro.length && !done;

  return (
    <div className="min-h-screen bg-black text-foreground dark p-8 flex justify-center">
      <div className="w-full max-w-xl space-y-5">
        <div className="text-xs text-slate-600 font-mono uppercase tracking-widest">
          proto · dialogue / flowing conversation
        </div>

        <header className="border-b border-slate-800/60 pb-2">
          <h1 className="text-xl font-[family-name:var(--font-display)] text-accent-violet">
            {PROTO_DIALOGUE.name}
          </h1>
        </header>

        <div className="min-h-[220px] space-y-1">
          {shown.map((line, i) => (
            <Line key={i} line={line} />
          ))}
          <div ref={endRef} />
        </div>

        {choicesReady && (
          <div className="space-y-2 pt-2 animate-in fade-in duration-500">
            {PROTO_DIALOGUE.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => choose(i)}
                className="w-full text-left px-4 py-2.5 rounded-md border border-slate-800/60 hover:border-accent-violet/50 hover:bg-accent-violet/5 transition-colors text-sm text-slate-300 font-[family-name:var(--font-sans)]"
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {done && (
          <button
            onClick={() => { setShown([]); setStep(0); setDone(false); }}
            className="text-xs text-slate-600 hover:text-slate-400 font-mono pt-4"
          >
            ↻ replay
          </button>
        )}
      </div>
    </div>
  );
}
