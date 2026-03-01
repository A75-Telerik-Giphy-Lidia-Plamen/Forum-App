export const styles = {
card: `
  bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-between
  dark:bg-zinc-900 dark:border-zinc-800
`,

left: "flex items-center gap-3",

avatarCircle: `
  w-10 h-10 rounded-full bg-orange-200 text-orange-800 font-bold text-sm
  flex items-center justify-center flex-shrink-0
  dark:bg-orange-900/40 dark:text-orange-300
`,

avatarImage: "w-10 h-10 rounded-full object-cover flex-shrink-0",

name: `
  text-sm font-semibold text-stone-900
  dark:text-zinc-100
`,

reputationRow: "flex items-center gap-1.5 mt-0.5",

reputationIcon: `
  w-3.5 h-3.5 text-yellow-400
  dark:text-yellow-300
`,

reputationBar: `
  w-28 h-2 rounded-full bg-stone-200 overflow-hidden
  dark:bg-zinc-700
`,

reputationFill: `
  h-full rounded-full
  bg-gradient-to-r
  from-amber-400
  via-orange-500
  to-amber-600
  transition-all duration-500 ease-out
  shadow-[0_0_8px_rgba(251,191,36,0.35)]
`,
};
