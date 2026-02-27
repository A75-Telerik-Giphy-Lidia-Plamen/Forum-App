import { useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { supabase } from "../../config/supabaseClient";
import type { Profile } from "../../types/Profile";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("getSession error:", error);
        setLoading(false);
        return;
      }

      const authUser = data.session?.user;

      if (!authUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile fetch error:", profileError);

        setUser({
          id: authUser.id,
          email: authUser.email!,
          role: "user",
          is_blocked: false,
        } as Profile);
      } else {
        setUser(profile ?? null);
      }

      setLoading(false);
    }

    bootstrap();

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (!mounted) return;

      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};