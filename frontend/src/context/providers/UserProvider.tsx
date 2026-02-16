import { useState } from "react";
import { UserContext } from "../UserContext";
import type { User } from "../../types/User";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext value={{ user, setUser }}>
      {children}
    </UserContext>
  );
};