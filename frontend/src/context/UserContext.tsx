import { createContext } from "react";
import type { User } from "../types/User";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
