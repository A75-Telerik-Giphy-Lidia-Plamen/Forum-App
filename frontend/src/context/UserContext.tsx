import { createContext } from "react";
import type { Profile } from "../types/Profile";

interface UserContextType {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  loading: boolean
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
