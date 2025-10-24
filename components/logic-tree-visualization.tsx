"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GitBranch,
  Plus,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react"
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

type NodeType = "trigger" | "condition" | "action" | "branch"
type NodeStatus = "active" | "inactive" | "error"

interface LogicNode {
  id: string
  type: NodeType
  title: string
  description: string
  status: NodeStatus
  children?: LogicNode[]
  metadata?: {
    triggerCount?: number
    successRate?: number
    lastTriggered?: string
  }
}

const mockLogicTrees: LogicNode[] = [
  {
    id: "tree-1",
    type: "trigger",
    title: "Season Progression System",
    description: "Main progression logic for seasonal events",
    status: "active",
    metadata: {
      triggerCount: 15420,
      successRate: 98.5,
      lastTriggered: "2 minutes ago",
    },
    children: [
      {
        id: "node-1-1",
        type: "condition",
        title: "Check Player Level",
        description: "Verify player meets minimum level requirement",
        status: "active",
        metadata: {
          successRate: 95.2,
        },
        children: [
          {
            id: "node-1-1-1",
            type: "action",
            title: "Grant Season Access",
            description: "Unlock seasonal content and challenges",
            status: "active",
          },
          {
            id: "node-1-1-2",
            type: "action",
            title: "Show Level Requirement",
            description: "Display message about level requirements",
            status: "active",
          },
        ],
      },
      {
        id: "node-1-2",
        type: "condition",
        title: "Check Previous Season Completion",
        description: "Verify if player completed previous season",
        status: "active",
        metadata: {
          successRate: 87.3,
        },
        children: [
          {
            id: "node-1-2-1",
            type: "action",
            title: "Award Carryover Bonus",
            description: "Grant bonus rewards for returning players",
            status: "active",
          },
        ],
      },
    ],
  },
  {
    id: "tree-2",
    type: "trigger",
    title: "Challenge Completion Handler",
    description: "Processes challenge completions and rewards",
    status: "active",
    metadata: {
      triggerCount: 8920,
      successRate: 99.1,
      lastTriggered: "5 minutes ago",
    },
    children: [
      {
        id: "node-2-1",
        type: "condition",
        title: "Validate Challenge Criteria",
        description: "Ensure all challenge requirements are met",
        status: "active",
        metadata: {
          successRate: 96.8,
        },
        children: [
          {
            id: "node-2-1-1",
            type: "branch",
            title: "Reward Distribution",
            description: "Branch based on challenge tier",
            status: "active",
            children: [
              {
                id: "node-2-1-1-1",
                type: "action",
                title: "Grant Premium Rewards",
                description: "Award top-tier rewards",
                status: "active",
              },
              {
                id: "node-2-1-1-2",
                type: "action",
                title: "Grant Standard Rewards",
                description: "Award standard rewards",
                status: "active",
              },
            ],
          },
          {
            id: "node-2-1-2",
            type: "action",
            title: "Log Completion Event",
            description: "Record challenge completion in analytics",
            status: "active",
          },
        ],
      },
    ],
  },
  {
    id: "tree-3",
    type: "trigger",
    title: "Economy Fail-Safe System",
    description: "Prevents currency exploits and maintains balance",
    status: "error",
    metadata: {
      triggerCount: 234,
      successRate: 78.2,
      lastTriggered: "1 hour ago",
    },
    children: [
      {
        id: "node-3-1",
        type: "condition",
        title: "Check Transaction Amount",
        description: "Validate transaction is within normal range",
        status: "error",
        metadata: {
          successRate: 78.2,
        },
        children: [
          {
            id: "node-3-1-1",
            type: "action",
            title: "Flag Suspicious Activity",
            description: "Alert system administrators",
            status: "error",
          },
        ],
      },
    ],
  },
]

