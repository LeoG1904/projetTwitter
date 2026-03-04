import axios from "axios";
import type {CreateTweetPayload, Tweet } from "./types";

const BASE_URL = "http://localhost:8080/api/tweets";

export const getAllTweets = async (token: string): Promise<Tweet[]> => {
  const res = await axios.get<Tweet[]>(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTweet = async (
  payload: CreateTweetPayload,
  token: string
): Promise<Tweet> => {
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