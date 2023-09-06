import Image from "next/image"
import imgSrc from "assets/images/hero-section/hero-handi.png"

interface HeroSectionProps {
  t: any
}

const HeroSection = ({ t }: HeroSectionProps) => {
  return (
    <div className="m-10 bg-gray-100 p-10 md:p-20">
      <div className="container mx-auto text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t.title}</h1>
        <p className="mb-8 text-xl md:text-2xl">{t.subTitle}</p>
        <a
          href="/generate"
          className="rounded-full bg-blue-500 px-6 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
        >
          {t.button}
        </a>
      </div>
      <div className="mt-10 flex justify-center">
        <Image
          src={imgSrc}
          alt="Mockup of Handinvoice"
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}

export { HeroSection }
