export interface Like {
  id: number;
  tweetId: number;
  ownerId: number;
}

export interface LikeState {
  likesCount: Record<number, number>; // tweetId -> count
  hasLiked: Record<number, boolean>;  // tweetId -> liked by current user
  loading: boolean;
  error: string | null;
}