import { useState } from "react";
import { Menu, X, LogOut, LayoutGrid, PenSquare } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { logoutUser } from "../../services/auth.service";
import { createPortal } from "react-dom";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    setUser(null);
    navigate("/");
    setOpen(false);
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md border border-stone-200 dark:border-zinc-700"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-[999]"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <div
              className="
                fixed top-0 right-0 h-full w-72
                bg-white dark:bg-zinc-900
                shadow-xl z-[1000]
                transform transition-transform duration-300
                translate-x-0
              "
            >
              <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-zinc-800">
                <span className="font-semibold">Menu</span>
                <button onClick={() => setOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-6">

                {user && (
                  <NavLink
                    to={`/profile/${user.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3"
                  >
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-stone-300 dark:bg-zinc-700" />
                    )}
                    <span>Profile</span>
                  </NavLink>
                )}

                <NavLink
                  to="/posts"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Browse
                </NavLink>

                <NavLink
                  to="/create-post"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <PenSquare className="w-4 h-4" />
                  Write
                </NavLink>

                {user && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}