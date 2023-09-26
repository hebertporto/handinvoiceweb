import { DocumentData, DocumentReference } from "firebase/firestore"

export type ItemInput = {
  description: string
  hours: number
  ratePerHour: number
}

export type Invoice = {
  id: string
  ref: DocumentReference<DocumentData>
  createdAt: any
  userId: string
  to: string
  from: string
  invoiceNumber: number
  total: number
  items: ItemInput[]
}

export type InvoiceInput = {
  id: string
  userId: string
  to: string
  from: string
  invoiceNumber: number
  total: number
  items: ItemInput[]
}
