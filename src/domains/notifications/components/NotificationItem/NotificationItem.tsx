// NotificationItem.tsx
import { Box, Avatar, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./NotificationItem.scss";

export type NotificationType = "LIKE" | "FOLLOW";

interface NotificationItemProps {
  avatar: string;
  name: string;
  type: NotificationType;
  date: string;
}

export default function NotificationItem({ avatar, name, type, date }: NotificationItemProps) {
  const renderMessage = () => {
    switch (type) {
      case "FOLLOW":
        return `${name}  started following you.`;
      case "LIKE":
        return `${name}  liked your tweet.`;
      default:
        return "";
    }
  };

  const renderIcon = () => {
    switch (type) {
      case "FOLLOW":
        return <PersonAddIcon className="notification-item__icon follow" />;
      case "LIKE":
        return <FavoriteIcon className="notification-item__icon like" />;
      default:
        return null;
    }
  };

  return (
    <Box className="notification-item">
      <Avatar src={avatar} className="notification-item__avatar" />
      {renderIcon()}
      <Box className="notification-item__content">
        <Typography variant="body2">{renderMessage()}</Typography>
        <Typography variant="caption" color="textSecondary">
          {date}
        </Typography>
      </Box>
    </Box>
  );
}