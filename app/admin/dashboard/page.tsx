"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Grievance {
  id: string
  studentName: string
  studentId: string
  category: string
  status: "pending" | "in-progress" | "resolved"
  date: string
  description: string
  priority: "low" | "medium" | "high"
}

export default function AdminDashboard() {
  const [grievances, setGrievances] = useState<Grievance[]>([
    {
      id: "1",
      studentName: "John Smith",
      studentId: "STU001",
      category: "Room Maintenance",
      status: "pending",
      date: "2025-01-06",
      description: "Ceiling leak in room 305",
      priority: "high",
    },
    {
      id: "2",
      studentName: "Sarah Johnson",
      studentId: "STU002",
      category: "Food Quality",
      status: "in-progress",
      date: "2025-01-05",
      description: "Poor quality of mess food",
      priority: "medium",
    },
    {
      id: "3",
      studentName: "Mike Davis",
      studentId: "STU003",
      category: "Noise Complaint",
      status: "resolved",
      date: "2025-01-04",
      description: "Noise from adjacent room",
      priority: "low",
    },
  ])

  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "resolved">("all")

  const filteredGrievances = filter === "all" ? grievances : grievances.filter((g) => g.status === filter)

  const updateGrievanceStatus = (id: string, newStatus: "pending" | "in-progress" | "resolved") => {
    setGrievances((prev) => prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g)))
    setSelectedGrievance(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-accent"
      case "low":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage student grievances</p>
            </div>
            <Link href="/">
              <Button variant="outline">Logout</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Grievances</div>
            <div className="text-2xl font-bold text-foreground">{grievances.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {grievances.filter((g) => g.status === "pending").length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">In Progress</div>
            <div className="text-2xl font-bold text-blue-600">
              {grievances.filter((g) => g.status === "in-progress").length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Resolved</div>
            <div className="text-2xl font-bold text-green-600">
              {grievances.filter((g) => g.status === "resolved").length}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-border">
              <div className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Grievances List</h2>

                <div className="flex gap-2 mb-4">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                    className="text-sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === "pending" ? "default" : "outline"}
                    onClick={() => setFilter("pending")}
                    className="text-sm"
                  >
                    Pending
                  </Button>
                  <Button
                    variant={filter === "in-progress" ? "default" : "outline"}
                    onClick={() => setFilter("in-progress")}
                    className="text-sm"
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={filter === "resolved" ? "default" : "outline"}
                    onClick={() => setFilter("resolved")}
                    className="text-sm"
                  >
                    Resolved
                  </Button>
                </div>

                <div className="space-y-3">
                  {filteredGrievances.map((grievance) => (
                    <div
                      key={grievance.id}
                      onClick={() => setSelectedGrievance(grievance)}
                      className="border border-border rounded-lg p-4 cursor-pointer hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{grievance.studentName}</h3>
                          <p className="text-sm text-muted-foreground">{grievance.category}</p>
                        </div>
                        <Badge className={getStatusColor(grievance.status)}>{grievance.status}</Badge>
                      </div>
                      <p className="text-sm text-foreground mb-2 line-clamp-1">{grievance.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${getPriorityColor(grievance.priority)}`}>
                          {grievance.priority.charAt(0).toUpperCase() + grievance.priority.slice(1)} Priority
                        </span>
                        <span className="text-xs text-muted-foreground">{grievance.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="border border-border sticky top-6">
              <div className="p-6">
                {selectedGrievance ? (
                  <>
                    <h2 className="text-xl font-bold text-foreground mb-4">Grievance Details</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Student Name</p>
                        <p className="font-semibold text-foreground">{selectedGrievance.studentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Student ID</p>
                        <p className="font-semibold text-foreground">{selectedGrievance.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Category</p>
                        <p className="font-semibold text-foreground">{selectedGrievance.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Priority</p>
                        <p className={`font-semibold ${getPriorityColor(selectedGrievance.priority)}`}>
                          {selectedGrievance.priority.charAt(0).toUpperCase() + selectedGrievance.priority.slice(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Date Submitted</p>
                        <p className="font-semibold text-foreground">{selectedGrievance.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Description</p>
                        <p className="text-sm text-foreground">{selectedGrievance.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Update Status</p>
                        <div className="space-y-2">
                          <Button
                            variant={selectedGrievance.status === "pending" ? "default" : "outline"}
                            onClick={() => updateGrievanceStatus(selectedGrievance.id, "pending")}
                            className="w-full text-sm"
                          >
                            Pending
                          </Button>
                          <Button
                            variant={selectedGrievance.status === "in-progress" ? "default" : "outline"}
                            onClick={() => updateGrievanceStatus(selectedGrievance.id, "in-progress")}
                            className="w-full text-sm"
                          >
                            In Progress
                          </Button>
                          <Button
                            variant={selectedGrievance.status === "resolved" ? "default" : "outline"}
                            onClick={() => updateGrievanceStatus(selectedGrievance.id, "resolved")}
                            className="w-full text-sm"
                          >
                            Resolved
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Select a grievance to view details</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
