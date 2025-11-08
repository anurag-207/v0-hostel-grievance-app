import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const response = await fetch("http://localhost:5000/submitGrievance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: data.studentId,
        Name: data.studentName,
        Email_address: data.email,
        Hostel_Name: data.hostelName,
        room_number: data.roomNumber,
        Category: data.category,
        Desc: data.description,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Failed to submit grievance" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Grievance submission error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
