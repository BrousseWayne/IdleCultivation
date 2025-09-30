import type {
  initialPlayerHp,
  initialPlayerMortality,
  initialPlayerSatiety,
} from "../data/constant";
import type { Activity, ActivityCategory } from "./domain";

export type PlayerState = {
  age: number;
  lifespan: number;
  hp: typeof initialPlayerHp;
  satiety: typeof initialPlayerSatiety;
  mortality: typeof initialPlayerMortality;
};

export type PlayerResources = {
  money: number;
};

export type Categories = Record<ActivityCategory, Activity[]>;
export type ActivityUnlockState = Record<ActivityCategory, boolean>;
