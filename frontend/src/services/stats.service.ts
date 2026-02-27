import { supabase } from "../config/supabaseClient";

export async function getPlatformStats() {
    const[
        {count: users},
        {count: posts},
        {count: comments},
        {count: tags},
    ] = await Promise.all([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("comments").select("*", { count: "exact", head: true }),
        supabase.from("tags").select("*", { count: "exact", head: true }),
    ]);

    return {
        users: users ?? 0,
        posts: posts ?? 0,
        comments: comments ?? 0,
        tags: tags ?? 0,
    }
}