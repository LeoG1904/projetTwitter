import { Box, Avatar, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./LikeNotification.scss";

interface LikeNotificationProps {
  avatar: string;
  name: string;
  username: string;
  tweetContent: string;
  date: string;
}

export default function LikeNotification({ avatar, name, username, tweetContent, date }: LikeNotificationProps) {
  return (
    <Box className="like-notification">
      <Avatar src={avatar} className="like-notification__avatar" />
      <FavoriteIcon className="like-notification__icon" />
      <Box className="like-notification__content">
        <Typography variant="body2">
          <strong>{name}</strong> ({username}) liked your tweet: <em>"{tweetContent}"</em>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {date}
        </Typography>
      </Box>
    </Box>
  );
}