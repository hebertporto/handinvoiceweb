import { Locale } from "@/i18n.config"

import { getDictionary } from "@/lib/dictionary"
import { FeaturesSection } from "@/components/home/FeatureSection"
import { Highlights } from "@/components/home/Highlights"
import { CallToAction } from "@/components/home/CallToAction"
import { FooterSection } from "@/components/home/FooterSection"
import { HeroSection } from "@/components/home/HeroSection"
import { PricingSection } from "@/components/home/PriceSection"
import { Faqs } from "@/components/home/Faqs"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default async function IndexPage({
  params,
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(params.lang)

  return (
    <section>
      <HeroSection />
      <FeaturesSection />
      <Highlights />
      <CallToAction />
      <TestimonialsSection />
      <PricingSection />
      <Faqs />
      <FooterSection />
    </section>
  )
}
