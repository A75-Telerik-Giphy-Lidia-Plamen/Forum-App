import { useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { supabase } from "../../config/supabaseClient";
import type { Profile } from "../../types/Profile";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("getUser Error: ", error);
        }

        if (!mounted) {
          return;
        }

        const authUser = data?.user ?? null;

        if (!authUser) {
          setUser(null);
          return;
        }

        const {
          data: profile,
          error: profileError,
        } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .maybeSingle();

        if (profileError) {
          console.error("Fetching Profile Error: ", profileError)
        }

        if (!mounted) {
          return;
        }

        if (!profile) {
          console.log("No profile row found, using fallback");

          setUser({
            id: authUser.id,
            email: authUser.email!,
            role: "user",
            is_blocked: false,
          } as Profile);
        } else {
          setUser(profile as Profile);
        }
      } catch (err) {
        console.error("Bootstrap error", err);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log("Auth event:", event);

        if (event === "SIGNED_OUT") {
          setUser(null);
          return;
        }

        if (event !== "TOKEN_REFRESHED") return;

        if (!session?.user) return;

        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        if (!mounted) return;

        setUser(profile ?? null);
      }
    );

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