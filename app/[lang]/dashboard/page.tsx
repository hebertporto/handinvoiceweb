"use client"

import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import { addInvoice } from "@/store/firestore/invoices"
import { generateMockInvoice } from "@/utils/mockHelper"

import { Button } from "@/components/Button"

import { InvoiceList } from "./components/InvoiceList"

export default function DashboardPage() {
  const { user } = useAuthContext()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleAddInvoice = () => {
    const invoice = generateMockInvoice()
    console.log("invoice", invoice)
    addInvoice({ ...invoice, userId: user.uid })
  }

  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Invoices
            </h1>
            <p className="mt-1 text-sm text-gray-700">
              You have a total of{" "}
              <strong className="text-purple-800">1 invoice(s) </strong>. Try to
              use the search bar to find what you need.
            </p>
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
            <Button
              variant="solid"
              color="blue"
              type="button"
              href={"/invoice"}
            >
              Add Invoice
            </Button>
            <button onClick={handleAddInvoice}>Add Invoice 2</button>
          </div>
        </div>
        <InvoiceList userId={user.uid} />
      </div>
    </div>
  )
}
