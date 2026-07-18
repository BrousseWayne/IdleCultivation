import type { GameEvent, GameEventOf, EventHandler } from "@/game/types/events";

// Typed pub-sub between decoupled systems. Handlers are looked up by event
// type; a throwing handler is logged and the others still run.

const listeners = new Map<string, Set<EventHandler>>();

export const EventBus = {
  on<T extends GameEvent["type"]>(eventType: T, handler: (event: GameEventOf<T>) => void): void {
    if (!listeners.has(eventType)) {
      listeners.set(eventType, new Set());
    }
    listeners.get(eventType)!.add(handler as EventHandler);
  },

  off<T extends GameEvent["type"]>(eventType: T, handler: (event: GameEventOf<T>) => void): void {
    const handlers = listeners.get(eventType);
    if (handlers) {
      handlers.delete(handler as EventHandler);
      if (handlers.size === 0) {
        listeners.delete(eventType);
      }
    }
  },

  once<T extends GameEvent["type"]>(eventType: T, handler: (event: GameEventOf<T>) => void): void {
    const wrappedHandler = (event: GameEventOf<T>) => {
      handler(event);
      EventBus.off(eventType, wrappedHandler);
    };
    EventBus.on(eventType, wrappedHandler);
  },

  emit(event: GameEvent): void {
    const handlers = listeners.get(event.type);
    if (!handlers) return;
    for (const handler of handlers) {
      try {
        handler(event);
      } catch (error) {
        console.error(`EventBus: Error in handler for ${event.type}`, error);
      }
    }
  },

  clear(): void {
    listeners.clear();
  },
};
