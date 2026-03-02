export const statsStyles = {
  section: `
    border-t border-b 
    bg-neutral-100 border-neutral-200
    dark:bg-neutral-900 dark:border-neutral-800
  `,
  container: `
    mx-auto max-w-8xl px-4 sm:px-6
  `,
  grid: `
    grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4
  `,
  card: `
    flex flex-col items-center justify-center
    py-8 sm:py-10 md:py-12
    border-b sm:border-b-0 sm:border-r
    border-neutral-200
    last:border-b-0 md:last:border-r-0
    dark:border-neutral-800
  `,
  icon: `
    mb-2 h-5 w-5 sm:h-6 sm:w-6 text-[#e56b19]
  `,
  value: `
    text-3xl sm:text-4xl font-serif font-bold
    text-neutral-900
    dark:text-white
  `,
  label: `
    mt-2 text-xs sm:text-sm
    text-neutral-600
    dark:text-neutral-400
  `,
};