import type { Place } from "@/game/types/domain";

export const STARTING_PLACE = "cityStreets";

export function getPlace(key: string): Place | undefined {
  return places.find((p) => p.key === key);
}

export const places: Place[] = [
  {
    key: "cityStreets",
    name: "Ironveil Streets",
    description:
      "Mud and noise. The city churns past you without a glance. A beggar's bowl is the only thing the gate guards left you.",
    activityKeys: ["beg"],
    connections: ["laborYard", "marketSquare"],
    unlocked: true,
  },
  {
    key: "laborYard",
    name: "Labor Yard",
    description:
      "Carts, crates, and foremen barking for hands. Honest coin for an aching back.",
    activityKeys: ["mineOre", "farmFields"],
    connections: ["cityStreets"],
    unlocked: true,
  },
  {
    key: "marketSquare",
    name: "Market Square",
    description:
      "Merchants haggle beneath faded banners. There is money here, for those who can make themselves useful.",
    activityKeys: ["helpElders", "networkMerchants"],
    connections: ["cityStreets"],
    unlocked: true,
  },
];
