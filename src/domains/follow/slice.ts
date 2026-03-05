import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { FollowRequest } from "./types";
import { followUser, unfollowUser, getFollowingIds, isFollowing } from "./service";

interface FollowState {
  loading: boolean;
  message: string | null;
  followingIds: number[];
  isFollowingTarget: boolean;
}

const initialState: FollowState = {
  loading: false,
  message: null,
  followingIds: [],
  isFollowingTarget: false,
};

// 🔹 Thunks
export const follow = createAsyncThunk(
  "follow/followUser",
  async ({ request, token }: { request: FollowRequest; token: string }) => {
    return await followUser(request, token);
  }
);

export const unfollow = createAsyncThunk(
  "follow/unfollowUser",
  async ({ request, token }: { request: FollowRequest; token: string }) => {
    return await unfollowUser(request, token);
  }
);

export const fetchFollowingIds = createAsyncThunk(
  "follow/fetchFollowingIds",
  async ({ userId, token }: { userId: number; token: string }) => {
    return await getFollowingIds(userId, token);
  }
);

export const fetchIsFollowing = createAsyncThunk(
  "follow/fetchIsFollowing",
  async ({ targetUserId, token }: { targetUserId: number; token: string }) => {
    return await isFollowing(targetUserId, token);
  }
);

// 🔹 Slice
const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(follow.pending, (state) => { state.loading = true; })
      .addCase(follow.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(follow.rejected, (state) => {
        state.loading = false;
        state.message = "Error following user";
      })
      .addCase(unfollow.pending, (state) => { state.loading = true; })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(unfollow.rejected, (state) => {
        state.loading = false;
        state.message = "Error unfollowing user";
      })
      .addCase(fetchFollowingIds.pending, (state) => { state.loading = true; })
      .addCase(fetchFollowingIds.fulfilled, (state, action) => {
        state.loading = false;
        state.followingIds = action.payload;
      })
      .addCase(fetchFollowingIds.rejected, (state) => { state.loading = false; })
      .addCase(fetchIsFollowing.pending, (state) => { state.loading = true; })
      .addCase(fetchIsFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.isFollowingTarget = action.payload.following;
      })
      .addCase(fetchIsFollowing.rejected, (state) => { state.loading = false; });
  },
});

export default followSlice.reducer;