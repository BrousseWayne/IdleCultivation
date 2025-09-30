import { useState } from "react";
import type { InventoryItem } from "../types/domain";
import type { EquippedItems } from "../types/states";
import { items } from "../data/items";

export function useInventoryManager() {
  const [equippedItems, setEquippedItems] = useState<EquippedItems>();

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(items);

  return { inventoryItems, setInventoryItems, equippedItems, setEquippedItems };
}
