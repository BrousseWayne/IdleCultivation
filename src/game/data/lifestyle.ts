import type { LifestyleCategoryData } from "@/game/types/domain";
import { LifestyleArraySchema } from "@/game/data/schemas/index.ts";
import rawLifestyle from "@/game/data/json/lifestyle.json";

export const lifestyleOptions: LifestyleCategoryData[] = LifestyleArraySchema.parse(rawLifestyle) as LifestyleCategoryData[];
