"use client"

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import { generateStyledInvoice, mockedInvoiceData } from "./utils/pdfManager"

type Inputs = {
  example: string
  exampleRequired: string
}

export default async function DashboardPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
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
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/2 p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <input defaultValue="test" {...register("example")} />
            <input {...register("exampleRequired", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
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
