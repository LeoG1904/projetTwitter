import axios from "axios";

const API_URL = "http://localhost:8080/api/likes";

export const likeTweet = async (tweetId: number, token: string) => {
  const res = await axios.post(`${API_URL}/${tweetId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const unlikeTweet = async (tweetId: number, token: string) => {
  await axios.delete(`${API_URL}/${tweetId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getLikesCount = async (tweetId: number, token: string) => {
  const res = await axios.get(`${API_URL}/count/${tweetId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const hasUserLiked = async (tweetId: number, token: string) => {
  const res = await axios.get(`${API_URL}/has-liked/${tweetId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};