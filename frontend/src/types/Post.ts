export type Post = {
  id: string;
  author_id: string;
  title: string;
  content: string;
  is_verified: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string | null;
  author: {
    username: string;
    avatar_url: string | null;
  } | null;
  tags: { name: string }[];
};
