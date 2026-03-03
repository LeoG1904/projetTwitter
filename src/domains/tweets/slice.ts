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
      });
  },
});

export default tweetsSlice.reducer;