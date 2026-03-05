import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "./types";
import { fetchCurrentUser, fetchUserById } from "./service";

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

// 🔹 Nouveau thunk pour récupérer un profil par ID
export const loadUserById = createAsyncThunk(
  "user/loadUserById",
  async ({ token, id }: { token: string; id: number }, thunkAPI) => {
    try {
      return await fetchUserById(token, id);
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
      })
      .addCase(loadUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(loadUserById.rejected, (state, action) => {
        state.profile = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;