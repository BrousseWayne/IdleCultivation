import { defineEvent } from "@/game/data/defineContent";

// Narrative event content. Authored against the schema in types/gameEvents.ts;
// magnitudes come from data/balance.ts (COIN/STAT/HP), never raw numbers.
// The claude.ai generation batch (prompts/claude-ai-event-generation.md)
// lands here. The elder dialogue below is a PLACEHOLDER proving the runtime —
// replace it with the generated batch.

export const eventData = [
  defineEvent({
    key: "elderFirstWords",
    kind: "dialogue",
    title: "The ragged elder",
    recurrence: { type: "once" },
    conditions: [],
    actionKey: "elder",
    entry: "greet",
    steps: {
      greet: {
        text: "\"You again. Sit, if you must. The stones are free.\"",
        speaker: "Ragged elder",
        choices: [
          { label: "\"Do you know the old man from the ox-cart?\"", goto: "cart" },
          { label: "Leave him be." },
        ],
      },
      cart: {
        text: "\"A cart. A road. A boy with more questions than copper.\" He closes his eyes. \"Ask the road.\"",
        speaker: "Ragged elder",
      },
    },
  }),
];
