import type { UnlockableDefinition } from "@/game/types/domain";
import { UnlockablesArraySchema } from "@/game/data/schemas/index.ts";
import rawUnlockables from "@/game/data/json/unlockables.json";

export const unlockables: UnlockableDefinition[] = UnlockablesArraySchema.parse(rawUnlockables) as UnlockableDefinition[];
