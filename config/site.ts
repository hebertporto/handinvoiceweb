export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "HandInvoice",
  description: "Effortless Invoicing for Contractors",
  mainNav: [
    {
      title: "Home",
      href: "/",
      protected: false,
    },
    {
      title: "Features",
      href: "/#features",
      protected: false,
    },
    {
      title: "Plans",
      href: "/#plans",
      protected: false,
    },
    {
      title: "FAQ",
      href: "/faq",
      protected: false,
    },
    {
      title: "Contact",
      href: "/contact",
      protected: false,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      protected: true,
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
