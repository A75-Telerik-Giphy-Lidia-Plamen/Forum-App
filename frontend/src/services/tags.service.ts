import { supabase } from "../config/supabaseClient";

export type Tag = {
  id: string;
  name: string;
  created_at: string;
};

export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getTagById(id: string): Promise<Tag | null> {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return data;
}