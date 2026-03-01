export const headerStyles = {
  wrapper: `
    sticky top-0 z-50
    backdrop-blur-md
    bg-[#F5F0EB]/80 dark:bg-[#1C1A18]/80
    border-b border-stone-200 dark:border-zinc-800
  `,

  container: `
    max-w-6xl mx-auto
    flex items-center justify-between
    px-6 py-4
  `,

  brand: `
    text-xl font-semibold tracking-tight
    text-stone-900 dark:text-white
  `,

  desktopNav: `
    hidden md:flex items-center gap-8
  `,

  mobileTrigger: `
    md:hidden flex items-center
  `,
};