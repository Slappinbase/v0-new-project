import { NextResponse } from "next/server"

// This is a mock implementation since we're now handling the mock data directly in the service
export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    // Mock data based on the token
    const mockAnalysisData = {
      SOL: {
        analysis:
          "Solana (SOL) is showing strong momentum with increasing adoption across DeFi and NFT ecosystems. Recent network upgrades have improved stability and transaction throughput. The token has maintained support above key moving averages, suggesting continued bullish sentiment. Institutional interest remains high, with several major funds increasing their positions.",
        sentiment: "Bullish",
        keyFactors: [
          "Growing DeFi TVL on Solana ecosystem",
          "Improved network stability after recent upgrades",
          "Increasing institutional adoption",
          "Strong developer activity and ecosystem growth",
        ],
        recommendation: "Buy",
      },
      BONK: {
        analysis:
          "BONK has seen significant volatility but maintains strong community support. As a meme token, price action is heavily influenced by social media sentiment and whale movements. Recent listings on major exchanges have increased liquidity and accessibility. However, the token faces competition from other meme coins in the Solana ecosystem.",
        sentiment: "Neutral",
        keyFactors: [
          "Strong community engagement",
          "Increased exchange listings",
          "High volatility typical of meme tokens",
          "Competition from other Solana meme coins",
        ],
        recommendation: "Hold",
      },
      JTO: {
        analysis:
          "Jito (JTO) shows promising fundamentals with its MEV solutions gaining traction among Solana validators. The token has established a solid price floor after its initial launch volatility. The project's focus on improving validator economics creates a sustainable value proposition. Recent partnerships with major Solana projects have increased utility.",
        sentiment: "Bullish",
        keyFactors: [
          "Growing adoption among Solana validators",
          "Solid technical fundamentals and use case",
          "Strategic partnerships within Solana ecosystem",
          "Increasing staking participation",
        ],
        recommendation: "Buy",
      },
      RAY: {
        analysis:
          "Raydium (RAY) faces challenges in an increasingly competitive AMM landscape on Solana. While the protocol maintains significant liquidity, growth has slowed compared to newer DeFi protocols. Recent governance proposals aim to enhance tokenomics and incentive structures. Technical indicators suggest a consolidation phase before potential upward movement.",
        sentiment: "Neutral",
        keyFactors: [
          "Established liquidity and user base",
          "Increasing competition from newer AMMs",
          "Governance improvements in progress",
          "Technical indicators showing consolidation",
        ],
        recommendation: "Hold",
      },
    }

    // Return the analysis for the requested token, or a default if not found
    const analysis = mockAnalysisData[token as keyof typeof mockAnalysisData] || {
      analysis: `${token} is currently showing mixed signals in the market. While there are some positive developments in its ecosystem, volatility remains a concern. Trading volume has been inconsistent, suggesting cautious sentiment among investors.`,
      sentiment: "Neutral",
      keyFactors: [
        "Mixed trading signals",
        "Moderate ecosystem development",
        "Inconsistent trading volume",
        "Market uncertainty",
      ],
      recommendation: "Hold",
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error in Grok analysis:", error)
    return NextResponse.json({ error: "Failed to get Grok analysis" }, { status: 500 })
  }
}
