"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  const isAdmin = pathname.includes("/admin")
  const isStudent = pathname.includes("/student")

  if (pathname === "/") {
    return null
  }

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="font-bold text-foreground">Hostel Grievances</span>
          </Link>

          <div className="flex items-center gap-2">
            {isAdmin && <div className="text-sm text-muted-foreground">Admin Portal</div>}
            {isStudent && <div className="text-sm text-muted-foreground">Student Portal</div>}
            <Link href="/">
              <Button variant="outline" size="sm">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
