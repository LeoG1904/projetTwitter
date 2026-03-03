export interface Tweet {
  id: number;
  content: string;
  createdAt: string;
  ownerId: number;        
  parentId?: number | null;
  likeCount?: number;
  commentCount?: number;
}

export interface TweetsState {
  tweets: Tweet[];       // ← tableau par défaut
  loading: boolean;
  error: string | null;
}

export interface CreateTweetPayload {
  content: string;
  tweetParentId?: number | null;
}