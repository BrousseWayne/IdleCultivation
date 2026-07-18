import type { GameEventDefinition, EventStep, EventChoice } from "@/game/types/gameEvents";
import type { Effect } from "@/game/types/effects";
import { eventData } from "@/game/data/events";
import { CHANCE_PROBABILITY } from "@/game/data/balance";
import { useEventStore } from "@/game/stores/eventStore";
import { useGameStore } from "@/game/stores/gameStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { UnlockEvaluator } from "@/game/services/UnlockEvaluator";
import { EffectExecutor } from "@/game/services/EffectExecutor";
import { gameLoop } from "@/game/engine/gameLoop";
import { periodLengthInDays } from "@/game/engine/time";
import { rng } from "@/game/engine/rng";

const definitionsByKey = new Map<string, GameEventDefinition>(
  eventData.map((definition) => [definition.key, definition])
);

function isEligible(definition: GameEventDefinition, day: number): boolean {
  const eventState = useEventStore.getState();

  switch (definition.recurrence.type) {
    case "once":
      if (eventState.fired[definition.key]) return false;
      break;
    case "cooldown":
      if (day < (eventState.cooldownUntil[definition.key] ?? 0)) return false;
      break;
    case "calendar": {
      const periodLength = periodLengthInDays(definition.recurrence.every);
      if (day % periodLength !== definition.recurrence.day % periodLength) return false;
      if (eventState.lastCalendarFired[definition.key] === day) return false;
      break;
    }
  }

  if (definition.placeKey && useGameStore.getState().currentPlaceKey !== definition.placeKey) {
    return false;
  }
  return UnlockEvaluator.evaluate(definition.conditions);
}

function passesChance(definition: GameEventDefinition): boolean {
  return !definition.chance || rng.roll(CHANCE_PROBABILITY[definition.chance]);
}

// Recurrence is consumed when the event takes stage (not on resolution), so a
// reload mid-event can never re-farm a once/cooldown event.
function markRecurrence(definition: GameEventDefinition, day: number): void {
  const eventState = useEventStore.getState();
  switch (definition.recurrence.type) {
    case "once":
      eventState.markFired(definition.key);
      break;
    case "cooldown":
      eventState.setCooldown(definition.key, day + definition.recurrence.days);
      break;
    case "calendar":
      eventState.markCalendarFired(definition.key, day);
      break;
  }
}

function pushStepText(step: EventStep): void {
  const game = useGameStore.getState();
  if (step.speaker) {
    game.pushLog({ text: step.text, theme: "dialogue", tone: "npc", speaker: step.speaker });
  } else {
    game.pushLog({ text: step.text, theme: "event" });
  }
}

function enterStep(definition: GameEventDefinition, stepId: string): void {
  const step = definition.steps[stepId];
  if (!step) {
    resolve();
    return;
  }
  pushStepText(step);
  if (step.effects?.length) EffectExecutor.execute(step.effects);
  if (!step.choices?.length) {
    resolve();
  } else {
    useEventStore.getState().setActiveStep(stepId);
  }
}

function resolve(): void {
  const eventState = useEventStore.getState();
  const shouldResume = eventState.resumeOnResolve;
  eventState.clearActive();
  if (shouldResume) gameLoop.start();
}

function fire(definition: GameEventDefinition, day: number): void {
  markRecurrence(definition, day);

  // ambient = pure stream texture, never takes stage, never pauses
  if (definition.kind === "ambient") {
    pushStepText(definition.steps[definition.entry]);
    return;
  }

  const wasRunning = gameLoop.running;
  gameLoop.stop();
  useEventStore.getState().setActive({ key: definition.key, stepId: definition.entry }, wasRunning);
  enterStep(definition, definition.entry);
}

// --- engine hooks -----------------------------------------------------------

export function rollDailyEvents(day: number): void {
  if (useEventStore.getState().active) return;

  for (const definition of eventData) {
    if (definition.kind !== "interrupt") continue;
    if (isEligible(definition, day) && passesChance(definition)) {
      fire(definition, day);
      return; // one interactive event at a time
    }
  }

  for (const definition of eventData) {
    if (definition.kind !== "ambient") continue;
    if (isEligible(definition, day) && passesChance(definition)) {
      fire(definition, day);
      return; // at most one ambient line per day
    }
  }
}

export function rollActivityOutcome(activityKey: string): void {
  if (useEventStore.getState().active) return;
  const day = useGameStore.getState().day;
  for (const definition of eventData) {
    if (definition.kind !== "activityOutcome" || definition.activityKey !== activityKey) continue;
    if (isEligible(definition, day) && passesChance(definition)) {
      fire(definition, day);
      return;
    }
  }
}

// Returns true when a dialogue took stage (the place action is consumed by it).
export function openDialogueFor(actionKey: string): boolean {
  if (useEventStore.getState().active) return false;
  const day = useGameStore.getState().day;
  for (const definition of eventData) {
    if (definition.kind !== "dialogue" || definition.actionKey !== actionKey) continue;
    if (isEligible(definition, day)) {
      fire(definition, day);
      return true;
    }
  }
  return false;
}

// --- UI surface -------------------------------------------------------------

export function getActiveEvent(): { definition: GameEventDefinition; step: EventStep } | null {
  const active = useEventStore.getState().active;
  if (!active) return null;
  const definition = definitionsByKey.get(active.key);
  const step = definition?.steps[active.stepId];
  return definition && step ? { definition, step } : null;
}

export function choiceCost(costs: readonly Effect[] | undefined): number {
  return (costs ?? [])
    .filter((effect): effect is Extract<Effect, { type: "spend_currency" }> => effect.type === "spend_currency")
    .reduce((total, effect) => total + effect.amount, 0);
}

export function isChoiceAvailable(choice: EventChoice): boolean {
  if (choice.requires && !UnlockEvaluator.evaluate(choice.requires)) return false;
  return choiceCost(choice.costs) <= useInventoryStore.getState().currency;
}

export function chooseOption(index: number): void {
  const activeEvent = getActiveEvent();
  if (!activeEvent) return;
  const choice = activeEvent.step.choices?.[index];
  if (!choice || !isChoiceAvailable(choice)) return;

  if (choice.costs?.length) EffectExecutor.execute(choice.costs);
  if (choice.effects?.length) EffectExecutor.execute(choice.effects);

  if (choice.goto && activeEvent.definition.steps[choice.goto]) {
    enterStep(activeEvent.definition, choice.goto);
    return;
  }
  resolve();
}
