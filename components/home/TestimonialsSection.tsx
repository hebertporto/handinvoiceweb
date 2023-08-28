const testimonialsData = [
  {
    name: "John Doe",
    company: "ABC Constructions",
    feedback:
      "HandInvoice has revolutionized our invoicing process. Highly recommended!",
    photo: "https://i.pravatar.cc/300",
  },
  {
    name: "Jane Smith",
    company: "XYZ Builders",
    feedback: "Easy to use and saves so much time!",
    photo: "https://i.pravatar.cc/220",
  },
  {
    name: "Jane Smith",
    company: "XYZ Builders",
    feedback: "Easy to use and saves so much time!",
    photo: "https://i.pravatar.cc/298",
  },
  {
    name: "Jane Smith",
    company: "XYZ Builders",
    feedback: "Easy to use and saves so much time!",
    photo: "https://i.pravatar.cc/299",
  },
]

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

export { TestimonialsSection }
