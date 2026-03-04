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
  loading: false
};

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

// DELETE
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

// UPDATE
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

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweetsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTweetsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchTweetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTweetThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets.unshift(action.payload);
      })
      .addCase(createTweetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserTweetsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTweetsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchUserTweetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTweetThunk.fulfilled, (state, action) => {
        state.tweets = state.tweets.filter(t => t.id !== action.payload);
      })
      .addCase(updateTweetThunk.fulfilled, (state, action) => {
        const index = state.tweets.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.tweets[index] = action.payload;
      });
      },
});

export default tweetsSlice.reducer;