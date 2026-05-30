import { useGameStore } from "../stores/gameStore";
import { useActivityStore } from "../stores/activityStore";
import { useCultivatorStore } from "../stores/cultivatorStore";
import { EventBus } from "../services/EventBus";
import { UnlockEvaluator } from "../services/UnlockEvaluator";

const TICKS_PER_SECOND = 24;
const TICKS_PER_DAY = 24;
const DAYS_PER_YEAR = 60;

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

function activitySystem(ticks: number): void {
  const act = useActivityStore.getState();
  if (act.activityQueue.length === 0) return;

  const current = act.activityQueue[0];
  let startTick = act.currentActivityStartTick;

  if (startTick === null) {
    act.setCurrentActivityStartTick(ticks);
    startTick = ticks;
  }

  if (ticks - startTick >= current.timeCost) {
    act.completeCurrentActivity();
    useActivityStore.getState().setCurrentActivityStartTick(null);

    const after = useActivityStore.getState();
    if (after.activityQueue.length === 0 && !after.repeatActivities) {
      gameLoop.stop();
    }
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
  activitySystem(ticks);
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
