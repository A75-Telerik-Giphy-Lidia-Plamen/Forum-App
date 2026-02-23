import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../../services/post.service";
import { useUser } from "../../hooks/useUser";
import PostForm from "../../components/PostForm/PostForm";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<null | {
    title: string;
    content: string;
    tags: string[];
  }>(null);

  useEffect(() => {
    if (!id) return;
    getPostById(id).then((post) => {
      if (post.author_id !== user?.id) {
        navigate(`/posts/${id}`);
        return;
      }
      setInitialData({
        title: post.title,
        content: post.content,
        tags: post.tags.map((t) => t.name),
      });
    });
  }, [id, user?.id, navigate]);

  if (!initialData) return null;

  return (
    <PostForm
      mode="edit"
      postId={id}
      initialTitle={initialData.title}
      initialContent={initialData.content}
      initialTags={initialData.tags}
    />
  );
}
