import { FeaturesSection } from "@/components/home/FeatureSection"
import { FooterSection } from "@/components/home/FooterSection"
import { HeroSection } from "@/components/home/HeroSection"
import { PricingSection } from "@/components/home/PriceSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default function IndexPage() {
  return (
    <section className="container grid items-center pb-8">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </section>
  )
}
