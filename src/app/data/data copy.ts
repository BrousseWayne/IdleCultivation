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
  type LucideIcon,
} from "lucide-react";

export const activityData = [
  {
    key: "sectDuties",
    name: "Sect Duties",
    icon: Briefcase,
    cost: 8,
    reward: "+960 Spirit Stones",
    category: "work",
  },
  {
    key: "alchemyWork",
    name: "Alchemy Work",
    icon: Flame,
    cost: 6,
    reward: "+5 Alchemy Skill",
    category: "work",
  },
  {
    key: "martialArts",
    name: "Martial Arts",
    icon: Dumbbell,
    cost: 4,
    reward: "+60 Body Tempering",
    category: "training",
  },
  {
    key: "qiCultivation",
    name: "Qi Cultivation",
    icon: Mountain,
    cost: 6,
    reward: "+90 Cultivation Progress",
    category: "training",
  },
  {
    key: "beastHunting",
    name: "Beast Hunting",
    icon: Zap,
    cost: 8,
    reward: "+200 Beast Cores",
    category: "training",
  },
  {
    key: "herbGathering",
    name: "Herb Gathering",
    icon: TreePine,
    cost: 4,
    reward: "+50 Spirit Herbs",
    category: "work",
  },
  {
    key: "meditation",
    name: "Meditation",
    icon: Wind,
    cost: 2,
    reward: "+30 Soul Strength",
    category: "training",
  },
  {
    key: "socializing",
    name: "Socializing",
    icon: Heart,
    cost: 3,
    reward: "+20 Relationship Points",
    category: "social",
  },
  {
    key: "reading",
    name: "Reading Scrolls",
    icon: Book,
    cost: 2,
    reward: "+15 Knowledge",
    category: "study",
  },
  {
    key: "crafting",
    name: "Weapon Crafting",
    icon: Hammer,
    cost: 5,
    reward: "+40 Crafting Skill",
    category: "work",
  },
  {
    key: "cooking",
    name: "Spiritual Cooking",
    icon: Utensils,
    cost: 2,
    reward: "+25 Cooking Skill",
    category: "life",
  },
  {
    key: "shopping",
    name: "Market Trading",
    icon: ShoppingCart,
    cost: 1,
    reward: "+10 Trading Skill",
    category: "life",
  },
  {
    key: "resting",
    name: "Resting",
    icon: Home,
    cost: 1,
    reward: "+5 Health Recovery",
    category: "life",
  },
  {
    key: "studying",
    name: "Technique Study",
    icon: GraduationCap,
    cost: 3,
    reward: "+35 Technique Mastery",
    category: "study",
  },
  {
    key: "painting",
    name: "Spirit Painting",
    icon: Palette,
    cost: 2,
    reward: "+20 Artistic Skill",
    category: "hobby",
  },
  {
    key: "music",
    name: "Cultivation Music",
    icon: Music,
    cost: 2,
    reward: "+15 Musical Skill",
    category: "hobby",
  },
  {
    key: "gaming",
    name: "Strategy Games",
    icon: Gamepad2,
    cost: 1,
    reward: "+10 Strategic Thinking",
    category: "hobby",
  },
  {
    key: "exploring",
    name: "Local Exploration",
    icon: Compass,
    cost: 3,
    reward: "+25 Discovery Points",
    category: "adventure",
  },
  {
    key: "fishing",
    name: "Spirit Fishing",
    icon: Fish,
    cost: 2,
    reward: "+30 Spirit Fish",
    category: "hobby",
  },
  {
    key: "exercise",
    name: "Physical Exercise",
    icon: Bike,
    cost: 2,
    reward: "+20 Stamina",
    category: "training",
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

export const currentDay = 20; // Current day in the month
export const daysInMonth = 30;

export type Currency =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "SpiritStones"
  | "CoreStones"
  | "HeavenStones";
export type Period = "daily" | "weekly" | "monthly" | "annual" | "oneTime";

export type Cost = {
  currency: Currency;
  amount: number;
  period?: Period;
};

export type LifestyleCategory = "Housing" | "Meals" | "Transportation";

export type LifestyleBonus = {
  xp?: number;
  mortality?: number;
};

export type LifestyleOption = {
  id: string;
  name: string;
  description: string;
  costs: Cost[]; // initial and/or recurring stored together
  unlocked: boolean;
  bonuses: LifestyleBonus;
  icon?: LucideIcon;
};

export type LifestyleCategoryData = {
  category: LifestyleCategory;
  description: string;
  options: LifestyleOption[];
};
export const lifestyleOptions: LifestyleCategoryData[] = [
  {
    category: "Housing",
    description: "Your place of rest and cultivation",
    options: [
      {
        id: "streets",
        name: "Streets",
        description: "Basic shelter, exposed to the elements and bandits.",
        costs: [
          { currency: "Bronze", amount: 0, period: "oneTime" },
          { currency: "Bronze", amount: 0, period: "daily" },
        ],
        unlocked: true,
        bonuses: { xp: -0.5, mortality: 0.2 },
      },
      {
        id: "shabby-tent",
        name: "Shabby Tent",
        description: "Ragged tent, minimal protection from weather.",
        costs: [
          { currency: "Bronze", amount: 100, period: "oneTime" },
          { currency: "Bronze", amount: 1, period: "daily" },
        ],
        unlocked: true,
        bonuses: { mortality: 0.1 },
      },
      {
        id: "simple-cottage",
        name: "Simple Cottage",
        description: "A modest dwelling with basic privacy for cultivation.",
        costs: [
          { currency: "Silver", amount: 5, period: "oneTime" },
          { currency: "Silver", amount: 1, period: "monthly" },
        ],
        unlocked: false,
        bonuses: { xp: 0.1 },
      },
    ],
  },
  {
    category: "Meals",
    description: "Nutrition affects cultivation speed",
    options: [
      {
        id: "bread-water",
        name: "Bread & Water",
        description: "Bare survival food, no cultivation value.",
        costs: [{ currency: "Bronze", amount: 5, period: "daily" }],
        unlocked: true,
        bonuses: { xp: 0 },
      },
      {
        id: "spirit-rice",
        name: "Spirit Rice",
        description: "Grain infused with faint qi, aids cultivation.",
        costs: [{ currency: "Silver", amount: 2, period: "daily" }],
        unlocked: true,
        bonuses: { xp: 0.1 },
      },
      {
        id: "immortal-banquet",
        name: "Immortal Banquet",
        description: "Rare dishes with spiritual herbs and beast meat.",
        costs: [{ currency: "Gold", amount: 1, period: "weekly" }],
        unlocked: false,
        bonuses: { xp: 0.5, mortality: -0.05 },
      },
    ],
  },
  {
    category: "Transportation",
    description: "Travel method affects safety and opportunities",
    options: [
      {
        id: "walking",
        name: "Walking",
        description: "Free but slow travel. Risk of hostile encounters.",
        costs: [{ currency: "Bronze", amount: 0, period: "daily" }],
        unlocked: true,
        bonuses: { mortality: 0.05 },
      },
      {
        id: "spirit-horse",
        name: "Spirit Horse",
        description: "A loyal steed infused with qi, faster journeys.",
        costs: [
          { currency: "Silver", amount: 50, period: "oneTime" },
          { currency: "Silver", amount: 1, period: "daily" },
        ],
        unlocked: false,
        bonuses: { mortality: -0.05 },
      },
      {
        id: "flying-sword",
        name: "Flying Sword",
        description: "Traditional cultivator transport through the skies.",
        costs: [
          { currency: "Gold", amount: 5, period: "oneTime" },
          { currency: "Silver", amount: 2, period: "daily" },
        ],
        unlocked: false,
        bonuses: { xp: 0.05, mortality: -0.1 },
      },
    ],
  },
];

export type StoryEntry = {
  time: string;
  entry: string;
  type: "narrative" | "discovery" | "journey" | "achievement" | "combat";
};

export const storyEntryColors: Record<StoryEntry["type"], string> = {
  narrative: "border-purple-500/50 text-purple-400",
  discovery: "border-yellow-500/50 text-yellow-400",
  journey: "border-blue-500/50 text-blue-400",
  achievement: "border-green-500/50 text-green-400",
  combat: "border-red-500/50 text-red-400",
};

export type NavigationItem =
  | "Explore"
  | "Inventory"
  | "Activities"
  | "Quests"
  | "Lifestyle"
  | "Travel"
  | "Stats"
  | "Recap"
  | "Story";

export type SidebarNavigation = {
  name: NavigationItem;
  icon: LucideIcon;
  url: string;
};

export type NavigationUnlockState = Record<SidebarNavigation["name"], boolean>;

export const initialNavigationUnlockState: NavigationUnlockState = {
  Explore: true,
  Inventory: false,
  Activities: true,
  Quests: false,
  Lifestyle: true,
  Travel: false,
  Stats: false,
  Recap: false,
  Story: true,
};

export const initialPlayerAge = 12;
export const initialPlayerLifespan = 60;

export const initialPlayerHp = {
  max: 100,
  current: 100,
};

export const initialPlayerSatiety = {
  max: 100,
  current: 100,
};

export const initialPlayerMortality = {
  max: 100,
  current: 1,
};
