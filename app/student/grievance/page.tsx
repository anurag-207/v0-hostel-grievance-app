"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function StudentGrievancePage() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    email: "",
    roomNumber: "",
    hostelName: "",
    category: "room-maintenance",
    priority: "medium",
    description: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { value: "room-maintenance", label: "Room Maintenance" },
    { value: "food-quality", label: "Food Quality" },
    { value: "noise-complaint", label: "Noise Complaint" },
    { value: "water-supply", label: "Water Supply" },
    { value: "electricity", label: "Electricity Issue" },
    { value: "cleaning", label: "Cleaning Services" },
    { value: "other", label: "Other" },
  ]

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ]

  const hostelNames = [
    "CV Raman",
    "JC Bose",
    "S Ramanujan",
    "APJ Abdul Kalam",
    "Aryabhatta",
    "VG Bhide",
    "Homi J Bhabha",
    "Meghnad Saha",
    "Vikram Sarabhai",
    "Kalpana Chawla",
    "MS Swaminathan",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newGrievance = {
        id: `GR-${Date.now().toString().slice(-6)}`,
        studentName: formData.studentName,
        studentId: formData.studentId,
        roomNumber: formData.roomNumber,
        hostelName: formData.hostelName,
        category: formData.category,
        status: "pending" as const,
        date: new Date().toISOString().split("T")[0],
        description: formData.description,
        priority: formData.priority,
      }

      const existingGrievances = JSON.parse(localStorage.getItem("grievances") || "[]")
      const updatedGrievances = [newGrievance, ...existingGrievances]
      localStorage.setItem("grievances", JSON.stringify(updatedGrievances))

      setSubmitted(true)
      setFormData({
        studentName: "",
        studentId: "",
        email: "",
        roomNumber: "",
        hostelName: "",
        category: "room-maintenance",
        priority: "medium",
        description: "",
      })
    } catch (err) {
      console.error("Error submitting grievance:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Grievance Submitted</h1>
            <p className="text-muted-foreground mb-6">
              Your issue has been submitted to the authorities. Our team will review it shortly and take necessary
              action. You will be notified once it is resolved.
            </p>
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90">Back to Home</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Submit Your Grievance</h1>
            <p className="text-muted-foreground">Help us improve your hostel experience</p>
          </div>

          <Card className="p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name *</label>
                  <Input
                    type="text"
                    name="studentName"
                    placeholder="Enter your full name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Student ID *</label>
                  <Input
                    type="text"
                    name="studentId"
                    placeholder="Enter your student ID"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address *</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Hostel Name *</label>
                  <select
                    name="hostelName"
                    value={formData.hostelName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="">Select your hostel</option>
                    {hostelNames.map((hostel) => (
                      <option key={hostel} value={hostel}>
                        {hostel}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Room Number *</label>
                  <Input
                    type="text"
                    name="roomNumber"
                    placeholder="e.g., 101, 205A"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Priority *</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {priorities.map((pri) => (
                      <option key={pri.value} value={pri.value}>
                        {pri.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description of Grievance *</label>
                <textarea
                  name="description"
                  placeholder="Please describe your grievance in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Grievance"}
                </Button>
                <Link href="/" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </main>
  )
}
