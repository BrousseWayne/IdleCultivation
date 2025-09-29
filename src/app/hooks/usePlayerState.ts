import { useState } from "react";
import {
  initialPlayerAge,
  initialPlayerLifespan,
  initialPlayerHp,
  initialPlayerSatiety,
  initialPlayerMortality,
  initialPlayerMoney,
} from "../data/data copy";

type PlayerState = {
  age: number;
  lifespan: number;
  hp: typeof initialPlayerHp;
  satiety: typeof initialPlayerSatiety;
  mortality: typeof initialPlayerMortality;
  money: number;
};

export function usePlayerState(initialState?: Partial<PlayerState>) {
  const [player, setPlayer] = useState<PlayerState>({
    age: initialState?.age ?? initialPlayerAge,
    lifespan: initialState?.lifespan ?? initialPlayerLifespan,
    hp: initialState?.hp ?? initialPlayerHp,
    satiety: initialState?.satiety ?? initialPlayerSatiety,
    mortality: initialState?.mortality ?? initialPlayerMortality,
    money: initialState?.money ?? initialPlayerMoney,
  });

  return {
    player,
    age: player.age,
    lifespan: player.lifespan,
    playerHp: player.hp,
    playerSatiety: player.satiety,
    playerMortality: player.mortality,
    playerMoney: player.money,
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
