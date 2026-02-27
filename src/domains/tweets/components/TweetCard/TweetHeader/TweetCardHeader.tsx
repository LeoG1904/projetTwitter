import { Box, Avatar, Typography, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./TweetCardHeader.scss";

interface TweetCardHeaderProps {
  avatar: string;
  name: string;
  username: string;
  date: string;
  isAuthor: boolean;
  onDelete?: () => void;
  onEdit?: (newContent: string) => void;
}

export default function TweetCardHeader({
  avatar,
  name,
  username,
  date,
  isAuthor,
  onDelete,
  onEdit,
}: TweetCardHeaderProps) {
  return (
    <Box className="tweet-card-header">
      <Avatar src={avatar} className="tweet-card-header__avatar" />
      <Box className="tweet-card-header__info">
        <Typography variant="subtitle2" className="tweet-card-header__name">{name}</Typography>
        <Typography variant="caption" className="tweet-card-header__username">{username} · {date}</Typography>
      </Box>
      {isAuthor && (
        <Box className="tweet-card-header__actions">
          <IconButton size="small" onClick={() => onEdit?.("Nouveau contenu…")}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}