import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { createPost, updatePost } from "../../services/post.service";
import { styles } from "./PostForm.styles";

type PostFormProps = {
  mode?: "create" | "edit";
  postId?: string;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
};

export default function PostForm({
  mode = "create",
  postId,
  initialTitle = "",
  initialContent = "",
  initialTags = [],
}: PostFormProps) {
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user } = useUser();
  const navigate = useNavigate();

  const isEdit = mode === "edit";

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const newTag = tagInput.trim().toLowerCase();
    if (!newTag) return;
    if (tags.includes(newTag)) {
      setTagInput("");
      return;
    }

    setTags([...tags, newTag]);
    setTagInput("");
  }

  function removeTag(tagToRemove: string) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (title.length < 16 || title.length > 64) {
      setError("Title must be between 16 and 64 characters.");
      return;
    }

    if (content.length < 32 || content.length > 8192) {
      setError("Content must be between 32 and 8192 characters.");
      return;
    }

    if (user?.is_blocked) {
      setError("Your account is blocked from posting.");
      return;
    }

    try {
      if (isEdit && postId) {
        await updatePost(postId, { title, content, tags }, user?.id);
        navigate(`/posts/${postId}`);
      } else {
        await createPost({ title, content, tags }, user?.id);
        navigate("/posts");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error()
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className={styles.heading}>
          {isEdit ? "Edit Your Post" : "Share Your Knowledge"}
        </h1>
        <p className={styles.subheading}>
          {isEdit
            ? "Update your post details below."
            : "Help preserve a skill or piece of wisdom for the community."}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.errorBox}>{error}</p>}

          <div className={styles.fieldWrapper}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., How to Sharpen a Kitchen Knife"
              className={styles.input}
            />
            <p className={styles.charHint}>{title.length} / 64</p>
          </div>

          <div className={styles.fieldWrapper}>
            <label htmlFor="content" className={styles.label}>
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share the details — steps, tips, personal stories..."
              className={styles.textarea}
            />
            <p className={styles.charHint}>{content.length} / 8192</p>
          </div>

          <div className={styles.tagInputWrapper}>
            <label htmlFor="tag" className={styles.label}>
              Tags
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type a tag and press Enter"
              className={styles.tagInput}
            />
            {tags.length > 0 && (
              <div className={styles.tagsRow}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tagBubble}>
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className={styles.tagRemoveBtn}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.actionsRow}>
            <button type="submit" className={styles.submitBtn}>
              {isEdit ? "Save Changes" : "Publish Post"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
