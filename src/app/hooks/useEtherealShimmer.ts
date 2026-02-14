import { useState, useEffect } from "react";

type ElementKey =
  | "age"
  | "day"
  | "spiritStones"
  | "stat_Strength"
  | "stat_Wisdom"
  | "stat_Charisma"
  | "stat_Luck"
  | "vitality"
  | "satiety"
  | "mortality"
  | "timePoints";

type EffectType = "sparkle" | "holographic" | "prismatic";

const SHIMMER_ELEMENTS: ElementKey[] = [
  "age",
  "day",
  "spiritStones",
  "stat_Strength",
  "stat_Wisdom",
  "stat_Charisma",
  "stat_Luck",
  "vitality",
  "satiety",
  "mortality",
  "timePoints",
];

const ELEMENT_WEIGHTS: Record<ElementKey, number> = {
  age: 3,
  day: 5,
  spiritStones: 4,
  stat_Strength: 2,
  stat_Wisdom: 2,
  stat_Charisma: 2,
  stat_Luck: 1,
  vitality: 3,
  satiety: 2,
  mortality: 1,
  timePoints: 4,
};

const EFFECT_TYPES: EffectType[] = ["sparkle", "holographic", "prismatic"];

const TIMING = {
  MIN_DELAY_MS: 45000,
  MAX_DELAY_MS: 90000,
  MIN_DURATION_MS: 4000,
  MAX_DURATION_MS: 3000,
} as const;

function weightedRandomPick(elements: ElementKey[]): ElementKey {
  const totalWeight = elements.reduce((sum, el) => sum + ELEMENT_WEIGHTS[el], 0);
  let random = Math.random() * totalWeight;

  for (const element of elements) {
    random -= ELEMENT_WEIGHTS[element];
    if (random <= 0) return element;
  }

  return elements[0];
}

function randomEffect(): EffectType {
  return EFFECT_TYPES[Math.floor(Math.random() * EFFECT_TYPES.length)];
}

export function useEtherealShimmer() {
  const [activeShimmers, setActiveShimmers] = useState<Map<ElementKey, EffectType>>(new Map());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextShimmer = () => {
      const delay = TIMING.MIN_DELAY_MS + Math.random() * TIMING.MAX_DELAY_MS;

      timeoutId = setTimeout(() => {
        setActiveShimmers(current => {
          const availableElements = SHIMMER_ELEMENTS.filter(
            el => !current.has(el)
          );

          if (availableElements.length === 0) {
            scheduleNextShimmer();
            return current;
          }

          const selectedElement = weightedRandomPick(availableElements);
          const effect = randomEffect();
          const duration = TIMING.MIN_DURATION_MS + Math.random() * TIMING.MAX_DURATION_MS;

          setTimeout(() => {
            setActiveShimmers(prev => {
              const next = new Map(prev);
              next.delete(selectedElement);
              return next;
            });
          }, duration);

          scheduleNextShimmer();

          return new Map([...current, [selectedElement, effect]]);
        });
      }, delay);
    };

    scheduleNextShimmer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return {
    getEffect: (key: ElementKey): EffectType | null => activeShimmers.get(key) || null,
  };
}
