import { useState } from "react";
import type { PlayerResources } from "../types/states";
import { initialPlayerMoney } from "../data/constant";

export function usePlayerResources(
  initialResources?: Partial<PlayerResources>
) {
  const [playerResources, setResources] = useState<PlayerResources>({
    money: initialResources?.money ?? initialPlayerMoney,
  });

  const addMoney = (amount: number) => {
    setResources((prev) => ({ ...prev, money: prev.money + amount }));
  };

  const substractMoney = (amount: number) => {
    setResources((prev) => ({ ...prev, money: prev.money - amount }));
  };

  return {
    playerResources,
    playerMoney: playerResources.money,
    addMoney,
    substractMoney,
  };
}
