import type { Activity, InventoryItem, Location, SidebarNavigation } from "../types/domain";

interface EntityTypeMap {
  activity: Activity;
  item: InventoryItem;
  location: Location;
  navigation: SidebarNavigation;
}

type EntityType = keyof EntityTypeMap;

class EntityRegistryService {
  private registries = new Map<EntityType, Map<string, unknown>>();

  constructor() {
    this.registries.set('activity', new Map());
    this.registries.set('item', new Map());
    this.registries.set('location', new Map());
    this.registries.set('navigation', new Map());
  }

  register<T extends EntityType>(type: T, id: string, entity: EntityTypeMap[T]): void {
    const registry = this.registries.get(type);
    if (!registry) {
      console.warn(`EntityRegistry: Unknown type "${type}"`);
      return;
    }
    registry.set(id, entity);
  }

  get<T extends EntityType>(type: T, id: string): EntityTypeMap[T] | undefined {
    const registry = this.registries.get(type);
    if (!registry) {
      console.warn(`EntityRegistry: Unknown type "${type}"`);
      return undefined;
    }
    return registry.get(id) as EntityTypeMap[T] | undefined;
  }

  getAll<T extends EntityType>(type: T): EntityTypeMap[T][] {
    const registry = this.registries.get(type);
    if (!registry) {
      console.warn(`EntityRegistry: Unknown type "${type}"`);
      return [];
    }
    return Array.from(registry.values()) as EntityTypeMap[T][];
  }

  has(type: EntityType, id: string): boolean {
    const registry = this.registries.get(type);
    if (!registry) return false;
    return registry.has(id);
  }

  clear(): void {
    this.registries.forEach(registry => registry.clear());
  }
}

export const EntityRegistry = new EntityRegistryService();
