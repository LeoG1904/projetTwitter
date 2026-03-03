import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, registerService, logoutService } from "./service";
import type { AuthState, LoginRequest, RegisterRequest } from "./types";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, thunkAPI) => {
    try {
      const result = await loginService(data);
      return result.token;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterRequest, thunkAPI) => {
    try {
      return await registerService(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      logoutService();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;