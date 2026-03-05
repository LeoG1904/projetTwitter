import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../domains/auth/slice";
import userReducer from "../domains/users/slice";
import tweetsReducer from "../domains/tweets/slice";
import followReducer from "../domains/follow/slice";
import commentReducer from "../domains/comment/slice";
import likeReducer from "../domains/likes/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    user: userReducer,
    tweets: tweetsReducer,
    follow: followReducer, 
    comments: commentReducer,
    likes: likeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;