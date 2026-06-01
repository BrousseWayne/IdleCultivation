import { useGameStore } from "@/game/stores/gameStore";
import { useActivityStore } from "@/game/stores/activityStore";
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

function totalUnits(queue: QueueBlock[]): number {
  return queue.reduce((n, b) => n + b.units, 0);
}

const TICKS_PER_SECOND = 24;
const TICKS_PER_DAY = 24;
const DAYS_PER_YEAR = 60;
const DEFAULT_BACKGROUND: Background = "orphan";

let lastAgeDay = 0;

export function resetAging(): void {
  lastAgeDay = 0;
}

function timeSystem(): { ticks: number; day: number } {
  const { ticks, day } = useGameStore.getState();
  const nextTicks = ticks + 1;
  const nextDay = nextTicks % TICKS_PER_DAY === 0 ? day + 1 : day;
  useGameStore.setState({ ticks: nextTicks, day: nextDay });
  return { ticks: nextTicks, day: nextDay };
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

  // consume this unit from the head block
  act.consumeHeadUnit();

  // repeat: re-commit one unit if the budget allows
  const game = useGameStore.getState();
  if (act.repeatActivities && game.timePoints - activity.timeCost >= 0) {
    game.allocateTime(activity.timeCost);
    act.pushUnit(activity.key);
  }

  EventBus.emit({
    type: "activity:completed",
    payload: { activityKey: activity.key },
  });
}

function activitySystem(): void {
  const act = useActivityStore.getState();
  const head = act.queue[0];
  if (!head) return;

  const activity = EntityRegistry.get("activity", head.key);
  if (!activity) {
    act.consumeHeadUnit();
    return;
  }

  const next = act.runningTicks + 1;
  if (next >= activity.timeCost) {
    completeActivity(activity);
    const after = useActivityStore.getState();
    if (after.queue.length === 0 && !after.repeatActivities) {
      gameLoop.stop();
    }
  } else {
    act.setRunningTicks(next);
  }
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
  const { ticks, day } = timeSystem();
  activitySystem();
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
  const game = useGameStore.getState();
  const cost = units * activity.timeCost;
  if (game.timePoints - cost < 0) return false;
  game.allocateTime(cost);
  const act = useActivityStore.getState();
  for (let i = 0; i < units; i++) act.pushUnit(activityKey);
  return true;
}

export function unqueueActivity(activityKey: string): boolean {
  const activity = EntityRegistry.get("activity", activityKey);
  if (!activity) return false;
  const before = totalUnits(useActivityStore.getState().queue);
  useActivityStore.getState().popUnit(activityKey);
  const after = totalUnits(useActivityStore.getState().queue);
  if (after < before) {
    useGameStore.getState().deallocateTime(activity.timeCost);
    return true;
  }
  return false;
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
