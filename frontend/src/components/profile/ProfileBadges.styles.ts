export const badgesSectionStyles = {
  section: `
    mt-6
  `,

  title: `
    text-sm font-semibold
    text-zinc-500 dark:text-zinc-300
    uppercase tracking-wide
    mb-3
  `,

  grid: `
    flex flex-wrap gap-3
  `,

  badgeWrapper: `
    w-32 h-32
    relative group
  `,

  badgeImage: `
    w-full h-full
    object-contain
  `,

  tooltip: `
    absolute bottom-full mb-2
    hidden group-hover:block
    bg-zinc-900 dark:bg-zinc-800
    text-white text-xs
    rounded px-2 py-1
    whitespace-nowrap
    shadow-md
    z-10
  `,
};