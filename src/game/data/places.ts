import { PALETTE } from "@/game/data/sectionColors";
import { definePlaces } from "@/game/data/defineContent";

export const STARTING_PLACE = "cityStreets";



export const places = definePlaces([
  {
    key: "cityStreets",
    name: "Ironveil Streets",
    description:
      "Mud and noise. The city churns past you without a glance. A beggar's bowl is the only thing the gate guards left you.",
    activityKeys: ["beg"],
    actions: [
      { key: "elder", label: "Speak to the ragged elder", detail: "he watches you from the gutter", glyph: "言", kind: "talk" },
    ],
    connections: ["laborYard", "marketSquare"],
    unlocked: true,
    x: 32,
    y: 55,
    glyph: "巷",
    color: PALETTE.sky,
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
    glyph: "坊",
    color: PALETTE.indigo,
  },
  {
    key: "marketSquare",
    name: "Market Square",
    description:
      "Merchants haggle beneath faded banners. There is money here, for those who can make themselves useful.",
    activityKeys: ["helpElders", "networkMerchants"],
    actions: [
      {
        key: "foodStall",
        label: "Food stall",
        detail: "spend coin to eat",
        glyph: "食",
        kind: "shop",
        effects: [
          { type: "spend_currency", amount: 5 },
          { type: "log", message: "You eat a skewer of something unidentifiable. It helps." },
        ],
      },
    ],
    connections: ["cityStreets"],
    unlocked: true,
    x: 64,
    y: 36,
    glyph: "市",
    color: PALETTE.lotus,
  },
]);

// Derived key unions — the compiler's map of the world.
export type PlaceKey = (typeof places)[number]["key"];
export type PlaceActionKey = NonNullable<(typeof places)[number]["actions"]>[number]["key"];

export function getPlace(key: string): (typeof places)[number] | undefined {
  return places.find((place) => place.key === key);
}
