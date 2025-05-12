// Grok AI service for market analysis
export const getGrokMarketAnalysis = async (token: string) => {
  try {
    // Instead of making an API call that might fail, let's use mock data
    // In production, you would use the actual Grok API
    console.log(`Getting Grok analysis for ${token}`)

    // Mock data based on the token
    const mockAnalysisData = getMockGrokAnalysis(token)

    // Simulate a small delay to mimic an API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return mockAnalysisData
  } catch (error) {
    console.error("Error getting Grok analysis:", error)
    throw error
  }
}

// Helper function to get mock Grok analysis data
function getMockGrokAnalysis(token: string) {
  const analysisData = {
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
  return (
    analysisData[token as keyof typeof analysisData] || {
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
  )
}

// Jupiter API service
export const fetchJupiterQuote = async (inputMint: string, outputMint: string, amount: number) => {
  try {
    // Use a more reliable mock implementation for demo purposes
    // In production, you would use the actual Jupiter API
    console.log(`Fetching quote for ${inputMint} to ${outputMint} with amount ${amount}`)

    // Mock successful response instead of making the actual API call
    // This avoids the HTML error response
    return {
      inAmount: amount,
      outAmount: amount * getExchangeRate(inputMint, outputMint),
      otherAmountThreshold: 0,
      swapMode: "ExactIn",
      priceImpactPct: 0.1,
      routePlan: [
        {
          swapInfo: {
            ammKey: "mock-amm-key",
            label: "Jupiter",
            inputMint,
            outputMint,
          },
        },
      ],
      slippageBps: 50,
      fees: {
        signatureFee: 5000,
        openOrdersDeposits: [],
        ataDeposits: [],
        totalFeeAndDeposits: 5000,
        minimumSOLForTransaction: 10000,
      },
    }
  } catch (error) {
    console.error("Error fetching Jupiter quote:", error)
    throw error
  }
}

// Helper function to simulate exchange rates
function getExchangeRate(fromMint: string, toMint: string): number {
  // Mock exchange rates based on token pairs
  const rates: Record<string, Record<string, number>> = {
    So11111111111111111111111111111111111111112: {
      // SOL
      EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: 22.5, // USDC
      DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: 6000000, // BONK
      JitoTMBYAqFGYkiB1Z5JCuYHbNUBMq2fKQtZMrBqTgs: 42.1, // JTO
      "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": 76.3, // RAY
    },
    EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
      // USDC
      So11111111111111111111111111111111111111112: 0.044, // SOL
      DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: 266666.67, // BONK
      JitoTMBYAqFGYkiB1Z5JCuYHbNUBMq2fKQtZMrBqTgs: 1.87, // JTO
      "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": 3.39, // RAY
    },
    DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: {
      // BONK
      So11111111111111111111111111111111111111112: 0.00000016, // SOL
      EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: 0.00000375, // USDC
      JitoTMBYAqFGYkiB1Z5JCuYHbNUBMq2fKQtZMrBqTgs: 0.000007, // JTO
      "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": 0.0000127, // RAY
    },
    JitoTMBYAqFGYkiB1Z5JCuYHbNUBMq2fKQtZMrBqTgs: {
      // JTO
      So11111111111111111111111111111111111111112: 0.0237, // SOL
      EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: 0.535, // USDC
      DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: 142857.14, // BONK
      "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": 1.81, // RAY
    },
    "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": {
      // RAY
      So11111111111111111111111111111111111111112: 0.0131, // SOL
      EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: 0.295, // USDC
      DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: 78740.16, // BONK
      JitoTMBYAqFGYkiB1Z5JCuYHbNUBMq2fKQtZMrBqTgs: 0.552, // JTO
    },
  }

  // Return the exchange rate or a default if not found
  return rates[fromMint]?.[toMint] || 1.0
}

// Fetch token price data for TradingView charts
export const fetchTokenPriceData = async (token: string, timeframe: string) => {
  try {
    const response = await fetch(`/api/token-price?token=${token}&timeframe=${timeframe}`)
    if (!response.ok) throw new Error("Failed to fetch token price data")
    return await response.json()
  } catch (error) {
    console.error("Error fetching token price data:", error)
    throw error
  }
}

// Fetch pump.fun trending tokens
export const fetchPumpTrendingTokens = async () => {
  try {
    const response = await fetch("/api/pump-trending")
    if (!response.ok) throw new Error("Failed to fetch pump.fun trending tokens")
    return await response.json()
  } catch (error) {
    console.error("Error fetching pump.fun trending tokens:", error)
    throw error
  }
}

// Fetch liquidity data
export const fetchLiquidityData = async (token: string) => {
  try {
    const response = await fetch(`/api/liquidity?token=${token}`)
    if (!response.ok) throw new Error("Failed to fetch liquidity data")
    return await response.json()
  } catch (error) {
    console.error("Error fetching liquidity data:", error)
    throw error
  }
}
