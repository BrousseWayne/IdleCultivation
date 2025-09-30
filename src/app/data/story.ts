import type { StoryEntry } from "../types/domain";

export const storyEntries: StoryEntry[] = [
  {
    time: "Day 1, Morning",
    entry:
      "You awakened as a humble farmer in the Azure Mountain region. At 23 years old, your mortal body yearns for something greater than tilling fields.",
    type: "narrative",
  },
  {
    time: "Day 1, Afternoon",
    entry:
      "While working in the fields, you discovered a strange glowing stone. Upon touching it, visions of immortal cultivators filled your mind.",
    type: "discovery",
  },
  {
    time: "Day 2, Dawn",
    entry:
      "You traveled to the Azure Mountain Sect and begged the outer disciples for a chance to join. After demonstrating your determination, Elder Chen agreed to test your spiritual roots.",
    type: "journey",
  },
  {
    time: "Day 3, Evening",
    entry:
      "Your spiritual roots were deemed 'acceptable' - not genius level, but sufficient for cultivation. You were accepted as an outer disciple.",
    type: "achievement",
  },
  {
    time: "Day 5, Night",
    entry:
      "You ventured into the Whispering Forest and hunted 47 Spirit Rabbits, earning your first combat experience and 340 Spirit Stones.",
    type: "combat",
  },
];

export const events = [
  {
    date: 15,
    type: "past",
    activity: "Qi Cultivation",
    result: "Breakthrough to 8th layer",
    category: "cultivation",
  },
  {
    date: 18,
    type: "past",
    activity: "Beast Hunting",
    result: "Defeated Iron Claw Bear",
    category: "combat",
  },
  {
    date: 22,
    type: "future",
    activity: "Sect Tournament",
    result: "Preliminary rounds begin",
    category: "event",
  },
  {
    date: 25,
    type: "future",
    activity: "Auction House",
    result: "Rare pill auction",
    category: "event",
  },
  {
    date: 28,
    type: "past",
    activity: "Alchemy Work",
    result: "Crafted 5 Healing Pills",
    category: "crafting",
  },
];
