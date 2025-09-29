import { useEffect, useState } from "react";

export function useGameClock(ticksPerSecond = 24, gameSpeed = 1) {
  const [ticks, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [day, setDay] = useState(0);

  useEffect(() => {
    if (!running) return;

    const interval = 1000 / (ticksPerSecond * gameSpeed);
    const id = setInterval(() => {
      setTime((prev) => {
        const next = prev + 1;
        if (next % 24 === 0) {
          setDay((d) => d + 1);
        }
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [running, ticksPerSecond, gameSpeed]);

  const start = () =>
    setRunning(() => {
      return true;
    });
  const pause = () => setRunning(false);

  return { ticks, start, pause, day, running };
}
