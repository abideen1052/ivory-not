export type NotificationType = "info" | "success" | "error" | "warning";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: number; // timestamp
  isRead: boolean;
}

export const TYPE_COLORS: Record<NotificationType, string> = {
  info: "#3B82F6", // Blue
  success: "#22C55E", // Green
  error: "#EF4444", // Red
  warning: "#A855F7", // Purple
};

const TITLES = [
  "Payment Received",
  "New Message",
  "System Alert",
  "Profile Updated",
  "Security Warning",
  "Weekly Summary",
];

const BODIES = [
  "Your recent transaction was successful.",
  "You have a new message waiting.",
  "Please review the system alert.",
  "Your profile changes were saved.",
  "Suspicious activity detected.",
  "Here is your activity summary.",
];

const TYPES: NotificationType[] = ["info", "success", "error", "warning"];

export const generateMockNotifications = (count = 100): NotificationItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `notif-${i + 1}`,
    type: TYPES[i % TYPES.length],
    title: TITLES[i % TITLES.length],
    body: BODIES[i % BODIES.length],
    createdAt: Date.now() - i * 1000 * 60 * 5, // every 5 mins
    isRead: Math.random() > 0.5,
  }));
};
