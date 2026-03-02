export const styles = {
  section: "mt-6",

  heading: `
    text-xl font-semibold mb-4
    text-stone-900
    dark:text-zinc-100
  `,

  error: `
    text-red-600 text-sm mb-2
    dark:text-red-400
  `,

  commentBox: "flex flex-col gap-2 mb-6",

  textarea: `
    w-full border border-stone-200 bg-white rounded p-3 text-sm resize-none min-h-[100px]
    text-stone-800 placeholder:text-stone-400
    focus:outline-none focus:ring-2 focus:ring-orange-300

    dark:bg-zinc-900 dark:border-zinc-800
    dark:text-zinc-200 dark:placeholder:text-zinc-500
    dark:focus:ring-orange-500/40
  `,

  submitBtn: `
    self-end px-4 py-2 bg-orange-500 hover:bg-orange-600
    text-white rounded text-sm transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed

    dark:bg-orange-500 dark:hover:bg-orange-400
  `,

  loginNote: `
    text-sm text-stone-400
    dark:text-zinc-500
  `,

  loadingText: `
    text-sm text-stone-400
    dark:text-zinc-500
  `,

  emptyText: `
    text-sm text-stone-400
    dark:text-zinc-500
  `,

  commentsList: "flex flex-col gap-4",

  commentItem: `
    border border-stone-200 bg-white rounded p-4
    dark:border-zinc-800 dark:bg-zinc-900
  `,

  commentHeader: "flex justify-between items-center mb-1",

  commentAuthor: `
    font-semibold text-sm text-stone-900
    dark:text-zinc-100
  `,

  commentDate: `
    text-xs text-stone-400
    dark:text-zinc-500
  `,

  commentContent: `
    text-sm text-stone-700
    dark:text-zinc-300
  `,

  commentActions: "flex items-center gap-3 mt-3",

  replyBtn: `
    text-xs text-stone-600 hover:text-stone-900 hover:underline
    dark:text-zinc-400 dark:hover:text-zinc-200
  `,

  deleteBtn: `
    text-xs text-red-500 hover:underline
    dark:text-red-400
  `,

  replyForm: `
    mt-3 flex flex-col gap-2
  `,

  replyTextarea: `
    w-full border border-stone-200 bg-white rounded p-2 text-sm resize-none min-h-[80px]
    text-stone-800 placeholder:text-stone-400
    focus:outline-none focus:ring-2 focus:ring-orange-300

    dark:bg-zinc-900 dark:border-zinc-800
    dark:text-zinc-200 dark:placeholder:text-zinc-500
    dark:focus:ring-orange-500/40
  `,

  replyActions: "flex items-center gap-2",

  replySubmitBtn: `
    px-3 py-1.5 bg-orange-500 hover:bg-orange-600
    text-white rounded text-xs transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed

    dark:bg-orange-500 dark:hover:bg-orange-400
  `,

  replyCancelBtn: `
    px-3 py-1.5 border border-stone-200 text-xs rounded
    text-stone-600 hover:text-stone-900 hover:border-stone-300
    dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200
  `,

  replyList: `
    mt-4 ml-4 pl-4 space-y-4 border-l border-stone-200
    dark:border-zinc-800
  `,
};
