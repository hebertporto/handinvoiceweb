export const i18n = {
  defaultLocale: "es",
  locales: ["en", "es", "br"],
} as const

export type Locale = (typeof i18n)["locales"][number]
