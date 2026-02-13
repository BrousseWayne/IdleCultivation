import { useCultivatorStore } from "../stores/cultivatorStore";
import { useGameStore } from "../stores/gameStore";
import { useActivityStore } from "../stores/activityStore";
import { useInventoryStore } from "../stores/inventoryStore";
import { EntityRegistry } from "./EntityRegistry";
import type { Activity } from "../types/domain";

const SAVE_KEY = "cultivation-save";
const SAVE_VERSION = 1;
const AUTO_SAVE_INTERVAL = 30_000;

class SaveManagerService {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  private snapshot() {
    const cultivator = useCultivatorStore.getState();
    const game = useGameStore.getState();
    const activity = useActivityStore.getState();
    const inventory = useInventoryStore.getState();

    return {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      cultivator: {
        age: cultivator.age,
        lifespan: cultivator.lifespan,
        vitality: cultivator.vitality,
        satiety: cultivator.satiety,
        mortality: cultivator.mortality,
        stats: cultivator.stats,
      },
      game: {
        ticks: game.ticks,
        day: game.day,
        gameSpeed: game.gameSpeed,
        timeScale: game.timeScale,
        timePoints: game.timePoints,
        maxTimePoints: game.maxTimePoints,
        selectedTimeScale: game.selectedTimeScale,
        selectedYear: game.selectedYear,
        selectedMonth: game.selectedMonth,
        selectedEra: game.selectedEra,
        selectedDecade: game.selectedDecade,
        calendarView: game.calendarView,
        navigationUnlocks: game.navigationUnlocks,
        activityCategoryUnlocks: game.activityCategoryUnlocks,
        exploreView: game.exploreView,
        currentExploreLocation: game.currentExploreLocation,
        eventLog: game.eventLog,
        selectedDate: game.selectedDate,
        showDetailedView: game.showDetailedView,
      },
      activity: {
        activityQueueKeys: activity.activityQueue.map((a) => a.key),
        allocatedActivities: activity.allocatedActivities,
        completionCounts: activity.completionCounts,
        repeatActivities: activity.repeatActivities,
        selectedLocation: activity.selectedLocation,
      },
      inventory: {
        spiritStones: inventory.spiritStones,
        inventoryItems: inventory.inventoryItems,
        equippedItems: inventory.equippedItems,
        dailyExpenses: inventory.dailyExpenses,
        dailyIncome: inventory.dailyIncome,
      },
    };
  }

  private restore(data: Record<string, unknown>): void {
    if (!data?.version) return;

    useGameStore.getState().stopGameLoop();

    if (data.cultivator) {
      useCultivatorStore.setState(data.cultivator as Partial<ReturnType<typeof useCultivatorStore.getState>>);
    }

    if (data.game) {
      useGameStore.setState(data.game as Partial<ReturnType<typeof useGameStore.getState>>);
    }

    if (data.activity) {
      const { activityQueueKeys, ...rest } = data.activity as Record<string, unknown>;
      const activityQueue = ((activityQueueKeys as string[]) || [])
        .map((key) => EntityRegistry.get("activity", key))
        .filter((a): a is Activity => a !== undefined);
      useActivityStore.setState({ ...rest, activityQueue } as Partial<ReturnType<typeof useActivityStore.getState>>);
    }

    if (data.inventory) {
      useInventoryStore.setState(data.inventory as Partial<ReturnType<typeof useInventoryStore.getState>>);
    }
  }

  save(): void {
    localStorage.setItem(SAVE_KEY, JSON.stringify(this.snapshot()));
  }

  load(): void {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    this.restore(JSON.parse(raw));
  }

  exportSave(): string {
    return JSON.stringify(this.snapshot());
  }

  importSave(json: string): void {
    const data = JSON.parse(json);
    if (!data.version) throw new Error("Invalid save format");
    this.restore(data);
    this.save();
  }

  wipeSave(): void {
    useGameStore.getState().stopGameLoop();
    localStorage.removeItem(SAVE_KEY);
    window.location.reload();
  }

  startAutoSave(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.save(), AUTO_SAVE_INTERVAL);
  }

  stopAutoSave(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const SaveManager = new SaveManagerService();
