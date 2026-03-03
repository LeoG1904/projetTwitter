// TweetForm.tsx
import { useState } from "react";
import { Box } from "@mui/material";
import TweetFormHeader from "./TwwetFormHeader/TweetFormHeader";
import TweetFormActions from "./TweetFormActions/TweetFormActions";
import "./TweetForm.scss";

interface TweetFormProps {
  avatar: string;
  onTweet: (content: string) => void;
}

export default function TweetForm({ avatar, onTweet }: TweetFormProps) {
  const [content, setContent] = useState("");

  const handleTweet = () => {
    if (!content.trim()) return;
    onTweet(content);
    setContent(""); // reset après envoi
  };

  return (
    <Box className="tweet-form">
      <TweetFormHeader avatar={avatar} content={content} setContent={setContent} />
      <TweetFormActions onTweet={handleTweet} />
    </Box>
  );
}