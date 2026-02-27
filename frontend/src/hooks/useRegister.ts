import type { Profile } from './../types/Profile';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { registerUser } from "../services/auth.service";
import type { FormFields } from "../schemas/auth.schema";
import { supabase } from "../config/supabaseClient";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const register = async (data: FormFields) => {
    try {
      setIsLoading(true);

      const authUser = await registerUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        username: data.username,
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

      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
