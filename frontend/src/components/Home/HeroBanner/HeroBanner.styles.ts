export const homeBannerStyles = {
  section: `
    relative aspect-[4/3] lg:aspect-[16/6]
    w-full overflow-hidden
  `,
  image: `
    absolute inset-0 h-full w-full object-cover
  `,
  overlay: `
    absolute inset-0 bg-black/40
  `,
  contentWrapper: `
    relative z-10 flex h-full items-center
    px-4 sm:px-8 lg:px-24
  `,
  container: `
    max-w-xl lg:max-w-2xl text-white
  `,
  content: `
    max-w-xl lg:max-w-2xl text-white
  `,
  title: `
    text-2xl sm:text-3xl lg:text-5xl
    font-bold leading-snug lg:leading-tight
  `,
  description: `
    mt-3 lg:mt-4
    text-sm sm:text-base lg:text-lg
    text-white/90
  `,
  actions: `
    mt-4 lg:mt-6
    flex flex-col sm:flex-row
    items-start
    gap-3 lg:gap-4
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