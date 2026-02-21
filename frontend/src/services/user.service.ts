import { supabase } from "../config/supabaseClient";
import type { Profile } from "../types/Profile";

export async function getUserById(
  id: string
): Promise<Profile> {
  const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("id", id)
  .single();
  
  console.log(data);
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
