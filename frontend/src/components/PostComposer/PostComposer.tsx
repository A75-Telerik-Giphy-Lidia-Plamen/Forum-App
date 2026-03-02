import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { createPost } from "../../services/post.service";
import { uploadMediaToS3 } from "../../services/media.service";
import { supabase } from "../../config/supabaseClient";
import MediaPicker from "../MediaPicker/MediaPicker";
import type { SelectedMedia } from "../MediaPicker/MediaPicker";
import { styles } from "../PostForm/PostForm.styles";

const MAX_MEDIA_FILES = 10;

export default function PostComposer() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaItems, setMediaItems] = useState<SelectedMedia[]>([]);
  const mediaRef = useRef<SelectedMedia[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    mediaRef.current = mediaItems;
  }, [mediaItems]);

  useEffect(() => {
    return () => {
      mediaRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, []);

  function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
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

  function handleAddFiles(files: File[]) {
    setError("");

    const remaining = MAX_MEDIA_FILES - mediaItems.length;
    if (remaining <= 0) {
      setError(`You can upload up to ${MAX_MEDIA_FILES} files.`);
      return;
    }

    const accepted = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (accepted.length === 0) {
      setError("Only image and video files are supported.");
      return;
    }

    const toAdd = accepted.slice(0, remaining).map((file) => {
      const mediaType: SelectedMedia["mediaType"] = file.type.startsWith(
        "video/",
      )
        ? "video"
        : "image";

      return {
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        mediaType,
      };
    });

    if (accepted.length > remaining) {
      setError(`Only ${remaining} more files can be added.`);
    }

    setMediaItems((prev) => [...prev, ...toAdd]);
  }

  function handleRemoveMedia(id: string) {
    setMediaItems((prev) => {
      const item = prev.find((entry) => entry.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((entry) => entry.id !== id);
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
      setIsSubmitting(true);
      const itemsToUpload = [...mediaItems];
      const uploads = await Promise.all(
        itemsToUpload.map((item) => uploadMediaToS3(item.file)),
      );

      const post = await createPost({ title, content, tags }, user?.id);

      if (uploads.length > 0) {
        const mediaRows = uploads.map((upload, index) => ({
          post_id: post.id,
          storage_provider: upload.storageProvider,
          bucket: upload.bucket,
          object_key: upload.objectKey,
          public_url: upload.publicUrl,
          mime_type: itemsToUpload[index].file.type,
          size_bytes: itemsToUpload[index].file.size,
          position: index,
        }));

        const { error: mediaError } = await supabase
          .from("post_media")
          .insert(mediaRows);

        if (mediaError) throw new Error(mediaError.message);
      }

      navigate("/posts");
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
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

        <h1 className={styles.heading}>Share Your Knowledge</h1>
        <p className={styles.subheading}>
          Help preserve a skill or piece of wisdom for the community.
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

          <MediaPicker
            items={mediaItems}
            onAddFiles={handleAddFiles}
            onRemove={handleRemoveMedia}
            maxFiles={MAX_MEDIA_FILES}
            disabled={isSubmitting}
          />

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
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles.cancelBtn}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
