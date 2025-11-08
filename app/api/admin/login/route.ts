import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    const response = await fetch(`${BACKEND_URL}/adminLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return NextResponse.json(
      { success: false, error: "Backend connection failed. Ensure Flask server is running on localhost:5000" },
      { status: 500 },
    )
  }
}
