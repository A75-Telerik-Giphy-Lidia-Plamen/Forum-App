export const profileAboutStyles = {
  page: `
    min-h-screen
    px-4 py-8
    bg-[#F5F0EB]
    dark:bg-[#1C1A18]
  `,

  container: `
    max-w-3xl
    mx-auto
  `,

  card: `
    rounded-xl
    border border-zinc-200
    bg-white
    p-6
    shadow-sm

    dark:border-zinc-700
    dark:bg-zinc-800
  `,

  /* HEADER */

  header: `
  grid gap-6

  md:grid-cols-[1fr_2fr_1fr]
  md:items-start
`,

  leftSection: `
  flex flex-col items-center text-center gap-4
  md:items-start md:text-left
`,
  metaSection: `
  flex flex-col justify-center
`,
  rightSection: `
  flex justify-center
  md:justify-end
`,

  /* AVATAR */

  avatar: `
    w-28 h-28
    md:w-40 md:h-40
    rounded-full
    object-cover
    border border-zinc-200
    shadow-xl
    dark:border-zinc-600
  `,

  /* TEXT */

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
    mt-2
    text-sm
    text-zinc-700
    dark:text-zinc-200
  `,

  statsRow: `
    mt-3
    text-xs
    flex justify-center gap-4
    text-zinc-500
    dark:text-zinc-300

    md:justify-start
  `,

  /* BADGES */

  badgesSection: `
    mt-6
  `,

  badgesGrid: `
    flex flex-wrap
    justify-center
    gap-4

    md:justify-start
  `,

  /* ACTION BUTTON */

  editButton: `
    text-sm
    px-4 py-2
    rounded-md
    border border-zinc-300
    transition

    hover:bg-zinc-100

    dark:border-zinc-600
    dark:bg-zinc-700
    dark:text-white
    dark:hover:bg-zinc-600
  `,
};