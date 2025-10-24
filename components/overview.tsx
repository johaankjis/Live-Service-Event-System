import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Trophy, Coins, Activity } from "lucide-react"

const stats = [
  {
    name: "D7 Retention",
    value: "68.4%",
    change: "+20%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Event Participation",
    value: "42.8%",
    change: "+15%",
    trend: "up",
    icon: Trophy,
  },
  {
    name: "Edge-Case Errors",
    value: "2.1%",
    change: "-30%",
    trend: "down",
    icon: Activity,
  },
  {
    name: "Currency Health",
    value: "100%",
    change: "0% inflation",
    trend: "stable",
    icon: Coins,
  },
]

export function Overview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up"
                    ? "text-chart-4"
                    : stat.trend === "down"
                      ? "text-chart-2"
                      : "text-muted-foreground"
                }`}
              >
                {stat.trend === "up" && <TrendingUp className="h-4 w-4" />}
                {stat.trend === "down" && <TrendingDown className="h-4 w-4" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Current Season</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Season Name</span>
              <span className="text-sm font-medium text-foreground">Spring Training 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Duration</span>
              <span className="text-sm font-medium text-foreground">6 weeks</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Events</span>
              <span className="text-sm font-medium text-foreground">12 challenges</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="inline-flex items-center rounded-full bg-chart-4/10 px-2 py-1 text-xs font-medium text-chart-4">
                Active
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Event Triggers</span>
              <span className="inline-flex items-center rounded-full bg-chart-4/10 px-2 py-1 text-xs font-medium text-chart-4">
                Operational
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Telemetry</span>
              <span className="inline-flex items-center rounded-full bg-chart-4/10 px-2 py-1 text-xs font-medium text-chart-4">
                Collecting
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Economy Balance</span>
              <span className="inline-flex items-center rounded-full bg-chart-4/10 px-2 py-1 text-xs font-medium text-chart-4">
                Healthy
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span className="text-sm font-medium text-foreground">2 minutes ago</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "New event created", detail: "Home Run Derby Challenge", time: "5 minutes ago" },
            { action: "Reward tier adjusted", detail: "Weekly Strikeout Challenge", time: "1 hour ago" },
            { action: "Logic tree updated", detail: "Season progression fail-safe", time: "3 hours ago" },
            { action: "Dashboard alert", detail: "Participation spike detected", time: "5 hours ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
