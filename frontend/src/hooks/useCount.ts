import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!target) return; // do nothing if 0 or undefined

    started.current = false; // reset when target changes

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;

        let start = 0;
        const stepTime = 16;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const animate = () => {
          start += increment;

          if (start >= target) {
            setCount(target);
            return;
          }

          setCount(Math.floor(start));
          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}