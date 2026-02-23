import { supabase } from "../config/supabaseClient";
import type { PostPayload } from "../types/payloads";
import type { Post } from "../types/Post";

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

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:users(
        username,
        avatar_url,
        user_media(public_url)
      ),
      tags:post_tags(tag:tags(name))
    `,
    )
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((post) => ({
    ...post,
    author: post.author
      ? {
          username: post.author.username,
          avatar_url:
            post.author.user_media?.public_url ?? post.author.avatar_url,
        }
      : null,
    tags: post.tags.map((t: { tag: { name: string } }) => ({
      name: t.tag.name,
    })),
  }));
}

export async function getPostById(id: string): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:users(
        username,
        avatar_url,
        user_media(public_url)
      ),
      tags:post_tags(tag:tags(name))
    `,
    )
    .eq("id", id)
    .eq("is_deleted", false)
    .single();

  if (error) throw new Error(error.message);

  return {
    ...data,
    author: data.author
      ? {
          username: data.author.username,
          avatar_url:
            data.author.user_media?.public_url ?? data.author.avatar_url,
        }
      : null,
    tags: data.tags.map((t: { tag: { name: string } }) => ({
      name: t.tag.name,
    })),
  };
}

export async function updatePost(
  postId: string,
  { title, content, tags }: PostPayload,
  userId: string | undefined,
) {
  if (!userId) throw new Error("User not authenticated");

  const { data: post, error: postError } = await supabase
    .from("posts")
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq("id", postId)
    .eq("author_id", userId)
    .select()
    .single();

  if (postError) throw new Error(postError.message);

  await syncPostTags(postId, tags);

  return post;
}

async function syncPostTags(postId: string, tags: string[] | undefined) {
  const { error: deleteError } = await supabase
    .from("post_tags")
    .delete()
    .eq("post_id", postId);

  if (deleteError) throw new Error(deleteError.message);

  if (!tags || tags.length === 0) return;

  const tagNames = tags.map((name) => name.toLowerCase());

  const { error: upsertError } = await supabase.from("tags").upsert(
    tagNames.map((name) => ({ name })),
    {
      onConflict: "name",
      ignoreDuplicates: true,
    },
  );

  if (upsertError) throw new Error(upsertError.message);

  const { data: tagRecords, error: fetchError } = await supabase
    .from("tags")
    .select("id")
    .in("name", tagNames);

  if (fetchError) throw new Error(fetchError.message);

  const { error: insertError } = await supabase
    .from("post_tags")
    .insert(tagRecords.map((tag) => ({ post_id: postId, tag_id: tag.id })));

  if (insertError) throw new Error(insertError.message);
}
