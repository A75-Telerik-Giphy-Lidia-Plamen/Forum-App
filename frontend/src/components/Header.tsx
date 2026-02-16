import { NavLink } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { logout } from "../utils/logout";

export default function Header() {
  const { user, setUser } = useUser();
  return (
    <header>
      <h1>Forum App</h1>
      <nav>
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" onClick={() => logout(setUser)}>
              Logout
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
