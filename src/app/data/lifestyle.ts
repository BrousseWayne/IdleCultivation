import type { LifestyleCategoryData } from "../types/domain";
import { LifestyleArraySchema } from "./schemas/index.ts";
import rawLifestyle from "./json/lifestyle.json";

export const lifestyleOptions: LifestyleCategoryData[] = LifestyleArraySchema.parse(rawLifestyle) as LifestyleCategoryData[];
