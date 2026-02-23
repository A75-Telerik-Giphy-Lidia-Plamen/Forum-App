export const editProfileStyles = {
  page: `
    min-h-screen px-4 py-8
    bg-[#F5F0EB]
    dark:bg-[#1C1A18]
  `,

  container: `
    max-w-2xl mx-auto
  `,

  backBtn: `
    inline-flex items-center gap-1 text-sm
    text-stone-500 hover:text-stone-800
    dark:text-stone-400 dark:hover:text-stone-200
    mb-6 transition-colors
  `,

  title: `
    text-3xl
    font-bold 
    text-stone-900 
    mb-2
    dark:text-stone-100
  `,

  subtitle: `
   text-stone-500 mb-8 text-sm
    dark:text-stone-400
  `,

  form: "space-y-6",

  avatarContainer: `
    flex items-center gap-4 mb-6
  `,

  avatarCircle: `
    h-16 w-16 rounded-full overflow-hidden
    bg-stone-200 flex items-center justify-center
    dark:bg-stone-700
  `,

  avatarImg: `
    h-full w-full object-cover
  `,

  initials: `
    font-semibold text-stone-700
    dark:text-stone-200
  `,

  uploadBtn: `
    px-4 py-2 rounded-md
    border border-stone-300
    bg-white hover:bg-stone-100
    text-stone-700 text-sm font-medium
    transition-colors

    dark:bg-[#2A2724]
    dark:border-stone-700
    dark:text-stone-200
    dark:hover:bg-stone-800
  `,

  label: `
    block text-sm font-medium
    text-stone-700
    dark:text-stone-300
    mb-2
  `,

  input: `
    w-full px-3 py-2 rounded-md border
    border-stone-200
    bg-white text-stone-900
    placeholder:text-stone-400
    text-sm
    focus:outline-none focus:ring-2 focus:ring-orange-300

    dark:bg-[#2A2724]
    dark:border-stone-700
    dark:text-stone-100
    dark:placeholder:text-stone-500
  `,

  textarea: `
    w-full px-3 py-2 rounded-md border
    border-stone-200
    bg-white text-stone-900
    placeholder:text-stone-400
    text-sm resize-y
    focus:outline-none focus:ring-2 focus:ring-orange-300

    dark:bg-[#2A2724]
    dark:border-stone-700
    dark:text-stone-100
    dark:placeholder:text-stone-500
  `,

  error: `
    text-red-700 text-sm mt-1
    dark:text-red-400
  `,

  buttonsRow: `
    flex gap-3 pt-4
  `,

  saveBtn: `
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