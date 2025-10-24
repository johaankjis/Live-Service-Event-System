"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, Target, Clock, AlertCircle, Download } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const participationData = [
  { date: "Jan 15", participants: 8400, completions: 6200 },
  { date: "Jan 16", participants: 9200, completions: 7100 },
  { date: "Jan 17", participants: 10500, completions: 8300 },
  { date: "Jan 18", participants: 11200, completions: 9100 },
  { date: "Jan 19", participants: 12800, completions: 10200 },
  { date: "Jan 20", participants: 14200, completions: 11500 },
  { date: "Jan 21", participants: 15400, completions: 12800 },
]

const eventTypeData = [
  { name: "Challenges", value: 45, color: "var(--color-chart-1)" },
  { name: "Tournaments", value: 30, color: "var(--color-chart-2)" },
  { name: "Season Events", value: 25, color: "var(--color-chart-3)" },
]

const retentionData = [
  { day: "D1", rate: 85 },
  { day: "D3", rate: 72 },
  { day: "D7", rate: 68 },
  { day: "D14", rate: 58 },
  { day: "D30", rate: 45 },
]

const rewardDistributionData = [
  { reward: "Coins", distributed: 2400000, claimed: 2100000 },
  { reward: "Items", distributed: 45000, claimed: 38000 },
  { reward: "Cards", distributed: 12000, claimed: 10500 },
  { reward: "Trophies", distributed: 3200, claimed: 2900 },
]

const edgeCaseData = [
  { issue: "Reward not granted", count: 234, severity: "high" },
  { issue: "Event not triggering", count: 156, severity: "critical" },
  { issue: "Progress not saving", count: 89, severity: "high" },
  { issue: "UI display error", count: 67, severity: "medium" },
  { issue: "Timing mismatch", count: 45, severity: "medium" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Monitor event performance, player engagement, and system health
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Participants</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">15,420</div>
          <div className="flex items-center gap-1 text-sm text-chart-4">
            <TrendingUp className="h-4 w-4" />
            <span>+18% from last week</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Completion Rate</span>
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">83.2%</div>
          <div className="flex items-center gap-1 text-sm text-chart-4">
            <TrendingUp className="h-4 w-4" />
            <span>+5.3% from last week</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg. Time to Complete</span>
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">4.2 days</div>
          <div className="flex items-center gap-1 text-sm text-destructive">
            <TrendingDown className="h-4 w-4" />
            <span>-0.8 days from last week</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Edge-Case Errors</span>
            <AlertCircle className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">591</div>
          <div className="flex items-center gap-1 text-sm text-chart-4">
            <TrendingDown className="h-4 w-4" />
            <span>-12% from last week</span>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="errors">Edge Cases</TabsTrigger>
        </TabsList>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Event Participation Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="participants"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    name="Participants"
                  />
                  <Line
                    type="monotone"
                    dataKey="completions"
                    stroke="var(--color-chart-4)"
                    strokeWidth={2}
                    name="Completions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Event Type Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={eventTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {eventTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Retention Tab */}
        <TabsContent value="retention" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Player Retention Curve</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                  }}
                />
                <Bar dataKey="rate" fill="var(--color-chart-1)" name="Retention Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">D1 Retention</p>
                <p className="text-xl font-bold text-foreground">85%</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">D7 Retention</p>
                <p className="text-xl font-bold text-foreground">68%</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">D30 Retention</p>
                <p className="text-xl font-bold text-foreground">45%</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Reward Distribution vs. Claims</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={rewardDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="reward" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                  }}
                />
                <Legend />
                <Bar dataKey="distributed" fill="var(--color-chart-1)" name="Distributed" />
                <Bar dataKey="claimed" fill="var(--color-chart-4)" name="Claimed" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Claim Rate</span>
                <span className="text-lg font-bold text-foreground">87.5%</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Edge Cases Tab */}
        <TabsContent value="errors" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Edge-Case Error Tracking</h3>
            <div className="space-y-3">
              {edgeCaseData.map((error, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <AlertCircle
                      className={`h-5 w-5 ${
                        error.severity === "critical"
                          ? "text-destructive"
                          : error.severity === "high"
                            ? "text-accent"
                            : "text-muted-foreground"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{error.issue}</p>
                      <p className="text-xs text-muted-foreground capitalize">Severity: {error.severity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{error.count}</p>
                    <p className="text-xs text-muted-foreground">occurrences</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive mb-1">Critical Issues Detected</p>
                  <p className="text-xs text-muted-foreground">
                    156 critical errors require immediate attention. Review the "Event not triggering" issue to prevent
                    player frustration.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
