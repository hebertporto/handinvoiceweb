"use client"

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import { generateStyledInvoice, mockedInvoiceData } from "./utils/pdfManager"

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

export default async function DashboardPage() {
  const session = await getServerSession()

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

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    console.log(data)
    generateStyledInvoice(data)
    e?.preventDefault()
    console.log("alow")
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

  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-2 bg-gray-100">
        <div className="w-1/2 p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
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
                  <span className="text-sm text-red-500">Date is required</span>
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

            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="from">From:</label>
                <textarea {...register("from", { required: true })} />
                {errors.from && <span>Send details are required</span>}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="billTo">Bill To:</label>
                <textarea {...register("billTo", { required: true })} />
                {errors.billTo && <span>Recipient details are required</span>}
              </div>
            </div>

            {fields.map((field, index) => (
              <div key={index} className="grid grid-cols-6 items-center gap-4">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a2 2 0 012-2h4a2 2 0 012 2v1h5a1 1 0 011 1v1a1 1 0 01-1 1v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a1 1 0 01-1-1V4a1 1 0 011-1h5V2zm1 0h6v1H7V2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                append({ description: "", hours: 0, ratePerHour: 0 })
              }
              className="mt-4 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Item
            </Button>

            <label htmlFor="taxRate">Tax Rate:</label>
            <input type="number" {...register("taxRate", { required: true })} />
            {errors.taxRate && <span>Tax Rate is required</span>}

            <label htmlFor="terms">Terms:</label>
            <textarea {...register("terms", { required: true })} />
            {errors.terms && <span>Payment terms are required</span>}

            <label htmlFor="paymentDetails">Payment Details:</label>
            <textarea {...register("paymentDetails", { required: true })} />
            {errors.paymentDetails && <span>Payment details are required</span>}

            {/* <label htmlFor="logo">Logo (Optional):</label>
            <input type="file" {...register("logo")} /> */}

            <Button
              className="mt-4 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>

        {/* Right Column */}

        <div className="w-1/2 rounded-lg border bg-white p-8 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Invoice Preview</h2>
            {/* Uncomment and use when you integrate the logo upload */}
            {/* {watchedFields[8] && <img src={URL.createObjectURL(watchedFields[8][0])} alt="Uploaded logo" className="h-16 w-auto" />} */}
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold">Date: {watchedFields[0]}</p>
            <p className="text-sm font-semibold">
              Invoice Number: {watchedFields[1]}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold">From:</p>
              <p className="text-sm">{watchedFields[2]}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Bill To:</p>
              <p className="text-sm">{watchedFields[3]}</p>
            </div>
          </div>

          <div className="mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Hours</th>
                  <th className="px-4 py-2 text-right">Rate</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {watchedFields[4] &&
                  watchedFields[4].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{item.description}</td>
                      <td className="px-4 py-2 text-right">{item.hours}</td>
                      <td className="px-4 py-2 text-right">
                        {item.ratePerHour}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {item.hours * item.ratePerHour}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <p className="text-sm">Tax Rate: {watchedFields[5]}%</p>
            <p className="text-sm">Terms: {watchedFields[6]}</p>
            <p className="text-sm">Payment Details: {watchedFields[7]}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
