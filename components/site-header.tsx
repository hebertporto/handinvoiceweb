"use client"

import { Locale } from "@/i18n.config"
import { useUserPreferenceStore } from "@/store/userPreferences"

import { MainNav } from "@/components/main-nav"

import LanguageSwitcher from "./LangueSwitcher"

export function SiteHeader({ lang }: { lang: Locale }) {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav lang={lang} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <LanguageSwitcher />
            <a
              href="/signin"
              className="rounded-full bg-blue-500 px-6 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
            >
              Login
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
