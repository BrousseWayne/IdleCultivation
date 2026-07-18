import { create } from "zustand";
import type { Stats } from "@/game/types/domain";
import {
  initialPlayerAge,
  initialPlayerLifespan,
  initialPlayerHp,
  initialPlayerSatiety,
  initialPlayerMortality,
} from "@/game/data/constant";

type ResourceBar = {
  max: number;
  current: number;
};

interface CultivatorState {
  age: number;
  lifespan: number;
  vitality: ResourceBar;
  satiety: ResourceBar;
  mortality: ResourceBar;
  stats: Record<Stats, number>;
  hasFallen: boolean;

  setHasFallen: (hasFallen: boolean) => void;

  incrementStat: (stat: Stats, amount: number) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  incrementAge: () => void;
  reset: () => void;
}

const initialCultivatorState = {
  age: initialPlayerAge,
  lifespan: initialPlayerLifespan,
  vitality: initialPlayerHp,
  satiety: initialPlayerSatiety,
  mortality: initialPlayerMortality,
  stats: { Strength: 0, Dexterity: 0 } as Record<Stats, number>,
  hasFallen: false,
};

export const useCultivatorStore = create<CultivatorState>((set) => ({
  ...initialCultivatorState,

  setHasFallen: (hasFallen) => set({ hasFallen }),

  incrementStat: (stat, amount) =>
    set((state) => ({
      stats: { ...state.stats, [stat]: (state.stats[stat] || 0) + amount },
    })),

  takeDamage: (amount) =>
    set((state) => ({
      vitality: {
        ...state.vitality,
        current: Math.max(0, state.vitality.current - amount),
      },
    })),

  heal: (amount) =>
    set((state) => ({
      vitality: {
        ...state.vitality,
        current: Math.min(state.vitality.max, state.vitality.current + amount),
      },
    })),

  incrementAge: () =>
    set((state) => ({
      age: state.age + 1,
    })),

  reset: () => set(initialCultivatorState),
}));
