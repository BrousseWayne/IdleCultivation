import { useGameStore } from "@/game/stores/gameStore";
import { useActivityStore, totalUnits, unitKeyAt } from "@/game/stores/activityStore";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useEventStore } from "@/game/stores/eventStore";
import { rollDailyEvents, rollActivityOutcome, openDialogueFor } from "@/game/engine/events";
import { resetRunState } from "@/game/services/persistence";
import { rng } from "@/game/engine/rng";
import { TICKS_PER_SECOND, TICKS_PER_DAY, DAYS_PER_YEAR } from "@/game/engine/time";
import { EventBus } from "@/game/services/EventBus";
import { EffectExecutor } from "@/game/services/EffectExecutor";
import { EntityRegistry } from "@/game/services/EntityRegistry";
import { UnlockEvaluator } from "@/game/services/UnlockEvaluator";
import { getActivityXpProgress, scaleEffectAmount } from "@/game/utils/activityXp";
import { backgroundDefinitions } from "@/game/data/intro";
import type { Activity, Background, PlaceAction, QueueBlock, Stats } from "@/game/types/domain";
import type { Effect } from "@/game/types/effects";

const DEFAULT_BACKGROUND: Background = "orphan";

let lastAgeDay = 0;

export function resetAging(): void {
  lastAgeDay = 0;
}

// total hours committed by the day's schedule.
export function scheduledHours(queue: QueueBlock[]): number {
  return queue.reduce((sum, block) => {
    const activity = EntityRegistry.get("activity", block.key);
    return sum + (activity ? activity.timeCost * block.units : 0);
  }, 0);
}

function timeSystem(): { ticks: number; day: number; rolledDay: boolean } {
  const game = useGameStore.getState();
  const nextTicks = game.ticks + 1;
  const rolledDay = nextTicks % TICKS_PER_DAY === 0;
  const nextDay = rolledDay ? game.day + 1 : game.day;
  useGameStore.setState({ ticks: nextTicks, day: nextDay });
  return { ticks: nextTicks, day: nextDay, rolledDay };
}

function completeActivity(activity: Activity): void {
  const activityState = useActivityStore.getState();

  // rewards scale with the level you HELD while doing the work — the xp this
  // completion grants only benefits the next one (keeps payouts equal to what
  // the projection panels promised)
  const { level } = getActivityXpProgress(activityState.activityXp[activity.key] || 0);

  activityState.addCompletion(activity.key);
  activityState.addXp(activity.key, activity.xpPerCompletion());

  const scaledEffects: Effect[] = activity.effects.map((effect) =>
    effect.type === "grant_currency" || effect.type === "grant_stat"
      ? { ...effect, amount: scaleEffectAmount(effect.amount, level) }
      : effect
  );
  EffectExecutor.execute(scaledEffects);

  const coin = scaledEffects
    .filter((effect) => effect.type === "grant_currency")
    .reduce((sum, effect) => sum + (effect as Extract<Effect, { type: "grant_currency" }>).amount, 0);
  const statGains: Partial<Record<Stats, number>> = {};
  for (const effect of scaledEffects) {
    if (effect.type === "grant_stat") {
      statGains[effect.stat] = (statGains[effect.stat] ?? 0) + effect.amount;
    }
  }
  if (coin > 0 || Object.keys(statGains).length > 0) {
    const game = useGameStore.getState();
    game.pushIncome({ source: activity.name, coin, stats: statGains }, game.day);
  }

  EventBus.emit({
    type: "activity:completed",
    payload: { activityKey: activity.key },
  });

  rollActivityOutcome(activity.key);
}

function activitySystem(): void {
  const activityState = useActivityStore.getState();
  const runningKey = unitKeyAt(activityState.queue, activityState.scheduleIndex);
  if (!runningKey) return; // schedule done for the day → idle

  const activity = EntityRegistry.get("activity", runningKey);
  if (!activity) {
    activityState.advanceSchedule();
    return;
  }

  const nextTicks = activityState.runningTicks + 1;
  if (nextTicks >= activity.timeCost) {
    completeActivity(activity);
    useActivityStore.getState().advanceSchedule();
  } else {
    activityState.setRunningTicks(nextTicks);
  }
}

