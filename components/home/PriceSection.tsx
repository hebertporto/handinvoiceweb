const pricingData = [
  {
    title: "Basic",
    price: "9",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    link: "/signup",
    recommended: false,
  },
  {
    title: "Pro",
    price: "19",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    link: "/signup",
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
    link: "/signup",
    recommended: false,
  },
]

function PricingSection() {
  return (
    <section className="py-20" id="plans">
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

export { PricingSection }
