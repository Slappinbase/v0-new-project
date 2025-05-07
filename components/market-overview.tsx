"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, TrendingUp, Users, Wallet, Zap } from "lucide-react"
import { MarketChart } from "@/components/market-chart"
import { TokenTable } from "@/components/token-table"

export function MarketOverview() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solana Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$142.87</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                4.2%
              </span>
              <span>from yesterday</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TVL</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3.8B</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                1.8%
              </span>
              <span>from last week</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                12.3%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staked SOL</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.4%</div>
            <p className="text-xs text-muted-foreground mt-1">of circulating supply</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Market Activity</CardTitle>
            <CardDescription>SOL price and volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <MarketChart />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Tokens</CardTitle>
                <CardDescription>Popular tokens on Solana</CardDescription>
              </div>
              <Badge variant="outline" className="ml-auto">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <TokenTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
