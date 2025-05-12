import { NextResponse } from "next/server"

// Mock data for demonstration - in production, you would fetch from pump.fun API
const mockTrendingTokens = [
  {
    id: "monke",
    name: "Monke",
    symbol: "MONKE",
    logo: "https://example.com/monke.png",
    price: 0.00000123,
    priceChange24h: 15.7,
    volume24h: 1234567,
    marketCap: 9876543,
    createdAt: "2023-05-01T12:00:00Z",
  },
  {
    id: "pepe",
    name: "Pepe",
    symbol: "PEPE",
    logo: "https://example.com/pepe.png",
    price: 0.00000456,
    priceChange24h: -2.3,
    volume24h: 7654321,
    marketCap: 12345678,
    createdAt: "2023-04-15T10:30:00Z",
  },
  {
    id: "doge",
    name: "Doge",
    symbol: "DOGE",
    logo: "https://example.com/doge.png",
    price: 0.00000789,
    priceChange24h: 5.6,
    volume24h: 8765432,
    marketCap: 23456789,
    createdAt: "2023-03-20T09:15:00Z",
  },
  {
    id: "wojak",
    name: "Wojak",
    symbol: "WOJAK",
    logo: "https://example.com/wojak.png",
    price: 0.00000321,
    priceChange24h: 8.9,
    volume24h: 3456789,
    marketCap: 7654321,
    createdAt: "2023-06-10T14:45:00Z",
  },
  {
    id: "chad",
    name: "Chad",
    symbol: "CHAD",
    logo: "https://example.com/chad.png",
    price: 0.00000654,
    priceChange24h: -1.2,
    volume24h: 2345678,
    marketCap: 5678901,
    createdAt: "2023-07-05T16:20:00Z",
  },
]

export async function GET() {
  try {
    // In production, replace with actual API call to pump.fun
    return NextResponse.json({
      trending: mockTrendingTokens,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching pump.fun trending tokens:", error)
    return NextResponse.json({ error: "Failed to fetch trending tokens" }, { status: 500 })
  }
}
