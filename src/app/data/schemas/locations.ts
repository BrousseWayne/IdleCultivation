import { z } from "zod";

const LocationSchema = z.object({
  name: z.string(),
  travel: z.number(),
  description: z.string(),
  x: z.number(),
  y: z.number(),
  connections: z.array(z.string()),
});

export const LocationsArraySchema = z.array(LocationSchema);
