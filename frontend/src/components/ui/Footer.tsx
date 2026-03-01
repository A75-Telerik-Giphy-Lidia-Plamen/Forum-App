import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#E8E2DA] dark:bg-[#1C1A18] border-t border-stone-200 dark:border-zinc-800 py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-600 dark:text-zinc-400">

        {/* Left */}
        <div className="flex items-center gap-2 font-medium text-stone-800 dark:text-zinc-200">
          <BookOpen className="w-4 h-4 text-orange-500" />
          Forgotten Knowledge
        </div>

        {/* Center */}
        <div className="text-center">
          Preserving traditional wisdom for future generations. © {new Date().getFullYear()}
        </div>

        {/* Right */}
        <div className="font-medium text-stone-700 dark:text-zinc-300">
          Made with ❤️ by Lidia & Plamen
        </div>

      </div>
    </footer>
  );
}