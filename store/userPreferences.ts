import { create } from "zustand"

const useUserPreferenceStore = create((set) => ({
  language: "es", // default language

  setLanguage: (lang: string) => set({ language: lang }),
}))

export { useUserPreferenceStore }
