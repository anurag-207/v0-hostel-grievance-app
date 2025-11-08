import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export async function GET(request: NextRequest) {
  try {
    // Note: Your backend needs a GET /getGrievances endpoint
    const response = await fetch(`${BACKEND_URL}/getGrievances`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const data = await response.json()
    return NextResponse.json({ success: true, grievances: data.grievances || [] })
  } catch (error) {
    console.error("Error fetching grievances:", error)
    // Fallback to sample data if backend is unavailable
    return NextResponse.json({
      success: true,
      grievances: [
        {
          id: "1",
          studentName: "John Smith",
          studentId: "STU001",
          roomNumber: "305",
          hostelName: "CV Raman",
          category: "Room Maintenance",
          status: "pending",
          date: "2025-01-06",
          description: "Ceiling leak in room 305",
          priority: "high",
        },
      ],
    })
  }
}
