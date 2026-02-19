import { useCallback, useState } from "react";
import { signInWithGoogle } from "../services/auth.service";

export function useGoogleAuth(onError?: (msg: string) => void) {
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (err) {
      if (err instanceof Error && onError) {
        onError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  return { login, isLoading };
}

