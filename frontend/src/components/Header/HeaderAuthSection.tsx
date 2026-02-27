import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { logoutUser } from "../../services/auth.service";
import { headerStyles as s } from "./header.styles";
import ThemeToggle from "../ui/ThemeToggle";

export function HeaderAuthSection() {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    setUser(null);
    navigate("/", { replace: true });
  }

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <nav className={s.nav}>
        <NavLink to="/login" className={s.link}>
          Sign In
        </NavLink>

        <NavLink to="/register" className={s.primaryButton}>
          Join The Community
        </NavLink>
        <ThemeToggle />
      </nav>
    );
  }


  return (
    <nav className={s.nav}>
      <NavLink to="/posts" className={s.link}>
        Browse
      </NavLink>

      <NavLink to="/create-post" className={s.link}>
        Write
      </NavLink>

      <NavLink to={`/profile/${user.id}`} className={s.link}>
        <div className="flex items-center gap-2">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-zinc-300 dark:border-zinc-700 shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          )}
          <span>Profile</span>
        </div>
      </NavLink>

      {user.role === "admin" && <NavLink to="/admin" className={s.link}>
        Admin Panel
      </NavLink>}

      <button onClick={handleLogout} className={s.link}>
        Logout
      </button>
      <ThemeToggle />
    </nav>
  );
}