export function LogicTreeVisualization() {
  const [trees] = useState<LogicNode[]>(mockLogicTrees)
  const [selectedTree, setSelectedTree] = useState<LogicNode | null>(null)

  const getStatusColor = (status: NodeStatus) => {
    switch (status) {
      case "active":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20"
      case "inactive":
        return "bg-muted text-muted-foreground border-border"
      case "error":
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  const getStatusIcon = (status: NodeStatus) => {
    switch (status) {
      case "active":
        return CheckCircle2
      case "inactive":
        return Pause
      case "error":
        return XCircle
    }
  }

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case "trigger":
        return Play
      case "condition":
        return AlertTriangle
      case "action":
        return CheckCircle2
      case "branch":
        return GitBranch
    }
  }

  const renderNode = (node: LogicNode, level = 0) => {
    const StatusIcon = getStatusIcon(node.status)
    const NodeIcon = getNodeIcon(node.type)

    return (
      <div key={node.id} className="space-y-2">
        <div
          className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => setSelectedTree(node)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <NodeIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-foreground">{node.title}</h4>
              <Badge variant="outline" className={getStatusColor(node.status)}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {node.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {node.type}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{node.description}</p>
            {node.metadata && (
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                {node.metadata.triggerCount !== undefined && (
                  <span>Triggers: {node.metadata.triggerCount.toLocaleString()}</span>
                )}
                {node.metadata.successRate !== undefined && (
                  <span className={node.metadata.successRate > 90 ? "text-chart-4" : "text-destructive"}>
                    Success: {node.metadata.successRate}%
                  </span>
                )}
                {node.metadata.lastTriggered && <span>Last: {node.metadata.lastTriggered}</span>}
              </div>
            )}
          </div>
          {node.children && node.children.length > 0 && (
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          )}
        </div>
        {node.children && node.children.map((child) => renderNode(child, level + 1))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Logic Trees</h2>
          <p className="text-sm text-muted-foreground">Visualize and manage event logic, conditions, and fail-safes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Logic Tree
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Logic Tree</DialogTitle>
              <DialogDescription>Define a new logic flow for events or systems</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tree-title">Tree Title</Label>
                <Input id="tree-title" placeholder="Enter logic tree name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tree-description">Description</Label>
                <Textarea id="tree-description" placeholder="Describe the logic flow purpose" rows={3} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tree-type">Trigger Type</Label>
                  <Select>
                    <SelectTrigger id="tree-type">
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">Event Trigger</SelectItem>
                      <SelectItem value="time">Time-based Trigger</SelectItem>
                      <SelectItem value="condition">Condition Trigger</SelectItem>
                      <SelectItem value="manual">Manual Trigger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tree-priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="tree-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Tree</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Active Trees</span>
            <CheckCircle2 className="h-4 w-4 text-chart-4" />
          </div>
          <div className="text-2xl font-bold text-foreground">{trees.filter((t) => t.status === "active").length}</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Triggers Today</span>
            <Play className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">24,574</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Errors Detected</span>
            <XCircle className="h-4 w-4 text-destructive" />
          </div>
          <div className="text-2xl font-bold text-foreground">{trees.filter((t) => t.status === "error").length}</div>
        </Card>
      </div>

      {/* Logic Trees */}
      <div className="space-y-4">
        {trees.map((tree) => (
          <Card key={tree.id} className="p-6">
            <div className="space-y-4">{renderNode(tree)}</div>
          </Card>
        ))}
      </div>

      {/* Selected Node Details */}
      {selectedTree && (
        <Dialog open={!!selectedTree} onOpenChange={() => setSelectedTree(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedTree.title}</DialogTitle>
              <DialogDescription>{selectedTree.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Node Type</Label>
                  <p className="text-sm font-medium text-foreground capitalize">{selectedTree.type}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <p className="text-sm font-medium text-foreground capitalize">{selectedTree.status}</p>
                </div>
              </div>
              {selectedTree.metadata && (
                <div className="grid gap-4 md:grid-cols-3">
                  {selectedTree.metadata.triggerCount !== undefined && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Trigger Count</Label>
                      <p className="text-sm font-medium text-foreground">
                        {selectedTree.metadata.triggerCount.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {selectedTree.metadata.successRate !== undefined && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Success Rate</Label>
                      <p className="text-sm font-medium text-foreground">{selectedTree.metadata.successRate}%</p>
                    </div>
                  )}
                  {selectedTree.metadata.lastTriggered && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Last Triggered</Label>
                      <p className="text-sm font-medium text-foreground">{selectedTree.metadata.lastTriggered}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Edit className="h-4 w-4" />
                Edit Node
              </Button>
              <Button variant="outline" className="gap-2 text-destructive hover:text-destructive bg-transparent">
                <Trash2 className="h-4 w-4" />
                Delete Node
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
