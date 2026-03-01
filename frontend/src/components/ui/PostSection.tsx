import { useEffect, useState } from "react";
import { getPosts } from "../../services/post.service";
import type { Post } from "../../types/Post";
import type { SortOption } from "../../services/post.service";
import PostCard from "../PostCard/PostCard";
import { styles } from "../../pages/Browse/Browse.styles";

type Props = {
  title: string;
  sort: SortOption;
  limit?: number;
  icon?: React.ReactNode;
};

export default function PostSection({
  title,
  sort,
  limit = 10,
  icon,
}: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts({ sort })
      .then((data) => setPosts(data.slice(0, limit)));
  }, [sort, limit]);

  return (
    <section className="mb-16">
      <h2 className={`${styles.heading} flex items-center gap-2 mb-2`}>
        {icon}
        {title}
      </h2>

      <p className={styles.subheading}>
        Posts sorted by {sort}.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}