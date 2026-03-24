import { NextResponse } from "next/server"

import type { RfqPayload } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RfqPayload

    if (!body.customer?.fullName || !body.customer?.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      )
    }

    console.log("RFQ request received:")
    console.log(JSON.stringify(body, null, 2))

    return NextResponse.json(
      { success: true, message: "RFQ submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("RFQ API error:", error)

    return NextResponse.json(
      { error: "Failed to process RFQ request" },
      { status: 500 }
    )
  }
}