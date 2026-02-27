import { Box, Button } from "@mui/material";
import "./TweetFormActions.scss";

interface TweetFormActionsProps {
  onTweet: (content: string) => void;
}

export default function TweetFormActions({ onTweet }: TweetFormActionsProps) {
  // Pour l'instant juste le bouton Tweet
  return (
    <Box className="tweet-form__actions">
      <Button
        variant="contained"
        color="primary"
        className="tweet-form__button"
        onClick={() => onTweet("Tweet envoyé !")}
      >
        Tweet
      </Button>
    </Box>
  );
}