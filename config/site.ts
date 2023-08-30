export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "HandInvoice",
  description: "Effortless Invoicing for Contractors",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Plans",
      href: "/#plans",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
