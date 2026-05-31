import { create } from "zustand";
import {
  ALL_CATEGORIES,
  type Background,
  type GamePhase,
  type NavigationItem,
  type NavigationUnlockState,
} from "@/game/types/domain";
import type { ActivityUnlockState } from "@/game/types/states";
import { initialNavigationUnlockState, initialPhase } from "@/game/data/constant";
import { INITIALLY_UNLOCKED } from "@/game/data/activity";
import { STARTING_PLACE } from "@/game/data/places";

type TimeScale = "day" | "week" | "month";
type CalendarView = "month" | "year" | "decade" | "era";

export const TIME_SCALES = {
  day: { label: "Day", multiplier: 1, unit: "day" },
  week: { label: "Week", multiplier: 7, unit: "week" },
  month: { label: "Month", multiplier: 30, unit: "month" },
} as const;

const createInitialActivityUnlockState = (): ActivityUnlockState => {
  const state = {} as ActivityUnlockState;
  for (const category of ALL_CATEGORIES) {
    state[category] = INITIALLY_UNLOCKED.includes(category);
  }
  return state;
};

interface GameState {
  ticks: number;
  day: number;
  isPlaying: boolean;
  gameSpeed: number;
  introComplete: boolean;
  runBackground: Background | null;
  phase: GamePhase;

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

  currentPlaceKey: string;
  eventLog: string[];
  selectedDate: number | null;
  showDetailedView: boolean;

  startRun: (background: Background) => void;
  reset: () => void;

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
    category: (typeof ALL_CATEGORIES)[number]
  ) => void;

  setCurrentPlace: (placeKey: string) => void;
  addEventLog: (entry: string) => void;
  setEventLog: (entries: string[]) => void;
  setSelectedDate: (date: number | null) => void;
  setShowDetailedView: (show: boolean) => void;

  getTimeScaleConfig: () => (typeof TIME_SCALES)[TimeScale];
}

const createInitialGameState = () => ({
  ticks: 0,
  day: 0,
  isPlaying: false,
  gameSpeed: 1,
  introComplete: false,
  runBackground: null as Background | null,
  phase: initialPhase,
  timeScale: "day" as TimeScale,
  timePoints: 24,
  maxTimePoints: 24,
  selectedTimeScale: "Day",
  selectedYear: 1,
  selectedMonth: 1,
  selectedEra: 1,
  selectedDecade: 1,
  calendarView: "month" as CalendarView,
  navigationUnlocks: initialNavigationUnlockState,
  activityCategoryUnlocks: createInitialActivityUnlockState(),
  currentPlaceKey: STARTING_PLACE,
  eventLog: [] as string[],
  selectedDate: null as number | null,
  showDetailedView: false,
});

export const useGameStore = create<GameState>((set, get) => ({
  ...createInitialGameState(),

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

  setCurrentPlace: (placeKey) => set({ currentPlaceKey: placeKey }),
  addEventLog: (entry) =>
    set((state) => {
      const log = [...state.eventLog, entry];
      return { eventLog: log.length > 200 ? log.slice(-200) : log };
    }),
  setEventLog: (entries) => set({ eventLog: entries }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setShowDetailedView: (show) => set({ showDetailedView: show }),

  getTimeScaleConfig: () => TIME_SCALES[get().timeScale],

  startRun: (background) => {
    set({ introComplete: true, runBackground: background });
  },

  reset: () => {
    set({ ...createInitialGameState() });
  },
}));
