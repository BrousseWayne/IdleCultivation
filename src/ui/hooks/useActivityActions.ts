import { useGameStore } from "@/game/stores/gameStore";
import { queueActivity, unqueueActivity } from "@/game/engine/gameLoop";
import { EntityRegistry } from "@/game/services";

// shared queue/unqueue with stream logging — used by Explore + Activities
export function useActivityActions() {
  const pushLog = useGameStore((state) => state.pushLog);
  const queue = (key: string) => {
    const activity = EntityRegistry.get("activity", key);
    if (activity && queueActivity(key)) {
      pushLog({ text: `You set out to ${activity.name.toLowerCase()}.`, theme: "ambient" });
    }
  };
  const unqueue = (key: string) => { unqueueActivity(key); };
  return { queue, unqueue };
}
