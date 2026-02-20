import { supabase } from "../config/supabaseClient";
import type { LoginPayload, RegisterPayload } from "../types/payloads";

export const registerUser = async ({
  first_name,
  last_name,
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
        first_name: first_name.trim(),
        last_name: last_name.trim(),
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

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
}
