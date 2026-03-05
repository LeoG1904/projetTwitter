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
  onReplyClick?: () => void; // callback pour afficher les commentaires
  onLikeClick?: () => void;  // callback futur pour liker
  onRetweetClick?: () => void; // callback futur pour retweet
  onShareClick?: () => void; // callback futur pour partager
}

export default function TweetCardActions({
  likes,
  retweets,
  replies,
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
          <FavoriteBorderIcon fontSize="small" />
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