export const profileAboutStyles = {
    page: `
    min-h-screen px-4 py-8
    bg-[#F5F0EB]
    dark:bg-[#1C1A18]
  `,

  container: "max-w-3xl mx-auto",

  card: `
    rounded-xl border
    border-zinc-200
    bg-white
    p-6 shadow-sm

    dark:border-zinc-700
    dark:bg-zinc-800
  `,

  header: `
    flex items-start justify-between
  `,

  leftSection: `
    flex gap-4
  `,

  avatar: `
    w-56 h-56
    rounded-full
    object-cover
    border border-zinc-200
    shadow-lg

    dark:border-zinc-600
  `,

  name: `
    text-xl font-semibold
    text-zinc-900
    dark:text-white
  `,

  username: `
    text-sm
    text-zinc-500
    dark:text-zinc-300
  `,

  bio: `
    mt-2 text-sm max-w-md
    text-zinc-700
    dark:text-zinc-200
  `,

  statsRow: `
    mt-3 text-xs flex gap-4
    text-zinc-500
    dark:text-zinc-300
  `,

  editButton: `
    text-sm px-3 py-1.5 rounded-md
    border border-zinc-300
    hover:bg-zinc-100
    transition

    dark:border-zinc-600
    dark:bg-zinc-700
    dark:text-white
    dark:hover:bg-zinc-600
  `,
};