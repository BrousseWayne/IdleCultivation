import type { ActivityCategory } from "@/game/types/domain";
import { defineActivities } from "@/game/data/defineContent";
import { when } from "@/game/data/conditions";

export const activityData = defineActivities([
  {
    key: "beg",
    name: "Beg",
    category: "work",
    xpPerCompletion: () => 100,
    timeCost: 8,
    unlocked: true,
    effects: [{ type: "grant_currency", amount: 100, uncertain: true }],
  },
  {
    key: "farmFields",
    name: "Farm Fields",
    category: "work",
    xpPerCompletion: () => 150,
    timeCost: 6,
    unlocked: true,
    effects: [
      { type: "grant_currency", amount: 80 },
      { type: "grant_stat", stat: "Strength", amount: 1 },
    ],
  },
  {
    key: "mineOre",
    name: "Mine Ore",
    category: "work",
    xpPerCompletion: () => 200,
    timeCost: 8,
    unlocked: true,
    effects: [
      { type: "grant_currency", amount: 150 },
      { type: "grant_stat", stat: "Strength", amount: 2 },
    ],
  },
  {
    key: "liftWeights",
    name: "Lift Weights",
    category: "training",
    xpPerCompletion: () => 200,
    timeCost: 4,
    unlocked: true,
    scope: "self",
    effects: [{ type: "grant_stat", stat: "Strength", amount: 5 }],
  },
  {
    key: "bodyConditioning",
    name: "Body Conditioning",
    category: "training",
    xpPerCompletion: () => 180,
    timeCost: 4,
    unlocked: true,
    scope: "self",
    effects: [
      { type: "grant_stat", stat: "Dexterity", amount: 3 },
      { type: "grant_stat", stat: "Strength", amount: 2 },
    ],
  },
  {
    key: "footworkDrills",
    name: "Footwork Drills",
    category: "training",
    xpPerCompletion: () => 160,
    timeCost: 3,
    unlocked: true,
    scope: "self",
    effects: [{ type: "grant_stat", stat: "Dexterity", amount: 5 }],
  },
  {
    key: "readClassics",
    name: "Read the Classics",
    category: "study",
    xpPerCompletion: () => 120,
    timeCost: 6,
    unlocked: true,
    scope: "self",
    effects: [{ type: "grant_currency", amount: 30 }],
  },
  {
    key: "studyFormations",
    name: "Study Formations",
    category: "study",
    xpPerCompletion: () => 250,
    timeCost: 8,
    unlocked: false,
    scope: "self",
    effects: [{ type: "grant_stat", stat: "Dexterity", amount: 3 }],
    unlockConditions: [when.completions("readClassics", 5)],
  },
  {
    key: "copyScrolls",
    name: "Copy Scrolls",
    category: "study",
    xpPerCompletion: () => 180,
    timeCost: 4,
    unlocked: true,
    scope: "self",
    effects: [
      { type: "grant_currency", amount: 60 },
      { type: "grant_stat", stat: "Dexterity", amount: 1 },
    ],
  },
  {
    key: "helpElders",
    name: "Help the Elders",
    category: "social",
    xpPerCompletion: () => 100,
    timeCost: 4,
    unlocked: true,
    effects: [{ type: "grant_currency", amount: 40 }],
  },
  {
    key: "networkMerchants",
    name: "Network with Merchants",
    category: "social",
    xpPerCompletion: () => 200,
    timeCost: 6,
    unlocked: true,
    effects: [{ type: "grant_currency", amount: 500 }],
  },
]);

// The union of every authored activity key — derived, never hand-maintained.
export type ActivityKey = (typeof activityData)[number]["key"];

export const INITIALLY_UNLOCKED: readonly ActivityCategory[] = ["work"];
