import { Box } from "@mui/material";
import TweetFormHeader from "./TwwetFormHeader/TweetFormHeader";
import TweetFormActions from "./TweetFormActions/TweetFormActions";
import "./TweetForm.scss";

interface TweetFormProps {
  avatar: string;
  onTweet: (content: string) => void;
}

export default function TweetForm({ avatar, onTweet }: TweetFormProps) {
  return (
    <Box className="tweet-form">
      <TweetFormHeader avatar={avatar} />
      <TweetFormActions onTweet={onTweet} />
    </Box>
  );
}