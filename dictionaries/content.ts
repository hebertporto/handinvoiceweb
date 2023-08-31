import en from "./en.json"
import es from "./es.json"
import ptBR from "./ptBR.json"

export interface DictionaryEntry {
  homeHeader: string
  homeContent: string
  aboutHeader: string
  aboutContent: string
}

export const dictionary: Record<string, DictionaryEntry> = {
  en,
  es,
  "pt-BR": ptBR,
}
