import axios from "axios";
import type { AppNotification } from "./types";

const API_BASE = "http://localhost:8080/api/notifications";

export const fetchNotificationsApi = async (token: string): Promise<AppNotification[]> => {
  const response = await axios.get<AppNotification[]>(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const markAllNotificationsViewedApi = async (token: string): Promise<void> => {
  await axios.post(`${API_BASE}/view-all`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};