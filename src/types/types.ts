// src/components/context/types.ts
import { LucideIcon } from "lucide-react";

export type ActivityCategory =
  | "work"
  | "training"
  | "study"
  | "social"
  | "life"
  | "hobby"
  | "adventure";

export interface Activity {
  key: string;
  name: string;
  icon: LucideIcon;
  cost: number;
  reward: string;
  category: ActivityCategory;
}

export interface Location {
  name: string;
  travel: number;
  description: string;
  x: number;
  y: number;
  connections: string[];
}

export type ItemType = "weapon" | "armor" | "consumable" | "ring" | "book";
export type Rarity = "common" | "rare" | "epic";

export interface InventoryItem {
  id: number;
  name: string;
  type: ItemType;
  rarity: Rarity;
  equipped: boolean;
}

export interface EquippedItems {
  weapon: InventoryItem | null;
  armor: InventoryItem | null;
  helmet: InventoryItem | null;
  boots: InventoryItem | null;
  ring: InventoryItem | null;
  amulet: InventoryItem | null;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  progress?: number;
  maxProgress?: number;
  reward: string;
  timeLeft?: string;
  completedDate?: string;
}

export interface StoryEntry {
  text: string;
  timestamp: string;
}

export interface EventEntry {
  date: number;
  type: "past" | "future";
  activity: string;
  result: string;
  category: string;
}
