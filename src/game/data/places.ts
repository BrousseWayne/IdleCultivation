import type { Place } from "@/game/types/domain";
import { Footprints, Hammer, Store } from "lucide-react";

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
    x: 32,
    y: 55,
    icon: Footprints,
    color: "#E07856",
  },
  {
    key: "laborYard",
    name: "Labor Yard",
    description:
      "Carts, crates, and foremen barking for hands. Honest coin for an aching back.",
    activityKeys: ["mineOre", "farmFields"],
    connections: ["cityStreets"],
    unlocked: true,
    x: 20,
    y: 24,
    icon: Hammer,
    color: "#5FB4A0",
  },
  {
    key: "marketSquare",
    name: "Market Square",
    description:
      "Merchants haggle beneath faded banners. There is money here, for those who can make themselves useful.",
    activityKeys: ["helpElders", "networkMerchants"],
    connections: ["cityStreets"],
    unlocked: true,
    x: 64,
    y: 36,
    icon: Store,
    color: "#D4AF6A",
  },
];
