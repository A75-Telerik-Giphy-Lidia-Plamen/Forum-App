export const styles = {
  page: "min-h-screen bg-[#F5F0EB] px-4 py-8",
  container: "max-w-2xl mx-auto",

  backButton:
    "inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 mb-6 transition-colors",
  backIcon: "w-4 h-4",

  topRow: "flex items-center gap-3 mb-4",
  categoryBadge:
    "text-xs font-medium text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full",
  dateMeta: "flex items-center gap-1 text-xs text-stone-400",
  dateIcon: "w-3.5 h-3.5",

  title: "text-3xl font-bold text-stone-900 leading-tight mb-6",

  authorCard:
    "bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-between mb-6",
  authorLeft: "flex items-center gap-3",
  avatarCircle:
    "w-10 h-10 rounded-full bg-orange-200 text-orange-800 font-bold text-sm flex items-center justify-center flex-shrink-0",
  avatarImage: "w-10 h-10 rounded-full object-cover flex-shrink-0",
  authorName: "text-sm font-semibold text-stone-900",
  reputationRow: "flex items-center gap-1.5 mt-0.5",
  reputationIcon: "w-3.5 h-3.5 text-yellow-400",
  reputationBar: "w-24 h-1.5 rounded-full bg-stone-200 overflow-hidden",
  reputationFill: "h-full rounded-full bg-orange-400",

  content: "text-sm text-stone-700 leading-relaxed whitespace-pre-wrap mb-6",

  tagsRow: "flex flex-wrap gap-2 mb-6",
  tag: "text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200",

  divider: "border-t border-stone-200 mb-4",

  actionsRow: "flex items-center justify-between mb-8",
  actionsLeft: "flex items-center gap-2",
  actionBtn:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-600 hover:bg-stone-50 transition-colors",
  actionIcon: "w-4 h-4",
  commentsCount:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-600",

  actionsRight: "flex items-center gap-2",
  editBtn:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-600 hover:bg-stone-50 transition-colors",
  deleteBtn:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-white text-xs text-red-500 hover:bg-red-50 transition-colors",

  commentsSection: "space-y-4",
  commentsHeading: "text-base font-semibold text-stone-900 mb-3",
  commentBox: "bg-white border border-stone-200 rounded-xl p-4",
  commentTextarea:
    "w-full text-sm text-stone-700 placeholder:text-stone-400 resize-none focus:outline-none min-h-[80px]",
  commentSubmitBtn:
    "mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors",

  errorBox:
    "text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 text-sm mb-4",
  loadingText: "text-stone-400 text-sm text-center py-12",
};
