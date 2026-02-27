import { Box, Avatar, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./FollowNotification.scss";

interface FollowNotificationProps {
  avatar: string;
  name: string;
  username: string;
  date: string;
}

export default function FollowNotification({ avatar, name, username, date }: FollowNotificationProps) {
  return (
    <Box className="follow-notification">
      <Avatar src={avatar} className="follow-notification__avatar" />
      <PersonAddIcon className="follow-notification__icon" />
      <Box className="follow-notification__content">
        <Typography variant="body2">
          <strong>{name}</strong> ({username}) started following you.
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {date}
        </Typography>
      </Box>
    </Box>
  );
}