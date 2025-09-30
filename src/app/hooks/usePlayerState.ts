import { useState } from "react";

import type { PlayerState } from "../types/states";
import {
  initialPlayerAge,
  initialPlayerHp,
  initialPlayerLifespan,
  initialPlayerMortality,
  initialPlayerSatiety,
} from "../data/constant";

export function usePlayerState(initialState?: Partial<PlayerState>) {
  const [player, setPlayer] = useState<PlayerState>({
    age: initialState?.age ?? initialPlayerAge,
    lifespan: initialState?.lifespan ?? initialPlayerLifespan,
    hp: initialState?.hp ?? initialPlayerHp,
    satiety: initialState?.satiety ?? initialPlayerSatiety,
    mortality: initialState?.mortality ?? initialPlayerMortality,
  });

  return {
    player,
    age: player.age,
    lifespan: player.lifespan,
    playerHp: player.hp,
    playerSatiety: player.satiety,
    playerMortality: player.mortality,

    setAge: (age: number) => setPlayer((prev) => ({ ...prev, age })),
    setLifespan: (lifespan: number) =>
      setPlayer((prev) => ({ ...prev, lifespan })),
    setPlayerHp: (hp: typeof initialPlayerHp) =>
      setPlayer((prev) => ({ ...prev, hp })),
    setPlayerSatiety: (satiety: typeof initialPlayerSatiety) =>
      setPlayer((prev) => ({ ...prev, satiety })),
    setPlayerMortality: (mortality: typeof initialPlayerMortality) =>
      setPlayer((prev) => ({ ...prev, mortality })),
    setPlayerMoney: (money: number) =>
      setPlayer((prev) => ({ ...prev, money })),
  };
}
