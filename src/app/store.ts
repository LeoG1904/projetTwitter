import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../domains/auth/slice";
import userReducer from "../domains/users/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // ⚠️ important
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;