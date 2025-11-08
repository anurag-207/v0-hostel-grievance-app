"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsChecking(false)
      return
    }

    // Check if admin is logged in for protected routes
    const adminLoggedIn = sessionStorage.getItem("adminLoggedIn")

    if (!adminLoggedIn) {
      router.push("/admin/login")
    } else {
      setIsChecking(false)
    }
  }, [pathname, router])

  if (isChecking && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
