import type { UnlockableDefinition } from "@/game/types/domain";
import { defineUnlockables } from "@/game/data/defineContent";
import { when } from "@/game/data/conditions";
import { activityData } from "@/game/data/activity";
import { sidebarData } from "@/game/data/navigation";
import { places } from "@/game/data/places";

// Unlockables that aren't tied to a single content entry (categories, and any
// future cross-cutting unlocks) are authored here. Per-activity and per-nav
// conditions live on the content itself and are folded in by allUnlockables().
// DECIDED 2026-07-18: `training` deliberately has NO unlockable — a narrative
// event from the generation batch opens it via unlock_category.
const standaloneUnlockables = defineUnlockables([
  {
    id: "category:study",
    type: "activity_category",
    target: "study",
    unlockConditions: [when.age(">=", 15)],
  },
  {
    id: "category:social",
    type: "activity_category",
    target: "social",
    unlockConditions: [when.stat("Strength", ">=", 20)],
  },
]);

// The complete unlockable pool, derived from content data — the single list
// the evaluator registers from. Adding gated content is just authoring its
// entry with `unlocked: false` + `unlockConditions`; nothing else to wire.
export function allUnlockables(): UnlockableDefinition[] {
  const fromActivities: UnlockableDefinition[] = activityData
    .filter((activity) => !activity.unlocked && activity.unlockConditions)
    .map((activity) => ({
      id: `activity:${activity.key}`,
      type: "activity",
      target: activity.key,
      unlockConditions: activity.unlockConditions!,
    }));

  const fromNavigation: UnlockableDefinition[] = sidebarData
    .filter((navigation) => !navigation.unlocked && navigation.unlockConditions)
    .map((navigation) => ({
      id: `navigation:${navigation.name}`,
      type: "navigation_tab",
      target: navigation.name,
      unlockConditions: navigation.unlockConditions!,
    }));

  const fromPlaces: UnlockableDefinition[] = places
    .filter((place) => !place.unlocked && place.unlockConditions)
    .map((place) => ({
      id: `place:${place.key}`,
      type: "place",
      target: place.key,
      unlockConditions: place.unlockConditions!,
    }));

  return [...standaloneUnlockables, ...fromActivities, ...fromNavigation, ...fromPlaces];
}
