import {
  Zap,
  Flame,
  Mountain,
  Wind,
  Compass,
  Briefcase,
  Dumbbell,
  Book,
  Hammer,
  Heart,
  Music,
  Gamepad2,
  Utensils,
  ShoppingCart,
  Home,
  GraduationCap,
  Palette,
  TreePine,
  Fish,
  Bike,
  HandCoins,
} from "lucide-react";
import type { Activity } from "../pages/activities";

// export const activityData: Activity[] = [
//   {
//     key: "sectDuties",
//     name: "Sect Duties",
//     icon: Briefcase,
//     cost: 8,
//     reward: "+960 Spirit Stones",
//     category: "work",
//   },
//   {
//     key: "alchemyWork",
//     name: "Alchemy Work",
//     icon: Flame,
//     cost: 6,
//     reward: "+5 Alchemy Skill",
//     category: "work",
//   },
//   {
//     key: "martialArts",
//     name: "Martial Arts",
//     icon: Dumbbell,
//     cost: 4,
//     reward: "+60 Body Tempering",
//     category: "training",
//   },
//   {
//     key: "qiCultivation",
//     name: "Qi Cultivation",
//     icon: Mountain,
//     cost: 6,
//     reward: "+90 Cultivation Progress",
//     category: "training",
//   },
//   {
//     key: "beastHunting",
//     name: "Beast Hunting",
//     icon: Zap,
//     cost: 8,
//     reward: "+200 Beast Cores",
//     category: "training",
//   },
//   {
//     key: "herbGathering",
//     name: "Herb Gathering",
//     icon: TreePine,
//     cost: 4,
//     reward: "+50 Spirit Herbs",
//     category: "work",
//   },
//   {
//     key: "meditation",
//     name: "Meditation",
//     icon: Wind,
//     cost: 2,
//     reward: "+30 Soul Strength",
//     category: "training",
//   },
//   {
//     key: "socializing",
//     name: "Socializing",
//     icon: Heart,
//     cost: 3,
//     reward: "+20 Relationship Points",
//     category: "social",
//   },
//   {
//     key: "reading",
//     name: "Reading Scrolls",
//     icon: Book,
//     cost: 2,
//     reward: "+15 Knowledge",
//     category: "study",
//   },
//   {
//     key: "crafting",
//     name: "Weapon Crafting",
//     icon: Hammer,
//     cost: 5,
//     reward: "+40 Crafting Skill",
//     category: "work",
//   },
//   {
//     key: "cooking",
//     name: "Spiritual Cooking",
//     icon: Utensils,
//     cost: 2,
//     reward: "+25 Cooking Skill",
//     category: "life",
//   },
//   {
//     key: "shopping",
//     name: "Market Trading",
//     icon: ShoppingCart,
//     cost: 1,
//     reward: "+10 Trading Skill",
//     category: "life",
//   },
//   {
//     key: "resting",
//     name: "Resting",
//     icon: Home,
//     cost: 1,
//     reward: "+5 Health Recovery",
//     category: "life",
//   },
//   {
//     key: "studying",
//     name: "Technique Study",
//     icon: GraduationCap,
//     cost: 3,
//     reward: "+35 Technique Mastery",
//     category: "study",
//   },
//   {
//     key: "painting",
//     name: "Spirit Painting",
//     icon: Palette,
//     cost: 2,
//     reward: "+20 Artistic Skill",
//     category: "hobby",
//   },
//   {
//     key: "music",
//     name: "Cultivation Music",
//     icon: Music,
//     cost: 2,
//     reward: "+15 Musical Skill",
//     category: "hobby",
//   },
//   {
//     key: "gaming",
//     name: "Strategy Games",
//     icon: Gamepad2,
//     cost: 1,
//     reward: "+10 Strategic Thinking",
//     category: "hobby",
//   },
//   {
//     key: "exploring",
//     name: "Local Exploration",
//     icon: Compass,
//     cost: 3,
//     reward: "+25 Discovery Points",
//     category: "adventure",
//   },
//   {
//     key: "fishing",
//     name: "Spirit Fishing",
//     icon: Fish,
//     cost: 2,
//     reward: "+30 Spirit Fish",
//     category: "hobby",
//   },
//   {
//     key: "exercise",
//     name: "Physical Exercise",
//     icon: Bike,
//     cost: 2,
//     reward: "+20 Stamina",
//     category: "training",
//   },
// ];

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
      currency: "Bronze", // assuming Currency union includes this
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
      stat: "Strength", // assuming Stats union includes this
    },
  },
];

