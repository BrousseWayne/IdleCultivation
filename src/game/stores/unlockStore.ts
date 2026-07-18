import { create } from "zustand";
import type { ActivityCategory, NavigationItem, NavigationUnlockState } from "@/game/types/domain";
import type { ActivityUnlockState } from "@/game/types/states";
import { ALL_CATEGORIES } from "@/game/types/domain";
import { activityData, INITIALLY_UNLOCKED } from "@/game/data/activity";
import { sidebarData } from "@/game/data/navigation";
import { places } from "@/game/data/places";

// ALL unlock state lives here — navigation tabs, activity categories,
// individual activities, and places. Initial values derive from the content
// data itself (each entry's `unlocked` flag), so authoring content never
// touches this file.

interface UnlockState {
  navigation: NavigationUnlockState;
  categories: ActivityUnlockState;
  activities: Record<string, boolean>;
  places: Record<string, boolean>;

  unlockNavigation: (tab: NavigationItem) => void;
  unlockCategory: (category: ActivityCategory) => void;
  unlockActivity: (key: string) => void;
  unlockPlace: (key: string) => void;
  reset: () => void;
}

const initialUnlockState = () => ({
  navigation: Object.fromEntries(
    sidebarData.map((navigation) => [navigation.name, navigation.unlocked])
  ) as NavigationUnlockState,
  categories: Object.fromEntries(
    ALL_CATEGORIES.map((category) => [category, INITIALLY_UNLOCKED.includes(category)])
  ) as ActivityUnlockState,
  activities: Object.fromEntries(activityData.map((activity) => [activity.key, activity.unlocked])),
  places: Object.fromEntries(places.map((place) => [place.key, place.unlocked])),
});

export const useUnlockStore = create<UnlockState>((set) => ({
  ...initialUnlockState(),

  unlockNavigation: (tab) =>
    set((state) => ({ navigation: { ...state.navigation, [tab]: true } })),
  unlockCategory: (category) =>
    set((state) => ({ categories: { ...state.categories, [category]: true } })),
  unlockActivity: (key) =>
    set((state) => ({ activities: { ...state.activities, [key]: true } })),
  unlockPlace: (key) =>
    set((state) => ({ places: { ...state.places, [key]: true } })),

  reset: () => set(initialUnlockState()),
}));

// Visibility rule for activity content: the activity itself AND its category
// must be unlocked. Single source for every page that lists activities.
export function useActivityVisibility(): (activity: { key: string; category: ActivityCategory }) => boolean {
  const activities = useUnlockStore((state) => state.activities);
  const categories = useUnlockStore((state) => state.categories);
  return (activity) => !!activities[activity.key] && !!categories[activity.category];
}
