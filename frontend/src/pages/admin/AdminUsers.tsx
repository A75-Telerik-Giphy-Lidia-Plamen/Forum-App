import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { Search, Ban, CheckCircle } from "lucide-react";
import Loading from "../../components/ui/Loading";

type AdminUser = {
  id: string;
  email: string;
  username: string;
  display_name: string | null;
  role: "user" | "admin";
  is_blocked: boolean;
  created_at: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      async function fetchUsers() {
        setLoading(true);
    
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });
    
        if (!error && data) {
          setUsers(data as AdminUser[]);
        }
    
        setLoading(false);
      }
    fetchUsers();
  }, []);


  async function toggleBlock(user: AdminUser) {
    const { error } = await supabase
      .from("users")
      .update({ is_blocked: !user.is_blocked })
      .eq("id", user.id);

    if (!error) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, is_blocked: !u.is_blocked }
            : u
        )
      );
    }
  }

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    return (
      u.email.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q) ||
      u.display_name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-100">
          Manage Users
        </h1>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 pl-9 pr-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
          />
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
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-zinc-800 hover:bg-zinc-900/50 cursor-pointer"
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  <td className="px-4 py-3">
                    {user.username || user.display_name || "—"}
                  </td>

                  <td className="px-4 py-3 text-zinc-400">
                    {user.email}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        user.role === "admin"
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-zinc-700 text-zinc-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {user.is_blocked ? (
                      <span className="text-red-400 text-xs">
                        Blocked
                      </span>
                    ) : (
                      <span className="text-green-400 text-xs">
                        Active
                      </span>
                    )}
                  </td>

                  <td
                    className="px-4 py-3 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => toggleBlock(user)}
                      className={`cursor-pointer flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium ${
                        user.is_blocked
                          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      }`}
                    >
                      {user.is_blocked ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Unblock
                        </>
                      ) : (
                        <>
                          <Ban className="h-3 w-3" />
                          Block
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}