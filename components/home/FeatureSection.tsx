import { Icons } from "@/components/icons"

const featureData = [
  {
    icon: Icons.document,
    title: "Simplified Invoicing",
    description:
      "Create invoices with a user-friendly interface tailored for contractors.",
  },
  {
    icon: Icons.template,
    title: "Invoice Templates",
    description:
      "Choose from a variety of contractor-focused templates to suit your business.",
  },
  {
    icon: Icons.arrowLeftRight,
    title: "Recurring Invoices",
    description: "Set up repeat invoices for regular clients.",
  },
  {
    icon: Icons.tableMobile,
    title: "Mobile-Friendly",
    description: "Manage and send invoices on the go, right from your phone.",
  },
  {
    icon: Icons.lock,
    title: "Secure",
    description: "Your data is protected with industry-standard encryption.",
  },
]

function FeaturesSection() {
  return (
    <section className="bg-white py-20" id="features">
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

export { FeaturesSection }
