import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, Pencil, Trash2 } from "lucide-react";
import { getPostById, deletePost } from "../../services/post.service";
import { useUser } from "../../hooks/useUser";
import { styles } from "./PostDetails.styles";
import type { Post } from "../../types/Post";
import AuthorCard from "../AuthorCard/AuthorCard";
import Button from "../ui/Button/Button";
import VoteButtons from "../VoteButtons/VoteButtons";
import CommentSection from "../CommentSection/CommentSection";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const isOwner = user?.id === post?.author_id;

  useEffect(() => {
    if (!id) return;
    getPostById(id)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleVote(value: 1 | -1, previousValue: 1 | -1 | null) {
    setPost((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };

      if (previousValue === 1) updated.likes_count -= 1;
      if (previousValue === -1) updated.dislikes_count -= 1;

      if (previousValue !== value) {
        if (value === 1) updated.likes_count += 1;
        if (value === -1) updated.dislikes_count += 1;
      }

      return updated;
    });
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    try {
      setDeleting(true);
      await deletePost(post!.id, user?.id);
      navigate("/posts");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.errorBox}>{error || "Post not found."}</p>
          <Link to="/posts" className={styles.backButton}>
            <ArrowLeft className={styles.backIcon} /> Back to posts
          </Link>
        </div>
      </div>
    );
  }

  const authorName = post.author?.username ?? "Unknown";

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/posts" className={styles.backButton}>
          <ArrowLeft className={styles.backIcon} />
          Back to posts
        </Link>

        <div className={styles.topRow}>
          <span className={styles.dateMeta}>
            <Clock className={styles.dateIcon} />
            {formatDate(post.created_at)}
          </span>
        </div>

        <h1 className={styles.title}>{post.title}</h1>

        <AuthorCard
          username={authorName}
          avatarUrl={post.author?.avatar_url}
          reputation={0}
        />

        <p className={styles.content}>{post.content}</p>

        {post.tags.length > 0 && (
          <div className={styles.tagsRow}>
            {post.tags.map((tag) => (
              <span key={tag.name} className={styles.tag}>
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className={styles.divider} />

        <div className={styles.actionsRow}>
          <div className={styles.actionsLeft}>
            <VoteButtons
              postId={post.id}
              likesCount={post.likes_count}
              dislikesCount={post.dislikes_count}
              onVote={handleVote}
            />
          </div>

          {isOwner && (
            <div className={styles.actionsRight}>
              <Button onClick={() => navigate(`/posts/${post.id}/edit`)}>
                <Pencil className={styles.actionIcon} /> Edit
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 className={styles.actionIcon} />
                {confirmDelete
                  ? "Are you sure?"
                  : deleting
                    ? "Deleting..."
                    : "Delete"}
              </Button>
              {confirmDelete && (
                <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
              )}
            </div>
          )}
        </div>

        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
