export interface FollowRequest {
  targetUserId: number;
}

export interface FollowResponse {
  followerId: number;
  targetId: number;
  message: string;
}

// Nouveau
export interface FollowCheckResponse {
  following: boolean;
}

export type FollowingIdsResponse = number[];