"use client"

import React, { useState } from "react"
import { redirect } from "next/navigation"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/Button"

import { generateStyledInvoice } from "./utils/pdfManager"

type ItemInput = {
  description: string
  hours: number
  ratePerHour: number
}

type Inputs = {
  date: string
  invoiceNumber: string
  from: string
  billTo: string
  items: ItemInput[]
  taxRate: number
  terms: string
  paymentDetails: string
  logo: FileList
}

export default function InvoicePage() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const steps =["Date", "From/To", "Items", "Tax"]

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const [step, setStep] = useState(1)

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    generateStyledInvoice(data)
    e?.preventDefault()
  }

  const watchedFields = watch([
    "date",
    "invoiceNumber",
    "from",
    "billTo",
    "items",
    "taxRate",
    "terms",
    "paymentDetails",
    "logo",
  ])

  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Create Invoice
            </h1>
            <p className="mt-1 text-sm text-gray-700">
              Create your <strong className="text-purple-800">new</strong>{" "}
              invoice.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start bg-white">
          {/* WIZARD */}
          <div className="felx mr-8 w-2/12 flex-col space-y-2 border-t border-t-gray-400 pt-4">
            {steps.map((menu, index) => (
              <div key={index} className="flex w-full items-center justify-between">
                <span className="text-gray-500">
                  {menu}
                </span>
                  { index <= step - 1 && (
                    <div className="ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-green-500">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    )
                  }
              </div>
            ))}
          </div>

          {/* STEP BY STEP FORM */}
          <div className="mt-4 w-5/12 bg-gray-100 p-4 pr-12 ring-1 ring-gray-400">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {step === 1 && (
                <>
                  <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-1 flex-col gap-2">
                      <label htmlFor="date" className="font-medium">
                        Date:
                      </label>
                      <input
                        type="date"
                        {...register("date", { required: true })}
                        className="rounded border p-2"
                      />
                      {errors.date && (
                        <span className="text-sm text-red-500">
                          Date is required
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                      <label htmlFor="invoiceNumber" className="font-medium">
                        Invoice Number:
                      </label>
                      <input
                        type="text"
                        {...register("invoiceNumber", { required: true })}
                        className="rounded border p-2"
                      />
                      {errors.invoiceNumber && (
                        <span className="text-sm text-red-500">
                          Invoice Number is required
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="solid"
                    color="blue"
                    type="button"
                    onClick={() => setStep(2)}
                  >
                    Next
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-1 flex-col gap-2">
                      <label htmlFor="from">From:</label>
                      <textarea {...register("from", { required: true })} />
                      {errors.from && <span>Send details are required</span>}
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <label htmlFor="billTo">Bill To:</label>
                      <textarea {...register("billTo", { required: true })} />
                      {errors.billTo && (
                        <span>Recipient details are required</span>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="solid"
                    color="blue"
                    type="button"
                    onClick={() => setStep(3)}
                  >
                    Next
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  {fields.map((field, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-6 items-center gap-4"
                    >
                      {/* Description field */}
                      <div className="col-span-3">
                        <label>Description:</label>
                        <input
                          {...register(`items[${index}].description` as any)}
                          defaultValue={field.description}
                          className="w-full rounded border p-2"
                        />
                      </div>

                      {/* Hours field */}
                      <div className="col-span-1">
                        <label>Hours:</label>
                        <input
                          type="number"
                          {...register(`items[${index}].hours` as any)}
                          defaultValue={field.hours}
                          className="w-full rounded border p-2"
                        />
                      </div>

                      {/* Rate field */}
                      <div className="col-span-1">
                        <label>Rate:</label>
                        <input
                          type="number"
                          {...register(`items[${index}].ratePerHour` as any)}
                          defaultValue={field.ratePerHour}
                          className="w-full rounded border p-2"
                        />
                      </div>

                      {/* Remove button */}
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="rounded p-2 text-red-500 hover:bg-red-100 focus:outline-none"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={() =>
                      append({ description: "", hours: 0, ratePerHour: 0 })
                    }
                  >
                    Add Item
                  </Button>

                  <Button
                    variant="solid"
                    color="blue"
                    type="button"
                    onClick={() => setStep(4)}
                  >
                    Next
                  </Button>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="taxRate" className="font-medium">
                      Tax Rate:
                    </label>
                    <input
                      type="text"
                      {...register("taxRate", { required: true })}
                      className="rounded border p-2"
                    />
                    {errors.taxRate && (
                      <span className="text-sm text-red-500">
                        Tax Rate is required
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="terms" className="font-medium">
                      Terms:
                    </label>
                    <input
                      type="text"
                      {...register("terms", { required: true })}
                      className="rounded border p-2"
                    />
                    {errors.terms && (
                      <span className="text-sm text-red-500">
                        Terms are required
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="paymentDetails" className="font-medium">
                      Payment Details:
                    </label>
                    <input
                      type="text"
                      {...register("paymentDetails", { required: true })}
                      className="rounded border p-2"
                    />
                    {errors.paymentDetails && (
                      <span className="text-sm text-red-500">
                        Payment Details are required
                      </span>
                    )}
                  </div>

                  <Button variant="solid" color="blue" type="submit">
                    Create Invoice
                  </Button>
                </>
              )}
            </form>
          </div>
          
          {/* PREVIEW */}
          <div className="w-5/12 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow ring-1 ring-gray-400">
            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:py-8">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-gray-500">Issued on</dt>{' '}
                  <dd className="inline text-gray-700">
                    <time dateTime="2023-23-01">{watchedFields[0]}</time>
                  </dd>
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4">
                  <dt className="inline text-gray-500">Due on</dt>{' '}
                  <dd className="inline text-gray-700">
                    <time dateTime="2023-31-01">{watchedFields[0]}</time>
                  </dd>
                </div>
                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dt className="font-semibold text-gray-900">From</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">{watchedFields[2]}</span>
                    <br />
                    7363 Cynthia Pass
                    <br />
                    Toronto, ON N3Y 4H8
                  </dd>
                </div>
                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                  <dt className="font-semibold text-gray-900">To</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">{watchedFields[3]}</span>
                    <br />
                    886 Walter Street
                    <br />
                    New York, NY 12345
                  </dd>
                </div>
              </dl>
              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="border-b border-gray-200 text-gray-900">
                  <tr>
                    <th scope="col" className="px-0 py-3 font-semibold">
                      Items
                    </th>
                    <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                      Hours
                    </th>
                    <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                      Rate
                    </th>
                    <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {watchedFields[4] &&
                watchedFields[4].map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="max-w-0 px-0 py-5 align-top">
                        <div className="truncate font-medium text-gray-900">{item.description}</div>
                        <div className="truncate text-gray-500">{item.description}</div>
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                        {item.hours}
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                        {item.ratePerHour}
                      </td>
                      <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$2,000.00</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                      Subtotal
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                    >
                      Subtotal
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">$2,000.00</td>
                  </tr>
                  <tr>
                    <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                      Tax
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                    >
                      Tax
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{watchedFields[5]}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                      Total
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                    >
                      Total
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                      $2,000.00
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
