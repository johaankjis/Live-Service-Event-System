# Live Service Event System

A comprehensive web-based dashboard for managing live events, challenges, and economy systems in baseball-themed games. Built with Next.js 16, React 19, and TypeScript.

## 🎯 Overview

This application provides game designers and live operations teams with powerful tools to create, manage, and monitor live service events for baseball games. It includes event scheduling, logic tree visualization, economy management, and real-time analytics.

## ✨ Features

### 📅 Event Calendar Management
- Create and schedule challenges, tournaments, and seasonal events
- Track event status (active, scheduled, completed)
- Monitor participant counts and engagement
- Filter events by type and status
- Real-time event timeline visualization

### 🌳 Logic Tree Visualization
- Visual representation of game logic flows
- Support for triggers, conditions, actions, and branches
- Track success rates and trigger counts
- Monitor logic tree health and performance
- Debug edge cases with detailed status information

### 💰 Economy Management
- Monitor multiple in-game currencies (Coins, Gems, Tickets)
- Track currency circulation and inflation rates
- Manage sources (rewards) and sinks (purchases)
- Visualize economic trends with charts
- Health status indicators for currency balance

### 📊 Analytics Dashboard
- Real-time participant and completion tracking
- Player retention metrics (D1, D3, D7, D14, D30)
- Event type distribution analysis
- Reward distribution monitoring
- Edge case error tracking and reporting

### 📈 Overview Dashboard
- Key Performance Indicators (KPIs)
  - D7 Retention rates
  - Event participation metrics
  - Edge-case error monitoring
  - Currency health tracking
- Current season information
- System health status
- Recent activity feed

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + Custom Components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Theme**: next-themes

### Project Structure

```
Live-Service-Event-System/
├── app/                      # Next.js app directory
│   ├── analytics/           # Analytics page
│   ├── economy/             # Economy management page
│   ├── events/              # Event calendar page
│   ├── logic/               # Logic tree visualization page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Home/overview page
├── components/              # React components
│   ├── ui/                  # Reusable UI components (buttons, cards, etc.)
│   ├── analytics-dashboard.tsx
│   ├── dashboard-layout.tsx
│   ├── economy-management.tsx
│   ├── event-calendar.tsx
│   ├── logic-tree-visualization.tsx
│   ├── overview.tsx
│   └── theme-provider.tsx
├── hooks/                   # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/                     # Utility functions
│   └── utils.ts
├── public/                  # Static assets
├── styles/                  # Additional styles
├── components.json          # shadcn/ui configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Live-Service-Event-System.git
cd Live-Service-Event-System
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📱 Pages and Routes

### Overview (`/`)
Main dashboard showing key performance indicators, current season info, system health, and recent activity.

### Event Calendar (`/events`)
Manage all live service events including challenges, tournaments, and seasonal events. Create new events with detailed configuration.

### Logic Trees (`/logic`)
Visualize and manage game logic flows for event triggers, conditions, and actions. Monitor success rates and debug issues.

### Analytics (`/analytics`)
Comprehensive analytics including participation trends, retention rates, event type distribution, and error tracking.

### Economy (`/economy`)
Monitor and manage in-game currencies, track inflation, and balance sources and sinks.

## 🎨 Components

### Layout Components
- **DashboardLayout**: Main navigation sidebar and header with responsive design
- **ThemeProvider**: Theme switching support

### Feature Components
- **Overview**: KPI cards and dashboard summary
- **EventCalendar**: Event management with calendar view
- **LogicTreeVisualization**: Interactive logic tree display
- **AnalyticsDashboard**: Charts and metrics visualization
- **EconomyManagement**: Currency and economy monitoring

### UI Components (Radix UI based)
Located in `components/ui/`:
- Accordion, Alert Dialog, Avatar
- Badge, Button, Card, Checkbox
- Dialog, Dropdown Menu, Input, Label
- Select, Tabs, Textarea, Toast
- And many more...

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/*`)
- Build errors ignored for rapid development

### Tailwind CSS
- Custom color schemes
- Sidebar theming support
- Chart color variables
- Dark mode support

### Next.js
- App Router (recommended approach)
- Image optimization disabled for flexibility
- TypeScript build errors ignored

## 📊 Data Models

### Event
```typescript
interface Event {
  id: string
  title: string
  description: string
  type: "challenge" | "tournament" | "season"
  status: "active" | "scheduled" | "completed"
  startDate: string
  endDate: string
  participants: number
  rewards: string
}
```

### Currency
```typescript
interface Currency {
  id: string
  name: string
  icon: string
  totalSupply: number
  circulation: number
  inflationRate: number
  status: "healthy" | "warning" | "critical"
}
```

### Logic Node
```typescript
interface LogicNode {
  id: string
  type: "trigger" | "condition" | "action" | "branch"
  title: string
  description: string
  status: "active" | "inactive" | "error"
  children?: LogicNode[]
  metadata?: {
    triggerCount?: number
    successRate?: number
    lastTriggered?: string
  }
}
```

## 🎮 Use Cases

### Game Designers
- Schedule and configure seasonal events
- Design challenge rewards and progression
- Balance in-game economy
- Create logic trees for complex game mechanics

### Live Operations Team
- Monitor live event performance
- Track player engagement and retention
- Identify and address edge case errors
- Adjust economy balance in real-time

### Analytics Team
- Generate reports on player behavior
- Analyze event participation trends
- Monitor currency circulation
- Track success metrics

## 🔐 Best Practices

1. **Event Management**: Always test events in a staging environment before going live
2. **Economy Balance**: Monitor inflation rates regularly and adjust sources/sinks
3. **Logic Trees**: Keep logic trees simple and well-documented for maintainability
4. **Analytics**: Set up alerts for critical metrics (retention drops, error spikes)
5. **Testing**: Validate logic tree conditions thoroughly to prevent edge cases

## 🚧 Development Guidelines

### Adding New Features
1. Create components in `components/` directory
2. Add pages in `app/` directory using Next.js App Router
3. Use TypeScript for type safety
4. Follow existing component patterns
5. Utilize existing UI components from `components/ui/`

### Styling
- Use Tailwind CSS utility classes
- Follow existing color scheme (chart-1 through chart-5)
- Maintain responsive design (mobile-first approach)
- Use semantic HTML elements

### State Management
- Use React hooks for local state
- Consider adding global state management for complex features
- Keep components as pure and functional as possible

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data updates via WebSockets
- [ ] Advanced filtering and search
- [ ] Export functionality for reports
- [ ] User authentication and permissions
- [ ] A/B testing framework
- [ ] Push notification system
- [ ] Mobile app companion

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of a live service game management system.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Note**: This is a frontend demonstration project. For production use, integrate with a proper backend API and database system.
