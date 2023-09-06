import { Locale } from "@/i18n.config"

import { getDictionary } from "@/lib/dictionary"
import { FeaturesSection } from "@/components/home/FeatureSection"
import { FooterSection } from "@/components/home/FooterSection"
import { HeroSection } from "@/components/home/HeroSection"
import { PricingSection } from "@/components/home/PriceSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default async function IndexPage({
  params,
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(params.lang)

  return (
    <section className="container grid items-center pb-8">
      <HeroSection t={page.home.hero} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </section>
  )
}
