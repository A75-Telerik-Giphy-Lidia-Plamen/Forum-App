import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Clock,
  Heart,
  MessageCircle,
  SlidersHorizontal,
  X,
  Tag,
} from "lucide-react";
import { getPosts } from "../../services/post.service";
import PostCard from "../../components/PostCard/PostCard";
import type { Post } from "../../types/Post";
import type { SortOption } from "../../services/post.service";
import { styles } from "./Browse.styles";
import Loading from "../../components/ui/Loading";

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "recent", label: "Recent" },
  { key: "popular", label: "Popular" },
  { key: "discussed", label: "Discussed" },
];

const SORT_ICONS: Record<SortOption, React.ReactNode> = {
  recent: <Clock className={styles.sortIcon} />,
  popular: <Heart className={styles.sortIcon} />,
  discussed: <MessageCircle className={styles.sortIcon} />,
};

export default function Browse() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("recent");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const activeTag = searchParams.get("tag") ?? "";

  useEffect(() => {
    getPosts({ sort, search, tagName: activeTag || undefined })
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sort, search, activeTag]);

  function clearTagFilter() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("tag");
      return next;
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Browse Knowledge</h1>
        <p className={styles.subheading}>
          Discover skills and wisdom shared by our community.
        </p>

        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search posts by tags or key words"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.toolbarRow}>
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setSort(option.key)}
              className={`${styles.sortBtn} ${
                sort === option.key
                  ? styles.sortBtnActive
                  : styles.sortBtnInactive
              }`}
            >
              {SORT_ICONS[option.key]}
              {option.label}
            </button>
          ))}
          <button type="button" className={styles.filterBtn}>
            <SlidersHorizontal className={styles.filterIcon} />
          </button>
        </div>

        {activeTag && (
          <div className={styles.activeTagRow}>
            <span className={styles.activeTagChip}>
              <Tag className={styles.activeTagIcon} />
              {activeTag}
              <button
                type="button"
                onClick={clearTagFilter}
                className={styles.activeTagClear}
                aria-label={`Remove tag filter: ${activeTag}`}
              >
                <X size={12} />
              </button>
            </span>
          </div>
        )}

        {error && <p className={styles.errorBox}>{error}</p>}

        {loading && <Loading />}

        {!loading && !error && (
          <>
            {posts.length === 0 ? (
              <p className={styles.emptyState}>
                {activeTag
                  ? `No posts found with tag "${activeTag}".`
                  : "No posts found. Try a different search or filter."}
              </p>
            ) : (
              <div className={styles.postList}>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={() => navigate(`/posts/${post.id}`)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
