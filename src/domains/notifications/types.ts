export type NotificationType = "LIKE" | "FOLLOW"; // si tu veux ignorer les COMMENT pour le moment

export interface AppNotification {
  id: number;
  createdAt: string;
  type: NotificationType; // ici on limite aux types gérés
  senderId: number;
  senderUsername: string;
  isView: boolean;
}