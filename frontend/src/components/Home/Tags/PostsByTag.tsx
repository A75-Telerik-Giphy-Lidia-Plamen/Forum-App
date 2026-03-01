import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostsByTag } from "../../../services/post.service";
import { getTagById } from "../../../services/tags.service";
import PostCard from "../../PostCard/PostCard";
import type { Post } from "../../../types/Post";
import type { Tag } from "../../../services/tags.service";
import { styles } from "../../../pages/Browse/Browse.styles";
import Loading from "../../ui/Loading";

export default function PostsByTag() {
  const { tagId } = useParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tagId) return;

    Promise.all([
      getPostsByTag(tagId),
      getTagById(tagId),
    ])
      .then(([postsData, tagData]) => {
        setPosts(postsData);
        setTag(tagData);
      })
      .finally(() => setLoading(false));
  }, [tagId]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          #{tag?.name ?? "Tag"}
        </h1>

        <p className={styles.subheading}>
          Posts categorized under this topic.
        </p>

        {loading && (
          <Loading />
        )}

        {!loading && posts.length === 0 && (
          <p className={styles.emptyState}>
            No posts found for this tag.
          </p>
        )}

        {!loading && posts.length > 0 && (
          <div className={styles.postList}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}