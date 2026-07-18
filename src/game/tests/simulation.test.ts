import { describe, it, expect, afterEach } from "vitest";
import { freshRun, passTicks, passDays } from "@/game/tests/helpers";
import { gameLoop, queueActivity, reincarnate, performPlaceAction } from "@/game/engine/gameLoop";
import { openDialogueFor, chooseOption } from "@/game/engine/events";
import { rng } from "@/game/engine/rng";
import { TICKS_PER_DAY, DAYS_PER_YEAR } from "@/game/engine/time";
import { SaveManager } from "@/game/services/SaveManager";
import { resetRunState } from "@/game/services/persistence";
import { registerUnlockables } from "@/game/services/gameEventListeners";
import { UnlockEvaluator } from "@/game/services/UnlockEvaluator";
import { validateContent } from "@/game/data/validateContent";
import { getPlace } from "@/game/data/places";
import { initialPlayerAge, initialPlayerLifespan, initialCurrency } from "@/game/data/constant";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useActivityStore } from "@/game/stores/activityStore";
import { useGameStore } from "@/game/stores/gameStore";

afterEach(() => {
  gameLoop.stop(); // never leave a stray interval ticking between tests
});

describe("content integrity", () => {
  it("has no dangling references", () => {
    freshRun();
    expect(validateContent()).toEqual([]);
  });
});

describe("a mortal life", () => {
  it("an untouched life dies at exactly the lifespan", () => {
    freshRun();
    const lifeInDays = (initialPlayerLifespan - initialPlayerAge) * DAYS_PER_YEAR;

    passTicks(lifeInDays * TICKS_PER_DAY);

    const cultivator = useCultivatorStore.getState();
    expect(cultivator.hasFallen).toBe(true);
    expect(cultivator.age).toBe(initialPlayerLifespan);
    expect(useGameStore.getState().day).toBe(lifeInDays);
    expect(gameLoop.running).toBe(false); // death stops the clock
  });

  it("death never arrives a single day early", () => {
    freshRun();
    const lifeInDays = (initialPlayerLifespan - initialPlayerAge) * DAYS_PER_YEAR;

    passTicks(lifeInDays * TICKS_PER_DAY - 1);

    expect(useCultivatorStore.getState().hasFallen).toBe(false);
  });
});

describe("the daily schedule", () => {
  it("a disclosed activity pays exactly what it promises", () => {
    freshRun();
    queueActivity("farmFields"); // 6h, grants 80 copper + 1 Strength at level 1

    passTicks(6);

    expect(useInventoryStore.getState().currency).toBe(initialCurrency + 80);
    expect(useCultivatorStore.getState().stats.Strength).toBe(1);
    expect(useActivityStore.getState().completionCounts.farmFields).toBe(1);
  });

  it("an uncertain reward is a real roll, reproducible from the seed", () => {
    const play = () => {
      freshRun(99);
      queueActivity("beg"); // 8h, base 100, uncertain
      passTicks(8);
      return useInventoryStore.getState().currency - initialCurrency;
    };

    const earned = play();
    expect(earned).toBeGreaterThanOrEqual(50);
    expect(earned).toBeLessThanOrEqual(150);
    expect(play()).toBe(earned); // same seed, same fortune
  });

  it("repeat replays the plan every dawn", () => {
    freshRun();
    queueActivity("beg");

    passDays(3);

    expect(useActivityStore.getState().completionCounts.beg).toBe(3);
  });
});

describe("persistence", () => {
  it("save → wipe → load is a perfect roundtrip", () => {
    freshRun();
    queueActivity("beg");
    passTicks(30); // mid-second-day, mid-activity

    SaveManager.save();
    const before = JSON.parse(SaveManager.exportSave());

    resetRunState();
    SaveManager.load();
    const after = JSON.parse(SaveManager.exportSave());

    delete before.timestamp;
    delete after.timestamp;
    expect(after).toEqual(before);
  });

  it("aging never drifts across a save/load", () => {
    freshRun();
    passDays(100); // aged to 13 at day 60; next birthday is day 120

    SaveManager.save();
    resetRunState();
    SaveManager.load();

    passDays(19); // day 119 — still 13
    expect(useCultivatorStore.getState().age).toBe(13);
    passDays(1); // day 120 — 14, right on time
    expect(useCultivatorStore.getState().age).toBe(14);
  });

  it("death writes a save that restores the fallen state", () => {
    freshRun();
    passDays((initialPlayerLifespan - initialPlayerAge) * DAYS_PER_YEAR);
    expect(useCultivatorStore.getState().hasFallen).toBe(true);

    resetRunState();
    SaveManager.load(); // the death listener saved at the moment of passing
    expect(useCultivatorStore.getState().hasFallen).toBe(true);

    gameLoop.start(); // the dead don't tick
    expect(gameLoop.running).toBe(false);
  });

  it("an unlock announces exactly once, even across a reload", () => {
    freshRun();
    passDays(10); // Story tab unlocks at day 10

    const announcements = () =>
      useGameStore.getState().streamLog.filter((entry) => entry.text.includes("Story")).length;
    expect(announcements()).toBe(1);

    // simulate a reload: save, re-register the full unlockable pool, re-check
    SaveManager.save();
    UnlockEvaluator.clear();
    registerUnlockables();
    SaveManager.load();
    UnlockEvaluator.checkAll();

    expect(announcements()).toBe(1); // applyUnlock is idempotent
  });
});

describe("the economy", () => {
  it("place actions can never drive copper negative", () => {
    freshRun(); // 10 copper; the food stall costs 5
    const foodStall = getPlace("marketSquare")!.actions![0];

    expect(performPlaceAction(foodStall)).toBe(true);
    expect(performPlaceAction(foodStall)).toBe(true);
    expect(performPlaceAction(foodStall)).toBe(false); // refused, not overdrawn

    expect(useInventoryStore.getState().currency).toBe(0);
  });
});

describe("narrative events", () => {
  it("a once-dialogue is consumed for the life and pauses the clock while open", () => {
    freshRun();
    gameLoop.start();

    expect(openDialogueFor("elder")).toBe(true);
    expect(gameLoop.running).toBe(false); // the event holds the stage

    chooseOption(1); // "Leave him be." — resolves
    expect(gameLoop.running).toBe(true); // the clock resumes

    expect(openDialogueFor("elder")).toBe(false); // consumed for this life
    gameLoop.stop();
  });

  it("reincarnation gives the dialogue back", () => {
    freshRun();
    expect(openDialogueFor("elder")).toBe(true);
    chooseOption(1);

    reincarnate();
    gameLoop.stop();

    expect(openDialogueFor("elder")).toBe(true);
  });
});

describe("determinism", () => {
  it("the same seed rolls the same fortunes", () => {
    rng.reseed(7);
    const first = [rng.next(), rng.next(), rng.next(), rng.next(), rng.next()];
    rng.reseed(7);
    const second = [rng.next(), rng.next(), rng.next(), rng.next(), rng.next()];
    expect(second).toEqual(first);
  });

  it("two lives with the same seed are the same life", () => {
    const play = () => {
      freshRun(4242);
      queueActivity("beg");
      passDays(20);
      return JSON.parse(SaveManager.exportSave());
    };
    const firstLife = play();
    const secondLife = play();
    delete firstLife.timestamp;
    delete secondLife.timestamp;
    expect(secondLife).toEqual(firstLife);
  });
});
