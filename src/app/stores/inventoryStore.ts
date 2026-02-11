import { create } from "zustand";
import type { InventoryItem } from "../types/domain";
import type { EquippedItems } from "../types/states";
import { items as initialItems } from "../data/items";
import { initialPlayerMoney } from "../data/constant";
import { EntityRegistry } from "../services";

type EquipmentSlot = keyof EquippedItems;

interface InventoryState {
  spiritStones: number;
  inventoryItems: InventoryItem[];
  equippedItems: EquippedItems;
  dailyExpenses: number;
  dailyIncome: number;

  addSpiritStones: (amount: number) => void;
  subtractSpiritStones: (amount: number) => void;
  setSpiritStones: (amount: number) => void;

  addItem: (item: InventoryItem) => void;
  removeItem: (itemId: number) => void;
  setInventoryItems: (items: InventoryItem[]) => void;

  equipItem: (itemId: number, slot: EquipmentSlot) => void;
  unequipItem: (slot: EquipmentSlot) => void;
  setEquippedItems: (equipped: EquippedItems) => void;

  setDailyExpenses: (amount: number) => void;
  setDailyIncome: (amount: number) => void;
}

const initialEquippedItems: EquippedItems = {
  weapon: initialItems.find((i) => i.type === "weapon") ?? null,
  armor: initialItems.find((i) => i.type === "armor") ?? null,
  helmet: null,
  boots: null,
  ring: null,
  amulet: null,
};

export const useInventoryStore = create<InventoryState>((set, get) => ({
  spiritStones: initialPlayerMoney,
  inventoryItems: initialItems,
  equippedItems: initialEquippedItems,
  dailyExpenses: 0,
  dailyIncome: 0,

  addSpiritStones: (amount) =>
    set((state) => ({ spiritStones: state.spiritStones + amount })),

  subtractSpiritStones: (amount) =>
    set((state) => ({ spiritStones: state.spiritStones - amount })),

  setSpiritStones: (amount) => set({ spiritStones: amount }),

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
        inventoryItems: state.inventoryItems.filter((i) => i.id !== itemId),
        equippedItems: newEquipped,
      };
    }),

  setInventoryItems: (items) => set({ inventoryItems: items }),

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

  setEquippedItems: (equipped) => set({ equippedItems: equipped }),

  setDailyExpenses: (amount) => set({ dailyExpenses: amount }),
  setDailyIncome: (amount) => set({ dailyIncome: amount }),
}));
