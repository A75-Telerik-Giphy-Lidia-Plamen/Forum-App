export const styles = {
  // Default / Featured card
  cardLink: "block group",

  card: `
    p-5 rounded-xl border bg-white transition-all duration-300
    dark:bg-zinc-900 dark:border-zinc-800
  `,

  cardDefault: `
    border-stone-200 hover:shadow-md
    dark:border-zinc-800 dark:hover:shadow-zinc-900/40
  `,

  cardFeatured: `
    border-orange-300 hover:shadow-md
    dark:border-orange-500/40 dark:hover:shadow-orange-900/30
  `,

  topRow: "flex items-center gap-2 mb-2",

  categoryBadge: `
    text-xs font-medium text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full
    dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-700
  `,

  trendingBadge: `
    text-xs font-medium text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full
    dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-500/30
  `,

  title: `
    text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors mb-1.5 leading-snug
    dark:text-zinc-100 dark:group-hover:text-orange-400
  `,

  excerpt: `
    text-sm text-stone-500 line-clamp-2 mb-3 leading-relaxed
    dark:text-zinc-400
  `,

  tagsRow: "flex flex-wrap gap-1.5 mb-3",

  tag: `
    text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200
    dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700
  `,

  footer: `
    flex items-center gap-4 text-xs text-stone-400
    dark:text-zinc-500
  `,

  avatarCircle: `
    w-6 h-6 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0
    dark:bg-orange-900/40 dark:text-orange-300
  `,

  authorRow: "flex items-center gap-1.5",

  authorName: `
    font-medium text-stone-700
    dark:text-zinc-200
  `,

  statItem: "flex items-center gap-1",

  statIcon: `
    h-3.5 w-3.5
    dark:text-zinc-400
  `,

  // Compact card

  compactLink: `
    flex items-center gap-3 p-3 rounded-lg hover:bg-stone-100 transition-colors group
    dark:hover:bg-zinc-800
  `,

  compactAvatar: `
    flex-shrink-0 w-8 h-8 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-xs font-semibold
    dark:bg-orange-900/40 dark:text-orange-300
  `,

  compactTitle: `
    text-sm font-medium text-stone-900 truncate group-hover:text-orange-600 transition-colors
    dark:text-zinc-100 dark:group-hover:text-orange-400
  `,

  compactMeta: `
    flex items-center gap-3 text-xs text-stone-400 mt-0.5
    dark:text-zinc-500
  `,
};