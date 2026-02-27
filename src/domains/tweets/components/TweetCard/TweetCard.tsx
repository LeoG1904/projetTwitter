import { Box } from "@mui/material";
import TweetCardHeader from "./TweetHeader/TweetCardHeader";
import TweetCardContent from "./TweetCardContent/TweetCardContent";
import TweetCardActions from "./TweetCardActions/TweetCardActions";
import "./TweetCard.scss";

interface TweetCardProps {
  id: number;
  avatar: string;
  name: string;
  username: string;
  date: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  currentUser: string; // username connecté
  onDelete?: (id: number) => void;
  onEdit?: (id: number, newContent: string) => void;
}

export default function TweetCard({
  id,
  avatar,
  name,
  username,
  date,
  content,
  likes,
  retweets,
  replies,
  currentUser,
  onDelete,
  onEdit,
}: TweetCardProps) {
  const isAuthor = currentUser === username;

  return (
    <Box className="tweet-card">
      <TweetCardHeader
        avatar={avatar}
        name={name}
        username={username}
        date={date}
        isAuthor={isAuthor}
        onDelete={() => onDelete?.(id)}
        onEdit={(newContent) => onEdit?.(id, newContent)}
      />
      <TweetCardContent content={content} />
      <TweetCardActions likes={likes} retweets={retweets} replies={replies} />
    </Box>
  );
}