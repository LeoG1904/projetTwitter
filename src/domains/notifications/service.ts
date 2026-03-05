import * as api from "./api";
import type { AppNotification } from "./types";

export const fetchNotifications = async (token: string): Promise<AppNotification[]> => {
  return api.fetchNotificationsApi(token);
};

export const markAllNotificationsViewed = async (token: string): Promise<void> => {
  return api.markAllNotificationsViewedApi(token);
};