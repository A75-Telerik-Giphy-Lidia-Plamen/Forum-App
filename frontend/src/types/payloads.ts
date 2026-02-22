export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

export type UpdateUserProfileInput = {
  first_name: string;
  last_name: string;
  bio: string | null;
  avatar_url: string | null;
};

export interface PostPayload {
  title: string;
  content: string;
  tags?: string[];
}
