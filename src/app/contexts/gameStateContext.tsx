import { useEffect } from "react";
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
  const startTick = useActivityStore((s) => s.currentActivityStartTick);
  const setStartTick = useActivityStore((s) => s.setCurrentActivityStartTick);

  useEffect(() => {
    if (!isPlaying || activityQueue.length === 0) return;

    const currentActivity = activityQueue[0];

    if (startTick === null) {
      setStartTick(ticks);
    }

    if (startTick !== null && ticks - startTick >= currentActivity.timeCost) {
      completeCurrentActivity();
      setStartTick(null);

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
    startTick,
    setStartTick,
  ]);
}

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  useActivityExecutor();
  return <>{children}</>;
};
