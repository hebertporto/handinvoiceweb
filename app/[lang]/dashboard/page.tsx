import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { Button } from "@/components/Button"

const invoices = [
  { date: '2023-09-15', number: 'INV-000123', to: 'Jhon Doe', total: '$1,2000.00' },
  // More invoice...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Invoices</h1>
            <p className="mt-1 text-sm text-gray-700">You have a total of <strong className="text-purple-800">1 invoice(s) </strong>. Try to use the search bar to find what you need.</p>
          </div>
          <div className="mt-4 flex items-center space-x-3 sm:ml-16 sm:mt-0 sm:flex-none">
            {/* SEARCH */}
            <div className="relative mt-1 flex items-center">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Type here to search..."
                className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* ADD BUTTON */}
            <Button variant="solid" color="blue" type="button" href={'/invoice'}> 
              Add Invoice 
            </Button>
          </div>
        </div>
        <div className="mx-auto my-4 w-full border-y border-gray-200">
          <div className="flex items-center space-x-4 py-4">
            <button
              type="button"
              className="rounded-md bg-white p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              All Invoces <span className="ml-2 rounded-md bg-blue-100 px-2 py-1 text-sm">12</span>
            </button>
            <button
              type="button"
              className="rounded-md bg-white p-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Pending <span className="ml-2 rounded-md bg-orange-100 px-2 py-1 text-sm">6</span>
            </button>
            <button
              type="button"
              className="rounded-md bg-white p-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Sent <span className="ml-2 rounded-md bg-emerald-100 px-2 py-1 text-sm">3</span>
            </button>
            <button
              type="button"
              className="rounded-md bg-white p-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Error <span className="ml-2 rounded-md bg-rose-100 px-2 py-1 text-sm">3</span>
            </button>
          </div>
        </div>
        <div className="-mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"># Number</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">To</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, invoiceIdx) => (
                <tr key={invoice.number}>
                  <td className={classNames(invoiceIdx === 0 ? '' : 'border-t border-transparent', 'relative py-4 pl-4 pr-3 text-sm sm:pl-6')}>{invoice.date}</td>
                  <td className={classNames(invoiceIdx === 0 ? '' : 'border-t border-gray-200', 'px-3 py-4 text-sm text-gray-500')}>{invoice.number}</td>
                  <td className={classNames(invoiceIdx === 0 ? '' : 'border-t border-gray-200', 'px-3 py-4 text-sm text-gray-500')}>{invoice.to}</td>
                  <td className={classNames(invoiceIdx === 0 ? '' : 'border-t border-gray-200', 'px-3 py-4 text-sm text-gray-500')}>{invoice.total}</td>
                  <td className={classNames(invoiceIdx === 0 ? '' : 'border-t border-transparent', 'relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6')}>
                    <Button variant="outline" color="slate" type="button" href={'/invoice'}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
