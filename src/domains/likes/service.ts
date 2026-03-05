import {
  likeTweet as likeTweetApi,
  unlikeTweet as unlikeTweetApi,
  getLikesCount,
  hasUserLiked
} from "./api";

export const likeTweet = async (tweetId: number, token: string) => {
  return await likeTweetApi(tweetId, token);
};

export const unlikeTweet = async (tweetId: number, token: string) => {
  return await unlikeTweetApi(tweetId, token);
};

export const fetchLikesCount = async (tweetId: number, token: string) => {
  return await getLikesCount(tweetId, token);
};

export const fetchHasLiked = async (tweetId: number, token: string) => {
  return await hasUserLiked(tweetId, token);
};