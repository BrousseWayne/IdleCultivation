import type { Activity, Place, PlaceAction, UnlockableDefinition } from "@/game/types/domain";
import type {
  Chance,
  EventKind,
  EventStep,
  GameEventDefinition,
  Recurrence,
} from "@/game/types/gameEvents";
import type { UnlockCondition } from "@/game/types/unlocks";
import type { ActivityKey } from "@/game/data/activity";
import type { PlaceKey, PlaceActionKey } from "@/game/data/places";

// Content is authored through these identity helpers. The `const` type
// parameter makes TypeScript keep every literal key, so the key unions
// (ActivityKey, PlaceKey…) derive straight from the data — and every
// cross-reference in later content is then checked by the COMPILER:
//
//   definePlaces([{ activityKeys: ["mineOre "] }])   // ← typo = red squiggle
//
// The return types deliberately WIDEN each entry back to its general shape
// (keeping only the key literals): consumers work against the normal domain
// types, not against hyper-narrow inferred ones.
//
// Self-references (an activity condition naming another activity, a place
// connecting to a place) can't be compile-checked without circular types;
// validateContent() covers those at boot.

export function defineActivities<const T extends readonly Activity[]>(
  activities: T
): readonly (Activity & { key: T[number]["key"] })[] {
  return activities;
}

type ActionKeysOf<T extends readonly Place<ActivityKey>[]> = NonNullable<
  T[number]["actions"]
>[number]["key"];

export function definePlaces<const T extends readonly Place<ActivityKey>[]>(
  places: T
): readonly (Place<ActivityKey> & {
  key: T[number]["key"];
  actions?: readonly (PlaceAction & { key: ActionKeysOf<T> })[];
})[] {
  return places;
}

export function defineUnlockables<
  const T extends readonly UnlockableDefinition<ActivityKey, PlaceKey>[],
>(unlockables: T): readonly UnlockableDefinition[] {
  return unlockables;
}

// One event at a time, because its step graph is SELF-referential: the steps
// object's own keys become the only legal values for `entry` and every
// `goto`. A dangling transition is a compile error, not a dead branch.
export function defineEvent<
  const TKey extends string,
  const TSteps extends Readonly<
    Record<string, EventStep<ActivityKey, Extract<keyof TSteps, string>>>
  >,
>(definition: {
  key: TKey;
  kind: EventKind;
  title: string;
  recurrence: Recurrence;
  conditions: readonly UnlockCondition<ActivityKey>[];
  placeKey?: PlaceKey;
  actionKey?: PlaceActionKey;
  activityKey?: ActivityKey;
  chance?: Chance;
  entry: Extract<keyof TSteps, string>;
  steps: TSteps;
}): GameEventDefinition & { key: TKey } {
  return definition as GameEventDefinition & { key: TKey };
}
