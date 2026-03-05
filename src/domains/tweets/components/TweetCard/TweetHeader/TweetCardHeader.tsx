import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";

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
  onEdit?: () => void;
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

  const [openConfirm, setOpenConfirm] = useState(false);

  const formatDate = (isoDate: string) => {
    const createdAt = new Date(isoDate);
    const diff = Date.now() - createdAt.getTime();

    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const handleConfirmDelete = () => {
    setOpenConfirm(false);
    onDelete?.();
  };

  return (
    <>
      <Box className="tweet-card-header">
        <Avatar src={avatar} className="tweet-card-header__avatar" />

        <Box className="tweet-card-header__info">
          <Typography variant="subtitle2" className="tweet-card-header__name">
            {name}
          </Typography>

          <Typography variant="caption" className="tweet-card-header__username">
            @{username} · {formatDate(date)}
          </Typography>
        </Box>

        {isAuthor && (
          <Box className="tweet-card-header__actions">
            <IconButton size="small" onClick={onEdit}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton size="small" onClick={() => setOpenConfirm(true)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete this tweet?</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this tweet? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}