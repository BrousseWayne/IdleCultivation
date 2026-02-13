import type { Currency, Stats, ActivityCategory, NavigationItem } from "./domain";

export type Effect =
  | { type: "grant_currency"; currency: Currency; amount: number }
  | { type: "grant_stat"; stat: Stats; amount: number }
  | { type: "spend_currency"; currency: Currency; amount: number }
  | { type: "log"; message: string }
  | { type: "damage"; amount: number }
  | { type: "heal"; amount: number }
  | { type: "unlock_category"; category: ActivityCategory }
  | { type: "unlock_nav"; tab: NavigationItem };
