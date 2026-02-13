import type { UnlockableDefinition } from "../types/domain";
import { UnlockablesArraySchema } from "./schemas/index.ts";
import rawUnlockables from "./json/unlockables.json";

export const unlockables: UnlockableDefinition[] = UnlockablesArraySchema.parse(rawUnlockables) as UnlockableDefinition[];
