import type { UnlockCondition } from "@/game/types/unlocks";
import type { Effect } from "@/game/types/effects";

// Authored narrative events — the runtime schema behind prompts/claude-ai-event-generation.md.
// - interrupt: fires on the daily roll (or instantly if no chance); pauses the clock, demands a choice.
// - dialogue: opened by clicking a place action; free to open, rewards gated inside.
// - ambient: one terminal step, zero effects — pure world texture in the stream.
// - activityOutcome: rolled when a unit of the bound activity completes.
//
// Steps form a graph keyed by id: `entry` names the opening step and every
// choice `goto` names another step. Authored through defineEvent()
// (data/defineContent.ts), the whole graph is COMPILE-checked — entry, every
// goto, and every cross-reference (activity / place / action keys).

export type EventKind = "interrupt" | "dialogue" | "ambient" | "activityOutcome";

export type CalendarPeriod = "month" | "year";

export type Recurrence =
  | { type: "once" } // once per life
  | { type: "cooldown"; days: number } // re-arms after N in-game days
  | { type: "calendar"; every: CalendarPeriod; day: number }; // day index within the period

export type Chance = "common" | "uncommon" | "rare"; // absent on a definition = guaranteed once eligible (scripted)

export type GameEventDefinition<
  TActivityKey extends string = string,
  TPlaceKey extends string = string,
  TActionKey extends string = string,
> = {
  key: string;
  kind: EventKind;
  title: string;
  recurrence: Recurrence;
  conditions: readonly UnlockCondition<TActivityKey>[];
  placeKey?: TPlaceKey; // interrupt/ambient: only fires while the player is here
  actionKey?: TActionKey; // dialogue: which place action opens it
  activityKey?: TActivityKey; // activityOutcome: which activity rolls it on completion
  chance?: Chance;
  entry: string; // id of the opening step
  steps: Readonly<Record<string, EventStep<TActivityKey>>>;
};

export type EventStep<
  TActivityKey extends string = string,
  TGoto extends string = string,
> = {
  text: string;
  speaker?: string;
  effects?: readonly Effect[]; // applied on reaching this step
  choices?: readonly EventChoice<TActivityKey, TGoto>[]; // absent = terminal step (event resolves after text)
};

export type EventChoice<
  TActivityKey extends string = string,
  TGoto extends string = string,
> = {
  label: string;
  requires?: readonly UnlockCondition<TActivityKey>[]; // unmet = shown but locked
  costs?: readonly Effect[]; // paid when picked; spend_currency doubles as affordability gate
  goto?: TGoto; // next step id; absent = picking resolves the event
  effects?: readonly Effect[];
};
