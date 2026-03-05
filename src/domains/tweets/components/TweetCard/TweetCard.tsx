import { useState, useEffect } from "react";
import { Box, Collapse, Button } from "@mui/material";
import { useSelector } from "react-redux";

import TweetCardHeader from "./TweetHeader/TweetCardHeader";
import TweetCardContent from "./TweetCardContent/TweetCardContent";
import TweetCardActions from "./TweetCardActions/TweetCardActions";

import { useAppDispatch } from "../../../../hooks/hooks";
import { deleteTweetThunk, updateTweetThunk } from "../../slice";
import CommentList from "../../../comment/components/CommentList/CommentList";
import { like, unlike, checkHasLiked, getLikesCountThunk } from "../../../likes/slice";

import type { Tweet } from "../../types";
import type { RootState } from "../../../../app/store";

import "./TweetCard.scss";

interface TweetCardProps {
  tweet: Tweet;
  currentUser: string;
}

export default function TweetCard({ tweet, currentUser }: TweetCardProps) {
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const commentsByTweet = useSelector((state: RootState) => state.comments.commentsByTweet);

  // Likes state from Redux
  const likesCount = useSelector(
    (state: RootState) => state.likes.likesCount[tweet.id] ?? tweet.likeCount ?? 0
  );
  const hasLiked = useSelector(
    (state: RootState) => state.likes.hasLiked[tweet.id] ?? tweet.hasLiked ?? false
  );

  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isAuthor = currentUser === tweet.owner.username;
  const commentCount = commentsByTweet[tweet.id]?.length ?? tweet.commentCount ?? 0;

  // 🔹 Initial fetch of likes and whether the user has liked this tweet
  useEffect(() => {
    if (token) {
      dispatch(getLikesCountThunk({ tweetId: tweet.id, token }));
      dispatch(checkHasLiked({ tweetId: tweet.id, token }));
    }
  }, [dispatch, tweet.id, token]);

  const handleDelete = () => {
    if (!token) return;
    dispatch(deleteTweetThunk({ tweetId: tweet.id, token }));
  };

  const handleSave = (newContent: string) => {
    if (!token) return;
    dispatch(updateTweetThunk({ tweetId: tweet.id, newContent, token }));
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  const handleLikeClick = () => {
    if (!token) return;
    if (hasLiked) {
      dispatch(unlike({ tweetId: tweet.id, token }));
    } else {
      dispatch(like({ tweetId: tweet.id, token }));
    }
  };

  const handleReplyClick = () => setShowComments(!showComments);
  const handleRetweetClick = () => console.log("Retweet", tweet.id);
  const handleShareClick = () => console.log("Share", tweet.id);

  return (
    <Box className="tweet-card">
      <TweetCardHeader
        avatar={tweet.owner.avatar ?? ""}
        name={tweet.owner.name}
        username={tweet.owner.username}
        userId={tweet.owner.id}
        date={tweet.createdAt}
        isAuthor={isAuthor}
        onDelete={handleDelete}
        onEdit={() => setIsEditing(true)}
      />

      <TweetCardContent
        content={tweet.content}
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <TweetCardActions
        likes={likesCount}
        liked={hasLiked}
        retweets={0}
        replies={commentCount}
        onReplyClick={handleReplyClick}
        onLikeClick={handleLikeClick}
        onRetweetClick={handleRetweetClick}
        onShareClick={handleShareClick}
      />

      <Collapse in={showComments}>
        <Box className="tweet-card__comments">
          <CommentList tweetId={tweet.id} />
        </Box>
      </Collapse>

      <Button
        className="tweet-card__toggle-comments"
        onClick={() => setShowComments(!showComments)}
        size="small"
      >
        {showComments ? "Hide Comments" : `Show Comments (${commentCount})`}
      </Button>
    </Box>
  );
}