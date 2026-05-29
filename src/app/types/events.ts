import type { Stats, NotificationType } from "./domain";

export type GameEvent =
  | {
      type: "cultivator:stat-changed";
      payload: { stat: Stats; oldValue: number; newValue: number };
    }
  | { type: "activity:completed"; payload: { activityKey: string } }
  | { type: "game:tick"; payload: { ticks: number; day: number } }
  | { type: "player:peered_at_fate"; zoomLevel: number }
  | { type: "cultivator:death"; payload: { age: number } }
  | { type: "cultivator:reincarnated" }
  | {
      type: "notification:push";
      payload: { message: string; notificationType: NotificationType };
    };

export type EventHandler<T = any> = (event: T) => void;
