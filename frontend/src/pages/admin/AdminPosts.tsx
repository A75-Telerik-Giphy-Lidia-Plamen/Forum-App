import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { Search, SlidersHorizontal, Tag, ArrowUpDown, Trash2, FileText, RotateCcw } from "lucide-react";
import Loading from "../../components/ui/Loading";

type TagRow = { id: string; name: string };

type PostTagJoin = {
  tags: { id: string; name: string }[] | null;
};

type AdminPostRow = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string | null;
  author_id: string;
  is_deleted: boolean;
  is_verified: boolean;
  users: { username: string } | null;
  post_tags?: PostTagJoin[] | null;
};

type AdminPost = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string | null;
  author_id: string;
  authorUsername: string;
  is_deleted: boolean;
  is_verified: boolean;
  tags: { id: string; name: string }[];
};

type SortKey = "created_at" | "title" | "updated_at";
type SortDir = "desc" | "asc";

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString();
}

function flattenTags(row: AdminPostRow): { id: string; name: string }[] {
  const joins = row.post_tags ?? [];
  const list = joins.flatMap((j) => j.tags ?? []).filter(Boolean) as { id: string; name: string }[];

  const seen = new Set<string>();
  return list.filter((t) => (seen.has(t.id) ? false : (seen.add(t.id), true)));
}

export default function AdminPosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [tags, setTags] = useState<TagRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [tagId, setTagId] = useState<string>("all");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  async function loadTags() {
    const { data } = await supabase
      .from("tags")
      .select("id,name")
      .order("name", { ascending: true });

    setTags((data ?? []) as TagRow[]);
  }

  async function loadPosts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        title,
        created_at,
        updated_at,
        author_id,
        is_deleted,
        is_verified,
        users:author_id ( username ),
        post_tags (
          tags ( id, name )
        )
      `
      )as { data: AdminPostRow[] | null; error: Error };

    if (!error && data) {
        console.log(data[0])
      const mapped = (data as AdminPostRow[]).map((row) => {
        const username = row.users?.username ?? row.author_id.slice(0, 8);
        return {
          id: row.id,
          title: row.title,
          created_at: row.created_at,
          updated_at: row.updated_at,
          author_id: row.author_id,
          authorUsername: username,
          is_deleted: row.is_deleted,
          is_verified: row.is_verified,
          tags: flattenTags(row),
        };
      });

      setPosts(mapped);
    }

    setLoading(false);
  }

  useEffect(() => {
    const run = async () => {
      await Promise.all([loadTags(), loadPosts()]);
    };

    void run();
  }, []);

  async function softDeletePost(postId: string) {
    const { error } = await supabase
      .from("posts")
      .update({ is_deleted: true, updated_at: new Date().toISOString() })
      .eq("id", postId);

    if (!error) {
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, is_deleted: true } : p)));
    }
  }

  async function restorePost(postId: string) {
    const { error } = await supabase
      .from("posts")
      .update({ is_deleted: false, updated_at: new Date().toISOString() })
      .eq("id", postId);

    if (!error) {
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, is_deleted: false } : p)));
    }
  }

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();

    return posts
      .filter((p) => (includeDeleted ? true : !p.is_deleted))
      .filter((p) => (!qq ? true : p.title.toLowerCase().includes(qq)))
      .filter((p) => (tagId === "all" ? true : p.tags.some((t) => t.id === tagId)))
      .sort((a, b) => {
        let av: string | number = "";
        let bv: string | number = "";

        if (sortKey === "created_at") {
          av = new Date(a.created_at).getTime();
          bv = new Date(b.created_at).getTime();
        } else if (sortKey === "updated_at") {
          av = a.updated_at ? new Date(a.updated_at).getTime() : 0;
          bv = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        } else {
          av = a.title.toLowerCase();
          bv = b.title.toLowerCase();
        }

        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [posts, q, tagId, includeDeleted, sortKey, sortDir]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-400">
            <FileText className="h-4 w-4" />
            <span className="text-xs font-semibold tracking-wide uppercase">Admin</span>
          </div>
          <h1 className="mt-2 text-xl font-semibold text-zinc-100">Manage Posts</h1>
          <p className="mt-1 text-sm text-zinc-400">Search, filter by tag, and sort. Delete is soft (is_deleted).</p>
        </div>

        <button
          type="button"
          onClick={loadPosts}
          className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/50"
        >
          Refresh
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {/* Search */}
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 py-2 pl-9 pr-3 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Tag filter */}
        <div className="relative">
          <Tag className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <select
            value={tagId}
            onChange={(e) => setTagId(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-zinc-800 bg-zinc-900/40 py-2 pl-9 pr-9 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
          >
            <option value="all">All tags</option>
            {tags.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-zinc-500" />
        </div>

        {/* Sort + include deleted */}
        <div className="flex gap-2 md:col-span-2">
          <div className="relative w-full">
            <ArrowUpDown className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-zinc-800 bg-zinc-900/40 py-2 pl-9 pr-3 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
            >
              <option value="created_at">Created</option>
              <option value="updated_at">Updated</option>
              <option value="title">Title</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/50"
            title="Toggle sort direction"
          >
            {sortDir.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={() => setIncludeDeleted((v) => !v)}
            className={`cursor-pointer rounded-xl border px-3 py-2 text-sm hover:bg-zinc-800/50 ${
              includeDeleted
                ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
                : "border-zinc-800 bg-zinc-900/40 text-zinc-200"
            }`}
            title="Toggle deleted posts visibility"
          >
            Deleted
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800">
        {loading ? (
          <Loading />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Tags</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Updated</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className={`border-t border-zinc-800 hover:bg-zinc-900/50 ${
                    p.is_deleted ? "opacity-60" : ""
                  }`}
                >
                  <td
                    className="px-4 py-3 cursor-pointer text-zinc-100"
                    onClick={() => navigate(`/posts/${p.id}`)}
                    title="Open post"
                  >
                    {p.title}
                  </td>

                  <td className="px-4 py-3 text-zinc-400">@{p.authorUsername}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 4).map((t) => (
                        <span
                          key={t.id}
                          className="rounded-md border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 text-xs text-orange-300"
                        >
                          {t.name}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="text-xs text-zinc-500">+{p.tags.length - 4}</span>
                      )}
                      {!p.tags.length && <span className="text-xs text-zinc-500">—</span>}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-zinc-400">{fmtDate(p.created_at)}</td>
                  <td className="px-4 py-3 text-zinc-400">{fmtDate(p.updated_at)}</td>

                  <td className="px-4 py-3 text-right">
                    {p.is_deleted ? (
                      <button
                        type="button"
                        onClick={() => restorePost(p.id)}
                        className="cursor-pointer inline-flex items-center gap-1 rounded-lg bg-zinc-700/30 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700/50"
                        title="Restore post"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Restore
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => softDeletePost(p.id)}
                        className="cursor-pointer inline-flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20"
                        title="Soft delete post"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500">
                    No posts match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}