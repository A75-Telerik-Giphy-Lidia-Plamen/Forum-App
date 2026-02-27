import { useState } from "react";
import { useComments } from "../../hooks/useComments";
import { useUser } from "../../hooks/useUser";
import { styles } from "./CommentSection.styles";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useUser();
  const { comments, isLoading, error, submit, remove } = useComments(postId);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
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
      <h2 className={styles.heading}>Comments ({comments.length})</h2>

      {error && <p className={styles.error}>{error}</p>}

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
              <div key={comment.id} className={styles.commentItem}>
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
                {user?.id === comment.author_id && (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => remove(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
