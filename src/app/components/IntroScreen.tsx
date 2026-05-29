import { useState } from "react";
import { useGameStore } from "../stores/gameStore";
import {
  introDialogue,
  introClosingText,
  backgroundDefinitions,
  resolveBackground,
} from "../data/intro";
import type { Background } from "../types/domain";

type Phase = "dialogue" | "closing";

export const IntroScreen = () => {
  const startRun = useGameStore((s) => s.startRun);
  const addEventLog = useGameStore((s) => s.addEventLog);

  const [phase, setPhase] = useState<Phase>("dialogue");
  const [exchangeIndex, setExchangeIndex] = useState(0);
  const [tagCounts, setTagCounts] = useState<Record<Background, number>>({
    farmer: 0,
    orphan: 0,
    soldier: 0,
  });

  const currentExchange = introDialogue[exchangeIndex];
  const isLast = exchangeIndex === introDialogue.length - 1;

  const handleChoice = (tags: Background[]) => {
    const updated = { ...tagCounts };
    for (const tag of tags) {
      updated[tag] = (updated[tag] || 0) + 1;
    }
    setTagCounts(updated);

    if (isLast) {
      setPhase("closing");
    } else {
      setExchangeIndex((i) => i + 1);
    }
  };

  const handleEnter = () => {
    const background = resolveBackground(tagCounts);
    const def = backgroundDefinitions[background];
    addEventLog(def.openingNarration);
    startRun(background);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="max-w-xl w-full px-8 py-12 flex flex-col gap-8">
        {phase === "dialogue" ? (
          <>
            <div className="space-y-1">
              <p className="text-xs text-slate-600 font-mono">
                {exchangeIndex + 1} / {introDialogue.length}
              </p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {currentExchange.text}
            </p>

            <div className="flex flex-col gap-3">
              {currentExchange.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(choice.tags)}
                  className="text-left px-4 py-3 border border-slate-800 rounded-md text-slate-400 text-sm hover:border-accent-jade/40 hover:text-slate-200 hover:bg-accent-jade/5 transition-colors"
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {introClosingText}
            </p>

            <button
              onClick={handleEnter}
              className="self-start px-6 py-3 border border-accent-jade/40 text-accent-jade text-sm rounded-md hover:bg-accent-jade/10 transition-colors"
            >
              Enter the city
            </button>
          </>
        )}
      </div>
    </div>
  );
};
