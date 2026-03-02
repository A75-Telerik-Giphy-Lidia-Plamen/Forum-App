import { useMemo, useState } from "react";
import type { Media } from "../../types/Media";

type PostMediaCarouselProps = {
  media: Media[];
};

export default function PostMediaCarousel({ media }: PostMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => media.slice(), [media]);
  const count = items.length;

  if (count === 0) return null;

  if (count === 1) {
    const item = items[0];
    return (
      <div className="rounded-xl overflow-hidden border border-stone-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
        {item.media_type === "image" ? (
          <img
            src={item.url}
            alt="Post media"
            className="w-full max-h-[420px] object-cover"
          />
        ) : (
          <video
            src={item.url}
            controls
            playsInline
            className="w-full max-h-[420px] object-cover"
          />
        )}
      </div>
    );
  }

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % count);
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              {item.media_type === "image" ? (
                <img
                  src={item.url}
                  alt="Post media"
                  className="w-full max-h-[420px] object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  playsInline
                  className="w-full max-h-[420px] object-cover"
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white px-3 py-2 text-sm hover:bg-black/70"
          aria-label="Previous media"
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white px-3 py-2 text-sm hover:bg-black/70"
          aria-label="Next media"
        >
          →
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === activeIndex
                ? "bg-orange-500"
                : "bg-stone-300 dark:bg-stone-700"
            }`}
            aria-label={`Go to media ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
