import { supabase } from "../config/supabaseClient";
import type { Comment } from "../types/Comment";
import type { CommentPayload } from "../types/payloads";
import { buildCommentTree } from "../utils/buildCommentTree";

const FROK_TRIGGER = /@frok\b/i;

type FrokReplyPayload = {
  commentId: string;
  postId: string;
  content: string;
};

function shouldTriggerFrok(content: string): boolean {
  return FROK_TRIGGER.test(content);
}

async function triggerFrokReply(payload: FrokReplyPayload): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke("generate-frok-reply", {
      body: payload,
    });

    if (error) {
      console.error("Failed to trigger Frok reply:", error.message);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to trigger Frok reply:", message);
  }
}

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

  const comment: Comment = {
    ...data,
    parent_id: data.parent_id ?? null,
    author: data.author
      ? {
          username: data.author.username,
          avatar_url:
            data.author.user_media?.public_url ?? data.author.avatar_url,
        }
      : null,
    replies: [],
  };

  if (shouldTriggerFrok(content)) {
    void triggerFrokReply({
      commentId: comment.id,
      postId,
      content,
    });
  }

  return comment;
}

export async function createReply(
  postId: string,
  parentId: string,
  authorId: string,
  { content }: CommentPayload,
): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      parent_id: parentId,
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

  const comment: Comment = {
    ...data,
    parent_id: data.parent_id ?? null,
    author: data.author
      ? {
          username: data.author.username,
          avatar_url:
            data.author.user_media?.public_url ?? data.author.avatar_url,
        }
      : null,
    replies: [],
  };

  if (shouldTriggerFrok(content)) {
    void triggerFrokReply({
      commentId: comment.id,
      postId,
      content,
    });
  }

  return comment;
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

  const comments = (data ?? []).map((comment) => ({
    ...comment,
    parent_id: comment.parent_id ?? null,
    author: comment.author
      ? {
          username: comment.author.username,
          avatar_url:
            comment.author.user_media?.public_url ?? comment.author.avatar_url,
        }
      : null,
    replies: [],
  }));

  return buildCommentTree(comments);
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
