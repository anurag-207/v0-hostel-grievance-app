import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/getGrievances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Fetch grievances error:", error)
    return NextResponse.json(
      { success: false, error: "Backend connection failed. Ensure Flask server is running on localhost:5000" },
      { status: 500 },
    )
  }
}
