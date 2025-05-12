import { NextResponse } from "next/server"

// Mock data for demonstration - in production, you would fetch from a real API
const generateMockLiquidityData = (token: string) => {
  const pools = [
    {
      name: "Orca",
      liquidity: Math.floor(Math.random() * 10000000) + 5000000,
      volume24h: Math.floor(Math.random() * 5000000) + 1000000,
      fee: 0.3,
    },
    {
      name: "Raydium",
      liquidity: Math.floor(Math.random() * 8000000) + 4000000,
      volume24h: Math.floor(Math.random() * 4000000) + 800000,
      fee: 0.25,
    },
    {
      name: "Jupiter",
      liquidity: Math.floor(Math.random() * 12000000) + 6000000,
      volume24h: Math.floor(Math.random() * 6000000) + 1200000,
      fee: 0.2,
    },
  ]

  return {
    token,
    totalLiquidity: pools.reduce((sum, pool) => sum + pool.liquidity, 0),
    totalVolume24h: pools.reduce((sum, pool) => sum + pool.volume24h, 0),
    pools,
    lastUpdated: new Date().toISOString(),
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token") || "SOL"

  try {
    // In production, replace with actual API call to get real liquidity data
    const data = generateMockLiquidityData(token)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching liquidity data:", error)
    return NextResponse.json({ error: "Failed to fetch liquidity data" }, { status: 500 })
  }
}
