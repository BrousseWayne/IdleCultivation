import { useNotificationStore, type Notification } from "../stores/notificationStore";
import { storyEntryColors } from "../data/constant";

const NotificationToast = ({ notification }: { notification: Notification }) => {
  const dismiss = useNotificationStore((s) => s.dismiss);
  const colorClass = storyEntryColors[notification.type];

  return (
    <div
      className={`flex items-start gap-3 bg-card/90 border-l-2 ${colorClass.split(" ")[0]} backdrop-blur-sm rounded-r-md px-4 py-3 shadow-lg max-w-xs cursor-pointer`}
      onClick={() => dismiss(notification.id)}
    >
      <p className={`text-xs leading-relaxed ${colorClass.split(" ")[1]}`}>
        {notification.message}
      </p>
    </div>
  );
};

export const NotificationFeed = () => {
  const notifications = useNotificationStore((s) => s.notifications);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {notifications.map((n) => (
        <div key={n.id} className="pointer-events-auto">
          <NotificationToast notification={n} />
        </div>
      ))}
    </div>
  );
};
