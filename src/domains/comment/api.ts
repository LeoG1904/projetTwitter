import axios from "axios";
import type { Comment, CreateCommentPayload } from "./types";

const API_URL = "http://localhost:8080/api/comments";

export const fetchCommentsByTweet = async (tweetId: number, token: string): Promise<Comment[]> => {
  const res = await axios.get(`${API_URL}/tweet/${tweetId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // Toujours retourner un tableau
  return Array.isArray(res.data) ? res.data : [];
};

export const createComment = async (payload: CreateCommentPayload, token: string): Promise<Comment> => {
  const res = await axios.post<Comment>(API_URL, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteComment = async (id: number, token: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};