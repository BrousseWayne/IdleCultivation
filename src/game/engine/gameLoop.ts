import { useGameStore } from "@/game/stores/gameStore";
import { useActivityStore, totalUnits, unitKeyAt } from "@/game/stores/activityStore";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { EventBus } from "@/game/services/EventBus";
import { EffectExecutor } from "@/game/services/EffectExecutor";
import { EntityRegistry } from "@/game/services/EntityRegistry";
import { UnlockEvaluator } from "@/game/services/UnlockEvaluator";
import { getActivityXpProgress, scaleEffectAmount } from "@/game/utils/activityXp";
import { backgroundDefinitions } from "@/game/data/intro";
import type { Activity, Background, QueueBlock } from "@/game/types/domain";
import type { Effect } from "@/game/types/effects";

const TICKS_PER_SECOND = 24;
const TICKS_PER_DAY = 24;
const DAYS_PER_YEAR = 60;
const DEFAULT_BACKGROUND: Background = "orphan";

let lastAgeDay = 0;

export function resetAging(): void {
  lastAgeDay = 0;
}

// total hours committed by the day's schedule.
export function scheduledHours(queue: QueueBlock[]): number {
  return queue.reduce((sum, b) => {
    const a = EntityRegistry.get("activity", b.key);
    return sum + (a ? a.timeCost * b.units : 0);
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
  const act = useActivityStore.getState();

  const xpGain = activity.xpScalingFn();
  const newXp = (act.activityXp[activity.key] || 0) + xpGain;
  const { level } = getActivityXpProgress(newXp);

  act.addCompletion(activity.key);
  act.addXp(activity.key, xpGain);

  const scaledEffects: Effect[] = activity.effects.map((effect) =>
    effect.type === "grant_currency" || effect.type === "grant_stat"
      ? { ...effect, amount: scaleEffectAmount(effect.amount, level) }
      : effect
  );
  EffectExecutor.execute(scaledEffects);

  const coin = scaledEffects
    .filter((e) => e.type === "grant_currency")
    .reduce((sum, e) => sum + (e as Extract<Effect, { type: "grant_currency" }>).amount, 0);
  if (coin > 0) {
    useGameStore.getState().pushLog({ text: `${activity.name}: earned ${coin} coin.`, theme: "income" });
  }

  EventBus.emit({
    type: "activity:completed",
    payload: { activityKey: activity.key },
  });
}

function activitySystem(): void {
  const act = useActivityStore.getState();
  const key = unitKeyAt(act.queue, act.scheduleIndex);
  if (!key) return; // schedule done for the day → idle

  const activity = EntityRegistry.get("activity", key);
  if (!activity) {
    act.advanceSchedule();
    return;
  }

  const next = act.runningTicks + 1;
  if (next >= activity.timeCost) {
    completeActivity(activity);
    useActivityStore.getState().advanceSchedule();
  } else {
    act.setRunningTicks(next);
  }
}

// new day: replay the schedule from the top if repeat is on.
function dayRollSystem(): void {
  const act = useActivityStore.getState();
  if (act.repeatActivities) act.resetSchedule();
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
  } else if (day % 10 === 0) {
    UnlockEvaluator.checkAll();
  }
}

export function runTick(): void {
  const { ticks, day, rolledDay } = timeSystem();
  activitySystem();
  if (rolledDay) dayRollSystem();
  agingSystem(day);

  EventBus.emit({ type: "game:tick", payload: { ticks, day } });
}

class GameLoop {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  get running(): boolean {
    return this.intervalId !== null;
  }

  start(): void {
    if (this.intervalId !== null) return;
    const speed = useGameStore.getState().gameSpeed;
    const interval = 1000 / (TICKS_PER_SECOND * speed);
    this.intervalId = setInterval(runTick, interval);
    useGameStore.setState({ isPlaying: true });
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    useGameStore.setState({ isPlaying: false });
  }

  setSpeed(speed: number): void {
    const wasRunning = this.running;
    if (wasRunning) this.stop();
    useGameStore.setState({ gameSpeed: speed });
    if (wasRunning) this.start();
  }
}

export const gameLoop = new GameLoop();

export function queueActivity(activityKey: string, units = 1): boolean {
  const activity = EntityRegistry.get("activity", activityKey);
  if (!activity) return false;
  const act = useActivityStore.getState();
  const max = useGameStore.getState().maxTimePoints;
  if (scheduledHours(act.queue) + units * activity.timeCost > max) return false;
  for (let i = 0; i < units; i++) act.pushUnit(activityKey);
  return true;
}

export function unqueueActivity(activityKey: string): boolean {
  const before = totalUnits(useActivityStore.getState().queue);
  useActivityStore.getState().popUnit(activityKey);
  return totalUnits(useActivityStore.getState().queue) < before;
}

export function bootRun(): void {
  const game = useGameStore.getState();
  if (!game.introComplete) {
    game.addEventLog(backgroundDefinitions[DEFAULT_BACKGROUND].openingNarration);
    game.startRun(DEFAULT_BACKGROUND);
  }
  gameLoop.start();
}

export function reincarnate(): void {
  gameLoop.stop();
  resetAging();
  useCultivatorStore.getState().reset();
  useActivityStore.getState().reset();
  useInventoryStore.getState().reset();
  useGameStore.getState().reset();
  EventBus.emit({ type: "cultivator:reincarnated" });
  bootRun();
}
