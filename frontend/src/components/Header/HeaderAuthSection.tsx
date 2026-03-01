import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { logoutUser } from "../../services/auth.service";
import ThemeToggle from "../ui/ThemeToggle";
import {
  LogOut,
  PenSquare,
  LayoutGrid,
  Shield,
} from "lucide-react";

export function HeaderAuthSection() {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    setUser(null);
    navigate("/", { replace: true });
  }

  if (loading) return null;

  if (!user) {
    return (
      <nav className="flex items-center gap-6 text-sm">
        <NavLink
          to="/login"
          className="text-stone-600 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          Sign In
        </NavLink>

        <NavLink
          to="/register"
          className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
        >
          Join The Community
        </NavLink>

        <ThemeToggle />
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-8 text-sm">

      {/* Left actions */}
      <div className="flex items-center gap-6">

        <NavLink
          to="/posts"
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <LayoutGrid className="w-4 h-4" />
          Browse
        </NavLink>

        <NavLink
          to="/create-post"
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <PenSquare className="w-4 h-4" />
          Write
        </NavLink>

        {user.role === "admin" && (
          <NavLink
            to="/admin"
            className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <Shield className="w-4 h-4" />
            Admin
          </NavLink>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">


        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-stone-500 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

        <NavLink
          to={`/profile/${user.id}`}
          className="flex items-center"
        >
          {user.avatar_url ? (
            <img
            src={user.avatar_url}
            alt="avatar"
            className="
            w-9 h-9 rounded-full object-cover
            border border-stone-200 dark:border-zinc-700
            hover:ring-2 hover:ring-orange-400
            transition-all
            "
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-stone-300 dark:bg-zinc-700" />
          )}
        </NavLink>
          <ThemeToggle />

      </div>
    </nav>
  );
}