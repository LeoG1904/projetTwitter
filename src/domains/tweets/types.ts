

export interface TweetsState {
  tweets: Tweet[];
  loading: boolean;
  error: string | null;
}

export interface CreateTweetPayload {
  content: string;
  tweetParentId?: number | null;
}
export interface Owner {
  id: number;
  name: string;
  username: string;
  avatar?: string | null;
}

export interface Tweet {
  id: number;
  content: string;
  createdAt: string;
  owner: Owner;
  parentId?: number | null;
  likeCount?: number;
  commentCount?: number;
  hasLiked?: boolean; 
}