const HeroSection = () => {
  return (
    <div className="bg-gray-100 p-10 md:p-20">
      <div className="container mx-auto text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Effortless Invoicing for Contractors.
        </h1>
        <p className="mb-8 text-xl md:text-2xl">
          Generate, manage, and send professional invoices with just a few
          clicks.
        </p>
        <a
          href="/generate"
          className="rounded-full bg-blue-500 px-6 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
        >
          Get Started for Free !
        </a>
      </div>
      <div className="mt-10">
        <img
          src="/path-to-your-image.jpg"
          alt="Mockup of Handinvoice"
          className="mx-auto"
        />
      </div>
    </div>
  )
}

export { HeroSection }
