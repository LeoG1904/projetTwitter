import { Box, Avatar, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./TweetCardHeader.scss";

interface TweetCardHeaderProps {
  avatar: string;
  name: string;
  username: string;
  date: string;        // ISO string
  isAuthor: boolean;
  onDelete?: () => void;
  onEdit?: (newContent: string) => void;
}

export default function TweetCardHeader({
  avatar,
  name,
  date,
  isAuthor,
  onDelete,
  onEdit,
}: TweetCardHeaderProps) {

  // 🔹 Formater la date en "2m", "1h", "1d", etc.
  const formatDate = (isoDate: string) => {
    const createdAt = new Date(isoDate);
    const diff = Date.now() - createdAt.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "à l’instant";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <Box className="tweet-card-header">
      <Avatar src={avatar} className="tweet-card-header__avatar" />
      <Box className="tweet-card-header__info">
        <Typography variant="subtitle2" className="tweet-card-header__name">{name}</Typography>
        <Typography variant="caption" className="tweet-card-header__username">
          {formatDate(date)}
        </Typography>
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