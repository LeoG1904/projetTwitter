import type { CreateTweetPayload, Tweet } from "./types";
import * as api from "./api";

// TWEETS
export const fetchTweets = async (token: string): Promise<Tweet[]> => {
  return await api.getAllTweets(token);
};

export const postTweet = async (payload: CreateTweetPayload, token: string): Promise<Tweet> => {
  return await api.createTweet(payload, token);
};

export const fetchUserTweets = async (userId: number, token: string): Promise<Tweet[]> => {
  return await api.getUserTweets(userId, token);
};

export const deleteTweet = async (tweetId: number, token: string): Promise<void> => {
  return await api.deleteTweet(tweetId, token);
};

export const updateTweet = async (tweetId: number, newContent: string, token: string): Promise<Tweet> => {
  return await api.updateTweet(tweetId, newContent, token);
};

// LIKES
export const likeTweet = async (tweetId: number, token: string): Promise<void> => {
  return await api.likeTweetApi(tweetId, token);
};

export const unlikeTweet = async (tweetId: number, token: string): Promise<void> => {
  return await api.unlikeTweetApi(tweetId, token);
};

export const fetchLikesCount = async (tweetId: number): Promise<number> => {
  return await api.fetchLikesCountApi(tweetId);
};

export const fetchHasLiked = async (tweetId: number, token: string): Promise<boolean> => {
  return await api.fetchHasLikedApi(tweetId, token);
};