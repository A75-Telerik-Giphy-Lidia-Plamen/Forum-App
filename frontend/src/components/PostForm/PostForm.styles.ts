export const styles = {
  page: "min-h-screen bg-[#F5F0EB] px-4 py-8",
  container: "max-w-2xl mx-auto",

  backButton:
    "inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800 mb-6 transition-colors",

  heading: "text-3xl font-bold text-stone-900 mb-2",
  subheading: "text-stone-500 mb-8 text-sm",

  form: "space-y-6",

  fieldWrapper: "space-y-2",
  label: "block text-sm font-medium text-stone-700",

  input:
    "w-full px-3 py-2 rounded-md border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300",
  textarea:
    "w-full px-3 py-2 rounded-md border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 min-h-[250px] resize-y",

  tagInputWrapper: "space-y-2",
  tagInput:
    "w-full px-3 py-2 rounded-md border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300",

  tagsRow: "flex flex-wrap gap-2 mt-2",
  tagBubble:
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white border border-stone-200 text-stone-700",
  tagRemoveBtn:
    "ml-1 text-stone-400 hover:text-red-500 font-bold leading-none transition-colors",

  charHint: "text-xs text-stone-400 text-right",

  errorBox:
    "text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 text-sm",

  actionsRow: "flex gap-3 pt-4",
  submitBtn:
    "px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors",
  cancelBtn:
    "px-5 py-2 rounded-md border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-sm font-medium transition-colors",
};
