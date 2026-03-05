import { useState } from "react";
import { Box, Collapse, Button } from "@mui/material";
import { useSelector } from "react-redux";

import TweetCardHeader from "./TweetHeader/TweetCardHeader";
import TweetCardContent from "./TweetCardContent/TweetCardContent";
import TweetCardActions from "./TweetCardActions/TweetCardActions";

import { useAppDispatch } from "../../../../hooks/hooks";
import { deleteTweetThunk, updateTweetThunk } from "../../slice";

import type { Tweet } from "../../types";
import type { RootState } from "../../../../app/store";


import "./TweetCard.scss";
import CommentList from "../../../comment/components/CommentList/CommentList";

interface TweetCardProps {
  tweet: Tweet;
  currentUser: string;
}

export default function TweetCard({ tweet, currentUser }: TweetCardProps) {
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isAuthor = currentUser === tweet.owner.username;

  const handleDelete = () => {
    if (!token) return;
    dispatch(deleteTweetThunk({ tweetId: tweet.id, token }));
  };

  const handleSave = (newContent: string) => {
    if (!token) return;
    dispatch(updateTweetThunk({ tweetId: tweet.id, newContent, token }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Box className="tweet-card">
      <TweetCardHeader
        avatar={tweet.owner.avatar || ""}
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
        likes={tweet.likeCount || 0}
        retweets={0}
        replies={tweet.commentCount || 0}
        onReplyClick={() => setShowComments(!showComments)}
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
        {showComments ? "Hide Comments" : `Show Comments (${tweet.commentCount || 0})`}
      </Button>
    </Box>
  );
}