// new day: replay the schedule from the top if repeat is on, give time-gated
// unlockables their daily chance to fire, then roll the day's narrative events.
function dayRollSystem(day: number): void {
  const activityState = useActivityStore.getState();
  if (activityState.repeatActivities) activityState.resetSchedule();
  UnlockEvaluator.checkAll();
  rollDailyEvents(day);
}

function agingSystem(day: number): void {
  if (day - lastAgeDay >= DAYS_PER_YEAR) {
    useCultivatorStore.getState().incrementAge();
    lastAgeDay = day;
    UnlockEvaluator.checkAll();

    const { age, lifespan, hasFallen } = useCultivatorStore.getState();
    if (!hasFallen && age >= lifespan) {
      useCultivatorStore.getState().setHasFallen(true);
      gameLoop.stop();
      EventBus.emit({ type: "cultivator:death", payload: { age } });
    }
  }
}

export function runTick(): void {
  const { ticks, day, rolledDay } = timeSystem();
  activitySystem();
  if (rolledDay) dayRollSystem(day);
  agingSystem(day);

  EventBus.emit({ type: "game:tick", payload: { ticks, day } });
}

let tickIntervalHandle: ReturnType<typeof setInterval> | null = null;

export const gameLoop = {
  get running(): boolean {
    return tickIntervalHandle !== null;
  },

  start(): void {
    if (tickIntervalHandle !== null) return;
    if (useEventStore.getState().active) return; // an event holds the stage
    const speed = useGameStore.getState().gameSpeed;
    const intervalMs = 1000 / (TICKS_PER_SECOND * speed);
    tickIntervalHandle = setInterval(runTick, intervalMs);
    useGameStore.setState({ isPlaying: true });
  },

  stop(): void {
    if (tickIntervalHandle !== null) {
      clearInterval(tickIntervalHandle);
      tickIntervalHandle = null;
    }
    useGameStore.setState({ isPlaying: false });
  },

  setSpeed(speed: number): void {
    const wasRunning = gameLoop.running;
    if (wasRunning) gameLoop.stop();
    useGameStore.setState({ gameSpeed: speed });
    if (wasRunning) gameLoop.start();
  },
};

export function queueActivity(activityKey: string, units = 1): boolean {
  const activity = EntityRegistry.get("activity", activityKey);
  if (!activity) return false;
  const activityState = useActivityStore.getState();
  const maxHours = useGameStore.getState().maxTimePoints;
  if (scheduledHours(activityState.queue) + units * activity.timeCost > maxHours) return false;
  for (let i = 0; i < units; i++) activityState.pushUnit(activityKey);
  return true;
}

export function unqueueActivity(activityKey: string): boolean {
  const before = totalUnits(useActivityStore.getState().queue);
  useActivityStore.getState().popUnit(activityKey);
  return totalUnits(useActivityStore.getState().queue) < before;
}

// Contextual place actions are free of time cost; their spend_currency
// effects double as the affordability gate. Returns false when refused.
// A dialogue event bound to the action takes priority over its plain effects.
export function performPlaceAction(action: PlaceAction): boolean {
  if (openDialogueFor(action.key)) return true;
  const game = useGameStore.getState();
  if (action.effects?.length) {
    const cost = action.effects
      .filter((effect): effect is Extract<Effect, { type: "spend_currency" }> => effect.type === "spend_currency")
      .reduce((sum, effect) => sum + effect.amount, 0);
    if (cost > useInventoryStore.getState().currency) {
      game.pushLog({ text: "You count your copper. Not enough.", theme: "ambient" });
      return false;
    }
    EffectExecutor.execute(action.effects);
  }
  game.pushLog({
    text: `You ${action.label.toLowerCase()}.`,
    theme: action.kind === "talk" ? "dialogue" : "ambient",
  });
  return true;
}

export function bootRun(): void {
  const game = useGameStore.getState();
  if (!game.introComplete) {
    rng.reseed(rng.freshSeed()); // a brand-new life rolls brand-new fortunes
    game.addEventLog(backgroundDefinitions[DEFAULT_BACKGROUND].openingNarration);
    game.startRun(DEFAULT_BACKGROUND);
  }
  gameLoop.start();
}

export function reincarnate(): void {
  gameLoop.stop();
  resetAging();
  resetRunState();
  EventBus.emit({ type: "cultivator:reincarnated" });
  bootRun();
}
