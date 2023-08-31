import { dictionary } from "@/dictionaries/content"

import { FeaturesSection } from "@/components/home/FeatureSection"
import { FooterSection } from "@/components/home/FooterSection"
import { HeroSection } from "@/components/home/HeroSection"
import { PricingSection } from "@/components/home/PriceSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default function IndexPage({ params }: { params: { lang: string } }) {
  const translation = dictionary[params.lang]
  return (
    <section className="container grid items-center pb-8">
      <HeroSection t={translation} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </section>
  )
}
