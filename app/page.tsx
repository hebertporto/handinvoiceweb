import Link from "next/link"

import { Icons } from "@/components/icons"

const featureData = [
  {
    icon: Icons.logo, // Replace with your icon component
    title: "Simplified Invoicing",
    description:
      "Create invoices with a user-friendly interface tailored for contractors.",
  },
  {
    icon: Icons.logo, // Replace with your icon component
    title: "Invoice Templates",
    description:
      "Choose from a variety of contractor-focused templates to suit your business.",
  },
  {
    icon: Icons.logo, // Replace with your icon component
    title: "Recurring Invoices",
    description: "Set up repeat invoices for regular clients.",
  },
  {
    icon: Icons.logo, // Replace with your icon component
    title: "Mobile-Friendly",
    description: "Manage and send invoices on the go, right from your phone.",
  },
  {
    icon: Icons.logo, // Replace with your icon component
    title: "Secure",
    description: "Your data is protected with industry-standard encryption.",
  },
  // ... Add more features similarly
]

const Hero = () => {
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
          Get Started for Free
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

function FeaturesSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto mb-10 text-center">
        <h2 className="mb-4 text-4xl font-bold">Features</h2>
        <p className="text-xl text-gray-600">
          Powerful tools designed specifically for contractors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {featureData.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <feature.icon className="mb-4 h-12 w-12" />
            <h3 className="mb-2 text-2xl font-semibold">{feature.title}</h3>
            <p className="text-center text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold">What Our Users Say</h2>
        <p className="text-xl text-gray-600">
          Trusted by contractors worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="rounded bg-white p-6 shadow-md">
            <p className="mb-6 italic text-gray-600">
              "{testimonial.feedback}"
            </p>
            <div className="flex items-center">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                {testimonial.company && (
                  <p className="text-gray-500">{testimonial.company}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const testimonialsData = [
  {
    name: "John Doe",
    company: "ABC Constructions",
    feedback:
      "Handinvoice has revolutionized our invoicing process. Highly recommended!",
    photo: "/path-to-photo1.jpg", // Update with the actual path
  },
  {
    name: "Jane Smith",
    company: "XYZ Builders",
    feedback: "Easy to use and saves so much time!",
    photo: "/path-to-photo2.jpg", // Update with the actual path
  },
  {
    name: "Jane Smith",
    company: "XYZ Builders",
    feedback: "Easy to use and saves so much time!",
    photo: "/path-to-photo2.jpg", // Update with the actual path
  },
  {
    name: "Jane Smith",
    company: "XYZ Builders",
    feedback: "Easy to use and saves so much time!",
    photo: "/path-to-photo2.jpg", // Update with the actual path
  },
  // ... Add more testimonials similarly
]

function PricingSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold">Choose Your Plan</h2>
        <p className="text-xl text-gray-600">
          Flexible pricing tailored to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className={`rounded border p-6 ${
              plan.recommended ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <h3 className="mb-4 text-2xl font-bold">{plan.title}</h3>
            <p
              className={`mb-4 text-4xl font-bold ${
                plan.recommended ? "text-blue-500" : "text-gray-700"
              }`}
            >
              ${plan.price}/mo
            </p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className="text-gray-600">
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={plan.link}
              className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              {plan.recommended ? "Get Started" : "Select Plan"}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

const pricingData = [
  {
    title: "Basic",
    price: "9",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    link: "/signup-basic",
    recommended: false,
  },
  {
    title: "Pro",
    price: "19",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    link: "/signup-pro",
    recommended: true,
  },
  {
    title: "Enterprise",
    price: "49",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
      "Feature 5",
      "Feature 6",
    ],
    link: "/signup-enterprise",
    recommended: false,
  },
]

function Footer() {
  return (
    <footer className="bg-gray-800 py-12 text-white">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="mb-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-3 text-lg font-bold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-bold">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-bold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-bold">Stay Updated</h4>
            <p className="mb-3">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-l-md p-2"
              />
              <button className="rounded-r-md bg-blue-500 p-2 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-6">
          <p>
            &copy; {new Date().getFullYear()} Handinvoice. All rights reserved.
          </p>
          <div>
            <a href="#" className="mx-2 hover:text-gray-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="mx-2 hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="mx-2 hover:text-gray-400">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </section>
  )
}
