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
            <label htmlFor="date">Date:</label>
            <input type="date" {...register("date", { required: true })} />
            {errors.date && <span>Date is required</span>}

            {/* Invoice Number */}
            <label htmlFor="invoiceNumber">Invoice Number:</label>
            <input
              type="text"
              {...register("invoiceNumber", { required: true })}
            />
            {errors.invoiceNumber && <span>Invoice Number is required</span>}

            {/* From */}
            <label htmlFor="from">From:</label>
            <textarea {...register("from", { required: true })} />
            {errors.from && <span>Send details are required</span>}

            {/* Bill To */}
            <label htmlFor="billTo">Bill To:</label>
            <textarea {...register("billTo", { required: true })} />
            {errors.billTo && <span>Recipient details are required</span>}

            {fields.map((field, index) => (
              <div key={index} className="flex items-center gap-4">
                <label>Description:</label>

                <input
                  {...register(`items[${index}].description` as any)}
                  defaultValue={field.description}
                />

                <label>Hours:</label>

                <input
                  type="number"
                  {...register(`items[${index}].hours` as any)}
                  defaultValue={field.hours}
                />

                <label>Rate:</label>

                <input
                  type="number"
                  {...register(`items[${index}].rate` as any)}
                  defaultValue={field.rate}
                />
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() => {
                console.log("append")
                append({ description: "", hours: 0, rate: 0 })
              }}
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
        <div className="w-1/2 bg-white p-8 shadow-md">
          {/* Invoice Preview goes here */}
          {/* ... */}
        </div>
      </div>
    </section>
  )
}
