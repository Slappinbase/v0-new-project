"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { fetchLiquidityData } from "@/lib/api-services"

interface LiquidityPoolsProps {
  defaultToken?: string
}

export function LiquidityPools({ defaultToken = "SOL" }: LiquidityPoolsProps) {
  const [token, setToken] = useState(defaultToken)
  const [liquidityData, setLiquidityData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLiquidity = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchLiquidityData(token)
      setLiquidityData(data)
    } catch (err) {
      console.error("Error fetching liquidity data:", err)
      setError("Failed to fetch liquidity data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLiquidity()
  }, [token])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`
    } else {
      return `$${value.toFixed(2)}`
    }
  }

  return (
    <Card className="bg-[#131722] border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Liquidity Pools</CardTitle>
        <Select value={token} onValueChange={setToken}>
          <SelectTrigger className="w-[100px] bg-[#1e2530]">
            <SelectValue placeholder="Token" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e2530]">
            <SelectItem value="SOL">SOL</SelectItem>
            <SelectItem value="BONK">BONK</SelectItem>
            <SelectItem value="JTO">JTO</SelectItem>
            <SelectItem value="RAY">RAY</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : liquidityData ? (
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Liquidity:</span>
              <span className="font-medium">{formatCurrency(liquidityData.totalLiquidity)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">24h Volume:</span>
              <span className="font-medium">{formatCurrency(liquidityData.totalVolume24h)}</span>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-3">Liquidity Distribution</h4>

              {liquidityData.pools.map((pool: any, index: number) => {
                const percentage = (pool.liquidity / liquidityData.totalLiquidity) * 100

                return (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{pool.name}</span>
                      <span>
                        {formatCurrency(pool.liquidity)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2 bg-[#1e2530]" />
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">No liquidity data available</div>
        )}
      </CardContent>
    </Card>
  )
}
