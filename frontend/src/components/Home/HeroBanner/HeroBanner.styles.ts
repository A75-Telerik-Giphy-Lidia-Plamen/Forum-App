export const homeBannerStyles = {
  section: `
    relative aspect-[16/6] w-full overflow-hidden
  `,
  image: `
    absolute inset-0 h-full w-full object-cover
  `,
  overlay: `
    absolute inset-0 bg-black/30
  `,
  contentWrapper: `
    relative z-10 flex h-full items-center px-12
  `,
  container: `
    max-w-2xl text-white
  `,
  content: `
    max-w-2xl text-white
  `,
  title: `
    text-5xl font-bold leading-tight
  `,
  description: `
    mt-4 text-lg text-white/90
  `,
  actions: `
    mt-6 flex gap-4
  `,
  primaryButton: `
    rounded-lg bg-white px-6 py-3 font-semibold
    text-black transition hover:bg-gray-200
  `,
  secondaryButton: `
    rounded-lg border border-white px-6 py-3
    font-semibold text-white transition hover:bg-white/10
  `,
};