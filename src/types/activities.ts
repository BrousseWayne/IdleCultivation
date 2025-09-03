import type { LucideIcon } from "lucide-react";
export type ActivityCategory =
  | "work"
  | "training"
  | "study"
  | "social"
  | "life"
  | "hobby"
  | "adventure";

export interface Activity {
  key: string;
  name: string;
  icon: LucideIcon;
  cost: number; // time points or hours
  reward: string;
  category: ActivityCategory;
}
