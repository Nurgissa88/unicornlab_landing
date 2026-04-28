// import { NextResponse } from "next/server"
// import nodemailer from "nodemailer"

// import type { RfqPayload } from "@/lib/types"

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT || 465),
//   secure: process.env.SMTP_SECURE === "true",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// })

// function escapeHtml(value: string) {
//   return value
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//     .replaceAll("'", "&#039;")
// }

// function buildItemsHtml(items: RfqPayload["items"]) {
//   return items
//     .map(
//       (item) => `
//         <tr>
//           <td style="padding:8px 12px;border:1px solid #dbe3ee;">${escapeHtml(item.title)}</td>
//           <td style="padding:8px 12px;border:1px solid #dbe3ee;">${escapeHtml(item.sku)}</td>
//           <td style="padding:8px 12px;border:1px solid #dbe3ee;">${escapeHtml(item.category)}</td>
//           <td style="padding:8px 12px;border:1px solid #dbe3ee;text-align:center;">${item.quantity}</td>
//         </tr>
//       `
//     )
//     .join("")
// }

// function buildItemsText(items: RfqPayload["items"]) {
//   return items
//     .map(
//       (item, index) =>
//         `${index + 1}. ${item.title}\n   SKU: ${item.sku}\n   Category: ${item.category}\n   Quantity: ${item.quantity}`
//     )
//     .join("\n\n")
// }

// export async function POST(request: Request) {
//   try {
//     const body = (await request.json()) as RfqPayload

//     if (!body.customer?.fullName || !body.customer?.email) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       )
//     }

//     if (!body.items || body.items.length === 0) {
//       return NextResponse.json(
//         { error: "Cart is empty" },
//         { status: 400 }
//       )
//     }

//     const { customer, items } = body

//     const subject = `Новый запрос КП — ${customer.fullName}`

//     const text = [
//       "Новый запрос коммерческого предложения",
//       "",
//       `ФИО: ${customer.fullName}`,
//       `Компания: ${customer.company || "-"}`,
//       `Email: ${customer.email}`,
//       `Телефон: ${customer.phone || "-"}`,
//       `Комментарий: ${customer.comment || "-"}`,
//       "",
//       "Позиции:",
//       buildItemsText(items),
//     ].join("\n")

//     const html = `
//       <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.5;">
//         <h2 style="margin:0 0 16px;">Новый запрос коммерческого предложения</h2>

//         <div style="margin-bottom:20px;">
//           <p><strong>ФИО:</strong> ${escapeHtml(customer.fullName)}</p>
//           <p><strong>Компания:</strong> ${escapeHtml(customer.company || "-")}</p>
//           <p><strong>Email:</strong> ${escapeHtml(customer.email)}</p>
//           <p><strong>Телефон:</strong> ${escapeHtml(customer.phone || "-")}</p>
//           <p><strong>Комментарий:</strong> ${escapeHtml(customer.comment || "-")}</p>
//         </div>

//         <h3 style="margin:0 0 12px;">Позиции</h3>

//         <table style="border-collapse:collapse;width:100%;font-size:14px;">
//           <thead>
//             <tr>
//               <th style="padding:8px 12px;border:1px solid #dbe3ee;text-align:left;">Товар</th>
//               <th style="padding:8px 12px;border:1px solid #dbe3ee;text-align:left;">Артикул</th>
//               <th style="padding:8px 12px;border:1px solid #dbe3ee;text-align:left;">Категория</th>
//               <th style="padding:8px 12px;border:1px solid #dbe3ee;text-align:center;">Кол-во</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${buildItemsHtml(items)}
//           </tbody>
//         </table>
//       </div>
//     `

//     await transporter.sendMail({
//       from: process.env.RFQ_FROM,
//       to: process.env.RFQ_TO,
//       replyTo: customer.email,
//       subject,
//       text,
//       html,
//     })

//     return NextResponse.json(
//       { success: true, message: "RFQ submitted successfully" },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error("RFQ API error:", error)

