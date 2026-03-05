import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import "./TweetCardContent.scss";

interface TweetCardContentProps {
  content: string;
  isEditing: boolean;
  onSave?: (newContent: string) => void;
  onCancel?: () => void;
}

export default function TweetCardContent({
  content,
  isEditing,
  onSave,
  onCancel,
}: TweetCardContentProps) {

  const [text, setText] = useState(content);

  useEffect(() => {
    setText(content);
  }, [content]);

  if (isEditing) {
    return (
      <Box className="tweet-card__content">
        <TextField
          multiline
          fullWidth
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => onSave?.(text)}
          >
            Save
          </Button>

          <Button
            size="small"
            variant="outlined"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="tweet-card__content">
      <Typography>{content}</Typography>
    </Box>
  );
}