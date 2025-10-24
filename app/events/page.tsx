import { DashboardLayout } from "@/components/dashboard-layout"
import { EventCalendar } from "@/components/event-calendar"

export default function EventsPage() {
  return (
    <DashboardLayout>
      <EventCalendar />
    </DashboardLayout>
  )
}
