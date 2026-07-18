import type { Activity, InventoryItem, Location, SidebarNavigation } from "@/game/types/domain";

// O(1) lookup of content entities by key, seeded once in main.tsx before
// React mounts. A plain module with closed-over maps — no class ceremony.

export interface EntityTypeMap {
  activity: Activity;
  item: InventoryItem;
  location: Location;
  navigation: SidebarNavigation;
}

export type EntityType = keyof EntityTypeMap;

const registries: { [T in EntityType]: Map<string, EntityTypeMap[T]> } = {
  activity: new Map(),
  item: new Map(),
  location: new Map(),
  navigation: new Map(),
};

export const EntityRegistry = {
  register<T extends EntityType>(type: T, id: string, entity: EntityTypeMap[T]): void {
    registries[type].set(id, entity);
  },

  get<T extends EntityType>(type: T, id: string): EntityTypeMap[T] | undefined {
    return registries[type].get(id);
  },

  getAll<T extends EntityType>(type: T): EntityTypeMap[T][] {
    return Array.from(registries[type].values());
  },

  has(type: EntityType, id: string): boolean {
    return registries[type].has(id);
  },

  clear(): void {
    for (const registry of Object.values(registries)) registry.clear();
  },
};
