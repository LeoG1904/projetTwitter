import { Box } from "@mui/material";
import TweetCardHeader from "./TweetHeader/TweetCardHeader";
import TweetCardContent from "./TweetCardContent/TweetCardContent";
import TweetCardActions from "./TweetCardActions/TweetCardActions";
import "./TweetCard.scss";
import { useSelector } from "react-redux";
import type { Tweet } from "../../types";
import { useAppDispatch } from "../../../../hooks/hooks";
import { deleteTweetThunk, updateTweetThunk } from "../../slice";
import type { RootState } from "../../../../app/store";

interface TweetCardProps {
  tweet: Tweet;               
  currentUser: string;        
}

export default function TweetCard({ tweet, currentUser }: TweetCardProps) {
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthor = currentUser === tweet.owner.username;

  const handleDelete = () => {
    if (!token) return;
    dispatch(deleteTweetThunk({ tweetId: tweet.id, token }));
  };

  const handleEdit = (newContent: string) => {
    if (!token) return;
    dispatch(updateTweetThunk({ tweetId: tweet.id, newContent, token }));
  };

  return (
    <Box className="tweet-card">
      <TweetCardHeader
        avatar={tweet.owner.avatar || ""}
        name={tweet.owner.name}
        username={tweet.owner.username}
        date={tweet.createdAt}
        isAuthor={isAuthor}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <TweetCardContent content={tweet.content} />
      <TweetCardActions
        likes={tweet.likeCount || 0}
        retweets={0}   
        replies={tweet.commentCount || 0}
      />
    </Box>
  );
}