import { persistedSections } from "@/game/services/persistence";
import { gameLoop } from "@/game/engine/gameLoop";

// localStorage persistence, driven entirely by the persistence manifest —
// this module only owns versioning, migration, and the autosave timer.

const SAVE_KEY = "cultivation-save";
const SAVE_VERSION = 2; // v2: unlock state moved into its own store/section
const AUTO_SAVE_INTERVAL_MS = 30_000;

let autoSaveHandle: ReturnType<typeof setInterval> | null = null;

function snapshot(): Record<string, unknown> {
  const save: Record<string, unknown> = {
    version: SAVE_VERSION,
    timestamp: Date.now(),
  };
  for (const section of persistedSections) {
    save[section.key] = section.snapshot();
  }
  return save;
}

// v1 kept unlock state inside the game/activity sections
function migrateFromV1(data: Record<string, unknown>): void {
  const game = (data.game ?? {}) as Record<string, unknown>;
  const activity = (data.activity ?? {}) as Record<string, unknown>;
  data.unlocks = {
    navigation: game.navigationUnlocks,
    categories: game.activityCategoryUnlocks,
    activities: activity.unlockedActivities,
  };
  delete game.navigationUnlocks;
  delete game.activityCategoryUnlocks;
  delete activity.unlockedActivities;
}

function restore(data: Record<string, unknown>): void {
  if (!data?.version) return;

  gameLoop.stop();
  if (data.version === 1) migrateFromV1(data);

  for (const section of persistedSections) {
    const saved = data[section.key];
    if (saved) section.restore(saved as Record<string, unknown>);
  }
}

export const SaveManager = {
  save(): void {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot()));
    } catch (error) {
      console.error("[SaveManager] Save failed:", error);
    }
  },

  load(): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      restore(JSON.parse(raw));
    } catch (error) {
      console.error("[SaveManager] Load failed:", error);
    }
  },

  exportSave(): string {
    return JSON.stringify(snapshot());
  },

  importSave(json: string): void {
    const data = JSON.parse(json);
    if (!data.version) throw new Error("Invalid save format");
    restore(data);
    SaveManager.save();
  },

  clearSave(): void {
    localStorage.removeItem(SAVE_KEY);
  },

  wipeSave(): void {
    gameLoop.stop();
    localStorage.removeItem(SAVE_KEY);
    window.location.reload();
  },

  startAutoSave(): void {
    if (autoSaveHandle) return;
    autoSaveHandle = setInterval(() => SaveManager.save(), AUTO_SAVE_INTERVAL_MS);
  },

  stopAutoSave(): void {
    if (autoSaveHandle) {
      clearInterval(autoSaveHandle);
      autoSaveHandle = null;
    }
  },
};
