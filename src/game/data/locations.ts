import type { Location } from "@/game/types/domain";
import { LocationsArraySchema } from "@/game/data/schemas/index.ts";
import rawLocations from "@/game/data/json/locations.json";

export const locations: Location[] = LocationsArraySchema.parse(rawLocations);
