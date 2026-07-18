import { useEffect, useRef, useState } from "react";

const CHASE_RATE = 0.22; // per-frame convergence toward the target
const SETTLE_THRESHOLD = 0.15; // close enough → snap and let the loop sleep

// Smooths a stepwise 0-100 value (updated once per game tick) by chasing it
// from below: the display glides toward the latest target and never overshoots,
// so it can never drift backwards. Real drops (level-up wrap, unqueue, day
// reset) snap instantly. The animation loop sleeps once settled, so idle bars
// cost nothing per frame.
export function useProjectedPercent(target: number): number {
  const [percent, setPercent] = useState(target);
  const displayed = useRef(target);
  const targetRef = useRef(target);
  const isRunning = useRef(false);
  const frameHandle = useRef(0);

  useEffect(() => {
    if (target < targetRef.current) {
      displayed.current = target; // drop — snap, never animate backwards
      setPercent(target);
    }
    targetRef.current = target;

    if (!isRunning.current && displayed.current !== target) {
      isRunning.current = true;
      const frame = () => {
        const distance = targetRef.current - displayed.current;
        if (distance <= SETTLE_THRESHOLD) {
          displayed.current = targetRef.current;
          setPercent(displayed.current);
          isRunning.current = false;
          return;
        }
        displayed.current += distance * CHASE_RATE;
        setPercent(displayed.current);
        frameHandle.current = requestAnimationFrame(frame);
      };
      frameHandle.current = requestAnimationFrame(frame);
    }
  }, [target]);

  useEffect(() => () => cancelAnimationFrame(frameHandle.current), []);

  return percent;
}
