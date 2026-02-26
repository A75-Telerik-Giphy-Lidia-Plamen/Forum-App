import type { User } from "./User";

export interface Profile extends User {
  username: string;
  first_name: string;
  last_name: string;
  bio: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  is_blocked: boolean;
  created_at: string;
}
