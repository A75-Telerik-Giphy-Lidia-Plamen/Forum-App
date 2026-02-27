// src/pages/admin/AdminLayout.tsx
import { NavLink, Outlet } from "react-router-dom";
import { Shield, Users, FileText, LayoutDashboard } from "lucide-react";

function Item({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
          "hover:bg-zinc-800/60",
          isActive
            ? "bg-zinc-800/80 text-orange-400"
            : "text-zinc-300 hover:text-zinc-100",
        ].join(" ")
      }
    >
      <span
        className={
          "grid h-9 w-9 place-items-center rounded-lg border transition"}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* Sidebar */}
        <aside className="w-72 border-r border-zinc-800 bg-zinc-950/40">
          <div className="p-6">
            <NavLink to="/admin" className="flex items-center gap-3" >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400">
                <Shield className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-zinc-100">
                  Admin Panel
                </div>
                <div className="text-xs text-zinc-400">
                  Manage users and posts
                </div>
              </div>
            </NavLink>

            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <LayoutDashboard className="h-4 w-4" />
                <span>Navigation</span>
              </div>

              <nav className="mt-3 flex flex-col gap-1">
                <Item to="/admin/users" icon={Users} label="Users" />
                <Item to="/admin/posts" icon={FileText} label="Posts" />
              </nav>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}