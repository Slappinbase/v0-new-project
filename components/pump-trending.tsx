"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, RefreshCwIcon } from "lucide-react"
import { fetchPumpTrendingTokens } from "@/lib/api-services"

export function PumpTrending() {
  const [trendingTokens, setTrendingTokens] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrending = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchPumpTrendingTokens()
      setTrendingTokens(data.trending)
    } catch (err) {
      console.error("Error fetching trending tokens:", err)
      setError("Failed to fetch trending tokens. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrending()
  }, [])

  return (
    <Card className="bg-[#131722] border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Pump.fun Trending</CardTitle>
          <p className="text-sm text-gray-400">Popular tokens on pump.fun</p>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchTrending} disabled={isLoading}>
          {isLoading ? <RefreshCwIcon className="h-4 w-4 animate-spin" /> : <RefreshCwIcon className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchTrending} variant="outline" className="border-gray-700">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {trendingTokens.map((token, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#1e2530] rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-lg mr-3">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{token.name}</div>
                    <div className="text-xs text-gray-400">{token.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${token.price.toFixed(8)}</div>
                  <div
                    className={`text-xs flex items-center justify-end ${token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {token.priceChange24h >= 0 ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(token.priceChange24h).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}

            <Button
              className="w-full bg-[#1e2530] hover:bg-[#2a3441] text-white"
              onClick={() => window.open("https://pump.fun", "_blank")}
            >
              View All on Pump.fun
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
