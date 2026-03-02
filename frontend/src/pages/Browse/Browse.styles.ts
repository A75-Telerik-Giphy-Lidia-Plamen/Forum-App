export const styles = {
  page: `
    min-h-screen bg-[#F5F0EB] px-4 py-8
    dark:bg-[#1C1A18]
  `,

  container: "max-w-2xl mx-auto",

  heading: `
    text-2xl font-bold text-stone-900 mb-1
    dark:text-zinc-100
  `,

  subheading: `
    text-sm text-stone-500 mb-6
    dark:text-zinc-400
  `,

  searchWrapper: "relative mb-4",

  searchIcon: `
    absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400
    dark:text-zinc-500
  `,

  searchInput: `
    w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 bg-white
    text-sm text-stone-800 placeholder:text-stone-400
    focus:outline-none focus:ring-2 focus:ring-orange-300

    dark:bg-zinc-900 dark:border-zinc-800
    dark:text-zinc-200 dark:placeholder:text-zinc-500
    dark:focus:ring-orange-500/40
  `,

  toolbarRow: "flex items-center gap-2 mb-6",

  sortBtn: `
    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
    text-xs font-medium border transition-colors
  `,

  sortBtnActive: `
    bg-orange-500 text-white border-orange-500
    dark:bg-orange-500 dark:border-orange-500
  `,

  sortBtnInactive: `
    bg-white text-stone-600 border-stone-200 hover:bg-stone-50
    dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800
  `,

  sortIcon: "w-3.5 h-3.5",

  filterBtn: `
    ml-auto inline-flex items-center justify-center
    w-8 h-8 rounded-lg border border-stone-200 bg-white
    text-stone-500 hover:bg-stone-50 transition-colors

    dark:border-zinc-800 dark:bg-zinc-900
    dark:text-zinc-400 dark:hover:bg-zinc-800
  `,

  filterIcon: "w-4 h-4",

  postList: "flex flex-col gap-3",

  emptyState: `
    text-center py-16 text-stone-400 text-sm
    dark:text-zinc-500
  `,

  errorBox: `
    text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 text-sm mb-4
    dark:text-red-300 dark:bg-red-900/20 dark:border-red-500/40
  `,

  loadingText: `
    text-stone-400 text-sm text-center py-12
    dark:text-zinc-500
  `,
  activeTagRow: "mt-2 mb-1 flex items-center gap-2",
  activeTagChip:
    "flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium",
  activeTagIcon: "w-3 h-3",
  activeTagClear: "ml-1 hover:text-indigo-900 transition-colors cursor-pointer",
};
