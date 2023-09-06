import type { Locale } from "@/i18n.config"

import "server-only"

const dictionaries: any = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
  //   ptBR: () =>
  //     import("@/dictionaries/ptBR.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
