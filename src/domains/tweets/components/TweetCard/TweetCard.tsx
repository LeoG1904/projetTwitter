import { Box } from "@mui/material";
import TweetCardHeader from "./TweetHeader/TweetCardHeader";
import TweetCardContent from "./TweetCardContent/TweetCardContent";
import TweetCardActions from "./TweetCardActions/TweetCardActions";
import "./TweetCard.scss";

interface TweetCardProps {
  avatar: string;
  name: string;
  username: string;
  date: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
}

export default function TweetCard({
  avatar,
  name,
  username,
  date,
  content,
  likes,
  retweets,
  replies,
}: TweetCardProps) {
  return (
    <Box className="tweet-card">
      <TweetCardHeader avatar={avatar} name={name} username={username} date={date} />
      <TweetCardContent content={content} />
      <TweetCardActions likes={likes} retweets={retweets} replies={replies} />
    </Box>
  );
}