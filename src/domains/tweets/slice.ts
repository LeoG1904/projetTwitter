import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as tweetService from "./service";
import type { CreateTweetPayload, Tweet } from "./types";

interface TweetsState {
  tweets: Tweet[];
  loading: boolean;
  error?: string;
}

const initialState: TweetsState = {
  tweets: [],
  loading: false,
};

// ========================
// THUNKS
// ========================

// 🔹 Fetch all tweets
export const fetchTweetsThunk = createAsyncThunk(
  "tweets/fetchAll",
  async (token: string, { rejectWithValue }) => {
    try {
      return await tweetService.fetchTweets(token);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔹 Create new tweet
export const createTweetThunk = createAsyncThunk(
  "tweets/create",
  async (
    { payload, token }: { payload: CreateTweetPayload; token: string },
    { rejectWithValue }
  ) => {
    try {
      return await tweetService.postTweet(payload, token);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔹 Fetch tweets by user
export const fetchUserTweetsThunk = createAsyncThunk(
  "tweets/fetchByUser",
  async ({ userId, token }: { userId: number; token: string }, { rejectWithValue }) => {
    try {
      return await tweetService.fetchUserTweets(userId, token);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔹 Delete a tweet
export const deleteTweetThunk = createAsyncThunk(
  "tweets/delete",
  async ({ tweetId, token }: { tweetId: number; token: string }, { rejectWithValue }) => {
    try {
      await tweetService.deleteTweet(tweetId, token);
      return tweetId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔹 Update a tweet
export const updateTweetThunk = createAsyncThunk(
  "tweets/update",
  async (
    { tweetId, newContent, token }: { tweetId: number; newContent: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      return await tweetService.updateTweet(tweetId, newContent, token);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔹 Like a tweet
export const likeTweetThunk = createAsyncThunk(
  "tweets/like",
  async ({ tweetId, token }: { tweetId: number; token: string }, { rejectWithValue }) => {
    try {
      return await tweetService.likeTweet(tweetId, token);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔹 Unlike a tweet
export const unlikeTweetThunk = createAsyncThunk(
  "tweets/unlike",
  async ({ tweetId, token }: { tweetId: number; token: string }, { rejectWithValue }) => {
    try {
      return await tweetService.unlikeTweet(tweetId, token);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ========================
// SLICE
// ========================

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // FETCH ALL
      .addCase(fetchTweetsThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchTweetsThunk.fulfilled, (state, action) => { state.loading = false; state.tweets = action.payload; })
      .addCase(fetchTweetsThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // CREATE
      .addCase(createTweetThunk.pending, (state) => { state.loading = true; })
      .addCase(createTweetThunk.fulfilled, (state, action) => { state.loading = false; state.tweets.unshift(action.payload); })
      .addCase(createTweetThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // FETCH BY USER
      .addCase(fetchUserTweetsThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchUserTweetsThunk.fulfilled, (state, action) => { state.loading = false; state.tweets = action.payload; })
      .addCase(fetchUserTweetsThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // DELETE
      .addCase(deleteTweetThunk.fulfilled, (state, action) => {
        state.tweets = state.tweets.filter(t => t.id !== action.payload);
      })

      // UPDATE
      .addCase(updateTweetThunk.fulfilled, (state, action) => {
        const index = state.tweets.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.tweets[index] = action.payload;
      })

      // LIKE
      .addCase(likeTweetThunk.fulfilled, (state, action) => {
        const tweet = state.tweets.find(t => t.id === action.meta.arg.tweetId);
        if (tweet) {
          tweet.hasLiked = true;
          tweet.likeCount = (tweet.likeCount || 0) + 1;
        }
      })

      // UNLIKE
      .addCase(unlikeTweetThunk.fulfilled, (state, action) => {
        const tweet = state.tweets.find(t => t.id === action.meta.arg.tweetId);
        if (tweet) {
          tweet.hasLiked = false;
          tweet.likeCount = Math.max((tweet.likeCount || 1) - 1, 0);
        }
      });
  },
});

export default tweetsSlice.reducer;