import { useCallback, useEffect, useState } from "react";
import { useUser } from "./useUser";
import {
  getCommentsByPost,
  addComment,
  deleteComment,
  createReply,
} from "../services/comments.service";
import type { Comment } from "../types/Comment";
import { supabase } from "../config/supabaseClient";

interface UseCommentsReturn {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  submit: (content: string) => Promise<void>;
  submitReply: (parentId: string, content: string) => Promise<void>;
  remove: (commentId: string) => Promise<void>;
}

export function useComments(postId: string): UseCommentsReturn {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(
    async (showLoading: boolean) => {
      try {
        if (showLoading) {
          setIsLoading(true);
        }
        setError(null);

        const data = await getCommentsByPost(postId);

        setComments(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load comments",
        );
      } finally {
        if (showLoading) {
          setIsLoading(false);
        }
      }
    },
    [postId],
  );

  useEffect(() => {
    void fetchComments(true);
  }, [fetchComments]);

  useEffect(() => {
    const channel = supabase
      .channel(`comments:${postId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          void fetchComments(false);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          void fetchComments(false);
        },
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [postId, fetchComments]);

  const submit = async (content: string) => {
    if (!user?.id) return;

    try {
      setError(null);
      await addComment(postId, user.id, { content });
      await fetchComments(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    }
  };

  const submitReply = async (parentId: string, content: string) => {
    if (!user?.id) return;

    try {
      setError(null);
      await createReply(postId, parentId, user.id, { content });
      await fetchComments(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to post reply");
    }
  };

  const remove = async (commentId: string) => {
    if (!user?.id) return;

    try {
      setError(null);
      await deleteComment(commentId, user.id);
      await fetchComments(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete comment");
    }
  };

  return { comments, isLoading, error, submit, submitReply, remove };
}
