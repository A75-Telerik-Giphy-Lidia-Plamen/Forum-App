export type VoteValue = 1 | -1;

export type VoteTargetType = "post" | "comment";

export type Vote = {
  id: string;
  user_id: string;
  target_type: VoteTargetType;
  target_id: string;
  value: VoteValue;
  created_at: string;
};
