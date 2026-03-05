export interface Comment {
  id: number;
  content: string;
  ownerId: number;
  tweetId: number;
}

export interface CreateCommentPayload {
  content: string;
  tweetId: number;
}