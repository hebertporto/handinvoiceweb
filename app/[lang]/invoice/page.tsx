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

        <div className="mt-4 flex gap-2 bg-gray-100">
          <div className="w-1/2 p-8">
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

          {/* Right Column - Preview */}
          <div className="w-1/2 p-8">
            <h2>Preview</h2>
            <div>
              <p>
                <strong>Date:</strong> {watchedFields[0]}
              </p>
              <p>
                <strong>Invoice Number:</strong> {watchedFields[1]}
              </p>
              <p>
                <strong>From:</strong> {watchedFields[2]}
              </p>
              <p>
                <strong>Bill To:</strong> {watchedFields[3]}
              </p>

              {watchedFields[4] &&
                watchedFields[4].map((item, index) => (
                  <div key={index}>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Hours:</strong> {item.hours}
                    </p>
                    <p>
                      <strong>Rate Per Hour:</strong> {item.ratePerHour}
                    </p>
                  </div>
                ))}

              <p>
                <strong>Tax Rate:</strong> {watchedFields[5]}
              </p>
              <p>
                <strong>Terms:</strong> {watchedFields[6]}
              </p>
              <p>
                <strong>Payment Details:</strong> {watchedFields[7]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
