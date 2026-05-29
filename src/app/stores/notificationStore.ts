import { create } from "zustand";
import type { NotificationType } from "../types/domain";

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  expiresAt: number;
};

interface NotificationState {
  notifications: Notification[];
  push: (message: string, type: NotificationType, duration?: number) => void;
  dismiss: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  push: (message, type, duration = 5000) => {
    const id = `${Date.now()}-${Math.random()}`;
    const expiresAt = Date.now() + duration;
    set((state) => ({
      notifications: [...state.notifications, { id, message, type, expiresAt }],
    }));
    setTimeout(() => get().dismiss(id), duration);
  },

  dismiss: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
