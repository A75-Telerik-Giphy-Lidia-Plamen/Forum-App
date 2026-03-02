import { useMemo, useState } from "react";
import { useComments } from "../../hooks/useComments";
import { useUser } from "../../hooks/useUser";
import { styles } from "./CommentSection.styles";
import type { Comment } from "../../types/Comment";
import { countComments } from "../../utils/buildCommentTree";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useUser();
  const { comments, isLoading, error, submit, submitReply, remove } =
    useComments(postId);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(error);
  const totalComments = useMemo(() => countComments(comments), [comments]);

  async function handleSubmit() {

    if (user?.is_blocked) {
      setErr("Your account is blocked from commenting.");
      return;
    }

    if (!content.trim()) return;
    try {
      setSubmitting(true);
      await submit(content.trim());
      setContent("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Comments ({totalComments})</h2>

      {err && <p className={styles.error}>{err}</p>}

      <div className={styles.commentBox}>
        <textarea
          className={styles.textarea}
          placeholder="Share your thoughts or experience..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!user}
        />
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={submitting || !user || !content.trim()}
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
        {!user && (
          <p className={styles.loginNote}>You must be logged in to comment.</p>
        )}
      </div>

      {isLoading ? (
        <p className={styles.loadingText}>Loading comments...</p>
      ) : (
        <div className={styles.commentsList}>
          {comments.length === 0 ? (
            <p className={styles.emptyText}>No comments yet. Be the first!</p>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDelete={remove}
                onReply={submitReply}
                currentUserId={user?.id ?? null}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

type CommentItemProps = {
  comment: Comment;
  currentUserId: string | null;
  onReply: (parentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
};

function CommentItem({
  comment,
  currentUserId,
  onReply,
  onDelete,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canReply = Boolean(currentUserId);
  const canDelete = currentUserId === comment.author_id;
  const isFrok = comment.author?.username === "frok";

  async function handleReplySubmit() {
    if (!replyContent.trim()) return;
    try {
      setIsSubmitting(true);
      await onReply(comment.id, replyContent.trim());
      setReplyContent("");
      setIsReplying(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`
      ${styles.commentItem}
      ${isFrok ? "animate-frok-enter border border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20" : ""}
    `}>
      <div className={styles.commentHeader}>
        <span className={styles.commentAuthor}>
          {comment.author?.username ?? "Unknown"}
        </span>
        <span className={styles.commentDate}>
          {new Date(comment.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <p className={styles.commentContent}>{comment.content}</p>
      <div className={styles.commentActions}>
        {canReply && (
          <button
            type="button"
            className={styles.replyBtn}
            onClick={() => setIsReplying((prev) => !prev)}
          >
            {isReplying ? "Cancel" : "Reply"}
          </button>
        )}
        {canDelete && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => onDelete(comment.id)}
          >
            Delete
          </button>
        )}
      </div>

      {isReplying && (
        <div className={styles.replyForm}>
          <textarea
            className={styles.replyTextarea}
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className={styles.replyActions}>
            <button
              type="button"
              className={styles.replySubmitBtn}
              onClick={handleReplySubmit}
              disabled={isSubmitting || !replyContent.trim()}
            >
              {isSubmitting ? "Posting..." : "Post Reply"}
            </button>
            <button
              type="button"
              className={styles.replyCancelBtn}
              onClick={() => setIsReplying(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className={styles.replyList}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onDelete={onDelete}
              onReply={onReply}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
