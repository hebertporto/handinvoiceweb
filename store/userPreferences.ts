import { create } from "zustand"

const useUserPreferenceStore = create((set) => ({
  language: "es",
  setLanguage: (lang: string) => set({ language: lang }),
}))

export { useUserPreferenceStore }
