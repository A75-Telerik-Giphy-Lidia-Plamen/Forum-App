import { supabase } from "../config/supabaseClient";
import type { PostPayload } from "../types/payloads";

export async function createPost(
  { title, content, tags }: PostPayload,
  userId?: string,
) {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert({
      author_id: userId,
      title,
      content,
    })
    .select()
    .single();

  if (postError) throw new Error(postError.message);

  if (tags && tags.length > 0) {
    const tagNames = tags.map((name: string) => name.toLowerCase());

    const { error: tagsUpsertError } = await supabase.from("tags").upsert(
      tagNames.map((name) => ({ name })),
      { onConflict: "name", ignoreDuplicates: true },
    );

    if (tagsUpsertError) throw new Error(tagsUpsertError.message);

    const { data: tagRecords, error: tagsFetchError } = await supabase
      .from("tags")
      .select("id")
      .in("name", tagNames);

    if (tagsFetchError) throw new Error(tagsFetchError.message);

    const postTags = tagRecords.map((tag) => ({
      post_id: post.id,
      tag_id: tag.id,
    }));

    const { error: postTagsError } = await supabase
      .from("post_tags")
      .insert(postTags);

    if (postTagsError) throw new Error(postTagsError.message);
  }

  return post;
}
