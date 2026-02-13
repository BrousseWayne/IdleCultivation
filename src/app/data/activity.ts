import { Dumbbell, HandCoins } from "lucide-react";
import type { Activity, ActivityCategory } from "../types/domain";

export const activityData: Activity[] = [
  {
    key: "beg",
    name: "Beg",
    icon: HandCoins,
    category: "work",

    xpScalingFn: () => 100, // example formula
    level: 1,
    timeCost: 8,
    unlocked: true,
    effects: [{ type: "grant_currency", currency: "Bronze", amount: 100 }],
  },
  {
    key: "liftWeights",
    name: "Lift Weights",
    icon: Dumbbell,
    category: "training",

    xpScalingFn: () => 200,
    level: 1,
    timeCost: 4,
    unlocked: true,
    effects: [{ type: "grant_stat", stat: "Strength", amount: 5 }],
  },
];

export const INITIALLY_UNLOCKED: ActivityCategory[] = ["work", "training"];
