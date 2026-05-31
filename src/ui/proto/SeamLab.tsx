import { useState } from "react";

type Seam = {
  name: string;
  desc: string;
  // gradient overlay element, absolute on the panel's left edge
  seamEl: React.ReactNode;
};

const PANEL = "bg-slate-950/40";

const SEAMS: Seam[] = [
  {
    name: "1 · dark→fade 32",
    desc: "black 70% at seam → transparent over 32px",
    seamEl: <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />,
  },
  {
    name: "2 · dark→fade 64",
    desc: "black 60% at seam → transparent over 64px",
    seamEl: <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />,
  },
  {
    name: "3 · dark→fade 96",
    desc: "black 55% at seam → transparent over 96px",
    seamEl: <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/55 to-transparent pointer-events-none" />,
  },
  {
    name: "4 · strong short",
    desc: "black 90% at seam → tight 20px falloff",
    seamEl: <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/90 to-transparent pointer-events-none" />,
  },
  {
    name: "5 · soft wide",
    desc: "black 35% at seam → very gentle over 128px",
    seamEl: <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />,
  },
  {
    name: "6 · bleed both ways",
    desc: "shadow bleeds left of seam too (raised look)",
    seamEl: (
      <>
        <div className="absolute inset-y-0 -left-5 w-5 bg-gradient-to-l from-black/45 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/55 to-transparent pointer-events-none" />
      </>
    ),
  },
  {
    name: "7 · lighten inward",
    desc: "panel slightly lighter than bg, fading in",
    seamEl: <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-700/12 to-transparent pointer-events-none" />,
  },
  {
    name: "8 · jade-tinted fade",
    desc: "faint accent glow bleeding in from seam",
    seamEl: <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#5FB4A0]/8 to-transparent pointer-events-none" />,
  },
  {
    name: "9 · two-stop curve",
    desc: "dark, brief hold, then fade (softer knee)",
    seamEl: (
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 12%, transparent 100%)" }}
      />
    ),
  },
  {
    name: "10 · vignette edge",
    desc: "dark at seam, also dimming top/bottom corners",
    seamEl: (
      <div
        className="absolute inset-y-0 left-0 w-28 pointer-events-none"
        style={{ background: "radial-gradient(120% 80% at 0% 50%, rgba(0,0,0,0.65), transparent 70%)" }}
      />
    ),
  },
];

export function SeamLab() {
  const [i, setI] = useState(1);
  const seam = SEAMS[i];

  return (
    <div className="h-screen bg-black text-foreground dark flex flex-col">
      <div className="shrink-0 flex flex-wrap gap-1 p-3 border-b border-slate-900">
        {SEAMS.map((s, idx) => (
          <button
            key={s.name}
            onClick={() => setI(idx)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono ${idx === i ? "bg-accent-cinnabar/20 text-accent-cinnabar" : "text-slate-400 hover:bg-slate-800"}`}
          >
            {s.name}
          </button>
        ))}
        <span className="ml-3 self-center text-xs text-slate-500 font-mono">{seam.desc}</span>
      </div>

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-xl space-y-4">
            <h1 className="text-2xl font-[family-name:var(--font-display)] text-accent-cinnabar">Ironveil Streets</h1>
            <p className="text-[15px] leading-relaxed text-slate-300 font-[family-name:var(--font-sans)]">
              Mud and noise. The crowd moves around you as though you were a post in the ground.
              Your begging bowl holds three dull coins.
            </p>
            <div className="space-y-1.5 pt-2">
              {["Beg by the gate", "Speak to the ragged elder", "Walk to Market Square"].map((m) => (
                <div key={m} className="px-3 py-2.5 rounded-md border border-slate-800/50 text-sm text-slate-200">{m}</div>
              ))}
            </div>
          </div>
        </div>

        <aside className={`relative w-80 shrink-0 flex flex-col ${PANEL}`}>
          {seam.seamEl}
          <div className="relative p-5 space-y-2">
            <div className="text-[11px] text-slate-600 uppercase tracking-widest pb-1">the thread</div>
            {[
              "You arrive in Ironveil with mud on your boots.",
              "A guard waves you through without looking up.",
              "You earned 3 copper begging. ×5",
              "You head to Market Square.",
              "The smell of fried dough makes your stomach fold.",
            ].map((t, k) => (
              <p key={k} className="text-[13px] leading-snug text-slate-400 italic font-[family-name:var(--font-sans)] border-l-2 border-slate-700/40 pl-2.5">
                {t}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
