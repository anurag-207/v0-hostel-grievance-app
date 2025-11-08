import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const response = await fetch("http://localhost:5000/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({ success: true, role: result.role })
    } else {
      return NextResponse.json({ success: false, error: result.error || "Authentication failed" }, { status: 401 })
    }
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
