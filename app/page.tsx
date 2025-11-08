"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [userType, setUserType] = useState<"admin" | "student" | null>(null)

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7rKr26aEdvCtEAefv0ahlnHVNDYNib.png)",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
              <Image
                src="/images/design-mode/9759793.png"
                alt="Hostel Grievance Management System"
                width={64}
                height={64}
                priority
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{"VNIT Hostel Grievance"} </h1>
            <p className="text-gray-100 text-lg">Management System</p>
          </div>

          {!userType ? (
            <div className="space-y-3">
              <Button
                onClick={() => setUserType("admin")}
                className="w-full h-12 text-base bg-primary hover:bg-primary/90"
              >
                Admin Login
              </Button>
              <Button onClick={() => setUserType("student")} variant="outline" className="w-full h-12 text-base">
                Submit Grievance
              </Button>
            </div>
          ) : userType === "admin" ? (
            <div className="space-y-4">
              <button onClick={() => setUserType(null)} className="text-sm text-gray-200 hover:text-white">
                ← Back
              </button>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Link href="/admin/login" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90">Continue to Admin Portal</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <button onClick={() => setUserType(null)} className="text-sm text-gray-200 hover:text-white">
                ← Back
              </button>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Link href="/student/grievance" className="block">
                  <Button className="w-full bg-accent hover:bg-accent/90">Submit Your Grievance</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
