import type { GameEvent, EventHandler } from "../types/events";

class EventBusService {
  private listeners = new Map<string, Set<EventHandler>>();

  on(eventType: string, handler: EventHandler): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(handler);
  }

  off(eventType: string, handler: EventHandler): void {
    const handlers = this.listeners.get(eventType);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.listeners.delete(eventType);
      }
    }
  }

  emit(event: GameEvent): void {
    const handlers = this.listeners.get(event.type);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(event);
        } catch (error) {
          console.error(`EventBus: Error in handler for ${event.type}`, error);
        }
      });
    }
  }

  once(eventType: string, handler: EventHandler): void {
    const wrappedHandler = (event: any) => {
      handler(event);
      this.off(eventType, wrappedHandler);
    };
    this.on(eventType, wrappedHandler);
  }

  clear(): void {
    this.listeners.clear();
  }
}

export const EventBus = new EventBusService();
