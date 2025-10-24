"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, AlertTriangle, Plus, Edit, ShoppingCart, Gift } from "lucide-react"
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
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Currency {
  id: string
  name: string
  icon: string
  totalSupply: number
  circulation: number
  inflationRate: number
  status: "healthy" | "warning" | "critical"
}

interface EconomySource {
  id: string
  name: string
  type: "source" | "sink"
  currency: string
  amount: number
  frequency: string
}

const currencies: Currency[] = [
  {
    id: "coins",
    name: "Coins",
    icon: "🪙",
    totalSupply: 45000000,
    circulation: 38000000,
    inflationRate: 2.3,
    status: "healthy",
  },
  {
    id: "gems",
    name: "Premium Gems",
    icon: "💎",
    totalSupply: 2500000,
    circulation: 1800000,
    inflationRate: 0.8,
    status: "healthy",
  },
  {
    id: "tickets",
    name: "Event Tickets",
    icon: "🎫",
    totalSupply: 8900000,
    circulation: 7200000,
    inflationRate: 5.2,
    status: "warning",
  },
]

const economySources: EconomySource[] = [
  { id: "1", name: "Daily Login Rewards", type: "source", currency: "Coins", amount: 500000, frequency: "Daily" },
  { id: "2", name: "Challenge Completions", type: "source", currency: "Coins", amount: 1200000, frequency: "Weekly" },
  { id: "3", name: "Tournament Prizes", type: "source", currency: "Gems", amount: 45000, frequency: "Weekly" },
  { id: "4", name: "Store Purchases", type: "sink", currency: "Coins", amount: 800000, frequency: "Daily" },
  { id: "5", name: "Upgrade Costs", type: "sink", currency: "Coins", amount: 650000, frequency: "Daily" },
  { id: "6", name: "Premium Shop", type: "sink", currency: "Gems", amount: 38000, frequency: "Weekly" },
]

const circulationData = [
  { date: "Week 1", coins: 32000000, gems: 1500000, tickets: 6200000 },
  { date: "Week 2", coins: 34000000, gems: 1600000, tickets: 6500000 },
  { date: "Week 3", coins: 36000000, gems: 1700000, tickets: 6800000 },
  { date: "Week 4", coins: 38000000, gems: 1800000, tickets: 7200000 },
]

const inflationData = [
  { month: "Oct", rate: 1.8 },
  { month: "Nov", rate: 2.1 },
  { month: "Dec", rate: 2.5 },
  { month: "Jan", rate: 2.3 },
]

export function EconomyManagement() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("all")

  const filteredSources =
    selectedCurrency === "all"
      ? economySources
      : economySources.filter((source) => source.currency === selectedCurrency)

  const getStatusColor = (status: Currency["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20"
      case "warning":
        return "bg-accent/10 text-accent border-accent/20"
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Economy Management</h2>
          <p className="text-sm text-muted-foreground">Monitor currency health, sources, and sinks</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Currency Source
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Currency Source/Sink</DialogTitle>
              <DialogDescription>Define a new way players earn or spend currency</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="source-name">Source/Sink Name</Label>
                <Input id="source-name" placeholder="e.g., Weekly Challenge Reward" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="source-type">Type</Label>
                  <Select>
                    <SelectTrigger id="source-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="source">Source (Players Earn)</SelectItem>
                      <SelectItem value="sink">Sink (Players Spend)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source-currency">Currency</Label>
                  <Select>
                    <SelectTrigger id="source-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coins">Coins</SelectItem>
                      <SelectItem value="gems">Premium Gems</SelectItem>
                      <SelectItem value="tickets">Event Tickets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="source-amount">Amount</Label>
                  <Input id="source-amount" type="number" placeholder="e.g., 5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source-frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger id="source-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="per-event">Per Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source-description">Description</Label>
                <Textarea id="source-description" placeholder="Describe when and how this is triggered" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Source/Sink</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Currency Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {currencies.map((currency) => (
          <Card key={currency.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{currency.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{currency.name}</h3>
                  <Badge variant="outline" className={getStatusColor(currency.status)}>
                    {currency.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Supply</p>
                <p className="text-xl font-bold text-foreground">{currency.totalSupply.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">In Circulation</p>
                <p className="text-lg font-semibold text-foreground">{currency.circulation.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Inflation Rate</span>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    currency.inflationRate > 4 ? "text-destructive" : "text-chart-4"
                  }`}
                >
                  {currency.inflationRate > 3 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {currency.inflationRate}%
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sources">Sources & Sinks</TabsTrigger>
          <TabsTrigger value="circulation">Circulation</TabsTrigger>
          <TabsTrigger value="inflation">Inflation</TabsTrigger>
        </TabsList>

        {/* Sources & Sinks Tab */}
        <TabsContent value="sources" className="space-y-4">
          <div className="flex gap-2">
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Currencies</SelectItem>
                <SelectItem value="Coins">Coins</SelectItem>
                <SelectItem value="Gems">Premium Gems</SelectItem>
                <SelectItem value="Tickets">Event Tickets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Sources */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="h-5 w-5 text-chart-4" />
                <h3 className="text-lg font-semibold text-foreground">Currency Sources</h3>
              </div>
              <div className="space-y-3">
                {filteredSources
                  .filter((s) => s.type === "source")
                  .map((source) => (
                    <div
                      key={source.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{source.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {source.currency} • {source.frequency}
                        </p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="text-sm font-bold text-chart-4">+{source.amount.toLocaleString()}</p>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Sinks */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="h-5 w-5 text-destructive" />
                <h3 className="text-lg font-semibold text-foreground">Currency Sinks</h3>
              </div>
              <div className="space-y-3">
                {filteredSources
                  .filter((s) => s.type === "sink")
                  .map((source) => (
                    <div
                      key={source.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{source.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {source.currency} • {source.frequency}
                        </p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="text-sm font-bold text-destructive">-{source.amount.toLocaleString()}</p>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>

          {/* Balance Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Economy Balance</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-chart-4/10">
                <p className="text-xs text-muted-foreground mb-1">Total Sources (Weekly)</p>
                <p className="text-2xl font-bold text-chart-4">+1,745,000</p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10">
                <p className="text-xs text-muted-foreground mb-1">Total Sinks (Weekly)</p>
                <p className="text-2xl font-bold text-destructive">-1,488,000</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Net Flow (Weekly)</p>
                <p className="text-2xl font-bold text-primary">+257,000</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Circulation Tab */}
        <TabsContent value="circulation" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Currency Circulation Over Time</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={circulationData}>
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
                <Line type="monotone" dataKey="coins" stroke="var(--color-chart-1)" strokeWidth={2} name="Coins" />
                <Line type="monotone" dataKey="gems" stroke="var(--color-chart-2)" strokeWidth={2} name="Gems" />
                <Line type="monotone" dataKey="tickets" stroke="var(--color-chart-3)" strokeWidth={2} name="Tickets" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Inflation Tab */}
        <TabsContent value="inflation" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Inflation Rate Trend</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={inflationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                  }}
                />
                <Bar dataKey="rate" fill="var(--color-chart-1)" name="Inflation Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-accent mb-1">Inflation Alert</p>
                  <p className="text-xs text-muted-foreground">
                    Event Tickets showing elevated inflation at 5.2%. Consider adding more currency sinks or reducing
                    source rewards.
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
