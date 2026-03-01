import { useMemo } from "react";

type Props = {
  reputation: number;
  createdAt: string;
};

export function ProfileStats({ reputation, createdAt }: Props) {
  const { percentage, level } = useMemo(() => {
    const base = 1000;

    const level = Math.floor(reputation / base) + 1;
    const tierStart = Math.floor(reputation / base) * base;
    const tierEnd = tierStart + base;

    const progress = reputation - tierStart;
    const percentage = (progress / base) * 100;

    return { max: tierEnd, percentage, level };
  }, [reputation]);

  return (
    <div className="mt-5 space-y-3">

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">
          Joined {new Date(createdAt).toLocaleDateString()}
        </span>

        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
          {reputation} pts
        </span>
      </div>

      {/* Progress Container */}
      <div className="space-y-1">

        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="uppercase tracking-wide">
            Level {level}
          </span>
          <span>
            {reputation % 1000} / 1000
          </span>
        </div>

        <div className="relative h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">

          {/* Gradient Fill */}
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-amber-400
              via-orange-500
              to-amber-600
              transition-all
              duration-700
              ease-out
              shadow-[0_0_10px_rgba(251,191,36,0.4)]
            "
            style={{ width: `${percentage}%` }}
          />

        </div>
      </div>

    </div>
  );
}