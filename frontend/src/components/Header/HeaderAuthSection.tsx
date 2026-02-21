import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { logoutUser } from "../../services/auth.service";
import { headerStyles as s } from "./header.styles";
import ThemeToggle from "../ui/ThemeToggle";

export function HeaderAuthSection() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    setUser(null);
    navigate("/", { replace: true });
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

      <NavLink to="/write" className={s.link}>
        Write
      </NavLink>

      <NavLink to={`/profile/${user.id}`} className={s.link}>
        Profile
      </NavLink>

      <button onClick={handleLogout} className={s.link}>
        Logout
      </button>
      <ThemeToggle />
    </nav>
  );
}
