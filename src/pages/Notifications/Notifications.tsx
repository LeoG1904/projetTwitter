import { Box } from "@mui/material";
import FollowNotification from "../../domains/notifications/components/FollowNotification/FollowNotification";
import LikeNotification from "../../domains/notifications/components/LikeNotification/LikeNotification";
import "./Notifications.scss";

export default function Notifications() {
  const mockNotifications = [
    {
      type: "follow",
      avatar: "https://i.pravatar.cc/150?img=10",
      name: "Alice",
      username: "@alice",
      date: "1h",
    },
    {
      type: "like",
      avatar: "https://i.pravatar.cc/150?img=12",
      name: "Bob",
      username: "@bob",
      tweetContent: "Ceci est un tweet de test",
      date: "2h",
    },
  ];

  return (
    <Box className="notifications">
      {mockNotifications.map((n, i) => 
        n.type === "follow" ? (
          <FollowNotification
            key={i}
            avatar={n.avatar}
            name={n.name}
            username={n.username}
            date={n.date}
          />
        ) : (
          <LikeNotification
            key={i}
            avatar={n.avatar}
            name={n.name}
            username={n.username}
            tweetContent={n.tweetContent!}
            date={n.date}
          />
        )
      )}
    </Box>
  );
}