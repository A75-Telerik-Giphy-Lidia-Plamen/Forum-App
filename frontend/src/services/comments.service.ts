import { supabase } from "../config/supabaseClient";
import type { Comment } from "../types/Comment";
import type { CommentPayload } from "../types/payloads";

export async function addComment(
  postId: string,
  authorId: string,
  { content }: CommentPayload,
): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author_id: authorId,
      content,
    })
    .select(
      `
      *,
      author:users(
        username,
        avatar_url,
        user_media(public_url)
      )
    `,
    )
    .single();

  if (error) throw new Error(error.message);

  return {
    ...data,
    author: data.author
      ? {
          username: data.author.username,
          avatar_url:
            data.author.user_media?.public_url ?? data.author.avatar_url,
        }
      : null,
  };
}

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      author:users(
        username,
        avatar_url,
        user_media(public_url)
      )
    `,
    )
    .eq("post_id", postId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((comment) => ({
    ...comment,
    author: comment.author
      ? {
          username: comment.author.username,
          avatar_url:
            comment.author.user_media?.public_url ?? comment.author.avatar_url,
        }
      : null,
  }));
}

export async function deleteComment(
  commentId: string,
  userId: string,
): Promise<void> {
  const { error } = await supabase
    .from("comments")
    .update({ is_deleted: true })
    .eq("id", commentId)
    .eq("author_id", userId);

  if (error) throw new Error(error.message);
}
