import { EntityRegistry } from "@/game/services/EntityRegistry";
import { activityData } from "@/game/data/activity";
import { items } from "@/game/data/items";
import { locations } from "@/game/data/locations";
import { sidebarData } from "@/game/data/navigation";

// Seeds the entity registry from content data. Shared by the real boot
// (main.tsx), the test harness, and the simulation CLI — one boot, three hosts.
export function registerContent(): void {
  activityData.forEach((activity) => EntityRegistry.register("activity", activity.key, activity));
  items.forEach((item) => EntityRegistry.register("item", String(item.id), item));
  locations.forEach((location) => EntityRegistry.register("location", location.name, location));
  sidebarData.forEach((navigation) => EntityRegistry.register("navigation", navigation.name, navigation));
}
