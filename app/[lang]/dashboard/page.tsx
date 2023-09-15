"use client"

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import { generateStyledInvoice, mockedInvoiceData } from "./utils/pdfManager"

type ItemInput = {
  description: string
  hours: number
  rate: number
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

export default function DashboardPage() {
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
    e?.preventDefault()
    console.log("alow")
    console.log(data)
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

  console.log("watchedFields", watchedFields)
  // const session = await getServerSession()
  // if (!session || !session.user) {
  //   redirect("/api/auth/signin")
  // }
  // return (
  //   <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
  //     <div className="flex max-w-[980px] flex-col items-start gap-2">
  //       <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
  //         Invoice Generator 2
  //       </h1>
  //       <Button onClick={() => generateStyledInvoice(mockedInvoiceData)}>
  //         Generate PDF Invoice
  //       </Button>
  //     </div>
  //   </section>
  // )

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex bg-gray-100">
        <div className="w-1/2 p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Date */}

            <div className="flex flex-col gap-2">
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

            {/* Invoice Number */}
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="font-medium">
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

            {/* From */}
            <label htmlFor="from">From:</label>
            <textarea {...register("from", { required: true })} />
            {errors.from && <span>Send details are required</span>}

            {/* Bill To */}
            <label htmlFor="billTo">Bill To:</label>
            <textarea {...register("billTo", { required: true })} />
            {errors.billTo && <span>Recipient details are required</span>}

            {fields.map((field, index) => (
              <div key={index} className="grid grid-cols-3 items-center gap-4">
                <div className="col-span-1">
                  <label>Description:</label>
                  <input
                    {...register(`items[${index}].description` as any)}
                    defaultValue={field.description}
                    className="w-full rounded border p-2"
                  />
                </div>
                <div className="col-span-1">
                  <label>Hours:</label>
                  <input
                    type="number"
                    {...register(`items[${index}].hours` as any)}
                    defaultValue={field.hours}
                    className="w-full rounded border p-2"
                  />
                </div>
                <div className="col-span-1 flex-col items-center">
                  <label className="mr-2">Rate:</label>
                  <input
                    type="number"
                    {...register(`items[${index}].rate` as any)}
                    defaultValue={field.rate}
                    className="w-full rounded border p-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() => append({ description: "", hours: 0, rate: 0 })}
              className="mt-4"
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

            <Button type="submit">Submit</Button>
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
                      <td className="px-4 py-2 text-right">{item.rate}</td>
                      <td className="px-4 py-2 text-right">
                        {item.hours * item.rate}
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

          {/* Add any additional details or calculations */}
        </div>
      </div>
    </section>
  )
}