export const locations = [
  {
    name: "Eastern Continent",
    travel: 0,
    description: "Current Location - Peaceful cultivation lands",
    x: 50,
    y: 40,
    connections: ["Central Plains", "Northern Mountains"],
  },
  {
    name: "Western Desert",
    travel: 12,
    description: "Harsh desert with ancient ruins",
    x: 15,
    y: 60,
    connections: ["Central Plains", "Forbidden Valley"],
  },
  {
    name: "Northern Mountains",
    travel: 8,
    description: "Dangerous peaks with rare herbs",
    x: 50,
    y: 15,
    connections: ["Eastern Continent", "Sky Realm"],
  },
  {
    name: "Southern Seas",
    travel: 16,
    description: "Mysterious islands and sea beasts",
    x: 40,
    y: 85,
    connections: ["Central Plains", "Underworld Gates"],
  },
  {
    name: "Central Plains",
    travel: 6,
    description: "Bustling trade hub and sects",
    x: 35,
    y: 50,
    connections: ["Eastern Continent", "Western Desert", "Southern Seas"],
  },
  {
    name: "Forbidden Valley",
    travel: 24,
    description: "Legendary cultivation ground",
    x: 20,
    y: 30,
    connections: ["Western Desert", "Sky Realm"],
  },
  {
    name: "Sky Realm",
    travel: 48,
    description: "Floating islands in the clouds",
    x: 70,
    y: 20,
    connections: ["Northern Mountains", "Forbidden Valley"],
  },
  {
    name: "Underworld Gates",
    travel: 36,
    description: "Dark realm of shadows",
    x: 80,
    y: 75,
    connections: ["Southern Seas"],
  },
];

export const activeQuests = [
  {
    id: 1,
    title: "Clear the Forest",
    description: "Eliminate the wild beasts in the Whispering Forest.",
    progress: 60,
    reward: "150 Spirit Stones",
    timeLeft: "2 days",
  },
  {
    id: 2,
    title: "Gather Rare Herbs",
    description: "Collect 10 rare herbs for the village alchemist.",
    progress: 35,
    reward: "Elixir of Minor Healing",
    timeLeft: "4 days",
  },
];

export const completedQuests = [
  {
    id: 3,
    title: "Protect the Village",
    description: "Defend the village from a bandit raid.",
    reward: "Reputation with the villagers",
    completedDate: "2024-01-15",
  },
  {
    id: 4,
    title: "Find Lost Artifact",
    description: "Recover an ancient artifact from the ruins.",
    reward: "Mysterious Amulet",
    completedDate: "2024-01-10",
  },
];

export const currentLocation = "Azure Mountain Sect";

export const currentTask = "Qi Cultivation";
// const totalUsed = Object.entries(activities).reduce((sum, [key, value]) => {
//   const activity = activityData.find((a) => a.key === key);
//   return sum + value * (activity?.cost || 0);
// }, 0);
export const freeTime = 24; // 8 hours for sleep/eating
export const moodBonus = Math.floor(freeTime * 2); // 2 mood points per free hour

//timestamp wasnt stupid as a field in story entries
export const storyEntries = [
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

export const currentDay = 20; // Current day in the month
export const daysInMonth = 30;

export const lifestyleOptions = [
  {
    category: "Housing",
    options: [
      {
        name: "Shabby Hut",
        cost: 0,
        current: false,
        description: "Basic shelter, no comfort bonus",
      },
      {
        name: "Small Cottage",
        cost: 500,
        current: true,
        description: "Modest living, +10% XP bonus",
      },
      {
        name: "Comfortable House",
        cost: 2000,
        current: false,
        description: "Good living, +25% XP bonus",
      },
      {
        name: "Luxurious Manor",
        cost: 10000,
        current: false,
        description: "Excellent living, +50% XP bonus",
      },
    ],
  },
  {
    category: "Meals",
    options: [
      {
        name: "Bread & Water",
        cost: 5,
        current: false,
        description: "Survival rations, no bonus",
      },
      {
        name: "Simple Meals",
        cost: 15,
        current: true,
        description: "Basic nutrition, +5% XP bonus",
      },
      {
        name: "Quality Cuisine",
        cost: 50,
        current: false,
        description: "Good food, +15% XP bonus",
      },
      {
        name: "Gourmet Delicacies",
        cost: 200,
        current: false,
        description: "Finest meals, +30% XP bonus",
      },
    ],
  },
  {
    category: "Transportation",
    options: [
      {
        name: "Walking",
        cost: 0,
        current: true,
        description: "Free but slow travel",
      },
      {
        name: "Horse",
        cost: 300,
        current: false,
        description: "Faster travel, -25% travel time",
      },
      {
        name: "Carriage",
        cost: 1500,
        current: false,
        description: "Comfortable travel, -50% travel time",
      },
      {
        name: "Flying Sword",
        cost: 5000,
        current: false,
        description: "Instant travel between known locations",
      },
    ],
  },
];
