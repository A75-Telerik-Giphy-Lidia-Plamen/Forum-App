export const styles = {
  // Default / Featured card
  cardLink: "block group",
  card: "p-5 rounded-xl border bg-white transition-all duration-300",
  cardDefault: "border-stone-200 hover:shadow-md",
  cardFeatured: "border-orange-300 hover:shadow-md",

  topRow: "flex items-center gap-2 mb-2",
  categoryBadge:
    "text-xs font-medium text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full",
  trendingBadge:
    "text-xs font-medium text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full",

  title:
    "text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors mb-1.5 leading-snug",
  excerpt: "text-sm text-stone-500 line-clamp-2 mb-3 leading-relaxed",

  tagsRow: "flex flex-wrap gap-1.5 mb-3",
  tag: "text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200",

  footer: "flex items-center gap-4 text-xs text-stone-400",
  avatarCircle:
    "w-6 h-6 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0",
  authorRow: "flex items-center gap-1.5",
  authorName: "font-medium text-stone-700",
  statItem: "flex items-center gap-1",
  statIcon: "h-3.5 w-3.5",

  // Compact card
  compactLink:
    "flex items-center gap-3 p-3 rounded-lg hover:bg-stone-100 transition-colors group",
  compactAvatar:
    "flex-shrink-0 w-8 h-8 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-xs font-semibold",
  compactTitle:
    "text-sm font-medium text-stone-900 truncate group-hover:text-orange-600 transition-colors",
  compactMeta: "flex items-center gap-3 text-xs text-stone-400 mt-0.5",
};
