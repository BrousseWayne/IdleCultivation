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
    reward: {
      amount: 100,
      currency: "Bronze",
    },
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
    reward: {
      amount: 5,
      stat: "Strength",
    },
  },
];

export const INITIALLY_UNLOCKED: ActivityCategory[] = ["work", "training"];
