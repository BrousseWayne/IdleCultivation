import { useEffect, useRef, useState } from "react";

const STALE_MS = 250; // no state update for this long → game paused, freeze
const RISE_MS = 90; // completion: sweep the remainder to 100%
const HOLD_MS = 160; // completion: held full before resetting
const COMPLETION_FLOOR = 85; // resets from below this are edits, not completions

type Phase = "follow" | "rise" | "hold" | "catchup";

// Smooths a stepwise progress value (0–100) into a continuous one.
// Between state updates the display advances at the measured rate, so the
// bar moves every frame instead of jumping per tick. A drop from near-full
// plays a completion sequence (fill → hold → reset) instead of snapping.
export function useSmoothProgress(target: number): { percent: number; completing: boolean } {
  const [percent, setPercent] = useState(target);
  const displayed = useRef(target);
  const tracker = useRef({
    target,
    rate: 0, // percent per ms, measured from incoming updates
    stepMs: 0, // measured interval between updates — caps projection to one step
    updatedAt: 0,
    phase: "follow" as Phase,
    phaseStart: 0,
    riseFrom: 0,
  });

  useEffect(() => {
    const now = performance.now();
    const state = tracker.current;
    if (target < state.target - 1) {
      if (Math.max(state.target, displayed.current) >= COMPLETION_FLOOR && state.phase === "follow") {
        state.phase = "rise";
        state.phaseStart = now;
        state.riseFrom = displayed.current;
      } else if (state.phase === "follow") {
        displayed.current = target; // queue edited — just snap
      }
      state.rate = 0;
    } else if (state.phase === "follow" && state.updatedAt > 0) {
      const sinceUpdateMs = now - state.updatedAt;
      if (sinceUpdateMs > 0 && target > state.target) {
        state.rate = (target - state.target) / sinceUpdateMs;
        state.stepMs = sinceUpdateMs;
      }
    }
    state.target = target;
    state.updatedAt = now;
  }, [target]);

  useEffect(() => {
    let frameHandle: number;
    const frame = () => {
      const now = performance.now();
      const state = tracker.current;
      let next = displayed.current;

      if (state.phase === "rise") {
        const progress = Math.min((now - state.phaseStart) / RISE_MS, 1);
        next = state.riseFrom + (100 - state.riseFrom) * progress;
        if (progress >= 1) {
          state.phase = "hold";
          state.phaseStart = now;
        }
      } else if (state.phase === "hold") {
        next = 100;
        if (now - state.phaseStart >= HOLD_MS) {
          // restart visibly from zero, then race up to wherever the new day
          // actually is — never teleport mid-bar
          state.phase = "catchup";
          next = 0;
        }
      } else if (state.phase === "catchup") {
        const isStale = now - state.updatedAt > STALE_MS;
        const projected = Math.min(
          isStale ? state.target : state.target + state.rate * Math.min(now - state.updatedAt, state.stepMs),
          100
        );
        next = displayed.current + (projected - displayed.current) * 0.3;
        if (projected - next < 1.5) {
          state.phase = "follow";
          next = projected;
        }
      } else {
        const isStale = now - state.updatedAt > STALE_MS;
        const projected = isStale
          ? state.target
          : state.target + state.rate * Math.min(now - state.updatedAt, state.stepMs);
        const capped = Math.min(projected, 100);
        // never crawl backwards over small corrections; converge instead
        next = capped >= displayed.current ? capped : displayed.current + (capped - displayed.current) * 0.25;
      }

      displayed.current = next;
      setPercent(next);
      frameHandle = requestAnimationFrame(frame);
    };
    frameHandle = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameHandle);
  }, []);

  const phase = tracker.current.phase;
  // glow only when the sweep had distance to cover — if the bar was already
  // sitting full (rest period / fast final segment), its fill flash was the
  // celebration and the day-roll reset stays quiet
  const completing = (phase === "rise" || phase === "hold") && tracker.current.riseFrom < 97;
  return { percent, completing };
}
