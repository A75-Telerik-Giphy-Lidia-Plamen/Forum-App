export const styles = {
  page: `
    min-h-screen px-4 py-8
    bg-[#F5F0EB]
    dark:bg-[#1C1A18]
  `,

  container: "max-w-2xl mx-auto",

  backButton: `
    inline-flex items-center gap-1 text-sm
    text-stone-500 hover:text-stone-800
    dark:text-stone-400 dark:hover:text-stone-200
    mb-6 transition-colors
  `,

  heading: `
    text-3xl font-bold text-stone-900
    dark:text-stone-100
    mb-2
  `,

  subheading: `
    text-stone-500
    dark:text-stone-400
    mb-8 text-sm
  `,

  form: "space-y-6",

  fieldWrapper: "space-y-2",

  label: `
    block text-sm font-medium
    text-stone-700
    dark:text-stone-300
  `,

  input: `
    w-full px-3 py-2 rounded-md border
    border-stone-200 bg-white text-stone-900
    placeholder:text-stone-400 text-sm
    focus:outline-none focus:ring-2 focus:ring-orange-300

    dark:bg-[#2A2724]
    dark:border-stone-700
    dark:text-stone-100
    dark:placeholder:text-stone-500
  `,

  textarea: `
    w-full px-3 py-2 rounded-md border
    border-stone-200 bg-white text-stone-900
    placeholder:text-stone-400 text-sm
    focus:outline-none focus:ring-2 focus:ring-orange-300
    min-h-[250px] resize-y

    dark:bg-[#2A2724]
    dark:border-stone-700
    dark:text-stone-100
    dark:placeholder:text-stone-500
  `,

  tagInputWrapper: "space-y-2",

  tagInput: `
    w-full px-3 py-2 rounded-md border
    border-stone-200 bg-white text-stone-900
    placeholder:text-stone-400 text-sm
    focus:outline-none focus:ring-2 focus:ring-orange-300

    dark:bg-[#2A2724]
    dark:border-stone-700
    dark:text-stone-100
    dark:placeholder:text-stone-500
  `,

  tagsRow: "flex flex-wrap gap-2 mt-2",

  tagBubble: `
    inline-flex items-center gap-1 px-3 py-1
    rounded-full text-xs font-medium
    bg-white border border-stone-200 text-stone-700

    dark:bg-[#2A2724]
    dark:border-stone-700
    dark:text-stone-200
  `,

  tagRemoveBtn: `
    ml-1 text-stone-400 hover:text-red-500
    font-bold leading-none transition-colors
  `,

  charHint: `
    text-xs text-stone-400 text-right
    dark:text-stone-500
  `,

  errorBox: `
    text-red-700 bg-red-100 border border-red-200
    rounded px-3 py-2 text-sm

    dark:bg-red-900/30
    dark:border-red-800
    dark:text-red-300
  `,

  actionsRow: "flex gap-3 pt-4",

  submitBtn: `
    px-5 py-2 rounded-md
    bg-orange-500 hover:bg-orange-600
    text-white text-sm font-semibold
    transition-colors
  `,

  cancelBtn: `
    px-5 py-2 rounded-md
    border border-stone-300
    bg-white hover:bg-stone-100
    text-stone-700 text-sm font-medium
    transition-colors

    dark:bg-[#2A2724]
    dark:border-stone-700
    dark:text-stone-200
    dark:hover:bg-stone-800
  `,
};