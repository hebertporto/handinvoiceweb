import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
  WithFieldValue,
} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"

import { Invoice } from "@/types/invoice"
import { db } from "@/config/firebase/config"
import { Button } from "@/components/Button"

const invoiceConverter: FirestoreDataConverter<Invoice> = {
  toFirestore(invoice: WithFieldValue<Invoice>): DocumentData {
    return {
      createdAt: invoice.createdAt,
      userId: invoice.userId,
      invoiceNumber: invoice.invoiceNumber,
      to: invoice.to,
      from: invoice.from,
      total: invoice.total,
      items: invoice.items,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Invoice {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      ref: snapshot.ref,
      createdAt: data.createdAt,
      userId: data.userId,
      invoiceNumber: data.invoiceNumber,
      to: data.to,
      from: data.from,
      total: data.total,
      items: data.items,
    }
  },
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface InvoiceListProps {
  userId: string
}

const InvoiceList = ({ userId }: InvoiceListProps) => {
  const ref = query(
    collection(db, "invoices").withConverter(invoiceConverter),
    where("userId", "==", userId)
  )

  const [invoices, loading, error] = useCollectionData<Invoice>(ref)

  return (
    <>
      <div className="mx-auto my-4 w-full border-y border-gray-200">
        <div className="flex items-center space-x-4 py-4">
          <button
            type="button"
            className="rounded-md bg-white p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            All Invoces{" "}
            <span className="ml-2 rounded-md bg-blue-100 px-2 py-1 text-sm">
              12
            </span>
          </button>
          <button
            type="button"
            className="rounded-md bg-white p-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Pending{" "}
            <span className="ml-2 rounded-md bg-orange-100 px-2 py-1 text-sm">
              6
            </span>
          </button>
          <button
            type="button"
            className="rounded-md bg-white p-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Sent{" "}
            <span className="ml-2 rounded-md bg-emerald-100 px-2 py-1 text-sm">
              3
            </span>
          </button>
          <button
            type="button"
            className="rounded-md bg-white p-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Error{" "}
            <span className="ml-2 rounded-md bg-rose-100 px-2 py-1 text-sm">
              3
            </span>
          </button>
        </div>
      </div>
      <div className="-mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Date
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                # Number
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                To
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Total
              </th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices?.map((invoice, invoiceIdx) => (
              <tr key={invoice.id}>
                <td
                  className={classNames(
                    invoiceIdx === 0 ? "" : "border-t border-transparent",
                    "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                  )}
                >
                  {invoice.createdAt.toDate().toLocaleDateString()}
                </td>
                <td
                  className={classNames(
                    invoiceIdx === 0 ? "" : "border-t border-gray-200",
                    "px-3 py-4 text-sm text-gray-500"
                  )}
                >
                  {invoice.invoiceNumber}
                </td>
                <td
                  className={classNames(
                    invoiceIdx === 0 ? "" : "border-t border-gray-200",
                    "px-3 py-4 text-sm text-gray-500"
                  )}
                >
                  {invoice.to}
                </td>
                <td
                  className={classNames(
                    invoiceIdx === 0 ? "" : "border-t border-gray-200",
                    "px-3 py-4 text-sm text-gray-500"
                  )}
                >
                  {invoice.total}
                </td>
                <td
                  className={classNames(
                    invoiceIdx === 0 ? "" : "border-t border-transparent",
                    "relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  )}
                >
                  <Button
                    variant="outline"
                    color="slate"
                    type="button"
                    href={"/invoice"}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export { InvoiceList }
