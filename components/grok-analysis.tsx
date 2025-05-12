"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BrainIcon, RefreshCwIcon } from "lucide-react"
import { getGrokMarketAnalysis } from "@/lib/api-services"

interface GrokAnalysisProps {
  defaultToken?: string
}

export function GrokAnalysis({ defaultToken = "SOL" }: GrokAnalysisProps) {
  const [token, setToken] = useState(defaultToken)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalysis = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getGrokMarketAnalysis(token)
      setAnalysis(data)
    } catch (err) {
      console.error("Error fetching Grok analysis:", err)
      setError("Failed to fetch analysis. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalysis()
  }, [token])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "bullish":
        return "bg-green-500"
      case "bearish":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case "buy":
        return "bg-green-500"
      case "sell":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  return (
    <Card className="bg-[#131722] border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <BrainIcon className="mr-2 h-5 w-5 text-purple-500" />
          <CardTitle className="text-lg font-medium">Grok AI Analysis</CardTitle>
        </div>
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
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchAnalysis} variant="outline" className="border-gray-700">
              Try Again
            </Button>
          </div>
        ) : analysis ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge className={`${getSentimentColor(analysis.sentiment)}`}>Sentiment: {analysis.sentiment}</Badge>
              <Badge className={`${getRecommendationColor(analysis.recommendation)}`}>
                {analysis.recommendation.toUpperCase()}
              </Badge>
            </div>

            <div className="text-sm">{analysis.analysis}</div>

            <div>
              <h4 className="text-sm font-medium mb-2">Key Factors</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {analysis.keyFactors.map((factor: string, index: number) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>

            <div className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchAnalysis}
                className="text-xs text-gray-400 hover:text-white"
              >
                <RefreshCwIcon className="mr-1 h-3 w-3" />
                Refresh
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">No analysis available</p>
            <Button onClick={fetchAnalysis} variant="outline" className="border-gray-700">
              Generate Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
