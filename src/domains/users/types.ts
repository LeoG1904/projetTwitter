export interface UserProfile {
  username: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: string;
  tweets?: number;
  following?: number;
  followers?: number;
}