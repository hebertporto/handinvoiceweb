"use client"

import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import { Menu, Popover, Transition } from "@headlessui/react"
import clsx from "clsx"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { Logo } from "@/components/Logo"
import { NavLink } from "@/components/NavLink"

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-gray-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  )
}

// TODO: Create the mobile nav interface
function MobileNavigation() {
  const { user } = useAuthContext()

  return (
    <Popover>
      <Popover.Button
        className="ui-not-focus-visible:outline-none relative z-10 flex h-8 w-8 items-center justify-center"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-gray-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-gray-900 shadow-xl ring-1 ring-gray-900/5"
          >
            {siteConfig.mainNav.map((item) => {
              if (item.protected && user) {
                return (
                  <MobileNavLink key={item.title} href={item.href}>
                    {item.title}
                  </MobileNavLink>
                )
              }
              if (!item.protected && !user) {
                return (
                  <MobileNavLink key={item.title} href={item.href}>
                    {item.title}
                  </MobileNavLink>
                )
              }
              return null
            })}
            <hr className="m-2 border-gray-300/40" />
            <MobileNavLink href="/login">Sign in</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

interface SiteHeaderProps {
  lang: string
}

export function SiteHeader({ lang }: SiteHeaderProps) {
  const { user, logout } = useAuthContext()
  const router = useRouter()

  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              {siteConfig.mainNav.map((item) => {
                // Mostra os links protegidos apenas quando o usuário está logado
                if (item.protected && user) {
                  return (
                    <NavLink key={item.title} href={item.href}>
                      {item.title}
                    </NavLink>
                  )
                }
                // Esconde os links não protegidos quando o usuário está logado
                if (!item.protected && !user) {
                  return (
                    <NavLink key={item.title} href={item.href}>
                      {item.title}
                    </NavLink>
                  )
                }
                return null
              })}
            </div>
          </div>
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <div className="relative h-12 w-12 rounded-md">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User Avatar"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none">
                  <div className="px-4 py-3">
                    <p className="text-sm">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Account settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => logout()}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <div className="hidden md:block">
                <Button onClick={() => router.push("login")}>Sign in</Button>
              </div>
              <Button onClick={() => router.push("register")} color="blue">
                <span>
                  Get started <span className="hidden lg:inline">today</span>
                </span>
              </Button>
              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}
