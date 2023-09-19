import { useRouter } from "next/router"

function useLocalizedLink() {
  const router = useRouter()

  // Extract the lang from the current path
  const lang = (router.asPath.split("/")[1] || "en") as string // Default to 'en' if not found

  return (path: string) => {
    // Ensure path starts with a slash
    if (!path.startsWith("/")) path = "/" + path

    return `/${lang}${path}`
  }
}

export { useLocalizedLink }
