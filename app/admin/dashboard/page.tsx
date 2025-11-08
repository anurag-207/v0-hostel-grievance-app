"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Grievance {
  id: string
  studentName: string
  studentId: string
  roomNumber?: string
  category: string
  status: "pending" | "in-progress" | "resolved"
  date: string
  description: string
  priority: "low" | "medium" | "high"
}

export default function AdminDashboard() {
  const [grievances, setGrievances] = useState<Grievance[]>([])
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "resolved">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem("adminLoggedIn")
    if (!adminLoggedIn) {
      router.replace("/admin/login")
      return
    }

    const grievancesFromStorage = JSON.parse(localStorage.getItem("grievances") || "[]")
    setGrievances(grievancesFromStorage)
    setIsLoading(false)
  }, [router])

  const filteredGrievances = (filter === "all" ? grievances : grievances.filter((g) => g.status === filter)).filter(
    (g) =>
      g.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const updateGrievanceStatus = (id: string, newStatus: "pending" | "in-progress" | "resolved") => {
    const updated = grievances.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
    setGrievances(updated)
    localStorage.setItem("grievances", JSON.stringify(updated))
    setSelectedGrievance(null)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn")
    sessionStorage.removeItem("adminEmail")
    router.replace("/")
  }

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

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage and track hostel grievances</p>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-5 border border-border hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">Total Grievances</div>
            <div className="text-3xl font-bold text-foreground">{grievances.length}</div>
            <p className="text-xs text-muted-foreground mt-2">All submissions</p>
          </Card>

          <Card className="p-5 border border-border hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">
              {grievances.filter((g) => g.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Awaiting action</p>
          </Card>

          <Card className="p-5 border border-border hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">In Progress</div>
            <div className="text-3xl font-bold text-blue-600">
              {grievances.filter((g) => g.status === "in-progress").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Being worked on</p>
          </Card>

          <Card className="p-5 border border-border hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">Resolved</div>
            <div className="text-3xl font-bold text-green-600">
              {grievances.filter((g) => g.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Completed</p>
          </Card>

          <Card className="p-5 border border-border hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">High Priority</div>
            <div className="text-3xl font-bold text-destructive">
              {grievances.filter((g) => g.priority === "high").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Urgent issues</p>
          </Card>

          <Card className="p-5 border border-border hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-2">Resolution Rate</div>
            <div className="text-3xl font-bold text-primary">
              {grievances.length > 0
                ? Math.round((grievances.filter((g) => g.status === "resolved").length / grievances.length) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-2">Completion ratio</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Grievances</h2>
                  <span className="text-sm text-muted-foreground">{filteredGrievances.length} found</span>
                </div>

                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search by name, ID, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={filter === "all" ? "default" : "outline"}
                      onClick={() => setFilter("all")}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === "pending" ? "default" : "outline"}
                      onClick={() => setFilter("pending")}
                      size="sm"
                    >
                      Pending ({grievances.filter((g) => g.status === "pending").length})
                    </Button>
                    <Button
                      variant={filter === "in-progress" ? "default" : "outline"}
                      onClick={() => setFilter("in-progress")}
                      size="sm"
                    >
                      In Progress ({grievances.filter((g) => g.status === "in-progress").length})
                    </Button>
                    <Button
                      variant={filter === "resolved" ? "default" : "outline"}
                      onClick={() => setFilter("resolved")}
                      size="sm"
                    >
                      Resolved ({grievances.filter((g) => g.status === "resolved").length})
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredGrievances.length > 0 ? (
                    filteredGrievances.map((grievance) => (
                      <div
                        key={grievance.id}
                        onClick={() => setSelectedGrievance(grievance)}
                        className={`border border-border rounded-lg p-4 cursor-pointer transition-all hover:border-primary hover:bg-accent/5 ${
                          selectedGrievance?.id === grievance.id ? "bg-primary/5 border-primary" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{grievance.studentName}</h3>
                            <p className="text-sm text-muted-foreground">ID: {grievance.studentId}</p>
                          </div>
                          <Badge
                            className={`${grievance.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : grievance.status === "in-progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}
                          >
                            {grievance.status}
                          </Badge>
                        </div>
                        <div className="mb-2 flex items-center gap-2">
                          <p className="text-sm text-foreground font-medium">{grievance.category}</p>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${grievance.priority === "high" ? "text-destructive" : grievance.priority === "medium" ? "text-accent" : "text-primary"} bg-opacity-10`}
                          >
                            {grievance.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground line-clamp-1 mb-2">{grievance.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Room {grievance.roomNumber || "N/A"}</span>
                          <span>{grievance.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No grievances found</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="border border-border sticky top-24">
              <div className="p-6">
                {selectedGrievance ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-foreground">Details</h2>
                      <Badge
                        className={`${selectedGrievance.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : selectedGrievance.status === "in-progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}
                      >
                        {selectedGrievance.status}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="border-b border-border pb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                          Student Information
                        </p>
                        <p className="font-semibold text-foreground">{selectedGrievance.studentName}</p>
                        <p className="text-sm text-muted-foreground">ID: {selectedGrievance.studentId}</p>
                        <p className="text-sm text-muted-foreground">Room: {selectedGrievance.roomNumber || "N/A"}</p>
                      </div>

                      <div className="border-b border-border pb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Grievance Details</p>
                        <p className="text-sm font-medium text-foreground mb-2">{selectedGrievance.category}</p>
                        <p className="text-sm text-foreground">{selectedGrievance.description}</p>
                      </div>

                      <div className="border-b border-border pb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Priority & Date</p>
                        <p
                          className={`font-semibold ${selectedGrievance.priority === "high" ? "text-destructive" : selectedGrievance.priority === "medium" ? "text-accent" : "text-primary"}`}
                        >
                          {selectedGrievance.priority.charAt(0).toUpperCase() + selectedGrievance.priority.slice(1)}{" "}
                          Priority
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{selectedGrievance.date}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Update Status</p>
                        <div className="space-y-2">
                          <Button
                            variant={selectedGrievance.status === "pending" ? "default" : "outline"}
                            onClick={() => updateGrievanceStatus(selectedGrievance.id, "pending")}
                            className="w-full text-sm"
                            size="sm"
                          >
                            Pending
                          </Button>
                          <Button
                            variant={selectedGrievance.status === "in-progress" ? "default" : "outline"}
                            onClick={() => updateGrievanceStatus(selectedGrievance.id, "in-progress")}
                            className="w-full text-sm"
                            size="sm"
                          >
                            In Progress
                          </Button>
                          <Button
                            variant={selectedGrievance.status === "resolved" ? "default" : "outline"}
                            onClick={() => updateGrievanceStatus(selectedGrievance.id, "resolved")}
                            className="w-full text-sm"
                            size="sm"
                          >
                            Resolved
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-2">No grievance selected</p>
                    <p className="text-xs text-muted-foreground">Click on a grievance to view details</p>
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
