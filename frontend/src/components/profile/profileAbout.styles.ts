export const profileAboutStyles = {
  card: `
    rounded-xl border
    border-zinc-200 dark:border-zinc-800
    bg-white dark:bg-zinc-900
    p-6 shadow-sm
  `,

  header: `
    flex items-start justify-between
  `,

  leftSection: `
    flex gap-4
  `,

  avatar: `
    w-20 h-20 rounded-full object-cover
    border border-zinc-300 dark:border-zinc-700
  `,

  name: `
    text-xl font-semibold
    text-zinc-900 dark:text-zinc-100
  `,

  username: `
    text-sm
    text-zinc-500 dark:text-zinc-400
  `,

  bio: `
    mt-2 text-sm max-w-md
    text-zinc-700 dark:text-zinc-300
  `,

  statsRow: `
    mt-3 text-xs flex gap-4
    text-zinc-500 dark:text-zinc-400
  `,

  editButton: `
    text-sm px-3 py-1.5 rounded-md
    border border-zinc-300 dark:border-zinc-700
    hover:bg-zinc-100 dark:hover:bg-zinc-800
    transition
  `,
};
