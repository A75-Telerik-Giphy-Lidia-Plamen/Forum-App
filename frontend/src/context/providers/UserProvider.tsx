import { useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { supabase } from "../../config/supabaseClient";
import type { Profile } from "../../types/Profile";
import type { User } from "@supabase/supabase-js";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function setFromSession(sessionUser: User | null) {
      if (!alive) return;

      if (!sessionUser) {
        setUser(null);
        return;
      }

      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", sessionUser.id)
        .single();

      if (!alive) return;

      if (error || !profile) {
        // fallback: user as signed-in, but with minimal info
        setUser({
          id: sessionUser.id,
          email: sessionUser.email!,
          role: "user",
          is_blocked: false,
        } as unknown as Profile);
        return;
      }

      setUser(profile as Profile);
    }

    (async () => {
      const { data } = await supabase.auth.getSession();
      await setFromSession(data.session?.user ?? null);
      if (alive) setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await setFromSession(session?.user ?? null);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};