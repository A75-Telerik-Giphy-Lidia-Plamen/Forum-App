import { Link } from "react-router-dom";
import { Heart, MessageCircle, Clock } from "lucide-react";
import { styles } from "./PostCard.styles";
import type { Post } from "../../types/Post";

type PostCardProps = {
  post: Post;
  variant?: "default" | "compact" | "featured";
  onClick?: () => void;
};

function getInitials(username: string) {
  const parts = username.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return username.slice(0, 2).toUpperCase();
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function getPreview(content: string, maxLength = 120) {
  return content.length > maxLength
    ? content.slice(0, maxLength).trimEnd() + "..."
    : content;
}

export default function PostCard({
  post,
  variant = "default",
  onClick,
}: PostCardProps) {
  const authorName = post.author?.username ?? "Unknown";
  const initials = getInitials(authorName);

  if (variant === "compact") {
    return (
      <Link
        to={`/posts/${post.id}`}
        className={styles.compactLink}
        onClick={onClick}
      >
        <span className={styles.compactAvatar}>{initials}</span>
        <div className="flex-1 min-w-0">
          <h4 className={styles.compactTitle}>{post.title}</h4>
          <div className={styles.compactMeta}>
            <span>{authorName}</span>
            <span className={styles.statItem}>
              <Heart className={styles.statIcon} /> 0
            </span>
            <span className={styles.statItem}>
              <MessageCircle className={styles.statIcon} /> 0
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/posts/${post.id}`}
      className={styles.cardLink}
      onClick={onClick}
    >
      <article
        className={`${styles.card} ${
          variant === "featured" ? styles.cardFeatured : styles.cardDefault
        }`}
      >
        <div className={styles.topRow}>
          {variant === "featured" && (
            <span className={styles.trendingBadge}>🔥 Trending</span>
          )}
        </div>

        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{getPreview(post.content)}</p>

        {post.tags.length > 0 && (
          <div className={styles.tagsRow}>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag.name} className={styles.tag}>
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.authorRow}>
            <span className={styles.avatarCircle}>{initials}</span>
            <span className={styles.authorName}>{authorName}</span>
          </div>
          <span className={styles.statItem}>
            <Heart className={styles.statIcon} /> 0
          </span>
          <span className={styles.statItem}>
            <MessageCircle className={styles.statIcon} /> 0
          </span>
          <span className={styles.statItem}>
            <Clock className={styles.statIcon} />
            {formatDate(post.created_at)}
          </span>
        </div>
      </article>
    </Link>
  );
}
