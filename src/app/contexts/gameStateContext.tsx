import { useState } from "react";
import { createContext, useContext } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

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

type GameStateContextType = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  selectedTimeScale: string;
  setSelectedTimeScale: Dispatch<SetStateAction<string>>;
  selectedYear: number;
  setSelectedYear: Dispatch<SetStateAction<number>>;
  selectedMonth: number;
  setSelectedMonth: Dispatch<SetStateAction<number>>;
  selectedEra: number;
  setSelectedEra: Dispatch<SetStateAction<number>>;
  selectedDecade: number;
  setSelectedDecade: Dispatch<SetStateAction<number>>;
  calendarView: "month" | "year" | "decade" | "era";
  setCalendarView: Dispatch<
    SetStateAction<"month" | "year" | "decade" | "era">
  >;
  timeScale: "day" | "week" | "month";
  setTimeScale: Dispatch<SetStateAction<"day" | "week" | "month">>;
  timeScales: Record<
    string,
    { label: string; multiplier: number; unit: string }
  >;
  currentScale: { label: string; multiplier: number; unit: string };
  maxTimePoints: number;
  timePoints: number;
  setTimePoints: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  gameSpeed: number;
  setGameSpeed: Dispatch<SetStateAction<number>>;
  statsCollapsed: boolean;
  setStatsCollapsed: Dispatch<SetStateAction<boolean>>;
  resourcesCollapsed: boolean;
  setResourcesCollapsed: Dispatch<SetStateAction<boolean>>;
  livingCollapsed: boolean;
  setLivingCollapsed: Dispatch<SetStateAction<boolean>>;
  selectedLocation: string;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  activities: Record<ActivityKeys, number>;
  setActivities: Dispatch<SetStateAction<Record<ActivityKeys, number>>>;
  showDetailedView: boolean;
  setShowDetailedView: Dispatch<SetStateAction<boolean>>;
  selectedDate: number | null;
  setSelectedDate: Dispatch<SetStateAction<number | null>>;
  collapsedCategories: Record<string, boolean>;
  setCollapsedCategories: Dispatch<SetStateAction<Record<string, boolean>>>;
  exploreView: string;
  setExploreView: Dispatch<SetStateAction<string>>;
  eventLog: string[];
  setEventLog: Dispatch<SetStateAction<string[]>>;
  currentExploreLocation: string;
  setCurrentExploreLocation: Dispatch<SetStateAction<string>>;
  inventoryItems: InventoryItem[];
  setInventoryItems: Dispatch<SetStateAction<InventoryItem[]>>;
  equippedItems: EquippedItems;
  setEquippedItems: Dispatch<SetStateAction<EquippedItems>>;
};

const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined
);

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
}

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <GameStateContext.Provider
      value={{
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
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
