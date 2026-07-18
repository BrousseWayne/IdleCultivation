import { EventBus } from "@/game/services/EventBus";
import { UnlockEvaluator } from "@/game/services/UnlockEvaluator";
import { SaveManager } from "@/game/services/SaveManager";
import { EntityRegistry } from "@/game/services/EntityRegistry";
import { useGameStore } from "@/game/stores/gameStore";
import { useUnlockStore } from "@/game/stores/unlockStore";
import { useNotificationStore } from "@/game/stores/notificationStore";
import { allUnlockables } from "@/game/data/unlocks";
import { getPlace } from "@/game/data/places";
import type { UnlockableDefinition } from "@/game/types/domain";

// The single place an unlock takes effect. Idempotent: a definition that
// re-fires (e.g. after a save load re-satisfies its conditions) is a no-op,
// so the announcement only ever plays once.
function applyUnlock(definition: UnlockableDefinition): void {
  const unlocks = useUnlockStore.getState();

  switch (definition.type) {
    case "activity": {
      if (unlocks.activities[definition.target]) return;
      unlocks.unlockActivity(definition.target);
      const name = EntityRegistry.get("activity", definition.target)?.name ?? definition.target;
      announce(`A new pursuit is within reach: ${name}.`);
      break;
    }
    case "activity_category": {
      if (unlocks.categories[definition.target]) return;
      unlocks.unlockCategory(definition.target);
      announce(`A new path opens before you: ${definition.target}.`);
      break;
    }
    case "place": {
      if (unlocks.places[definition.target]) return;
      unlocks.unlockPlace(definition.target);
      const name = getPlace(definition.target)?.name ?? definition.target;
      announce(`The city yields another of its corners: ${name}.`);
      break;
    }
    case "navigation_tab": {
      if (unlocks.navigation[definition.target]) return;
      unlocks.unlockNavigation(definition.target);
      announce(`Your perception widens: ${definition.target}.`);
      break;
    }
  }
}

function announce(text: string): void {
  useGameStore.getState().pushLog({ text, theme: "event" });
}

// Registers every condition-gated unlockable with the evaluator. Called at
// boot and again after reincarnation (the evaluator self-cleans fired entries).
export function registerUnlockables() {
  for (const definition of allUnlockables()) {
    UnlockEvaluator.registerUnlockable({
      id: definition.id,
      unlockConditions: definition.unlockConditions,
      onUnlock: () => applyUnlock(definition),
    });
  }
}

export function initializeGameEventListeners() {
  registerUnlockables();

  EventBus.on("activity:completed", () => {
    UnlockEvaluator.checkAll();
  });

  EventBus.on("cultivator:stat-changed", () => {
    UnlockEvaluator.checkAll();
  });

  EventBus.on("inventory:currency-changed", () => {
    UnlockEvaluator.checkAll();
  });

  EventBus.on("notification:push", ({ payload }) => {
    useNotificationStore.getState().push(payload.message, payload.notificationType);
  });

  EventBus.on("cultivator:reincarnated", () => {
    SaveManager.clearSave();
    UnlockEvaluator.clear();
    registerUnlockables();
  });
}
