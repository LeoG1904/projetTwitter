import { Box, Typography, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import "./TweetCardActions.scss";

interface TweetCardActionsProps {
  likes: number;
  retweets: number;
  replies: number;
}

export default function TweetCardActions({ likes, retweets, replies }: TweetCardActionsProps) {
  return (
    <Box className="tweet-card__actions">
      <Box className="tweet-card__action">
        <IconButton size="small"><ChatBubbleOutlineIcon fontSize="small" /></IconButton>
        <Typography>{replies}</Typography>
      </Box>
      <Box className="tweet-card__action">
        <IconButton size="small"><RepeatIcon fontSize="small" /></IconButton>
        <Typography>{retweets}</Typography>
      </Box>
      <Box className="tweet-card__action">
        <IconButton size="small"><FavoriteBorderIcon fontSize="small" /></IconButton>
        <Typography>{likes}</Typography>
      </Box>
      <Box className="tweet-card__action">
        <IconButton size="small"><ShareIcon fontSize="small" /></IconButton>
      </Box>
    </Box>
  );
}