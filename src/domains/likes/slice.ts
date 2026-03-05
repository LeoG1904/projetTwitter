import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  likeTweet,
  unlikeTweet,
  fetchLikesCount,
  fetchHasLiked
} from "./service";
import type { LikeState } from "./types";

const initialState: LikeState = {
  likesCount: {},
  hasLiked: {},
  loading: false,
  error: null
};

export const like = createAsyncThunk(
  "likes/like",
  async ({ tweetId, token }: { tweetId: number; token: string }) => {
    await likeTweet(tweetId, token);
    return tweetId;
  }
);

export const unlike = createAsyncThunk(
  "likes/unlike",
  async ({ tweetId, token }: { tweetId: number; token: string }) => {
    await unlikeTweet(tweetId, token);
    return tweetId;
  }
);

export const getLikesCountThunk = createAsyncThunk(
  "likes/count",
  async (tweetId: number) => {
    const count = await fetchLikesCount(tweetId);
    return { tweetId, count };
  }
);

export const checkHasLiked = createAsyncThunk(
  "likes/check",
  async ({ tweetId, token }: { tweetId: number; token: string }) => {
    const liked = await fetchHasLiked(tweetId, token);
    return { tweetId, liked };
  }
);

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // LIKE
      .addCase(like.fulfilled, (state, action) => {
        const tweetId = action.payload;
        state.hasLiked[tweetId] = true;
        state.likesCount[tweetId] = (state.likesCount[tweetId] || 0) + 1;
      })

      // UNLIKE
      .addCase(unlike.fulfilled, (state, action) => {
        const tweetId = action.payload;
        state.hasLiked[tweetId] = false;
        state.likesCount[tweetId] = Math.max(
          (state.likesCount[tweetId] || 1) - 1,
          0
        );
      })

      // COUNT
      .addCase(getLikesCountThunk.fulfilled, (state, action) => {
        state.likesCount[action.payload.tweetId] = action.payload.count;
      })

      // HAS LIKED
      .addCase(checkHasLiked.fulfilled, (state, action) => {
        state.hasLiked[action.payload.tweetId] = action.payload.liked;
      });
  }
});

export default likeSlice.reducer;