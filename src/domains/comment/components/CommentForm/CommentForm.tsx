import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/store";
import type { CreateCommentPayload } from "../../types";
import { addComment, fetchComments } from "../../slice";

import "./CommentForm.scss";

interface CommentFormProps {
  tweetId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ tweetId }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !token) return;

    const payload: CreateCommentPayload = { content, tweetId };
    dispatch(addComment({ payload, token })).then(() => {
      setContent("");
      dispatch(fetchComments({ tweetId, token })); // refresh list
    });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        className="comment-form__input"
        type="text"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="comment-form__button" type="submit">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;