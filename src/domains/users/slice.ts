
import type { UserProfile } from "./types";
import { fetchCurrentUser } from "./service";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      return await fetchCurrentUser(token);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 🔹 ajouter setUserProfile
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.profile = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 🔹 exporter l’action pour pouvoir l’utiliser
export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;