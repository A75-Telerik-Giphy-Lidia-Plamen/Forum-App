import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import {
  getCommentsByPost,
  addComment,
  deleteComment,
} from "../services/comments.service";
import type { Comment } from "../types/Comment";

interface UseCommentsReturn {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  submit: (content: string) => Promise<void>;
  remove: (commentId: string) => Promise<void>;
}

export function useComments(postId: string): UseCommentsReturn {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchComments() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCommentsByPost(postId);

        if (isMounted) {
          setComments(data);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Failed to load comments",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const submit = async (content: string) => {
    if (!user?.id) return;

    try {
      setError(null);
      await addComment(postId, user.id, { content });
      const updated = await getCommentsByPost(postId);
      setComments(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    }
  };

  const remove = async (commentId: string) => {
    if (!user?.id) return;

    try {
      setError(null);
      await deleteComment(commentId, user.id);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete comment");
    }
  };

  return { comments, isLoading, error, submit, remove };
}
