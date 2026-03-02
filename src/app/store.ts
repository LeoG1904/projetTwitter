import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../domains/auth/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // ⚠️ important
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;