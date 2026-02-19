export const headerStyles = {
  wrapper: `
    flex items-center justify-between
    px-6 py-4
    border-b
    bg-neutral-100 dark:bg-neutral-900
  `,

  brand: `
    text-xl font-semibold
    text-neutral-900 dark:text-white
  `,

  nav: `
    flex items-center gap-6
  `,

  link: `
    text-neutral-600 dark:text-neutral-300
    hover:text-black dark:hover:text-white
    transition-colors
  `,

  primaryButton: `
    px-4 py-2 rounded-md
    bg-amber-700 text-white
    hover:bg-amber-800
    transition-colors
  `,
};
