import { supabase } from "../config/supabaseClient";
import type { LoginPayload, RegisterPayload } from "../types/payloads";

export const registerUser = async ({
  email,
  password,
  username,
}: RegisterPayload) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username?.toLowerCase().trim(),
        first_name: null,
        last_name: null,
      },
    },
  });

  if (error) {
    throw error;
  }
  return data;
};

export const loginUser = async ({ email, password }: LoginPayload) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};
