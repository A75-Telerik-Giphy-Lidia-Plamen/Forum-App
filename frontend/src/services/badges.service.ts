import { supabase } from "../config/supabaseClient";

export async function getUserBadges(userId: string) {
  const { data, error } = await supabase
    .from("user_badges")
    .select(`
      awarded_at,
      badges (
        id,
        key,
        name,
        description,
        icon
      )
    `)
    .eq("user_id", userId)
    .order("awarded_at", { ascending: false });

  if (error) throw error;

  return data;
}