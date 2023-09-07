import * as React from "react"
import Link from "next/link"
import { Locale } from "@/i18n.config"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  lang: Locale
}

export function MainNav({ lang }: MainNavProps) {
  return (
    <nav className="flex gap-6 md:gap-10" aria-label="Main navigation">
      <Link href="/">
        <div className="flex cursor-pointer items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </div>
      </Link>
      <div className="flex gap-6">
        {siteConfig.mainNav.map(
          (item) =>
            item.href && (
              <Link key={item.title} href={`/${lang}${item.href}`} scroll>
                <div
                  className={cn(
                    "hover:text-active-color flex cursor-pointer items-center text-sm font-medium text-muted-foreground transition"
                  )}
                >
                  {item.title}
                </div>
              </Link>
            )
        )}
      </div>
    </nav>
  )
}
