import { useNavigate } from "react-router-dom";
import type { Post } from "../../../types/Post";
import PostCard from "../../PostCard/PostCard";
import { styles } from "../../../pages/Browse/Browse.styles";
import { BookOpenText } from 'lucide-react';

type Props = {
    posts: Post[];
    firstname: string;
};

export default function ProfilePosts({ posts, firstname }: Props) {
    const navigate = useNavigate();

    return (
        <>
            {posts.length === 0 ? (
                <p className={styles.emptyState}>
                    This user hasn't shared any knowledge yet.
                </p>
            ) : (
                <>
                    <div className="mb-4 mt-6">
                        <h3 className={`${styles.heading} flex items-center gap-2`}>
                            <BookOpenText className="h-6 w-6 text-orange-500" />
                            <span className="">Posts by {firstname}</span>
                        </h3>
                    </div>
                    <div className={styles.postList}>
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onClick={() => navigate(`/posts/${post.id}`)}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}