export interface UserProfile {
  id: number;
  username: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: string | null;
  tweets?: number;
  following?: number;
  followers?: number;
}