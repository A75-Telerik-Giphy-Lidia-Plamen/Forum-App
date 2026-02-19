import { useEffect } from "react";

export default function ThemeToggle() {
    function toggler(): void {
        const html = document.documentElement;
        const current = html.dataset.theme ?? "light";
        const next = current === "light" ? "dark" : "light";
        
        html.dataset.theme = next;
        localStorage.setItem("theme", next);
    }

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) {
            document.documentElement.dataset.theme = saved;
        }
    }, []);

    return (
    <button
      onClick={toggler}
      className="px-3 py-2 rounded-md
        border
        text-sm
        transition-colors
        bg-neutral-200 dark:bg-neutral-800
        text-neutral-800 dark:text-neutral-200
        hover:bg-neutral-300 dark:hover:bg-neutral-700"
    >
      Theme
    </button>);
}