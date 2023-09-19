import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }
  return (
    <section className="container mx-auto grid items-center gap-6 px-4 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Invoices"
          className="w-1/2 rounded-md border p-2"
        />

        {/* Add Invoice Button */}

        <a
          href="/invoice"
          className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Invoice
        </a>
      </div>

      {/* Invoice Table */}
      <table className="min-w-full overflow-hidden rounded-md bg-white">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
              Date
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
              Invoice Number
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
              To
            </th>
            <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Example row, you can map your invoice data here */}
          <tr className="transition duration-150 ease-in-out hover:bg-gray-100">
            <td className="border-b border-gray-300 px-4 py-2">2023-09-15</td>
            <td className="border-b border-gray-300 px-4 py-2">INV-00123</td>
            <td className="border-b border-gray-300 px-4 py-2">John Doe</td>
            <td className="border-b border-gray-300 px-4 py-2">$1200.00</td>
          </tr>
          {/* ... more rows */}
        </tbody>
      </table>
    </section>
  )
}
