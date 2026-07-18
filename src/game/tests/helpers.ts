import { registerContent } from "@/game/bootstrap";
import { EventBus } from "@/game/services/EventBus";
import { UnlockEvaluator } from "@/game/services/UnlockEvaluator";
import { initializeGameEventListeners } from "@/game/services/gameEventListeners";
import { resetRunState } from "@/game/services/persistence";
import { gameLoop, runTick } from "@/game/engine/gameLoop";
import { TICKS_PER_DAY } from "@/game/engine/time";
import { rng } from "@/game/engine/rng";
import { useGameStore } from "@/game/stores/gameStore";

let contentRegistered = false;

// A clean, deterministic run: fresh stores, fresh listeners, fixed seed.
// Call at the top of every test.
export function freshRun(seed = 12345): void {
  if (!contentRegistered) {
    registerContent();
    contentRegistered = true;
  }
  gameLoop.stop();
  EventBus.clear();
  UnlockEvaluator.clear();
  resetRunState();
  rng.reseed(seed);
  localStorage.clear();
  initializeGameEventListeners();
  useGameStore.setState({ introComplete: true, runBackground: "orphan" });
}

// Time travel: the loop's interval is irrelevant in tests — ticks are just
// function calls.
export function passTicks(count: number): void {
  for (let i = 0; i < count; i++) runTick();
}

export function passDays(count: number): void {
  passTicks(count * TICKS_PER_DAY);
}
