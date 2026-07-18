import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useGameStore } from "@/game/stores/gameStore";
import { useActivityStore } from "@/game/stores/activityStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useUnlockStore } from "@/game/stores/unlockStore";
import { useEventStore } from "@/game/stores/eventStore";
import { rng } from "@/game/engine/rng";

// The declarative persistence manifest: every run-scoped store declares here
// WHAT it saves and HOW it restores. SaveManager and reincarnation both
// iterate this file — adding a store means adding one entry, and forgetting
// it is impossible to do silently.

const MAX_SAVED_STREAM_LOG = 200;

export type PersistedSection = {
  key: string;
  snapshot: () => object;
  restore: (saved: Record<string, unknown>) => void;
};

export const persistedSections: readonly PersistedSection[] = [
  {
    key: "cultivator",
    snapshot: () => {
      const state = useCultivatorStore.getState();
      return {
        age: state.age,
        lifespan: state.lifespan,
        vitality: state.vitality,
        satiety: state.satiety,
        mortality: state.mortality,
        stats: state.stats,
      };
    },
    restore: (saved) =>
      useCultivatorStore.setState(saved as Partial<ReturnType<typeof useCultivatorStore.getState>>),
  },
  {
    key: "game",
    snapshot: () => {
      const state = useGameStore.getState();
      return {
        ticks: state.ticks,
        day: state.day,
        gameSpeed: state.gameSpeed,
        introComplete: state.introComplete,
        runBackground: state.runBackground,
        maxTimePoints: state.maxTimePoints,
        selectedYear: state.selectedYear,
        selectedMonth: state.selectedMonth,
        currentPlaceKey: state.currentPlaceKey,
        streamLog: state.streamLog.slice(-MAX_SAVED_STREAM_LOG),
        selectedDate: state.selectedDate,
        showDetailedView: state.showDetailedView,
      };
    },
    restore: (saved) =>
      useGameStore.setState(saved as Partial<ReturnType<typeof useGameStore.getState>>),
  },
  {
    key: "activity",
    snapshot: () => {
      const state = useActivityStore.getState();
      return {
        queue: state.queue,
        runningTicks: state.runningTicks,
        scheduleIndex: state.scheduleIndex,
        completionCounts: state.completionCounts,
        activityXp: state.activityXp,
        repeatActivities: state.repeatActivities,
        selectedLocation: state.selectedLocation,
      };
    },
    restore: (saved) =>
      useActivityStore.setState(saved as Partial<ReturnType<typeof useActivityStore.getState>>),
  },
  {
    key: "inventory",
    snapshot: () => {
      const state = useInventoryStore.getState();
      return {
        currency: state.currency,
        inventoryItems: state.inventoryItems,
        equippedItems: state.equippedItems,
      };
    },
    restore: (saved) =>
      useInventoryStore.setState(saved as Partial<ReturnType<typeof useInventoryStore.getState>>),
  },
  {
    key: "unlocks",
    snapshot: () => {
      const state = useUnlockStore.getState();
      return {
        navigation: state.navigation,
        categories: state.categories,
        activities: state.activities,
        places: state.places,
      };
    },
    // merge saved flags OVER the initial state so content added after the
    // save was created keeps its data-defined defaults
    restore: (saved) => {
      const flags = saved as Partial<
        Record<"navigation" | "categories" | "activities" | "places", Record<string, boolean>>
      >;
      useUnlockStore.setState((state) => ({
        navigation: { ...state.navigation, ...(flags.navigation ?? {}) },
        categories: { ...state.categories, ...(flags.categories ?? {}) },
        activities: { ...state.activities, ...(flags.activities ?? {}) },
        places: { ...state.places, ...(flags.places ?? {}) },
      }));
    },
  },
  {
    key: "rng",
    snapshot: () => ({ state: rng.getState() }),
    restore: (saved) => {
      if (typeof saved.state === "number") rng.setState(saved.state);
    },
  },
  {
    key: "events",
    snapshot: () => {
      const state = useEventStore.getState();
      return {
        fired: state.fired,
        cooldownUntil: state.cooldownUntil,
        lastCalendarFired: state.lastCalendarFired,
        active: state.active,
        resumeOnResolve: state.resumeOnResolve,
      };
    },
    restore: (saved) =>
      useEventStore.setState(saved as Partial<ReturnType<typeof useEventStore.getState>>),
  },
];

// Every store a reincarnation wipes, in reset order (gameStore last so the
// fresh run flags land on an already-clean world). The dice are reseeded —
// a new life rolls new fortunes.
export function resetRunState(): void {
  rng.reseed(rng.freshSeed());
  useCultivatorStore.getState().reset();
  useActivityStore.getState().reset();
  useInventoryStore.getState().reset();
  useUnlockStore.getState().reset();
  useEventStore.getState().reset();
  useGameStore.getState().reset();
}
