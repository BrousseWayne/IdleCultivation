import {
  Coins,
  Zap,
  Settings,
  User,
  Flame,
  Mountain,
  Wind,
  Calendar,
  Package,
  Activity,
  Compass,
  Clock,
  Briefcase,
  Dumbbell,
  Plus,
  Minus,
  MapPin,
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
  ChevronDown,
  Play,
  Pause,
  FastForward,
  Smile,
  BarChart3,
  BookOpen,
  ChevronLeft,
  Sword,
  Leaf,
  ScrollText,
  Target,
  CheckCircle,
  ShoppingBag,
  Users,
  ArrowLeft,
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

export const storyEntries = [
  {
    text: "You arrived in the village and started your new life.",
    timestamp: "2024-01-20 10:30",
  },
  {
    text: "You completed your first quest and earned the villagers' trust.",
    timestamp: "2024-01-22 14:45",
  },
  {
    text: "You discovered a hidden path in the forest.",
    timestamp: "2024-01-25 08:12",
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

import { useState, useMemo } from "react";

type ActivityKeys =
  | "sectDuties"
  | "alchemyWork"
  | "martialArts"
  | "qiCultivation"
  | "beastHunting"
  | "herbGathering"
  | "meditation"
  | "socializing"
  | "reading"
  | "crafting"
  | "cooking"
  | "shopping"
  | "resting"
  | "studying"
  | "painting"
  | "music"
  | "gaming"
  | "exploring"
  | "fishing"
  | "exercise";

type InventoryItem = {
  id: number;
  name: string;
  type: string;
  rarity: string;
  equipped: boolean;
};

type EquippedItems = {
  weapon: InventoryItem | null;
  armor: InventoryItem | null;
  helmet: InventoryItem | null;
  boots: InventoryItem | null;
  ring: InventoryItem | null;
  amulet: InventoryItem | null;
};

export function useGameState() {
  const [activeTab, setActiveTab] = useState("Activities");
  const [selectedTimeScale, setSelectedTimeScale] = useState("Day");
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedEra, setSelectedEra] = useState(1);
  const [selectedDecade, setSelectedDecade] = useState(1);
  const [calendarView, setCalendarView] = useState<
    "month" | "year" | "decade" | "era"
  >("month");

  const [timeScale, setTimeScale] = useState<"day" | "week" | "month">("day");
  const timeScales = {
    day: { label: "Day", multiplier: 1, unit: "day" },
    week: { label: "Week", multiplier: 7, unit: "week" },
    month: { label: "Month", multiplier: 30, unit: "month" },
  };
  const currentScale = timeScales[timeScale];
  const maxTimePoints = 24 * currentScale.multiplier;
  const [timePoints, setTimePoints] = useState(maxTimePoints);

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [statsCollapsed, setStatsCollapsed] = useState(false);
  const [resourcesCollapsed, setResourcesCollapsed] = useState(false);
  const [livingCollapsed, setLivingCollapsed] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("Eastern Continent");

  const [activities, setActivities] = useState<Record<ActivityKeys, number>>({
    sectDuties: 0,
    alchemyWork: 0,
    martialArts: 0,
    qiCultivation: 0,
    beastHunting: 0,
    herbGathering: 0,
    meditation: 0,
    socializing: 0,
    reading: 0,
    crafting: 0,
    cooking: 0,
    shopping: 0,
    resting: 0,
    studying: 0,
    painting: 0,
    music: 0,
    gaming: 0,
    exploring: 0,
    fishing: 0,
    exercise: 0,
  });

  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});
  const [exploreView, setExploreView] = useState("main");

  const [eventLog, setEventLog] = useState<string[]>([
    "You arrive at the Whispering Forest. The ancient trees seem to watch your every move.",
    "A gentle breeze carries the scent of medicinal herbs through the air.",
  ]);
  const [currentExploreLocation, setCurrentExploreLocation] =
    useState("Whispering Forest");

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Iron Sword",
      type: "weapon",
      rarity: "common",
      equipped: true,
    },
    {
      id: 2,
      name: "Leather Armor",
      type: "armor",
      rarity: "common",
      equipped: true,
    },
    {
      id: 3,
      name: "Health Potion",
      type: "consumable",
      rarity: "common",
      equipped: false,
    },
    {
      id: 4,
      name: "Spirit Ring",
      type: "ring",
      rarity: "rare",
      equipped: false,
    },
    {
      id: 5,
      name: "Cultivation Manual",
      type: "book",
      rarity: "epic",
      equipped: false,
    },
  ]);

  const [equippedItems, setEquippedItems] = useState<EquippedItems>({
    weapon: {
      id: 1,
      name: "Iron Sword",
      rarity: "common",
      type: "weapon",
      equipped: true,
    },
    armor: {
      id: 2,
      name: "Leather Armor",
      rarity: "common",
      type: "armor",
      equipped: true,
    },
    helmet: null,
    boots: null,
    ring: null,
    amulet: null,
  });

  return useMemo(
    () => ({
      activeTab,
      setActiveTab,
      selectedTimeScale,
      setSelectedTimeScale,
      selectedYear,
      setSelectedYear,
      selectedMonth,
      setSelectedMonth,
      selectedEra,
      setSelectedEra,
      selectedDecade,
      setSelectedDecade,
      calendarView,
      setCalendarView,
      timeScale,
      setTimeScale,
      timeScales,
      currentScale,
      maxTimePoints,
      timePoints,
      setTimePoints,
      isPlaying,
      setIsPlaying,
      gameSpeed,
      setGameSpeed,
      statsCollapsed,
      setStatsCollapsed,
      resourcesCollapsed,
      setResourcesCollapsed,
      livingCollapsed,
      setLivingCollapsed,
      selectedLocation,
      setSelectedLocation,
      activities,
      setActivities,
      showDetailedView,
      setShowDetailedView,
      selectedDate,
      setSelectedDate,
      collapsedCategories,
      setCollapsedCategories,
      exploreView,
      setExploreView,
      eventLog,
      setEventLog,
      currentExploreLocation,
      setCurrentExploreLocation,
      inventoryItems,
      setInventoryItems,
      equippedItems,
      setEquippedItems,
    }),
    [
      activeTab,
      selectedTimeScale,
      selectedYear,
      selectedMonth,
      selectedEra,
      selectedDecade,
      calendarView,
      timeScale,
      currentScale,
      maxTimePoints,
      timePoints,
      isPlaying,
      gameSpeed,
      statsCollapsed,
      resourcesCollapsed,
      livingCollapsed,
      selectedLocation,
      activities,
      showDetailedView,
      selectedDate,
      collapsedCategories,
      exploreView,
      eventLog,
      currentExploreLocation,
      inventoryItems,
      equippedItems,
      timeScales,
    ]
  );
}

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
