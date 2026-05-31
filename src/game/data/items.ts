import type { InventoryItem } from "@/game/types/domain";

export const items: InventoryItem[] = [
  { id: 1, name: "Iron Sword", type: "weapon", rarity: "common" },
  { id: 2, name: "Leather Armor", type: "armor", rarity: "common" },
  { id: 3, name: "Health Potion", type: "consumable", rarity: "common" },
  { id: 4, name: "Spirit Ring", type: "ring", rarity: "rare" },
  { id: 5, name: "Cultivation Manual", type: "book", rarity: "epic" },
];
