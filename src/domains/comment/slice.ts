import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { commentService } from "./service";
import type { Comment, CreateCommentPayload } from "./types";

interface CommentState {
  commentsByTweet: Record<number, Comment[]>; // key = tweetId
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  commentsByTweet: {},
  loading: false,
  error: null,
};

// Thunks
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ tweetId, token }: { tweetId: number; token: string }) => {
    const comments = await commentService.fetchCommentsByTweet(tweetId, token);
    return { tweetId, comments };
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ payload, token }: { payload: CreateCommentPayload; token: string }) => {
    const comment = await commentService.createComment(payload, token);
    return comment;
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async ({ id, tweetId, token }: { id: number; tweetId: number; token: string }) => {
    await commentService.deleteComment(id, token);
    return { id, tweetId };
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
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<{ tweetId: number; comments: Comment[] }>) => {
        state.loading = false;
        state.commentsByTweet[action.payload.tweetId] = action.payload.comments;
      }
    );
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
      const tweetId = action.payload.tweetId;
      if (!state.commentsByTweet[tweetId]) {
        state.commentsByTweet[tweetId] = [];
      }
      state.commentsByTweet[tweetId].push(action.payload);
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
    builder.addCase(
      removeComment.fulfilled,
      (state, action: PayloadAction<{ id: number; tweetId: number }>) => {
        state.loading = false;
        const { id, tweetId } = action.payload;
        if (state.commentsByTweet[tweetId]) {
          state.commentsByTweet[tweetId] = state.commentsByTweet[tweetId].filter(
            (c) => c.id !== id
          );
        }
      }
    );
    builder.addCase(removeComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to remove comment";
    });
  },
});

export default commentSlice.reducer;