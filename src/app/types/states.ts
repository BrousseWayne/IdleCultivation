import type { Activity, ActivityCategory, InventoryItem } from "./domain";

export type Categories = Record<ActivityCategory, Activity[]>;
export type ActivityUnlockState = Record<ActivityCategory, boolean>;

export type EquippedItems = {
  weapon: InventoryItem | null;
  armor: InventoryItem | null;
  helmet: InventoryItem | null;
  boots: InventoryItem | null;
  ring: InventoryItem | null;
  amulet: InventoryItem | null;
};
