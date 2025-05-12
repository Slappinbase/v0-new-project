"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TradingViewChartProps {
  token: string
  defaultTimeframe?: "1d" | "1w" | "1m"
}

export function TradingViewChart({ token, defaultTimeframe = "1d" }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [timeframe, setTimeframe] = useState<string>(defaultTimeframe)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  // Map our tokens to TradingView symbols
  const getSymbol = (token: string) => {
    const symbolMap: Record<string, string> = {
      SOL: "SOLUSD",
      BONK: "BONKUSD",
      JTO: "JTOUSD",
      RAY: "RAYUSD",
    }
    return symbolMap[token] || "SOLUSD"
  }

  useEffect(() => {
    setIsLoading(true)

    // Remove any existing TradingView widget
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }

    // Create a new script element for the TradingView widget
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (containerRef.current && typeof window.TradingView !== "undefined") {
        new window.TradingView.widget({
          autosize: true,
          symbol: getSymbol(token),
          interval: timeframe === "1d" ? "60" : timeframe === "1w" ? "240" : "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#131722",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: containerRef.current.id,
          backgroundColor: "#131722",
          gridColor: "#1e2530",
          studies: ["Volume@tv-basicstudies"],
        })
        setIsLoading(false)
      }
    }

    document.head.appendChild(script)
    scriptRef.current = script

    return () => {
      // Clean up the script when component unmounts
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current)
      }
    }
  }, [token, timeframe])

  return (
    <Card className="bg-[#131722] border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{token} Price Chart</CardTitle>
          <Tabs defaultValue={timeframe} onValueChange={setTimeframe}>
            <TabsList className="bg-[#1e2530]">
              <TabsTrigger value="1d">1D</TabsTrigger>
              <TabsTrigger value="1w">1W</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : null}
        <div id="tradingview_widget_container" ref={containerRef} className="h-[400px] w-full" />
      </CardContent>
    </Card>
  )
}

// Add TradingView types
declare global {
  interface Window {
    TradingView: {
      widget: new (config: any) => any
    }
  }
}
