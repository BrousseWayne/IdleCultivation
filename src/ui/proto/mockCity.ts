// Throwaway mock data for Explore design prototypes. Not wired to the game.
import type { LucideIcon } from "lucide-react";
import {
  HandCoins,
  Pickaxe,
  Wheat,
  Users,
  HeartHandshake,
  Utensils,
  Lock,
  Footprints,
  Store,
  Hammer,
  Shield,
} from "lucide-react";

export type ProtoMove = {
  key: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  kind: "activity" | "talk" | "shop";
};

export type ProtoPlace = {
  key: string;
  name: string;
  blurb: string;
  x: number; // % for map
  y: number;
  icon: LucideIcon;
  color: string; // hex, the place's district hue
  moves: ProtoMove[];
  connections: string[];
  unlocked: boolean;
};

export const PROTO_PLACES: Record<string, ProtoPlace> = {
  streets: {
    key: "streets",
    name: "Ironveil Streets",
    blurb:
      "Mud and noise. The crowd moves around you as though you were a post in the ground. Your begging bowl holds three dull coins.",
    x: 30,
    y: 55,
    icon: Footprints,
    color: "#E07856",
    connections: ["market", "laborYard", "garrison"],
    unlocked: true,
    moves: [
      { key: "beg", label: "Beg by the gate", detail: "8h · earn coin", icon: HandCoins, kind: "activity" },
      { key: "elder", label: "Speak to the ragged elder", detail: "he watches you", icon: Users, kind: "talk" },
    ],
  },
  market: {
    key: "market",
    name: "Market Square",
    blurb:
      "Merchants haggle beneath faded banners. The smell of fried dough makes your stomach fold in on itself.",
    x: 62,
    y: 35,
    icon: Store,
    color: "#D4AF6A",
    connections: ["streets"],
    unlocked: true,
    moves: [
      { key: "network", label: "Make yourself useful", detail: "6h · earn silver", icon: Users, kind: "activity" },
      { key: "stall", label: "Food stall", detail: "spend coin to eat", icon: Utensils, kind: "shop" },
      { key: "elders", label: "Help the elders", detail: "4h · earn coin", icon: HeartHandshake, kind: "activity" },
    ],
  },
  laborYard: {
    key: "laborYard",
    name: "Labor Yard",
    blurb:
      "Carts, crates, and foremen barking for hands. Honest coin for an aching back.",
    x: 20,
    y: 22,
    icon: Hammer,
    color: "#5FB4A0",
    connections: ["streets"],
    unlocked: true,
    moves: [
      { key: "mine", label: "Haul ore", detail: "8h · earn coin, +Strength", icon: Pickaxe, kind: "activity" },
      { key: "farm", label: "Work the fields", detail: "6h · earn coin", icon: Wheat, kind: "activity" },
    ],
  },
  garrison: {
    key: "garrison",
    name: "Iron Banner Garrison",
    blurb: "Soldiers drill behind the wall. The gate is barred to the likes of you — for now.",
    x: 78,
    y: 70,
    icon: Shield,
    color: "#6BA3D4",
    connections: ["streets"],
    unlocked: false,
    moves: [
      { key: "locked", label: "Barred", detail: "you are turned away", icon: Lock, kind: "talk" },
    ],
  },
};

export const PROTO_START = "streets";

// --- dialogue mock (flowing conversation) ---
export type ProtoTheme = "ambient" | "income" | "event" | "dialogue" | "travel";
export type ProtoLine = { speaker: string; text: string; tone?: "npc" | "self" | "narration"; theme?: ProtoTheme };
export type ProtoChoice = { label: string; reply: ProtoLine[] };

export const PROTO_DIALOGUE: { name: string; intro: ProtoLine[]; choices: ProtoChoice[] } = {
  name: "The Ragged Elder",
  intro: [
    { speaker: "", text: "An old man with white hair and still eyes watches you from the gutter. He does not look away when you notice.", tone: "narration" },
    { speaker: "Elder", text: "Child. You have the look of someone the city has already chewed and spat out.", tone: "npc" },
    { speaker: "Elder", text: "Tell me — when someone wrongs you, what do you do?", tone: "npc" },
  ],
  choices: [
    {
      label: "\"Endure it. There is always tomorrow.\"",
      reply: [
        { speaker: "You", text: "Endure it. There is always more work tomorrow.", tone: "self" },
        { speaker: "Elder", text: "Mm. Patience is a blade that never dulls — or a cage you build yourself. We shall see which.", tone: "npc" },
      ],
    },
    {
      label: "\"Remember it. And wait.\"",
      reply: [
        { speaker: "You", text: "Remember it. And wait.", tone: "self" },
        { speaker: "Elder", text: "A long memory. The heavens keep one too, you know. They are not always kind about it.", tone: "npc" },
      ],
    },
    {
      label: "\"Answer it. At once.\"",
      reply: [
        { speaker: "You", text: "Answer it. At once.", tone: "self" },
        { speaker: "Elder", text: "Fire. Good kindling, poor firewood. It burns the hand that holds it as often as the foe.", tone: "npc" },
      ],
    },
  ],
};

// a few canned transcript lines for flavor
export const PROTO_LOG = [
  "You arrive in Ironveil with mud on your boots.",
  "A guard waves you through without looking up.",
  "You earned 3 copper begging by the gate.",
];

// a canned event the persistent-stream protos can fire on demand
export const PROTO_EVENT: { lines: ProtoLine[]; choices: ProtoChoice[] } = {
  lines: [
    { speaker: "", text: "A lacquered carriage stops. A youth in silk steps down and looks at you the way one looks at a stain.", tone: "narration" },
    { speaker: "Young Master", text: "You. Beggar. You are in this young master's way. Move, or be moved.", tone: "npc" },
  ],
  choices: [
    { label: "Step aside, eyes down.", reply: [{ speaker: "", text: "You shuffle aside. He sneers and is gone. Something in you files the moment away.", tone: "narration" }] },
    { label: "Hold your ground.", reply: [{ speaker: "", text: "You don't move. A guard's baton meets your ribs before the youth even speaks again.", tone: "narration" }] },
  ],
};
