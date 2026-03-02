export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: AuthResponse | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}