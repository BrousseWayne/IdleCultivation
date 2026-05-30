import { useGameStore } from "../stores/gameStore";
import type { GamePhase } from "../types/domain";
import { TextDataSchema, type TextData } from "./schema";
import { K, navKey, type ContentKey } from "./keys";
import rawText from "./json/text.json";

export { K, navKey };
export type { ContentKey };

const CONTENT = TextDataSchema.parse(rawText) as TextData;

function getPhase(): GamePhase {
  return useGameStore.getState().phase;
}

export function text(key: ContentKey): string {
  const entry = CONTENT[key];
  return entry[getPhase()] ?? entry.default;
}
