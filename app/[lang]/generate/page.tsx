"use client"

import { Button } from "@/components/ui/button"

import { generateStyledInvoice, mockedInvoiceData } from "./utils/pdfManager"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Invoice Generator 2
        </h1>
        <Button onClick={() => generateStyledInvoice(mockedInvoiceData)}>
          Generate PDF Invoice
        </Button>
      </div>
    </section>
  )
}
