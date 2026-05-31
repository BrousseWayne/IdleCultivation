import { z } from "zod";

const InventoryItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  rarity: z.string(),
});

export const ItemsArraySchema = z.array(InventoryItemSchema);
