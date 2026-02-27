import { Box, Typography } from "@mui/material";
import "./TweetCardContent.scss";

interface TweetCardContentProps {
  content: string;
}

export default function TweetCardContent({ content }: TweetCardContentProps) {
  return (
    <Box className="tweet-card__content">
      <Typography>{content}</Typography>
    </Box>
  );
}