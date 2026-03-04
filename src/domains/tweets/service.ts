import type { CreateTweetPayload, Tweet } from "./types";
import { getAllTweets, createTweet, getUserTweets, deleteTweet as apiDeleteTweet, updateTweet as apiUpdateTweet } from "./api";

// 🔹 Récupérer tous les tweets
export const fetchTweets = async (token: string): Promise<Tweet[]> => {
  return await getAllTweets(token);
};

// 🔹 Créer un nouveau tweet
export const postTweet = async (payload: CreateTweetPayload, token: string): Promise<Tweet> => {
  return await createTweet(payload, token);
};

// 🔹 Récupérer les tweets d'un utilisateur
export const fetchUserTweets = async (userId: number, token: string): Promise<Tweet[]> => {
  return await getUserTweets(userId, token);
};

// 🔹 Supprimer un tweet
export const deleteTweet = async (tweetId: number, token: string): Promise<void> => {
  return await apiDeleteTweet(tweetId, token);
};

// 🔹 Mettre à jour un tweet
export const updateTweet = async (tweetId: number, newContent: string, token: string): Promise<Tweet> => {
  return await apiUpdateTweet(tweetId, newContent, token);
};