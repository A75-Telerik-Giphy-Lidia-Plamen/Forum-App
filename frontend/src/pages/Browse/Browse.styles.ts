export const styles = {
  page: "min-h-screen bg-[#F5F0EB] px-4 py-8",
  container: "max-w-2xl mx-auto",

  heading: "text-2xl font-bold text-stone-900 mb-1",
  subheading: "text-sm text-stone-500 mb-6",

  searchWrapper: "relative mb-4",
  searchIcon: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400",
  searchInput:
    "w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 bg-white text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-300",

  toolbarRow: "flex items-center gap-2 mb-6",
  sortBtn:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
  sortBtnActive: "bg-orange-500 text-white border-orange-500",
  sortBtnInactive: "bg-white text-stone-600 border-stone-200 hover:bg-stone-50",
  sortIcon: "w-3.5 h-3.5",
  filterBtn:
    "ml-auto inline-flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors",
  filterIcon: "w-4 h-4",

  postList: "flex flex-col gap-3",

  emptyState: "text-center py-16 text-stone-400 text-sm",
  errorBox:
    "text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 text-sm mb-4",
  loadingText: "text-stone-400 text-sm text-center py-12",
};
