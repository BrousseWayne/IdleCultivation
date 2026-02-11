import type { InventoryItem } from "../types/domain";
import { ItemsArraySchema } from "./schemas/index.ts";
import rawItems from "./json/items.json";

export const items: InventoryItem[] = ItemsArraySchema.parse(rawItems);
