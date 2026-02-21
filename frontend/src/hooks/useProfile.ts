import { useEffect, useState } from "react";
import * as userService from "../services/user.service";
import type { Profile } from "../types/Profile";

interface UseProfileReturn {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}

export function useProfile(id: string): UseProfileReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await userService.getUserById(id);

        if (isMounted) {
          setProfile(data);
        }
      } catch (err: unknown) {
        if (!isMounted) return;

        const code = (err as { code?: unknown })?.code;
        if (code === "PGRST116") {
          setError("Profile not found");
        } else {
          setError("Something went wrong");
        }

        setProfile(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { profile, isLoading, error };
}
