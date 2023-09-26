import { Invoice, ItemInput } from "@/types/invoice"

const generateRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const generateMockItem = (): ItemInput => ({
  description: `Task ${generateRandomNumber(1, 100)}`,
  hours: generateRandomNumber(1, 10),
  ratePerHour: generateRandomNumber(50, 200),
})

const generateMockInvoice = (): Omit<
  Invoice,
  "id" | "ref" | "createdAt" | "total"
> => {
  const numItems = generateRandomNumber(1, 5)
  const items = Array.from({ length: numItems }, () => generateMockItem())

  return {
    userId: `user${generateRandomNumber(1, 100)}`,
    to: `Client ${generateRandomNumber(1, 100)}`,
    from: `From ${generateRandomNumber(1, 100)}`,
    invoiceNumber: generateRandomNumber(1000, 9999),
    items,
  }
}

export { generateMockInvoice }
