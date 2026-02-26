import { logoutUser } from "../services/auth.service";
import type { Profile } from "../types/Profile";

export const logout = (setUser: (user: Profile | null) => void) => {
  logoutUser();
  setUser(null);
};
