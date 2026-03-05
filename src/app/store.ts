import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../domains/auth/slice";
import userReducer from "../domains/users/slice";
import tweetsReducer from "../domains/tweets/slice";
import followReducer from "../domains/follow/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // ⚠️ important
    user: userReducer,
    tweets: tweetsReducer,
    follow: followReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;