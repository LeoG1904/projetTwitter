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

  // infos pour le profil
  name: string;
  bio?: string;
  avatar?: string;
  tweets?: number;
  following?: number;
  followers?: number;
}

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}