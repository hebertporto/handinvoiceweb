import { i18n, Locale } from "@/i18n.config"

import "@/styles/globals.css"

import { Metadata } from "next"
import { RootProvider } from "@/context/RootProvider"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { lang: Locale }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
        suppressHydrationWarning
      >
        <RootProvider>
          <main className="relative flex min-h-screen flex-col">
            <SiteHeader lang={params.lang} />
            <div className="flex-1">{children}</div>
          </main>
          <TailwindIndicator />
        </RootProvider>
      </body>
    </html>
  )
}
