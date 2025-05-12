import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardTabs } from "@/components/dashboard-tabs"
import { MetricCard } from "@/components/metric-card"
import { TradingViewChart } from "@/components/trading-view-chart"
import { JupiterSwap } from "@/components/jupiter-swap"
import { GrokAnalysis } from "@/components/grok-analysis"
import { PumpTrending } from "@/components/pump-trending"
import { LiquidityPools } from "@/components/liquidity-pools"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <DashboardTabs />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <MetricCard
            title="Solana Price"
            value="$142.87"
            change="+4.2%"
            changeText="from yesterday"
            icon="chart-line"
          />
          <MetricCard title="TVL" value="$3.8B" change="+1.8%" changeText="from last week" icon="database" />
          <MetricCard title="Active Users" value="1.2M" change="+12.3%" changeText="from last month" icon="users" />
          <MetricCard title="Staked SOL" value="76.4%" subtext="of circulating supply" icon="lock" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <TradingViewChart token="SOL" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GrokAnalysis />
              <LiquidityPools />
            </div>
          </div>
          <div className="space-y-6">
            <JupiterSwap />
            <PumpTrending />
          </div>
        </div>
      </main>
    </div>
  )
}
