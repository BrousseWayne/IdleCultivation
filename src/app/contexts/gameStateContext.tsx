import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useActivityStore } from "../stores/activityStore";
import { useGameStore } from "../stores/gameStore";

function useActivityExecutor() {
  const ticks = useGameStore((s) => s.ticks);
  const isPlaying = useGameStore((s) => s.isPlaying);
  const stopGameLoop = useGameStore((s) => s.stopGameLoop);

  const activityQueue = useActivityStore((s) => s.activityQueue);
  const completeCurrentActivity = useActivityStore(
    (s) => s.completeCurrentActivity
  );
  const repeatActivities = useActivityStore((s) => s.repeatActivities);

  const startTickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || activityQueue.length === 0) return;

    const currentActivity = activityQueue[0];

    if (startTickRef.current === null) {
      startTickRef.current = ticks;
    }

    if (ticks - startTickRef.current >= currentActivity.timeCost) {
      completeCurrentActivity();
      startTickRef.current = null;

      if (activityQueue.length === 1 && !repeatActivities) {
        stopGameLoop();
      }
    }
  }, [
    ticks,
    isPlaying,
    activityQueue,
    completeCurrentActivity,
    repeatActivities,
    stopGameLoop,
  ]);
}

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  useActivityExecutor();
  return <>{children}</>;
};
