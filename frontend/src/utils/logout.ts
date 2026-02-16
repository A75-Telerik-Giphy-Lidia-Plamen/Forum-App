import { logoutUser } from "../services/auth.service";
import type { User } from "../types/User";

export const logout = (setUser: (user: User | null) => void) => {
  logoutUser();
  setUser(null);
};
