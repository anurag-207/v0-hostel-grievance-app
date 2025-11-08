import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const response = await fetch("http://localhost:5000/getGrievances", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (result.success || result.grievances) {
      return NextResponse.json({ success: true, grievances: result.grievances })
    } else {
      return NextResponse.json({ success: false, error: "Failed to fetch grievances" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Fetch grievances error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
