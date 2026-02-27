import type { UseFormSetError } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { FormFields } from "../schemas/login.schema";
import { loginUser } from "../services/auth.service";
import { supabase } from "../config/supabaseClient";
import { useUser } from "../hooks/useUser";
import type { Profile } from "../types/Profile";

export function useLogin(setError: UseFormSetError<FormFields>) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  async function submit(data: FormFields) {
    try {
      setIsLoading(true);

      const { user: authUser } = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (!authUser) throw new Error("No auth user returned");

      // Fetch profile from public.users
      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setUser(profile as Profile);

      navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });
    } catch (error: unknown) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { submit, isLoading };
}