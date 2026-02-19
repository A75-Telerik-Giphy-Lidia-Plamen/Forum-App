export const authFormStyles = {
  form: `space-y-4`,

  input: `
    w-full rounded-md border
    border-neutral-300 dark:border-neutral-700
    bg-white dark:bg-neutral-800
    px-3 py-2 text-sm
    text-neutral-900 dark:text-neutral-100
    focus:outline-none focus:ring-2
    focus:ring-amber-600
    transition
  `,

  errorBox: `
    rounded-md
    bg-red-100 dark:bg-red-900/40
    text-red-700 dark:text-red-300
    p-2 text-sm text-center
  `,

  submitButton: `
    w-full rounded-md
    bg-amber-700 hover:bg-amber-800
    text-white
    py-2 text-sm font-medium
    transition-colors
    disabled:opacity-60 disabled:cursor-not-allowed
  `,
    divider: `
    my-4 flex items-center text-xs uppercase tracking-wider
    text-zinc-500
    before:flex-1 before:border-t before:border-zinc-300 before:content-['']
    after:flex-1 after:border-t after:border-zinc-300 after:content-['']
    before:mr-3 after:ml-3
    dark:text-zinc-400
    dark:before:border-zinc-700
    dark:after:border-zinc-700
  `,
};
