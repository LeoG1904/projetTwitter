import axios from "axios";
import type { CreateTweetPayload, Tweet } from "./types";

const BASE_URL = "http://localhost:8080/api/tweets";

// TWEETS
export const getAllTweets = async (token: string): Promise<Tweet[]> => {
  const res = await axios.get<Tweet[]>(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getFilteredTweets = async (filter: "all" | "following", token: string): Promise<Tweet[]> => {
  const res = await axios.get<Tweet[]>(`${BASE_URL}/feed?filter=${filter}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTweet = async (payload: CreateTweetPayload, token: string): Promise<Tweet> => {
  const res = await axios.post<Tweet>(BASE_URL, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserTweets = async (userId: number, token: string): Promise<Tweet[]> => {
  const res = await axios.get<Tweet[]>(`${BASE_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteTweet = async (tweetId: number, token: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${tweetId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTweet = async (tweetId: number, newContent: string, token: string): Promise<Tweet> => {
  const res = await axios.put<Tweet>(
    `${BASE_URL}/${tweetId}`,
    { content: newContent },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// LIKES
export const likeTweetApi = async (tweetId: number, token: string): Promise<void> => {
  await axios.post(`${BASE_URL}/${tweetId}/like`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const unlikeTweetApi = async (tweetId: number, token: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${tweetId}/like`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchLikesCountApi = async (tweetId: number): Promise<number> => {
  const res = await axios.get<{ count: number }>(`${BASE_URL}/${tweetId}/likes/count`);
  return res.data.count;
};

export const fetchHasLikedApi = async (tweetId: number, token: string): Promise<boolean> => {
  const res = await axios.get<{ liked: boolean }>(`${BASE_URL}/${tweetId}/likes/hasLiked`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.liked;
};