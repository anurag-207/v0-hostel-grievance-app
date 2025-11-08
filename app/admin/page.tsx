"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AdminHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = sessionStorage.getItem("adminLoggedIn")

    if (!adminLoggedIn) {
      router.push("/admin/login")
    } else {
      setIsLoggedIn(true)
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn")
    sessionStorage.removeItem("adminEmail")
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
              <p className="text-muted-foreground mt-1">Hostel Grievance Management</p>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/dashboard" className="block p-8">
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">All Grievances</h2>
              <p className="text-muted-foreground mb-4">
                View, filter, and manage all student grievances submitted to the hostel system
              </p>
              <div className="flex items-center text-primary font-semibold">
                View Dashboard
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </Card>

          <Card className="border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground">Total Grievances</span>
                <span className="text-2xl font-bold text-foreground">—</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground">Pending</span>
                <span className="text-2xl font-bold text-yellow-600">—</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground">In Progress</span>
                <span className="text-2xl font-bold text-blue-600">—</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Resolved</span>
                <span className="text-2xl font-bold text-green-600">—</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-6">View the dashboard to see live statistics</p>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/dashboard">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90">View All Grievances</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full h-12 bg-transparent">
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-12 bg-transparent" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
