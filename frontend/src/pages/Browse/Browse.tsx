import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/post.service";
import PostCard from "../../components/PostCard/PostCard";
import type { Post } from "../../types/Post";

export default function BrowsePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0EB] px-4 py-8">
      <div className="max-w-2xl mx-auto grid gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={() => navigate(`/posts/${post.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
