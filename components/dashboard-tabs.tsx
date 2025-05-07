"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoiceAuth } from "@/components/voice-auth"
import { VideoTokenCreator } from "@/components/video-token-creator"
import { SwapInterface } from "@/components/swap-interface"
import { MarketOverview } from "@/components/market-overview"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="voice">Voice Orders</TabsTrigger>
        <TabsTrigger value="tokens">Token Creator</TabsTrigger>
        <TabsTrigger value="swap">Swap</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <MarketOverview />
      </TabsContent>
      <TabsContent value="voice" className="space-y-4">
        <VoiceAuth />
      </TabsContent>
      <TabsContent value="tokens" className="space-y-4">
        <VideoTokenCreator />
      </TabsContent>
      <TabsContent value="swap" className="space-y-4">
        <SwapInterface />
      </TabsContent>
    </Tabs>
  )
}
