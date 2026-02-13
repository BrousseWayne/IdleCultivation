import type { Stats } from "./domain";

export type GameEvent =
  | {
      type: "cultivator:stat-changed";
      payload: { stat: Stats; oldValue: number; newValue: number };
    }
  | { type: "activity:completed"; payload: { activityKey: string } }
  | { type: "game:tick"; payload: { ticks: number; day: number } };

export type EventHandler<T = any> = (event: T) => void;
