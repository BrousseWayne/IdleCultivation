import { create } from "zustand";
import type {
  Background,
  GamePhase,
  IncomeBufferItem,
  LogEntry,
  StreamTheme,
} from "@/game/types/domain";
import { initialPhase } from "@/game/data/constant";
import { formatNumber } from "@/game/utils/formatNumber";
import { STARTING_PLACE } from "@/game/data/places";

interface GameState {
  ticks: number;
  day: number;
  isPlaying: boolean;
  gameSpeed: number;
  introComplete: boolean;
  runBackground: Background | null;
  phase: GamePhase;

  maxTimePoints: number;

  selectedYear: number;
  selectedMonth: number;

  currentPlaceKey: string;
  streamLog: LogEntry[];
  logBuffer: IncomeBufferItem[];
  logBufferDay: number;
  selectedDate: number | null;
  showDetailedView: boolean;

  startRun: (background: Background) => void;
  reset: () => void;

  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;

  setCurrentPlace: (placeKey: string) => void;
  pushLog: (entry: LogEntry) => void;
  pushIncome: (gain: Omit<IncomeBufferItem, "count">, day: number) => void;
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
  selectedYear: 1,
  selectedMonth: 1,
  currentPlaceKey: STARTING_PLACE,
  streamLog: [] as LogEntry[],
  logBuffer: [] as IncomeBufferItem[],
  logBufferDay: 0,
  selectedDate: null as number | null,
  showDetailedView: false,
});

export function mergeIncome(
  base: IncomeBufferItem,
  addition: IncomeBufferItem,
): IncomeBufferItem {
  const stats = { ...(base.stats ?? {}) };
  for (const [stat, amount] of Object.entries(addition.stats ?? {})) {
    const key = stat as keyof typeof stats;
    stats[key] = (stats[key] ?? 0) + amount;
  }
  return {
    source: base.source,
    count: base.count + addition.count,
    coin: base.coin + addition.coin,
    stats,
  };
}

export function formatIncomeEntry(item: IncomeBufferItem): LogEntry {
  const times = item.count > 1 ? ` ×${item.count}` : "";
  const parts: string[] = [];
  if (item.coin > 0) parts.push(`earned ${formatNumber(item.coin)} copper`);
  for (const [stat, amount] of Object.entries(item.stats ?? {})) {
    parts.push(`+${formatNumber(amount)} ${stat}`);
  }
  return {
    text: `${item.source}${times} · ${parts.join(" · ")}.`,
    theme: "income",
    key: `income:${item.source}`,
    income: item,
  };
}

// streamLog with any buffered income dumped at the end, capped.
function flushedLog(state: {
  streamLog: LogEntry[];
  logBuffer: IncomeBufferItem[];
}): LogEntry[] {
  const log = state.logBuffer.length
    ? [...state.streamLog, ...state.logBuffer.map(formatIncomeEntry)]
    : state.streamLog;
  return log.length > 200 ? log.slice(-200) : log;
}

export const useGameStore = create<GameState>((set) => ({
  ...createInitialGameState(),

  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),

  setCurrentPlace: (placeKey) => set({ currentPlaceKey: placeKey }),
  // narrative beats dump the pending income block first, preserving chronology
  pushLog: (entry) =>
    set((state) => {
      const log = [...flushedLog(state), entry];
      return {
        streamLog: log.length > 200 ? log.slice(-200) : log,
        logBuffer: [],
      };
    }),
  pushIncome: (gain, day) =>
    set((state) => {
      const item: IncomeBufferItem = { ...gain, count: 1 };
      if (state.logBuffer.length > 0 && state.logBufferDay !== day) {
        return {
          streamLog: flushedLog(state),
          logBuffer: [item],
          logBufferDay: day,
        };
      }
      const existing = state.logBuffer.find((buffered) => buffered.source === item.source);
      const logBuffer = existing
        ? state.logBuffer.map((buffered) =>
            buffered.source === item.source ? mergeIncome(buffered, item) : buffered,
          )
        : [...state.logBuffer, item];
      return { logBuffer, logBufferDay: day };
    }),
  addEventLog: (text, theme = "ambient") =>
    set((state) => {
      const log = [...flushedLog(state), { text, theme } as LogEntry];
      return {
        streamLog: log.length > 200 ? log.slice(-200) : log,
        logBuffer: [],
      };
    }),
  clearLog: () => set({ streamLog: [], logBuffer: [] }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setShowDetailedView: (show) => set({ showDetailedView: show }),

  startRun: (background) => {
    set({ introComplete: true, runBackground: background });
  },

  reset: () => {
    set({ ...createInitialGameState() });
  },
}));
