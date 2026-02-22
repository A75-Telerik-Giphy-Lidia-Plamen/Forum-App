import { supabase } from "../config/supabaseClient";
import type { Profile } from "../types/Profile";
import type { UpdateUserProfileInput } from './../types/payloads';

export async function getUserById(
  id: string
): Promise<Profile> {
  const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("id", id)
  .single();
  
  if (error) {
    throw error;
  }

  return data as Profile;
}

export async function getPostsByUser(userId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserProfile(
  payload: UpdateUserProfileInput
): Promise<Profile> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("users")
    .update({
      first_name: payload.first_name,
      last_name: payload.last_name,
      bio: payload.bio,
      avatar_url: payload.avatar_url,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Profile;
}