import { jsPDF } from "jspdf"

type Item = {
  description: string
  hours: number
  ratePerHour: number
}

type InvoiceData = {
  date: string
  invoiceNumber: string
  from: string
  billTo: string
  items: Item[]
  taxRate: number
  terms: string
  paymentDetails: string
  logo?: string
}

function parsePayload(payload: any): InvoiceData {
  return {
    date: payload.date,
    invoiceNumber: payload.invoiceNumber,
    from: payload.from,
    billTo: payload.billTo,
    items: payload.items.map((item: any) => ({
      description: item.description,
      hours: parseInt(item.hours, 10),
      ratePerHour: parseInt(item.ratePerHour, 10),
    })),
    taxRate: parseInt(payload.taxRate, 10),
    terms: payload.terms,
    paymentDetails: payload.paymentDetails,
  }
}

export const mockedInvoiceData: InvoiceData = {
  date: "2023-08-27",
  invoiceNumber: "INV12345",
  from: "XYZ Construction Co.\n123 Builder St.\nConstruction City, CC 12345\nPhone: (123) 456-7890 ",
  billTo: "ABC Company Inc.\n456 Corporate Dr.\nBusiness City, BC 67890",
  logo: "iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAIAAACWMwO2AAABB0lEQVR4nO3awW6CQBRAUabp//8yXZAYUhpF7a1xes6KjC5Y3LyBMGNd1wV+28erb4A5CYuEsEgIi4SwSAiLhLBICIuEsEh8Xv95jPE398E7uvLZxsQicWNibXxP5JubW5mJRUJYJIRFQlgkhEXi1Fvhe7m8sOxfZo+LZ1Z42LQT61jVtrJdn1nhGRNOrLsYTpF/HZa9rzPtVrgsyxjj+qamp860Ye2T2j85bdfHZ6njf3jGhFvhj1kcF8+s8LBpJxavJSwSwiIhLBLCIiEsEsIiISwSwiIhLBLCIiEsEsIiISwSp47NOAPOvUwsEsPpNgomFglhkRAWCWGREBYJYZEQFglhkfgCEn9IZWAcCZgAAAAASUVORK5CYII=",
  items: [
    {
      description: "Construction of Office Block A",
      hours: 80,
      ratePerHour: 50,
    },
    {
      description: "Electrical Setup for Block A",
      hours: 30,
      ratePerHour: 60,
    },
    {
      description: "Plumbing for Block A",
      hours: 10,
      ratePerHour: 70,
    },
    {
      description: "Plumbing for Block A",
      hours: 10,
      ratePerHour: 70,
    },
    {
      description: "Plumbing for Block A",
      hours: 10,
      ratePerHour: 70,
    },
  ],
  taxRate: 0.1, // 10% tax rate
  terms: "Payment due within 30 days",
  paymentDetails: "Bank: Builder Bank\nAccount: 12345678\nSort Code: 12-34-56",
}

// Helper function to draw table borders
const drawTableBorders = (
  doc: jsPDF,
  startX: number,
  startY: number,
  colWidths: string | any[],
  rowHeight: number,
  numRows: number
) => {
  let x = startX
  for (let i = 0; i <= colWidths.length; i++) {
    doc.line(x, startY, x, startY + rowHeight * numRows)
    x += colWidths[i] || 0
  }
  let y = startY
  for (let i = 0; i <= numRows; i++) {
    doc.line(startX, y, x, y)
    y += rowHeight
  }
}

// Helper function to sum array values
const sum = (arr: any[]) => arr.reduce((a: any, b: any) => a + b, 0)

