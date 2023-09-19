import Link from "next/link"

export function NavLink({
  href,
  children,
  scroll = false,
}: {
  href: string
  children: React.ReactNode
  scroll?: boolean
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-gray-700 transition-all duration-500 hover:bg-blue-50 hover:text-gray-900"
      scroll={scroll}
    >
      {children}
    </Link>
  )
}
