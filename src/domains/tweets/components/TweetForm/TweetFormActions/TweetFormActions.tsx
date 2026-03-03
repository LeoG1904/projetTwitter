import { Box, Button } from "@mui/material";
import "./TweetFormActions.scss";

interface TweetFormActionsProps {
  onTweet: () => void;
}

export default function TweetFormActions({ onTweet }: TweetFormActionsProps) {
  return (
    <Box className="tweet-form__actions">
      <Button
        variant="contained"
        color="primary"
        className="tweet-form__button"
        onClick={onTweet}
      >
        Tweet
      </Button>
    </Box>
  );
}