export const generateStyledInvoice = (rawData: any) => {
  const data = parsePayload(rawData)
  const doc = new jsPDF()

  // Section 1: Header
  doc.setFontSize(24)
  doc.text("Invoice 2", 10, 20)

  // If logo is provided, add it underneath the 'Invoice' word
  if (data.logo) {
    doc.addImage(data.logo, "JPEG", 10, 22, 50, 25) // Adjust size and position as required
  }

  doc.setFontSize(12)
  doc.text(`Date: ${data.date}`, 150, 20)
  doc.text(`Invoice #: ${data.invoiceNumber}`, 150, 30)

  // Section 2: Addresses
  doc.setFontSize(14)
  doc.text("From:", 10, 60)
  doc.text(data.from, 10, 70)
  doc.text("Bill To:", 105, 60)
  doc.text(data.billTo, 105, 70)

  // Section 3: Description Table
  doc.setFontSize(14)
  const tableStartY = 100
  const cellPadding = 5
  let yOffset = tableStartY + 10
  doc.setFontSize(12)
  let subtotal = 0
  const rowHeight = 10
  const tableWidths = [80, 30, 40, 30]

  const drawTableHeaders = (yPosition: number) => {
    doc.setFillColor(220, 220, 220)
    doc.rect(10, yPosition, sum(tableWidths), rowHeight, "F")
    doc.text("Description", 10 + cellPadding, yPosition + 7)
    doc.text("Hours", 90 + cellPadding, yPosition + 7)
    doc.text("Rate/Hour", 120 + cellPadding, yPosition + 7)
    doc.text("Total", 160 + cellPadding, yPosition + 7)
  }

  drawTableHeaders(tableStartY) // Initial headers

  // Draw table data
  data.items.forEach((item, index) => {
    if (yOffset + rowHeight > 280) {
      // Check if overflow
      doc.addPage()
      yOffset = 20 // Reset to top of the new page
      drawTableHeaders(yOffset - 10) // Headers for new page
      yOffset += 10
    }
    if (index % 2 !== 0) {
      doc.setFillColor(245, 245, 245)
      doc.rect(10, yOffset, sum(tableWidths), rowHeight, "F")
    }
    doc.text(item.description, 10 + cellPadding, yOffset + 7)
    doc.text(item.hours.toString(), 90 + cellPadding, yOffset + 7)
    doc.text(`$${item.ratePerHour.toFixed(2)}`, 120 + cellPadding, yOffset + 7)
    const itemTotal = item.hours * item.ratePerHour
    doc.text(`$${itemTotal.toFixed(2)}`, 160 + cellPadding, yOffset + 7)
    subtotal += itemTotal
    yOffset += rowHeight
  })

  // Draw table borders
  drawTableBorders(
    doc,
    10,
    tableStartY,
    tableWidths,
    rowHeight,
    data.items.length + 1
  )

  // Check again for overflow before drawing the totals table
  if (yOffset + 3 * rowHeight > 280) {
    doc.addPage()
    yOffset = 20
  }

  // Tax, Subtotal, and Total Table
  yOffset += 10
  const totalsTableWidths = [75, 30] // Adjusted widths
  const totalsTableStartX = 85 // Align to the right half of the page
  doc.setFillColor(220, 220, 220)
  doc.rect(
    totalsTableStartX,
    yOffset,
    sum(totalsTableWidths),
    rowHeight * 3,
    "F"
  )
  doc.text(`Subtotal:`, totalsTableStartX + cellPadding, yOffset + 7)
  doc.text(`$${subtotal.toFixed(2)}`, 160 + cellPadding, yOffset + 7)
  yOffset += rowHeight
  const tax = subtotal * data.taxRate
  doc.text(
    `Tax (${(data.taxRate * 100).toFixed(0)}%):`,
    totalsTableStartX + cellPadding,
    yOffset + 7
  )
  doc.text(`$${tax.toFixed(2)}`, 160 + cellPadding, yOffset + 7)
  yOffset += rowHeight
  const total = subtotal + tax
  doc.text(`Total Amount Due:`, totalsTableStartX + cellPadding, yOffset + 7)
  doc.text(`$${total.toFixed(2)}`, 160 + cellPadding, yOffset + 7)
  yOffset += rowHeight

  // Draw borders for totals table
  drawTableBorders(
    doc,
    totalsTableStartX,
    yOffset - 3 * rowHeight,
    totalsTableWidths,
    rowHeight,
    3
  )

  // Section 4: Terms and Payment Details
  yOffset += 30
  doc.setFontSize(12)
  doc.text("Terms and Conditions:", 10, yOffset)
  const termsLines = doc.splitTextToSize(data.terms, 80) // split to fit the column width
  doc.text(termsLines, 10, yOffset + 10)
  doc.text("Send Payment To:", 105, yOffset)
  const paymentLines = doc.splitTextToSize(data.paymentDetails, 80) // split to fit the column width
  doc.text(paymentLines, 105, yOffset + 10)

  // Save the PDF with timestamped filename
  const timestamp = new Date().toISOString().replace(/[-:T]/g, "")
  doc.save(`invoice_${timestamp}.pdf`)
}
