import { useCallback } from "react";
import { signInWithGoogle } from "../services/auth.service";

export function useGoogleAuth(onError?: (msg: string) => void) {
  const login = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      if (err instanceof Error && onError) {
        onError(err.message);
      }
    }
  }, [onError]);

  return { login };
}
