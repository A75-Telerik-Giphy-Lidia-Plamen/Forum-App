import { useNavigate } from "react-router-dom";
import type { Post } from "../../../types/Post";
import PostCard from "../../PostCard/PostCard";
import { styles } from "../../../pages/Browse/Browse.styles";

type Props = {
  posts: Post[];
};

export default function ProfilePosts({ posts }: Props) {
    const navigate = useNavigate();

    return (
        <>
            {posts.length === 0 ? (
                <p className={styles.emptyState}>
                    No posts found. Try a different search or filter.
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
    );
}