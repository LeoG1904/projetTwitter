import { Box, Typography, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import "./TweetCardActions.scss";

interface TweetCardActionsProps {
  likes: number;
  retweets: number;
  replies: number;
  liked?: boolean; // true si l'utilisateur a liké
  onReplyClick?: () => void;
  onLikeClick?: () => void;
  onRetweetClick?: () => void;
  onShareClick?: () => void;
}

export default function TweetCardActions({
  likes,
  retweets,
  replies,
  liked = false,
  onReplyClick,
  onLikeClick,
  onRetweetClick,
  onShareClick,
}: TweetCardActionsProps) {
  return (
    <Box className="tweet-card__actions">
      <Box className="tweet-card__action">
        <IconButton size="small" onClick={onReplyClick}>
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <Typography className="tweet-card__action-count">{replies}</Typography>
      </Box>

      <Box className="tweet-card__action">
        <IconButton size="small" onClick={onRetweetClick}>
          <RepeatIcon fontSize="small" />
        </IconButton>
        <Typography className="tweet-card__action-count">{retweets}</Typography>
      </Box>

      <Box className="tweet-card__action">
        <IconButton size="small" onClick={onLikeClick}>
          {liked ? (
            <FavoriteIcon fontSize="small" color="error" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
        <Typography className="tweet-card__action-count">{likes}</Typography>
      </Box>

      <Box className="tweet-card__action">
        <IconButton size="small" onClick={onShareClick}>
          <ShareIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}