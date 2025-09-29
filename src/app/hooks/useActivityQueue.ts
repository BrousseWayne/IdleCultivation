import { useState } from "react";
import type { ActivityModel } from "../pages/activities";

export function useActivityQueue() {
  const [activityQueue, setQueue] = useState<ActivityModel[]>([]);

  const enqueueActivity = (activity: ActivityModel) => {
    setQueue((prev) => [...prev, activity]);
  };

  const dequeueActivity = () => {
    setQueue((prev) => prev.slice(1));
  };

  const clear = () => setQueue([]);

  return { activityQueue, enqueueActivity, dequeueActivity, clear };
}
