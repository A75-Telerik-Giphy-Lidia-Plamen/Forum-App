import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    return saved ?? "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="
        relative w-10 h-10
        flex items-center justify-center
        rounded-full
        border border-stone-200 dark:border-zinc-700
        bg-white dark:bg-zinc-900
        text-stone-700 dark:text-zinc-200
        hover:bg-stone-100 dark:hover:bg-zinc-800
        transition-all duration-200
      "
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0" />
      ) : (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 text-orange-400" />
      )}
    </button>
  );
}