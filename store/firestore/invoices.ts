import { addDoc, collection, query, where } from "firebase/firestore"

import { Invoice, ItemInput } from "@/types/invoice"
import { db } from "@/config/firebase/config"

const calculateTotal = (items: ItemInput[]): number => {
  return items.reduce((acc, item) => acc + item.hours * item.ratePerHour, 0)
}

const addInvoice = async (
  invoice: Omit<Invoice, "id" | "ref" | "createdAt" | "total">
) => {
  const createdAt = new Date()
  const total = calculateTotal(invoice.items)
  const newInvoice = {
    ...invoice,
    createdAt,
    total,
  }
  try {
    await addDoc(collection(db, "invoices"), newInvoice)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error }
  }
}

const invoiceQuery = (userID: string) => {
  return query(collection(db, "invoices"), where("user", "==", userID))
}

export { addInvoice, invoiceQuery }
