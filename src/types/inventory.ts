export type ItemType =
  | "weapon"
  | "armor"
  | "consumable"
  | "ring"
  | "book"
  | string;
export type Rarity = "common" | "rare" | "epic" | "legendary" | string;
export interface InventoryItem {
  id: string;
  name: string;
  type: ItemType;
  rarity: Rarity;
  equipped: boolean;
}
