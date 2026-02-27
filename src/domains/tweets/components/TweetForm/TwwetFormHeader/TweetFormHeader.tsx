import { Box, Avatar, TextField } from "@mui/material";
import { useState } from "react";
import "./TweetFormHeader.scss";

interface TweetFormHeaderProps {
  avatar: string;
}

export default function TweetFormHeader({ avatar }: TweetFormHeaderProps) {
  const [content, setContent] = useState("");

  return (
    <Box className="tweet-form__header">
      <Avatar src={avatar} className="tweet-form__avatar" />
      <TextField
        className="tweet-form__textarea"
        placeholder="What's happening?"
        multiline
        maxRows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="standard"
        fullWidth
      />
    </Box>
  );
}