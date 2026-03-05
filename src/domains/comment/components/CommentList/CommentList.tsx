import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../app/store";

import "./CommentList.scss";
import { fetchComments } from "../../slice";
import CommentItem from "../CommentItem/CommentItem";
import CommentForm from "../CommentForm/CommentForm";

interface CommentListProps {
  tweetId: number;
}

const CommentList: React.FC<CommentListProps> = ({ tweetId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);
  const token = useSelector((state: RootState) => state.auth.token); // récupérer le token

  useEffect(() => {
    if (token) {
      dispatch(fetchComments({ tweetId, token })); // passer le token
    }
  }, [dispatch, tweetId, token]);

  // fallback pour éviter crash si comments n’est pas un tableau
  const safeComments = Array.isArray(comments) ? comments : [];

  return (
    <div className="comment-list">
      <CommentForm tweetId={tweetId} />
      {loading && <p className="comment-list__loading">Loading comments...</p>}
      {error && <p className="comment-list__error">{error}</p>}
      {safeComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;