import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchNotifications, markAllNotificationsViewed } from "./service";
import type { AppNotification } from "./types";

interface NotificationsState {
  notifications: AppNotification[];
  loading: boolean;
  error?: string;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: undefined,
};

export const fetchNotificationsThunk = createAsyncThunk<
  AppNotification[],
  string,
  { rejectValue: string }
>("notifications/fetch", async (token, thunkAPI) => {
  try {
    const data = await fetchNotifications(token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch notifications");
  }
});

export const markAllNotificationsViewedThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("notifications/viewAll", async (token, thunkAPI) => {
  try {
    await markAllNotificationsViewed(token);
  } catch {
    return thunkAPI.rejectWithValue("Failed to mark notifications as viewed");
  }
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })

      .addCase(
        fetchNotificationsThunk.fulfilled,
        (state, action: PayloadAction<AppNotification[]>) => {
          state.loading = false;
          state.notifications = action.payload;
        }
      )

      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error";
      })

      // toutes les notifications passent en vues
      .addCase(markAllNotificationsViewedThunk.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          isView: true,
        }));
      });
  },
});

export default notificationsSlice.reducer;