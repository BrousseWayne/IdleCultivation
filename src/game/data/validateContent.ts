import type { UnlockCondition } from "@/game/types/unlocks";
import type { Effect } from "@/game/types/effects";
import { activityData } from "@/game/data/activity";
import { places, STARTING_PLACE } from "@/game/data/places";
import { sidebarData } from "@/game/data/navigation";
import { allUnlockables } from "@/game/data/unlocks";
import { eventData } from "@/game/data/events";

// Dev-only content integrity check, run once at boot. Registry lookups fail
// silently at runtime (a typo'd key just makes content vanish) — this turns
// every dangling reference into an immediate, named error instead.
export function validateContent(): string[] {
  const errors: string[] = [];
  const activityKeys = new Set<string>(activityData.map((activity) => activity.key));
  const placeKeys = new Set<string>(places.map((place) => place.key));

  const duplicatesIn = (keys: string[]) =>
    keys.filter((key, index) => keys.indexOf(key) !== index);

  for (const key of duplicatesIn(activityData.map((activity) => activity.key)))
    errors.push(`duplicate activity key "${key}"`);
  for (const key of duplicatesIn(places.map((place) => place.key)))
    errors.push(`duplicate place key "${key}"`);
  for (const key of duplicatesIn(sidebarData.map((navigation) => navigation.name)))
    errors.push(`duplicate navigation entry "${key}"`);
  for (const key of duplicatesIn(allUnlockables().map((unlockable) => unlockable.id)))
    errors.push(`duplicate unlockable id "${key}"`);

  if (!placeKeys.has(STARTING_PLACE))
    errors.push(`STARTING_PLACE "${STARTING_PLACE}" is not a known place`);

  for (const place of places) {
    for (const activityKey of place.activityKeys)
      if (!activityKeys.has(activityKey))
        errors.push(`place "${place.key}" references unknown activity "${activityKey}"`);
    for (const connectionKey of place.connections)
      if (!placeKeys.has(connectionKey))
        errors.push(`place "${place.key}" connects to unknown place "${connectionKey}"`);
    for (const key of duplicatesIn((place.actions ?? []).map((action) => action.key)))
      errors.push(`place "${place.key}" has duplicate action key "${key}"`);
  }

  const checkConditions = (owner: string, conditions: readonly UnlockCondition[]) => {
    for (const condition of conditions) {
      if (condition.type === "activity_completions" || condition.type === "activity_level") {
        if (!activityKeys.has(condition.activityKey))
          errors.push(`${owner} condition references unknown activity "${condition.activityKey}"`);
      } else if (condition.type === "and" || condition.type === "or") {
        checkConditions(owner, condition.conditions);
      }
    }
  };

  const checkEffects = (owner: string, effects: readonly Effect[] | undefined) => {
    for (const effect of effects ?? []) {
      if (effect.type === "unlock_activity" && !activityKeys.has(effect.key))
        errors.push(`${owner} effect unlocks unknown activity "${effect.key}"`);
      if (effect.type === "unlock_place" && !placeKeys.has(effect.key))
        errors.push(`${owner} effect unlocks unknown place "${effect.key}"`);
    }
  };

  for (const activity of activityData)
    checkEffects(`activity "${activity.key}"`, activity.effects);
  for (const place of places)
    for (const action of place.actions ?? [])
      checkEffects(`place "${place.key}" action "${action.key}"`, action.effects);

  for (const unlockable of allUnlockables()) {
    checkConditions(`unlockable "${unlockable.id}"`, unlockable.unlockConditions);
    if (unlockable.type === "activity" && !activityKeys.has(unlockable.target))
      errors.push(`unlockable "${unlockable.id}" targets unknown activity "${unlockable.target}"`);
    if (unlockable.type === "place" && !placeKeys.has(unlockable.target))
      errors.push(`unlockable "${unlockable.id}" targets unknown place "${unlockable.target}"`);
  }

  // --- narrative events -----------------------------------------------------
  const actionKeys = new Set<string>(places.flatMap((place) => (place.actions ?? []).map((action) => action.key)));
  for (const key of duplicatesIn(eventData.map((event) => event.key)))
    errors.push(`duplicate event key "${key}"`);

  for (const event of eventData) {
    const where = `event "${event.key}"`;
    checkConditions(where, event.conditions);

    const stepIds = new Set(Object.keys(event.steps));
    if (stepIds.size === 0) errors.push(`${where} has no steps`);
    if (!stepIds.has(event.entry))
      errors.push(`${where} entry step "${event.entry}" does not exist`);

    if (event.kind === "dialogue" && (!event.actionKey || !actionKeys.has(event.actionKey)))
      errors.push(`${where} (dialogue) needs an actionKey matching an existing place action`);
    if (event.kind === "activityOutcome" && (!event.activityKey || !activityKeys.has(event.activityKey)))
      errors.push(`${where} (activityOutcome) needs an activityKey matching an existing activity`);
    if (event.placeKey && !placeKeys.has(event.placeKey))
      errors.push(`${where} references unknown place "${event.placeKey}"`);

    if (event.kind === "ambient") {
      const onlyStep = event.steps[event.entry];
      if (stepIds.size !== 1 || onlyStep?.choices?.length || onlyStep?.effects?.length)
        errors.push(`${where} (ambient) must be a single terminal step with no effects`);
    }

    for (const [stepId, step] of Object.entries(event.steps)) {
      checkEffects(`${where} step "${stepId}"`, step.effects);
      for (const choice of step.choices ?? []) {
        if (choice.requires) checkConditions(`${where} step "${stepId}"`, choice.requires);
        checkEffects(`${where} step "${stepId}"`, choice.costs);
        checkEffects(`${where} step "${stepId}"`, choice.effects);
        if (choice.goto && !stepIds.has(choice.goto))
          errors.push(`${where} step "${stepId}" choice goes to unknown step "${choice.goto}"`);
      }
    }
  }

  return errors;
}