//     return NextResponse.json(
//       { error: "Failed to process RFQ request" },
//       { status: 500 }
//     )
//   }
// }






import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

import type { RfqPayload } from "@/lib/types"

const allowedOrigin = "https://inseek.pro"

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function buildItemsHtml(items: RfqPayload["items"]) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #dbe3ee;">${escapeHtml(item.title)}</td>
          <td style="padding:8px 12px;border:1px solid #dbe3ee;">${escapeHtml(item.sku)}</td>
          <td style="padding:8px 12px;border:1px solid #dbe3ee;">${escapeHtml(item.category)}</td>
          <td style="padding:8px 12px;border:1px solid #dbe3ee;text-align:center;">${item.quantity}</td>
        </tr>
      `
    )
    .join("")
}

function buildItemsText(items: RfqPayload["items"]) {
  return items
    .map(
      (item, index) =>
        `${index + 1}. ${item.title}\n   SKU: ${item.sku}\n   Category: ${item.category}\n   Quantity: ${item.quantity}`
    )
    .join("\n\n")
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RfqPayload

    if (!body.customer?.fullName || !body.customer?.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      )
    }

    const { customer } = body
    const items = body.items ?? []
    const hasItems = items.length > 0
    const isGeneralRequest = body.source === "general" || !hasItems

    const subject = `${isGeneralRequest ? "Новый общий запрос" : "Новый запрос КП"} — ${customer.fullName}`

    const text = [
      isGeneralRequest
        ? "Новый общий запрос с сайта"
        : "Новый запрос коммерческого предложения",
      "",
      `ФИО: ${customer.fullName}`,
      `Компания: ${customer.company || "-"}`,
      `Email: ${customer.email}`,
      `Телефон: ${customer.phone || "-"}`,
      `Комментарий: ${customer.comment || "-"}`,
      "",
      hasItems ? "Позиции:" : "Позиции: не выбраны",
      hasItems ? buildItemsText(items) : "",
    ].join("\n")

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.5;">
        <h2 style="margin:0 0 16px;">${isGeneralRequest ? "Новый общий запрос с сайта" : "Новый запрос коммерческого предложения"}</h2>

        <div style="margin-bottom:20px;">
          <p><strong>ФИО:</strong> ${escapeHtml(customer.fullName)}</p>
          <p><strong>Компания:</strong> ${escapeHtml(customer.company || "-")}</p>
          <p><strong>Email:</strong> ${escapeHtml(customer.email)}</p>
          <p><strong>Телефон:</strong> ${escapeHtml(customer.phone || "-")}</p>
          <p><strong>Комментарий:</strong> ${escapeHtml(customer.comment || "-")}</p>
        </div>

        ${
          hasItems
            ? `
              <h3 style="margin:0 0 12px;">Позиции</h3>

              <table style="border-collapse:collapse;width:100%;font-size:14px;">
                <thead>
                  <tr>
                    <th style="padding:8px 12px;border:1px solid #dbe3ee;text-align:left;">Товар</th>
                    <th style="padding:8px 12px;border:1px solid #dbe3ee;text-align:left;">Артикул</th>
                    <th style="padding:8px 12px;border:1px solid #dbe3ee;text-align:left;">Категория</th>
                    <th style="padding:8px 12px;border:1px solid #dbe3ee;text-align:center;">Кол-во</th>
                  </tr>
                </thead>
                <tbody>
                  ${buildItemsHtml(items)}
                </tbody>
              </table>
            `
            : `<p><strong>Позиции:</strong> не выбраны</p>`
        }
      </div>
    `

    await transporter.sendMail({
      from: process.env.RFQ_FROM,
      to: process.env.RFQ_TO,
      replyTo: customer.email,
      subject,
      text,
      html,
    })

    return NextResponse.json(
      { success: true, message: "RFQ submitted successfully" },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error("RFQ API error:", error)

    return NextResponse.json(
      { error: "Failed to process RFQ request" },
      { status: 500, headers: corsHeaders }
    )
  }
}
