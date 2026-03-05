import * as api from "./api";
import type { Comment, CreateCommentPayload } from "./types";

export const commentService = {
  fetchCommentsByTweet: (tweetId: number, token: string): Promise<Comment[]> =>
    api.fetchCommentsByTweet(tweetId, token),

  createComment: (payload: CreateCommentPayload, token: string): Promise<Comment> =>
    api.createComment(payload, token),

  deleteComment: (id: number, token: string): Promise<void> =>
    api.deleteComment(id, token),
};