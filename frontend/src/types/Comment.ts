export type Comment = {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  is_deleted: boolean;
  created_at: string;
  author: {
    username: string;
    avatar_url: string | null;
  } | null;
};
