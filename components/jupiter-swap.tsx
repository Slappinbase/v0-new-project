"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownIcon, RefreshCwIcon } from "lucide-react"
import { fetchJupiterQuote } from "@/lib/api-services"

// Add the wallet key at the top of the file
const SOLANA_WALLET_KEY = "54FAw33CkTn7FPApnkGMw83Sn5ASA18QSwa2WimJTbysZrurzb8aPZMSBcrrEEPmKxdYPJrLX1iZoj1kTFJqtL1S"

const popularTokens = [
  { symbol: "SOL", name: "Solana", mint: "So11111111111111111111111111111111111111112" },
  { symbol: "USDC", name: "USD Coin", mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" },
  { symbol: "BONK", name: "Bonk", mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" },
  { symbol: "JTO", name: "Jito", mint: "JitoTMBYAqFGYkiB1Z5JCuYHbNUBMq2fKQtZMrBqTgs" },
  { symbol: "RAY", name: "Raydium", mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R" },
]

export function JupiterSwap() {
  const [fromToken, setFromToken] = useState(popularTokens[0])
  const [toToken, setToToken] = useState(popularTokens[1])
  const [amount, setAmount] = useState("1")
  const [quote, setQuote] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchQuote = async () => {
    if (!fromToken || !toToken || !amount || Number.parseFloat(amount) <= 0) return

    setIsLoading(true)
    setError(null)

    try {
      const amountInLamports = Number.parseFloat(amount) * 1e9 // Convert to lamports for SOL
      const quoteData = await fetchJupiterQuote(fromToken.mint, toToken.mint, amountInLamports)
      setQuote(quoteData)
    } catch (err) {
      console.error("Error fetching quote:", err)
      setError("Failed to fetch quote. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (fromToken && toToken && amount && Number.parseFloat(amount) > 0) {
      fetchQuote()
    }
  }, [fromToken, toToken, amount])

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  return (
    <Card className="bg-[#131722] border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Swap Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">From</label>
            <div className="flex space-x-2">
              <Select
                value={fromToken.symbol}
                onValueChange={(value) => {
                  const token = popularTokens.find((t) => t.symbol === value)
                  if (token) setFromToken(token)
                }}
              >
                <SelectTrigger className="w-1/3 bg-[#1e2530]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e2530]">
                  {popularTokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-[#1e2530]"
                placeholder="0.0"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapTokens}
              className="rounded-full bg-[#1e2530] h-8 w-8"
            >
              <ArrowDownIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">To</label>
            <div className="flex space-x-2">
              <Select
                value={toToken.symbol}
                onValueChange={(value) => {
                  const token = popularTokens.find((t) => t.symbol === value)
                  if (token) setToToken(token)
                }}
              >
                <SelectTrigger className="w-1/3 bg-[#1e2530]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e2530]">
                  {popularTokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                value={quote ? (quote.outAmount / 1e9).toFixed(6) : "0.0"}
                readOnly
                className="flex-1 bg-[#1e2530]"
                placeholder="0.0"
              />
            </div>
          </div>

          {quote && (
            <div className="bg-[#1e2530] p-3 rounded-md text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span>
                  1 {fromToken.symbol} ≈ {(quote.outAmount / 1e9 / Number.parseFloat(amount)).toFixed(6)}{" "}
                  {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-400">Route</span>
                <span>Jupiter Aggregator</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-400">Slippage</span>
                <span>0.5%</span>
              </div>
            </div>
          )}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading} onClick={fetchQuote}>
            {isLoading ? (
              <>
                <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Swap with Wallet"
            )}
          </Button>

          {!error && (
            <div className="mt-2 text-xs text-gray-400 text-center">
              Connected wallet: {SOLANA_WALLET_KEY.substring(0, 6)}...
              {SOLANA_WALLET_KEY.substring(SOLANA_WALLET_KEY.length - 4)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
