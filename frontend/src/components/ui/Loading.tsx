import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full blur-xl bg-orange-500/30 animate-pulse" />

          {/* Spinning icon */}
          <Loader2
            className="relative h-14 w-14 animate-spin text-orange-500"
            strokeWidth={2.5}
          />
        </div>

        <p className="text-sm tracking-wide text-zinc-500 dark:text-zinc-400">
          Loading session...
        </p>
      </div>
    </div>
  );
}