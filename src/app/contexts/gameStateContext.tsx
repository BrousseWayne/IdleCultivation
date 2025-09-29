import { useEffect, useRef, useState } from "react";
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
import { useActivityQueue } from "../hooks/useActivityQueue";
import { useGameClock } from "../hooks/useGameClock";
import { usePlayerState } from "../hooks/usePlayerState";

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
  ticks: number;
  day: number;
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

function useActivityExecutor(
  ticks: number,
  running: boolean,
  activityQueue: ActivityModel[],
  dequeueActivity: () => void,
  onQueueEmpty?: () => void,
  deallocateActivity: () => void,
  applyActivityReward: () => void
) {
  const startTickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running || activityQueue.length === 0) return;

    const currentActivity = activityQueue[0];

    if (startTickRef.current === null) {
      startTickRef.current = ticks;
    }

    if (ticks - startTickRef.current >= currentActivity.timeCost) {
      dequeueActivity();
      deallocateActivity();
      applyActivityReward();
      console.log(currentActivity.reward);
      startTickRef.current = null;

      if (activityQueue.length === 1 && onQueueEmpty) {
        onQueueEmpty();
      }
    }
  }, [
    ticks,
    running,
    activityQueue,
    dequeueActivity,
    onQueueEmpty,
    deallocateActivity,
    applyActivityReward,
  ]);
}

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

  const playerState = usePlayerState();

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

  function applyActivityReward(reward) {
    if ("currency" in reward) {
      console.log(reward.amount);
      playerState.setPlayerMoney((prev) => prev + reward.amount);
    }
    //   } else if ("stat" in reward) {
    //     setStats((prev) => ({
    //       ...prev,
    //       [reward.stat]: (prev[reward.stat] || 0) + reward.amount,
    //     }));
    //   }
    // }
  }

  const [selectedLocation, setSelectedLocation] = useState("Eastern Continent");

  const [allocatedActivities, setAllocatedActivities] = useState<
    Record<ActivityKeys, number>
  >({
    beg: 0,
    liftWeights: 0,
  });

  const allocateActivity = (activityKey: ActivityKeys, delta: number) => {
    const realTimeCost = delta * activityMap[activityKey].timeCost;
    if (timePoints - realTimeCost >= 0) {
      setAllocatedActivities((prev) => ({
        ...prev,
        [activityKey]: (prev[activityKey] || 0) + realTimeCost,
      }));
      setTimePoints((prev) => prev - realTimeCost);

      enqueueActivity(activityMap[activityKey]);
    }
  };

  const { activityQueue, enqueueActivity, dequeueActivity } =
    useActivityQueue();

  const [stats, setStats] = useState<Record<Stats, number>>({
    Dexterity: 0,
    Strength: 0,
  });

  const { ticks, start, pause, day, running } = useGameClock(24);

  useEffect(() => {
    if (isPlaying) start();
    else pause();
  }, [isPlaying, start, pause]);

  useActivityExecutor(
    ticks,
    running,
    activityQueue,
    dequeueActivity,
    () => {
      console.log("All activities done");
      setIsPlaying(false);
      pause();
    },
    () =>
      setAllocatedActivities((prev) => ({
        ...prev,
        [activityQueue[0].key]:
          (prev[activityQueue[0].key] || 0) - activityQueue[0].timeCost,
      })),
    () => {
      applyActivityReward(activityQueue[0].reward);
    }
  );

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
        day,
        stats,
        setStats,
        repeatActivities,
        setRepeatActivities,
        ticks,
        start,
        pause,
        dailyExpenses,
        dailyIncome,
        ...playerState,
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
