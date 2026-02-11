import type { Location } from "../types/domain";
import { LocationsArraySchema } from "./schemas/index.ts";
import rawLocations from "./json/locations.json";

export const locations: Location[] = LocationsArraySchema.parse(rawLocations);
