import type { Stats, ActivityCategory, NavigationItem } from "@/game/types/domain";

export type Effect =
  | { type: "grant_currency"; amount: number; uncertain?: boolean }
  | { type: "grant_stat"; stat: Stats; amount: number }
  | { type: "spend_currency"; amount: number }
  | { type: "log"; message: string }
  | { type: "damage"; amount: number }
  | { type: "heal"; amount: number }
  | { type: "unlock_category"; category: ActivityCategory }
  | { type: "unlock_nav"; tab: NavigationItem };
