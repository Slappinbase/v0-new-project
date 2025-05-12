import { NextResponse } from "next/server"

// Mock data for demonstration - in production, you would fetch from a real API
const generateMockPriceData = (token: string, timeframe: string) => {
  const dataPoints = timeframe === "1d" ? 24 : timeframe === "1w" ? 7 * 24 : 30 * 24
  const basePrice = token === "SOL" ? 142.87 : token === "BONK" ? 0.00002341 : 1.0

  const data = []
  let currentPrice = basePrice
  const now = Date.now()
  const interval = timeframe === "1d" ? 3600000 : 3600000 // 1 hour in milliseconds

  for (let i = 0; i < dataPoints; i++) {
    const timestamp = now - (dataPoints - i) * interval
    // Random price movement between -2% and +2%
    const change = currentPrice * (Math.random() * 0.04 - 0.02)
    currentPrice += change

    data.push({
      timestamp,
      price: currentPrice,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    })
  }

  return data
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token") || "SOL"
  const timeframe = searchParams.get("timeframe") || "1d"

  try {
    // In production, replace with actual API call to get real price data
    const data = generateMockPriceData(token, timeframe)

    return NextResponse.json({
      token,
      timeframe,
      data,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching token price data:", error)
    return NextResponse.json({ error: "Failed to fetch token price data" }, { status: 500 })
  }
}
