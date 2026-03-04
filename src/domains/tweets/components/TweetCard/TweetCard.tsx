import { Box } from "@mui/material";
import TweetCardHeader from "./TweetHeader/TweetCardHeader";
import TweetCardContent from "./TweetCardContent/TweetCardContent";
import TweetCardActions from "./TweetCardActions/TweetCardActions";
import "./TweetCard.scss";
import type { Tweet } from "../../types";

interface TweetCardProps {
  tweet: Tweet;               // ← on passe le tweet entier
  currentUser: string;        // username connecté
  onDelete?: (id: number) => void;
  onEdit?: (id: number, newContent: string) => void;
}

export default function TweetCard({
  tweet,
  currentUser,
  onDelete,
  onEdit,
}: TweetCardProps) {
  const isAuthor = currentUser === tweet.owner.username;

  return (
    <Box className="tweet-card">
      <TweetCardHeader
        avatar={tweet.owner.avatar || ""}
        name={tweet.owner.name}
        username={tweet.owner.username}
        date={tweet.createdAt}
        isAuthor={isAuthor}
        onDelete={() => onDelete?.(tweet.id)}
        onEdit={(newContent) => onEdit?.(tweet.id, newContent)}
      />
      <TweetCardContent content={tweet.content} />
      <TweetCardActions
        likes={tweet.likeCount || 0}
        retweets={0}   // à adapter si tu ajoutes les retweets
        replies={tweet.commentCount || 0}
      />
    </Box>
  );
}