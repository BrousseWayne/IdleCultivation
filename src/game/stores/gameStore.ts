import { create } from "zustand";
import {
  ALL_CATEGORIES,
  type Background,
  type GamePhase,
  type LogEntry,
  type NavigationItem,
  type NavigationUnlockState,
  type StreamTheme,
} from "@/game/types/domain";
import type { ActivityUnlockState } from "@/game/types/states";
import { initialNavigationUnlockState, initialPhase } from "@/game/data/constant";
import { INITIALLY_UNLOCKED } from "@/game/data/activity";
import { STARTING_PLACE } from "@/game/data/places";

type CalendarView = "month" | "year" | "decade" | "era";

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
  streamLog: LogEntry[];
  selectedDate: number | null;
  showDetailedView: boolean;

  startRun: (background: Background) => void;
  reset: () => void;


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
  pushLog: (entry: LogEntry) => void;
  addEventLog: (text: string, theme?: StreamTheme) => void;
  clearLog: () => void;
  setSelectedDate: (date: number | null) => void;
  setShowDetailedView: (show: boolean) => void;

}

const createInitialGameState = () => ({
  ticks: 0,
  day: 0,
  isPlaying: false,
  gameSpeed: 1,
  introComplete: false,
  runBackground: null as Background | null,
  phase: initialPhase,
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
  streamLog: [] as LogEntry[],
  selectedDate: null as number | null,
  showDetailedView: false,
});

export const useGameStore = create<GameState>((set) => ({
  ...createInitialGameState(),

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
  pushLog: (entry) =>
    set((state) => {
      const log = [...state.streamLog, entry];
      return { streamLog: log.length > 200 ? log.slice(-200) : log };
    }),
  addEventLog: (text, theme = "ambient") =>
    set((state) => {
      const log = [...state.streamLog, { text, theme } as LogEntry];
      return { streamLog: log.length > 200 ? log.slice(-200) : log };
    }),
  clearLog: () => set({ streamLog: [] }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setShowDetailedView: (show) => set({ showDetailedView: show }),

  startRun: (background) => {
    set({ introComplete: true, runBackground: background });
  },

  reset: () => {
    set({ ...createInitialGameState() });
  },
}));
