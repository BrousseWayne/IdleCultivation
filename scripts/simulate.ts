import { registerContent } from "@/game/bootstrap";
import { initializeGameEventListeners } from "@/game/services/gameEventListeners";
import { resetRunState } from "@/game/services/persistence";
import { runTick, queueActivity, resetAging } from "@/game/engine/gameLoop";
import { chooseOption, getActiveEvent, isChoiceAvailable } from "@/game/engine/events";
import { TICKS_PER_DAY } from "@/game/engine/time";
import { rng } from "@/game/engine/rng";
import { getActivityXpProgress, scaleEffectAmount } from "@/game/utils/activityXp";
import { activityData } from "@/game/data/activity";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useActivityStore } from "@/game/stores/activityStore";
import { useUnlockStore } from "@/game/stores/unlockStore";
import { useEventStore } from "@/game/stores/eventStore";
import { useGameStore } from "@/game/stores/gameStore";

// `npm run simulate -- --days=600 --policy=income --seed=1`
// Plays the game headlessly under a simple policy and prints the curves —
// the empirical arm of every future balancing session.

const args = Object.fromEntries(
  process.argv.slice(2).filter((argument) => argument.startsWith("--")).map((argument) => {
    const [name, value] = argument.replace(/^--/, "").split("=");
    return [name, value ?? "true"];
  })
);

const totalDays = Number(args.days ?? 600);
const policy = String(args.policy ?? "income"); // income | training | idle
const seed = Number(args.seed ?? 1);
const sampleEvery = Number(args.sample ?? Math.max(1, Math.floor(totalDays / 20)));

// minimal localStorage shim (SaveManager is imported transitively)
const storage = new Map<string, string>();
globalThis.localStorage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => void storage.set(key, String(value)),
  removeItem: (key: string) => void storage.delete(key),
  clear: () => storage.clear(),
  key: () => null,
  length: 0,
} as unknown as Storage;

registerContent();
resetRunState();
resetAging();
rng.reseed(seed);
initializeGameEventListeners();
useGameStore.setState({ introComplete: true, runBackground: "orphan" });

function isVisible(activityKey: string): boolean {
  const unlocks = useUnlockStore.getState();
  const activity = activityData.find((candidate) => candidate.key === activityKey);
  return !!activity && !!unlocks.activities[activity.key] && !!unlocks.categories[activity.category];
}

function coinPerHour(activityKey: string): number {
  const activity = activityData.find((candidate) => candidate.key === activityKey)!;
  const { level } = getActivityXpProgress(useActivityStore.getState().activityXp[activityKey] || 0);
  const coin = activity.effects
    .filter((effect) => effect.type === "grant_currency")
    .reduce((sum, effect) => sum + scaleEffectAmount((effect as { amount: number }).amount, level), 0);
  return coin / activity.timeCost;
}

function statPerHour(activityKey: string): number {
  const activity = activityData.find((candidate) => candidate.key === activityKey)!;
  const stat = activity.effects
    .filter((effect) => effect.type === "grant_stat")
    .reduce((sum, effect) => sum + (effect as { amount: number }).amount, 0);
  return stat / activity.timeCost;
}

function planDay(): void {
  const activityState = useActivityStore.getState();
  activityState.clearQueue();
  if (policy === "idle") return;

  const score = policy === "training" ? statPerHour : coinPerHour;
  const candidates = activityData
    .map((activity) => activity.key)
    .filter(isVisible)
    .sort((first, second) => score(second) - score(first));
  const best = candidates[0];
  if (!best) return;
  while (queueActivity(best)) {
    // fill the day with the best activity under the current policy
  }
}

// a policy has no taste: always take the first available choice
function resolveAnyEvent(): void {
  let guard = 0;
  while (useEventStore.getState().active && guard++ < 20) {
    const staged = getActiveEvent();
    const index = staged?.step.choices?.findIndex((choice) => isChoiceAvailable(choice)) ?? -1;
    if (index < 0) break;
    chooseOption(index);
  }
}

type Sample = {
  day: number;
  age: number;
  copper: number;
  Strength: number;
  Dexterity: number;
  categories: string;
};
const samples: Sample[] = [];

for (let day = 0; day < totalDays; day++) {
  planDay();
  for (let tick = 0; tick < TICKS_PER_DAY; tick++) {
    runTick();
    resolveAnyEvent();
  }
  if (useCultivatorStore.getState().hasFallen) break;

  if ((day + 1) % sampleEvery === 0) {
    const cultivator = useCultivatorStore.getState();
    const unlocks = useUnlockStore.getState();
    samples.push({
      day: useGameStore.getState().day,
      age: cultivator.age,
      copper: useInventoryStore.getState().currency,
      Strength: cultivator.stats.Strength,
      Dexterity: cultivator.stats.Dexterity,
      categories: Object.entries(unlocks.categories)
        .filter(([, unlocked]) => unlocked)
        .map(([category]) => category)
        .join("+"),
    });
  }
}

console.log(`policy=${policy} seed=${seed} days=${totalDays}`);
console.table(samples);
const cultivator = useCultivatorStore.getState();
console.log(
  `final: day ${useGameStore.getState().day}, age ${cultivator.age}, ` +
    `${useInventoryStore.getState().currency} copper, ` +
    `STR ${cultivator.stats.Strength}, DEX ${cultivator.stats.Dexterity}` +
    (cultivator.hasFallen ? " — DEAD" : "")
);
