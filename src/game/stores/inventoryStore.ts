import { create } from "zustand";
import type { InventoryItem } from "@/game/types/domain";
import type { EquippedItems } from "@/game/types/states";
import { items as initialItems } from "@/game/data/items";
import { initialCurrency } from "@/game/data/constant";
import { EntityRegistry } from "@/game/services";

type EquipmentSlot = keyof EquippedItems;

interface InventoryState {
  currency: number;
  inventoryItems: InventoryItem[];
  equippedItems: EquippedItems;

  addCurrency: (amount: number) => void;
  subtractCurrency: (amount: number) => void;

  addItem: (item: InventoryItem) => void;
  removeItem: (itemId: number) => void;

  equipItem: (itemId: number, slot: EquipmentSlot) => void;
  unequipItem: (slot: EquipmentSlot) => void;
  reset: () => void;
}

const initialEquippedItems: EquippedItems = {
  weapon: initialItems.find((item) => item.type === "weapon") ?? null,
  armor: initialItems.find((item) => item.type === "armor") ?? null,
  helmet: null,
  boots: null,
  ring: null,
  amulet: null,
};

const initialInventoryState = {
  currency: initialCurrency,
  inventoryItems: initialItems,
  equippedItems: initialEquippedItems,
};

export const useInventoryStore = create<InventoryState>((set) => ({
  ...initialInventoryState,

  addCurrency: (amount) =>
    set((state) => ({ currency: state.currency + amount })),

  subtractCurrency: (amount) =>
    set((state) => ({ currency: state.currency - amount })),

  addItem: (item) =>
    set((state) => ({ inventoryItems: [...state.inventoryItems, item] })),

  removeItem: (itemId) =>
    set((state) => {
      const newEquipped = { ...state.equippedItems };
      for (const slot of Object.keys(newEquipped) as EquipmentSlot[]) {
        if (newEquipped[slot]?.id === itemId) {
          newEquipped[slot] = null;
        }
      }
      return {
        inventoryItems: state.inventoryItems.filter((item) => item.id !== itemId),
        equippedItems: newEquipped,
      };
    }),

  equipItem: (itemId, slot) => {
    const item = EntityRegistry.get("item", String(itemId));
    if (!item) return;

    set((state) => ({
      equippedItems: {
        ...state.equippedItems,
        [slot]: item,
      },
    }));
  },

  unequipItem: (slot) => {
    set((state) => ({
      equippedItems: {
        ...state.equippedItems,
        [slot]: null,
      },
    }));
  },

  reset: () => set(initialInventoryState),
}));
