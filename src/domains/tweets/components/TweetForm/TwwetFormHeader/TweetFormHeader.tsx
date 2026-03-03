import { Box, Avatar, TextField } from "@mui/material";
import "./TweetFormHeader.scss";

interface TweetFormHeaderProps {
  avatar: string;
  content: string;
  setContent: (value: string) => void;
}

export default function TweetFormHeader({ avatar, content, setContent }: TweetFormHeaderProps) {
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