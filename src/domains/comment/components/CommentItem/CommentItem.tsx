import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/store";
import type { Comment } from "../../types";
import { removeComment } from "../../slice";

import "./CommentItem.scss";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleDelete = () => {
    if (!token) return;
    dispatch(removeComment({ id: comment.id, token }));
  };

  return (
    <div className="comment-item">
      <div className="comment-item__content">{comment.content}</div>
      <div className="comment-item__meta">
        <span className="comment-item__owner">User {comment.ownerId}</span>
        <button className="comment-item__delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CommentItem;