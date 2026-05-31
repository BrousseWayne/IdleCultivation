import type { ActiveQuest, CompletedQuest } from "@/game/types/domain";
import { QuestsDataSchema } from "@/game/data/schemas/index.ts";
import rawQuests from "@/game/data/json/quests.json";

const data = QuestsDataSchema.parse(rawQuests);

export const activeQuests: ActiveQuest[] = data.activeQuests;
export const completedQuests: CompletedQuest[] = data.completedQuests;
