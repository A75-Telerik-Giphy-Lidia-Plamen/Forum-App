import { supabase } from "../config/supabaseClient";
import type { Vote, VoteValue, VoteTargetType } from "../types/Vote";

export async function castVote(
  userId: string,
  targetType: VoteTargetType,
  targetId: string,
  value: VoteValue,
): Promise<Vote> {
  const { data, error } = await supabase
    .from("votes")
    .upsert(
      {
        user_id: userId,
        target_type: targetType,
        target_id: targetId,
        value,
      },
      { onConflict: "user_id,target_type,target_id" },
    )
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function removeVote(
  userId: string,
  targetType: VoteTargetType,
  targetId: string,
): Promise<void> {
  const { error } = await supabase
    .from("votes")
    .delete()
    .eq("user_id", userId)
    .eq("target_type", targetType)
    .eq("target_id", targetId);

  if (error) throw new Error(error.message);
}

export async function getUserVote(
  userId: string,
  targetType: VoteTargetType,
  targetId: string,
): Promise<Vote | null> {
  const { data, error } = await supabase
    .from("votes")
    .select("*")
    .eq("user_id", userId)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}
