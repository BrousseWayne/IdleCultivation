import { create } from "zustand";
import type {
  NavigationItem,
  NavigationUnlockState,
  ALL_CATEGORIES,
} from "../types/domain";
import type { ActivityUnlockState } from "../types/states";
import { initialNavigationUnlockState } from "../data/constant";
import { INITIALLY_UNLOCKED } from "../data/activity";
import { EventBus } from "../services";

type TimeScale = "day" | "week" | "month";
type CalendarView = "month" | "year" | "decade" | "era";

const TIME_SCALES = {
  day: { label: "Day", multiplier: 1, unit: "day" },
  week: { label: "Week", multiplier: 7, unit: "week" },
  month: { label: "Month", multiplier: 30, unit: "month" },
} as const;

const ALL_ACTIVITY_CATEGORIES = [
  "work",
  "training",
  "study",
  "social",
  "life",
  "hobby",
  "adventure",
] as const;

const createInitialActivityUnlockState = (): ActivityUnlockState => {
  const state = {} as ActivityUnlockState;
  for (const category of ALL_ACTIVITY_CATEGORIES) {
    state[category] = INITIALLY_UNLOCKED.includes(category);
  }
  return state;
};

interface GameState {
  ticks: number;
  day: number;
  isPlaying: boolean;
  gameSpeed: number;
  intervalId: ReturnType<typeof setInterval> | null;

  timeScale: TimeScale;
  timePoints: number;
  maxTimePoints: number;

  selectedTimeScale: string;
  selectedYear: number;
  selectedMonth: number;
  selectedEra: number;
  selectedDecade: number;
  calendarView: CalendarView;

  navigationUnlocks: NavigationUnlockState;
  activityCategoryUnlocks: ActivityUnlockState;

  exploreView: string;
  currentExploreLocation: string;
  eventLog: string[];
  selectedDate: number | null;
  showDetailedView: boolean;

  startGameLoop: () => void;
  stopGameLoop: () => void;
  tick: () => void;
  setGameSpeed: (speed: number) => void;

  setTimeScale: (scale: TimeScale) => void;
  allocateTime: (amount: number) => void;
  deallocateTime: (amount: number) => void;
  resetTimePoints: () => void;

  setSelectedTimeScale: (scale: string) => void;
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedEra: (era: number) => void;
  setSelectedDecade: (decade: number) => void;
  setCalendarView: (view: CalendarView) => void;

  unlockNavigationTab: (tab: NavigationItem) => void;
  unlockActivityCategory: (
    category: (typeof ALL_ACTIVITY_CATEGORIES)[number]
  ) => void;

  setExploreView: (view: string) => void;
  setCurrentExploreLocation: (location: string) => void;
  addEventLog: (entry: string) => void;
  setEventLog: (entries: string[]) => void;
  setSelectedDate: (date: number | null) => void;
  setShowDetailedView: (show: boolean) => void;

  getTimeScaleConfig: () => (typeof TIME_SCALES)[TimeScale];
}

export const useGameStore = create<GameState>((set, get) => ({
  ticks: 0,
  day: 0,
  isPlaying: false,
  gameSpeed: 1,
  intervalId: null,

  timeScale: "day",
  timePoints: 24,
  maxTimePoints: 24,

  selectedTimeScale: "Day",
  selectedYear: 1,
  selectedMonth: 1,
  selectedEra: 1,
  selectedDecade: 1,
  calendarView: "month",

  navigationUnlocks: initialNavigationUnlockState,
  activityCategoryUnlocks: createInitialActivityUnlockState(),

  exploreView: "main",
  currentExploreLocation: "Whispering Forest",
  eventLog: [
    "You arrive at the Whispering Forest. The ancient trees seem to watch your every move.",
    "A gentle breeze carries the scent of medicinal herbs through the air.",
  ],
  selectedDate: null,
  showDetailedView: false,

  startGameLoop: () => {
    const { intervalId, gameSpeed } = get();
    if (intervalId !== null) return;

    const ticksPerSecond = 24;
    const interval = 1000 / (ticksPerSecond * gameSpeed);

    const id = setInterval(() => {
      get().tick();
    }, interval);

    set({ intervalId: id, isPlaying: true });
  },

  stopGameLoop: () => {
    const { intervalId } = get();
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    set({ intervalId: null, isPlaying: false });
  },

  tick: () => {
    set((state) => {
      const nextTicks = state.ticks + 1;
      const newDay = nextTicks % 24 === 0 ? state.day + 1 : state.day;

      EventBus.emit({
        type: "game:tick",
        payload: { ticks: nextTicks, day: newDay },
      });

      return { ticks: nextTicks, day: newDay };
    });
  },

  setGameSpeed: (speed) => {
    const { isPlaying, intervalId } = get();
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    if (isPlaying) {
      const ticksPerSecond = 24;
      const interval = 1000 / (ticksPerSecond * speed);
      const id = setInterval(() => {
        get().tick();
      }, interval);
      set({ gameSpeed: speed, intervalId: id });
    } else {
      set({ gameSpeed: speed });
    }
  },

  setTimeScale: (scale) => {
    const newMax = 24 * TIME_SCALES[scale].multiplier;
    set({
      timeScale: scale,
      maxTimePoints: newMax,
      timePoints: newMax,
    });
  },

  allocateTime: (amount) =>
    set((state) => ({
      timePoints: Math.max(0, state.timePoints - amount),
    })),

  deallocateTime: (amount) =>
    set((state) => ({
      timePoints: Math.min(state.maxTimePoints, state.timePoints + amount),
    })),

  resetTimePoints: () =>
    set((state) => ({
      timePoints: state.maxTimePoints,
    })),

  setSelectedTimeScale: (scale) => set({ selectedTimeScale: scale }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedEra: (era) => set({ selectedEra: era }),
  setSelectedDecade: (decade) => set({ selectedDecade: decade }),
  setCalendarView: (view) => set({ calendarView: view }),

  unlockNavigationTab: (tab) =>
    set((state) => ({
      navigationUnlocks: {
        ...state.navigationUnlocks,
        [tab]: true,
      },
    })),

  unlockActivityCategory: (category) =>
    set((state) => ({
      activityCategoryUnlocks: {
        ...state.activityCategoryUnlocks,
        [category]: true,
      },
    })),

  setExploreView: (view) => set({ exploreView: view }),
  setCurrentExploreLocation: (location) =>
    set({ currentExploreLocation: location }),
  addEventLog: (entry) =>
    set((state) => ({ eventLog: [...state.eventLog, entry] })),
  setEventLog: (entries) => set({ eventLog: entries }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setShowDetailedView: (show) => set({ showDetailedView: show }),

  getTimeScaleConfig: () => TIME_SCALES[get().timeScale],
}));
