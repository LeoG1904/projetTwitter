import { getAllTweets, createTweet } from "./api";
import type { CreateTweetPayload, Tweet } from "./types";

export const fetchTweets = async (token: string): Promise<Tweet[]> => {
  const res = await getAllTweets(token);
  return res;
};

export const postTweet = async (
  payload: CreateTweetPayload,
  token: string
): Promise<Tweet> => {
  return await createTweet(payload, token);
};