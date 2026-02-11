import type { ActiveQuest, CompletedQuest } from "../types/domain";
import { QuestsDataSchema } from "./schemas/index.ts";
import rawQuests from "./json/quests.json";

const data = QuestsDataSchema.parse(rawQuests);

export const activeQuests: ActiveQuest[] = data.activeQuests;
export const completedQuests: CompletedQuest[] = data.completedQuests;
