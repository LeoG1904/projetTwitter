import { Box } from "@mui/material";
import { useEffect } from "react";
import "./Notifications.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchNotificationsThunk,
  markAllNotificationsViewedThunk,
} from "../../domains/notifications/slice";
import type { AppNotification } from "../../domains/notifications/types";
import NotificationItem from "../../domains/notifications/components/NotificationItem/NotificationItem";

export default function Notifications() {
  const dispatch = useAppDispatch();
  const { notifications, loading } = useAppSelector((state) => state.notifications);
  const token = useAppSelector((state) => state.auth.token);

  // charger les notifications
  useEffect(() => {
    if (token) {
      dispatch(fetchNotificationsThunk(token));
    }
  }, [dispatch, token]);

  // marquer comme vues
  useEffect(() => {
    if (token && notifications.length > 0) {
      dispatch(markAllNotificationsViewedThunk(token));
    }
  }, [dispatch, token, notifications.length]);

  if (loading) return <Box className="notifications">Chargement...</Box>;

  return (
    <Box className="notifications">
      {notifications.map((n: AppNotification) => {
        const date = new Date(n.createdAt).toLocaleTimeString();

        return (
          <NotificationItem
            key={n.id}
            avatar={`https://i.pravatar.cc/150?img=${n.senderId}`}
            name={n.senderUsername}
            type={n.type}
            date={date}
          />
        );
      })}
    </Box>
  );
}