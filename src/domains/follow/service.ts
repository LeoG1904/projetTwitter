import axios from "axios";
import type { FollowRequest, FollowResponse, FollowCheckResponse, FollowingIdsResponse } from "./types";

const API_URL = "http://localhost:8080/api/follows";

export const followUser = async (request: FollowRequest, token: string): Promise<FollowResponse> => {
  const res = await axios.post(`${API_URL}/follow`, request, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const unfollowUser = async (request: FollowRequest, token: string): Promise<FollowResponse> => {
  const res = await axios.post(`${API_URL}/unfollow`, request, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//   Récupérer la liste des IDs suivis par un user
export const getFollowingIds = async (userId: number, token: string): Promise<FollowingIdsResponse> => {
  const res = await axios.get<FollowingIdsResponse>(`${API_URL}/following/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//   Vérifier si le current user suit un target
export const isFollowing = async (targetUserId: number, token: string): Promise<FollowCheckResponse> => {
  const res = await axios.get<FollowCheckResponse>(`${API_URL}/check`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { targetUserId },
  });
  return res.data;
};