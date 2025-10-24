"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Clock, Users, Trophy, Target, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type EventStatus = "active" | "scheduled" | "completed"
type EventType = "challenge" | "tournament" | "season"

interface Event {
  id: string
  title: string
  description: string
  type: EventType
  status: EventStatus
  startDate: string
  endDate: string
  participants: number
  rewards: string
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Home Run Derby Challenge",
    description: "Hit 50 home runs to unlock exclusive rewards",
    type: "challenge",
    status: "active",
    startDate: "2025-01-20",
    endDate: "2025-01-27",
    participants: 12450,
    rewards: "5000 coins + Diamond bat",
  },
  {
    id: "2",
    title: "Weekly Strikeout Challenge",
    description: "Record 100 strikeouts this week",
    type: "challenge",
    status: "active",
    startDate: "2025-01-20",
    endDate: "2025-01-27",
    participants: 8920,
    rewards: "3000 coins",
  },
  {
    id: "3",
    title: "Spring Training Tournament",
    description: "Compete in the seasonal tournament",
    type: "tournament",
    status: "scheduled",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
    participants: 0,
    rewards: "Championship trophy + 10000 coins",
  },
  {
    id: "4",
    title: "Perfect Game Challenge",
    description: "Pitch a perfect game in any mode",
    type: "challenge",
    status: "active",
    startDate: "2025-01-15",
    endDate: "2025-01-31",
    participants: 3240,
    rewards: "Legendary pitcher card",
  },
  {
    id: "5",
    title: "Winter Season Finale",
    description: "Final event of the winter season",
    type: "season",
    status: "completed",
    startDate: "2025-01-01",
    endDate: "2025-01-15",
    participants: 25600,
    rewards: "Season rewards distributed",
  },
]

export function EventCalendar() {
  const [events] = useState<Event[]>(mockEvents)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const filteredEvents = events.filter((event) => {
    const typeMatch = selectedType === "all" || event.type === selectedType
    const statusMatch = selectedStatus === "all" || event.status === selectedStatus
    return typeMatch && statusMatch
  })

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "active":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20"
      case "scheduled":
        return "bg-chart-1/10 text-chart-1 border-chart-1/20"
      case "completed":
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case "challenge":
        return Target
      case "tournament":
        return Trophy
      case "season":
        return Calendar
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Event Calendar</h2>
          <p className="text-sm text-muted-foreground">Manage challenges, tournaments, and seasonal events</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Set up a new challenge, tournament, or seasonal event</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input id="event-title" placeholder="Enter event name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea id="event-description" placeholder="Describe the event objectives" rows={3} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select>
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="challenge">Challenge</SelectItem>
                      <SelectItem value="tournament">Tournament</SelectItem>
                      <SelectItem value="season">Season Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-rewards">Rewards</Label>
                  <Input id="event-rewards" placeholder="e.g., 5000 coins" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="challenge">Challenges</SelectItem>
            <SelectItem value="tournament">Tournaments</SelectItem>
            <SelectItem value="season">Season Events</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar View */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground py-8">
          Calendar grid view coming soon - showing list view below
        </div>
      </Card>

      {/* Events List */}
      <div className="grid gap-4">
        {filteredEvents.map((event) => {
          const TypeIcon = getTypeIcon(event.type)
          return (
            <Card key={event.id} className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <TypeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                      <Badge variant="outline" className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(event.startDate).toLocaleDateString()} -{" "}
                          {new Date(event.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.participants.toLocaleString()} participants</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span>{event.rewards}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your filters or create a new event to get started
            </p>
            <Button>Create Event</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
