import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate a unique ID for the grievance
    const grievanceId = `GR-${Date.now().toString().slice(-8)}`

    const response = await fetch(`${BACKEND_URL}/submitGrievance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ID: grievanceId,
        Name: body.Name,
        Email_address: body.Email_address,
        Hostel_Name: body.Hostel_Name,
        room_number: body.room_number,
        Category: body.Category,
        Desc: body.Desc,
      }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Grievance submission error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit grievance" }, { status: 500 })
  }
}
