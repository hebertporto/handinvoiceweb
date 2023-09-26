import React, { FC, ReactNode } from "react"

import { ThemeProvider } from "@/components/theme-provider"

import { AuthContextProvider } from "./AuthContext"

interface RootProviderProps {
  children: ReactNode
}

export const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeProvider>
  )
}
