"use client"

import type React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Authentication is handled at individual page level for better performance
  return <>{children}</>
}
