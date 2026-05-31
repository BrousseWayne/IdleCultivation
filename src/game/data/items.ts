import type { InventoryItem } from "@/game/types/domain";
import { ItemsArraySchema } from "@/game/data/schemas/index.ts";
import rawItems from "@/game/data/json/items.json";

export const items: InventoryItem[] = ItemsArraySchema.parse(rawItems);
