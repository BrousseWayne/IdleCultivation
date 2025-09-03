"use client";

import { createContext, useContext, useState } from "react";
import type {
  Activity,
  Location,
  InventoryItem,
  EquippedItems,
  Quest,
  StoryEntry,
  EventEntry,
} from "../../types/types";

interface GameState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activities: Record<string, number>;
  setActivities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  locations: Location[];
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  equipped: EquippedItems;
  setEquipped: React.Dispatch<React.SetStateAction<EquippedItems>>;
  quests: { active: Quest[]; completed: Quest[] };
  setQuests: React.Dispatch<
    React.SetStateAction<{ active: Quest[]; completed: Quest[] }>
  >;
  story: StoryEntry[];
  setStory: React.Dispatch<React.SetStateAction<StoryEntry[]>>;
  events: EventEntry[];
  setEvents: React.Dispatch<React.SetStateAction<EventEntry[]>>;
  timeScale: string;
  setTimeScale: (scale: string) => void;
  timePoints: number;
  setTimePoints: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  gameSpeed: number;
  setGameSpeed: (s: number) => void;
}

const GameContext = createContext<GameState | null>(null);
export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // lift all states from original monolith here
  const [activeTab, setActiveTab] = useState("Activities");
  const [activities, setActivities] = useState<Record<string, number>>({});
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("Eastern Continent");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [equipped, setEquipped] = useState<EquippedItems>({
    weapon: null,
    armor: null,
    helmet: null,
    boots: null,
    ring: null,
    amulet: null,
  });
  const [quests, setQuests] = useState<{ active: Quest[]; completed: Quest[] }>(
    { active: [], completed: [] }
  );
  const [story, setStory] = useState<StoryEntry[]>([]);
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [timeScale, setTimeScale] = useState("day");
  const [timePoints, setTimePoints] = useState(24);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);

  return (
    <GameContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activities,
        setActivities,
        locations,
        selectedLocation,
        setSelectedLocation,
        inventory,
        setInventory,
        equipped,
        setEquipped,
        quests,
        setQuests,
        story,
        setStory,
        events,
        setEvents,
        timeScale,
        setTimeScale,
        timePoints,
        setTimePoints,
        isPlaying,
        setIsPlaying,
        gameSpeed,
        setGameSpeed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
