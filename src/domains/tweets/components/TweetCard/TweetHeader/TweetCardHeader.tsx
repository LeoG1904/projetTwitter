import { Box, Avatar, Typography } from "@mui/material";
import "./TweetCardHeader.scss";

interface TweetCardHeaderProps {
  avatar: string;
  name: string;
  username: string;
  date: string;
}

export default function TweetCardHeader({ avatar, name, username, date }: TweetCardHeaderProps) {
  return (
    <Box className="tweet-card__header">
      <Avatar src={avatar} className="tweet-card__avatar" />
      <Box className="tweet-card__info">
        <Typography className="tweet-card__name">{name}</Typography>
        <Typography className="tweet-card__username">{username} · {date}</Typography>
      </Box>
    </Box>
  );
}