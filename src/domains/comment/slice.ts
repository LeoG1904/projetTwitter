import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { commentService } from "./service";
import type { Comment, CreateCommentPayload } from "./types";

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ tweetId, token }: { tweetId: number; token: string }) => {
    return await commentService.fetchCommentsByTweet(tweetId, token);
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ payload, token }: { payload: CreateCommentPayload; token: string }) => {
    return await commentService.createComment(payload, token);
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async ({ id, token }: { id: number; token: string }) => {
    await commentService.deleteComment(id, token);
    return id;
  }
);
export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch comments
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch comments";
    });

    // Add comment
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
      state.loading = false;
      state.comments.push(action.payload);
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add comment";
    });

    // Remove comment
    builder.addCase(removeComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeComment.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.comments = state.comments.filter((c) => c.id !== action.payload);
    });
    builder.addCase(removeComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to remove comment";
    });
  },
});

export default commentSlice.reducer;