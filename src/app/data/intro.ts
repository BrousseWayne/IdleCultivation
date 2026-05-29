import type { Background } from "../types/domain";

export type IntroChoice = {
  label: string;
  tags: Background[];
};

export type IntroExchange = {
  id: string;
  text: string;
  choices: IntroChoice[];
};

export type BackgroundDefinition = {
  id: Background;
  name: string;
  description: string;
  openingNarration: string;
};

export const introDialogue: IntroExchange[] = [
  {
    id: "origins",
    text: "The ox-cart groans along a mud road. Beside you, an old man with white hair and still eyes watches the passing trees. He does not look at you when he speaks.\n\n\"Child. Where did you come from?\"",
    choices: [
      {
        label: "\"From the fields, Elder. My family works the land.\"",
        tags: ["farmer"],
      },
      {
        label: "\"Nowhere worth remembering.\"",
        tags: ["orphan"],
      },
      {
        label: "\"The Iron Banner garrison. My father serves there.\"",
        tags: ["soldier"],
      },
    ],
  },
  {
    id: "purpose",
    text: "He hums once. A sound that could mean anything.\n\n\"And what waits for you in Ironveil City?\"",
    choices: [
      {
        label: "\"Work. My family does not eat without coin.\"",
        tags: ["farmer"],
      },
      {
        label: "\"I will know it when I find it.\"",
        tags: ["orphan"],
      },
      {
        label: "\"A posting. I know nothing else but service.\"",
        tags: ["soldier"],
      },
    ],
  },
  {
    id: "nature",
    text: "The cart hits a rut. He steadies himself without seeming to notice.\n\n\"When someone wrongs you — what do you do?\"",
    choices: [
      {
        label: "\"Endure it. There is always more work tomorrow.\"",
        tags: ["farmer"],
      },
      {
        label: "\"Remember it. And wait.\"",
        tags: ["orphan"],
      },
      {
        label: "\"Answer it.\"",
        tags: ["soldier"],
      },
    ],
  },
  {
    id: "desire",
    text: "The walls of Ironveil rise ahead. He turns to look at you for the first time. His eyes are not clouded — they are sharp as broken jade.\n\n\"One last thing. What do you want from this life?\"\n\nHe steps off the moving cart — and is simply gone before he touches the ground.",
    choices: [
      {
        label: "\"To see my family fed and warm.\"",
        tags: ["farmer"],
      },
      {
        label: "\"To belong somewhere. Anywhere.\"",
        tags: ["orphan"],
      },
      {
        label: "\"To be someone others do not dare to cross.\"",
        tags: ["soldier"],
      },
    ],
  },
];

export const introClosingText =
  "The gate guard waves you through without looking up.\n\nThe city swallows you whole.";

export const backgroundDefinitions: Record<Background, BackgroundDefinition> =
  {
    farmer: {
      id: "farmer",
      name: "Child of the Earth",
      description:
        "Born of tilled soil and early mornings. Your body is used to labour. Your wants are simple.",
      openingNarration:
        "You arrive in Ironveil with mud still on your boots and a hunger you have learned to ignore. The city is loud. Everything costs money you do not have.",
    },
    orphan: {
      id: "orphan",
      name: "Child of the Wind",
      description:
        "No roots, no weight. You have survived on wit alone — and the road has made you quick.",
      openingNarration:
        "You arrive in Ironveil knowing no one and owing nothing. In a city this size, that is either a curse or a gift. You have not yet decided which.",
    },
    soldier: {
      id: "soldier",
      name: "Child of Iron",
      description:
        "Raised in the shadow of the garrison. You know discipline, and discipline knows you.",
      openingNarration:
        "You arrive in Ironveil with a straight back and a letter of introduction that nobody here has asked to read. The city does not care about your father's rank.",
    },
  };

export function resolveBackground(
  tagCounts: Record<Background, number>
): Background {
  const sorted = (
    Object.entries(tagCounts) as [Background, number][]
  ).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}
