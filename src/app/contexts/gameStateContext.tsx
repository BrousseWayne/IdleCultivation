import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import {
  initialNavigationUnlockState,
  initialPlayerAge,
  initialPlayerHp,
  initialPlayerLifespan,
  initialPlayerMoney,
  initialPlayerMortality,
  initialPlayerSatiety,
  type Stats,
  type NavigationItem,
  type NavigationUnlockState,
} from "../data/data copy";
import {
  type ActivityModel,
  initialActivityCategoriesUnlockState,
  type ActivityUnlockState,
  type Activity,
} from "../pages/activities";
import { activityData, type ActivityKeys } from "../data/data";

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
  stats: Record<Stats, number>;
  setStats: Dispatch<SetStateAction<Record<Stats, number>>>;
  playerMoney: number;
  setRepeatActivities: Dispatch<SetStateAction<boolean>>;
  repeatActivities: boolean;
  dailyExpenses: number;
  playerHp: typeof initialPlayerHp;
  playerSatiety: typeof initialPlayerSatiety;
  playerMortality: typeof initialPlayerMortality;
  age: number;
  time: number;
  start: () => void;
  pause: () => void;
  lifespan: number;
  dailyIncome: number;
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
  selectedLocation: string;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  allocatedActivities: Record<ActivityKeys, number>;
  setAllocatedActivities: Dispatch<
    SetStateAction<Record<ActivityKeys, number>>
  >;
  showDetailedView: boolean;
  setShowDetailedView: Dispatch<SetStateAction<boolean>>;
  selectedDate: number | null;
  setSelectedDate: Dispatch<SetStateAction<number | null>>;
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
  navigationUnlockState: NavigationUnlockState;
  unlockNavigationTab: (tab: NavigationItem) => void;
  activityCategoriesUnlockState: ActivityUnlockState;
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

  const activityMap = Object.fromEntries(
    activityData.map((act) => [act.key, act])
  ) as Record<(typeof activityData)[number]["key"], Activity>;

  const currentScale = timeScales[timeScale];
  const maxTimePoints = 24 * currentScale.multiplier;
  const [timePoints, setTimePoints] = useState(maxTimePoints);

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);

  const [initialAge, setInitalAge] = useState(initialPlayerAge);
  const [initialLifespan, setInitalLifespan] = useState(initialPlayerLifespan);
  const [age, setAge] = useState(initialAge);
  const [lifespan, setLifespan] = useState(initialLifespan);
  const [playerHp, setPlayerHp] = useState(initialPlayerHp);
  const [playerSatiety, setPlayerSatiety] = useState(initialPlayerSatiety);
  const [playerMortality, setPlayerMortality] = useState(
    initialPlayerMortality
  );
  const [playerMoney, setPlayerMoney] = useState(initialPlayerMoney);

  const [navigationUnlockState, setNavigationUnlockState] =
    useState<NavigationUnlockState>(initialNavigationUnlockState);

  const [dailyIncome, setDailyIncome] = useState(0);
  const [dailyExpenses, setDailyExpenses] = useState(0);

  const [activityCategoriesUnlockState, setActivityCategoriesUnlockState] =
    useState<ActivityUnlockState>(initialActivityCategoriesUnlockState);

  // unlock a single tab
  const unlockNavigationTab = (tab: NavigationItem) => {
    setNavigationUnlockState((prev) => ({
      ...prev,
      [tab]: true,
    }));
  };

  const [selectedLocation, setSelectedLocation] = useState("Eastern Continent");

  const [allocatedActivities, setAllocatedActivities] = useState<
    Record<ActivityKeys, number>
  >({
    beg: 0,
    liftWeights: 0,
  });

  const allocateActivity = (activityKey: ActivityKeys, delta: number) => {
    if (timePoints - delta * activityMap[activityKey].timeCost >= 0) {
      setAllocatedActivities((prev) => ({
        ...prev,
        [activityKey]:
          (prev[activityKey] || 0) + delta * activityMap[activityKey].timeCost,
      }));
      setTimePoints((prev) => prev - delta * activityMap[activityKey].timeCost);
    }
  };

  const [activityQueue, setActivityQueue] = useState<ActivityModel[]>([]);

  const enqueueActivities = (activity: ActivityModel) => {
    setActivityQueue((prevQueue) => [...prevQueue, activity]);
  };

  const dequeueActivity = () => {
    setActivityQueue((prevQueue) => prevQueue.slice(1));
  };

  const [stats, setStats] = useState<Record<Stats, number>>({
    Dexterity: 0,
    Strength: 0,
  });

  function useGameClock(ticksPerSecond = 24, gameSpeed = 1) {
    const [time, setTime] = useState(0); // total ticks
    const [running, setRunning] = useState(false);

    useEffect(() => {
      if (!running) return;

      const interval = 1000 / (ticksPerSecond * gameSpeed); // ms per tick with speed multiplier
      const id = setInterval(() => setTime((t) => t + 1), interval);

      return () => clearInterval(id);
    }, [running, ticksPerSecond, gameSpeed]);

    const start = () => setRunning(true);
    const pause = () => setRunning(false);

    return { time, start, pause };
  }

  const { time, start, pause } = useGameClock(1000, gameSpeed);

  useEffect(() => {
    if (isPlaying) start();
    else pause();
  }, [isPlaying, start, pause]);

  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [repeatActivities, setRepeatActivities] = useState(true);

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
        allocateActivity,
        stats,
        setStats,
        age,
        repeatActivities,
        setRepeatActivities,
        time,
        start,
        pause,
        dailyExpenses,
        dailyIncome,
        playerMoney,
        playerHp,
        playerSatiety,
        playerMortality,
        lifespan,
        selectedTimeScale,
        setSelectedTimeScale,
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        selectedEra,
        setSelectedEra,
        selectedDecade,
        navigationUnlockState,
        unlockNavigationTab,
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
        selectedLocation,
        setSelectedLocation,
        activityCategoriesUnlockState,
        allocatedActivities,
        setAllocatedActivities,
        showDetailedView,
        setShowDetailedView,
        selectedDate,
        setSelectedDate,
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
