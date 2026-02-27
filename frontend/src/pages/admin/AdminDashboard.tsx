// src/pages/admin/AdminDashboard.tsx
import { useEffect, useMemo, useState } from "react";
import { getPlatformStats } from "../../services/stats.service";
import { Users, FileText, MessageSquare, ThumbsUp, Shield } from "lucide-react";
import Loading from "../../components/ui/Loading";

type PlatformStats = {
  users: number;
  posts: number;
  comments: number;
  tags: number;
};

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">{title}</div>
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
          <Icon className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
        {value.toLocaleString()}
      </div>

    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cards = useMemo(
    () => [
      { title: "Users", key: "users" as const, icon: Users },
      { title: "Posts", key: "posts" as const, icon: FileText },
      { title: "Comments", key: "comments" as const, icon: MessageSquare },
      { title: "Votes", key: "tags" as const, icon: ThumbsUp }, // service returns votes but named tags
    ],
    []
  );

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPlatformStats();
        if (!alive) {
          // component unmounted: skip updating state
        } else {
          setStats(data);
        }
      } catch {
        if (!alive) {
          // component unmounted: skip updating state
        } else {
          setError("Failed to load platform stats");
          setStats(null);
        }
      } finally {
        if (!alive) {
          // component unmounted: skip updating state
        } else {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-400">
            <Shield className="h-4 w-4" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              Admin Dashboard
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-100">
            Platform overview
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Quick snapshot of users and activity across the forum.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/50"
        >
          Refresh
        </button>
      </div>

      {/* Content */}
      {loading && (
        <Loading />
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && stats && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <StatCard
              key={c.key}
              title={c.title}
              value={stats[c.key]}
              icon={c.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
}