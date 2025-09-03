import type { Activity } from "@/types-3/activities";
import {
  Briefcase,
  Dumbbell,
  BookOpen,
  Users,
  Coffee,
  Map,
  Swords,
} from "lucide-react";

export const activities: Activity[] = [
  {
    key: "work_farm",
    name: "Farm Work",
    icon: Briefcase,
    cost: 8,
    reward: "+money, -energy",
    category: "work",
  },
  {
    key: "train_martial",
    name: "Martial Training",
    icon: Dumbbell,
    cost: 2,
    reward: "+body, +combat",
    category: "training",
  },
  {
    key: "study_scrolls",
    name: "Study Scrolls",
    icon: BookOpen,
    cost: 2,
    reward: "+mind, +insight",
    category: "study",
  },
  {
    key: "social_tavern",
    name: "Visit Tavern",
    icon: Users,
    cost: 2,
    reward: "+contacts, +rumors",
    category: "social",
  },
  {
    key: "rest",
    name: "Rest",
    icon: Coffee,
    cost: 2,
    reward: "+energy",
    category: "life",
  },
  {
    key: "explore_forest",
    name: "Explore Forest",
    icon: Map,
    cost: 4,
    reward: "Events, loot",
    category: "adventure",
  },
  {
    key: "spar",
    name: "Spar",
    icon: Swords,
    cost: 1,
    reward: "Combat XP",
    category: "training",
  },
];
