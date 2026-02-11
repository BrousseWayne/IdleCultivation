import { create } from "zustand";
import type { Stats } from "../types/domain";
import {
  initialPlayerAge,
  initialPlayerLifespan,
  initialPlayerHp,
  initialPlayerSatiety,
  initialPlayerMortality,
} from "../data/constant";

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

  setAge: (age: number) => void;
  setLifespan: (lifespan: number) => void;
  setVitality: (vitality: ResourceBar) => void;
  setSatiety: (satiety: ResourceBar) => void;
  setMortality: (mortality: ResourceBar) => void;
  setStats: (stats: Record<Stats, number>) => void;

  incrementStat: (stat: Stats, amount: number) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  incrementAge: () => void;
}

export const useCultivatorStore = create<CultivatorState>((set) => ({
  age: initialPlayerAge,
  lifespan: initialPlayerLifespan,
  vitality: initialPlayerHp,
  satiety: initialPlayerSatiety,
  mortality: initialPlayerMortality,
  stats: {
    Strength: 0,
    Dexterity: 0,
  },

  setAge: (age) => set({ age }),
  setLifespan: (lifespan) => set({ lifespan }),
  setVitality: (vitality) => set({ vitality }),
  setSatiety: (satiety) => set({ satiety }),
  setMortality: (mortality) => set({ mortality }),
  setStats: (stats) => set({ stats }),

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
}));
