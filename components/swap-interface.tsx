"use client"

import { useState, useEffect } from "react"
import { ArrowDown, RefreshCw, Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

export function SwapInterface() {
  const [fromToken, setFromToken] = useState("SOL")
  const [toToken, setToToken] = useState("USDC")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [slippage, setSlippage] = useState("0.5")
  const [quotes, setQuotes] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [chains, setChains] = useState([
    { id: "solana", name: "Solana" },
    { id: "ethereum", name: "Ethereum" },
    { id: "bsc", name: "BSC" },
    { id: "avalanche", name: "Avalanche" },
  ])
  const [selectedChain, setSelectedChain] = useState("solana")

  const tokens = {
    solana: [
      { symbol: "SOL", name: "Solana", price: 142.87 },
      { symbol: "USDC", name: "USD Coin", price: 1.0 },
      { symbol: "BONK", name: "Bonk", price: 0.00002341 },
      { symbol: "JTO", name: "Jito", price: 3.42 },
      { symbol: "RAY", name: "Raydium", price: 1.87 },
    ],
    ethereum: [
      { symbol: "ETH", name: "Ethereum", price: 3452.12 },
      { symbol: "USDC", name: "USD Coin", price: 1.0 },
      { symbol: "USDT", name: "Tether", price: 1.0 },
      { symbol: "WBTC", name: "Wrapped Bitcoin", price: 62145.78 },
    ],
    bsc: [
      { symbol: "BNB", name: "Binance Coin", price: 567.89 },
      { symbol: "BUSD", name: "Binance USD", price: 1.0 },
      { symbol: "CAKE", name: "PancakeSwap", price: 2.34 },
    ],
    avalanche: [
      { symbol: "AVAX", name: "Avalanche", price: 34.56 },
      { symbol: "USDC", name: "USD Coin", price: 1.0 },
      { symbol: "JOE", name: "Trader Joe", price: 0.67 },
    ],
  }

  useEffect(() => {
    // Reset tokens when chain changes
    setFromToken(tokens[selectedChain][0].symbol)
    setToToken(tokens[selectedChain][1].symbol)
    setFromAmount("")
    setToAmount("")
    setQuotes([])
    setSelectedRoute(null)
  }, [selectedChain])

  const handleFromAmountChange = (e) => {
    const value = e.target.value
    setFromAmount(value)

    if (value && !isNaN(value) && Number.parseFloat(value) > 0) {
      // Calculate to amount based on token prices
      const fromTokenPrice = tokens[selectedChain].find((t) => t.symbol === fromToken)?.price || 0
      const toTokenPrice = tokens[selectedChain].find((t) => t.symbol === toToken)?.price || 0

      if (fromTokenPrice && toTokenPrice) {
        const calculatedAmount = ((Number.parseFloat(value) * fromTokenPrice) / toTokenPrice).toFixed(6)
        setToAmount(calculatedAmount)
      }
    } else {
      setToAmount("")
    }
  }

  const handleToAmountChange = (e) => {
    const value = e.target.value
    setToAmount(value)

    if (value && !isNaN(value) && Number.parseFloat(value) > 0) {
      // Calculate from amount based on token prices
      const fromTokenPrice = tokens[selectedChain].find((t) => t.symbol === fromToken)?.price || 0
      const toTokenPrice = tokens[selectedChain].find((t) => t.symbol === toToken)?.price || 0

      if (fromTokenPrice && toTokenPrice) {
        const calculatedAmount = ((Number.parseFloat(value) * toTokenPrice) / fromTokenPrice).toFixed(6)
        setFromAmount(calculatedAmount)
      }
    } else {
      setFromAmount("")
    }
  }

  const swapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)

    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const findRoutes = () => {
    if (!fromAmount || isNaN(fromAmount) || Number.parseFloat(fromAmount) <= 0) {
      return
    }

    setIsLoading(true)
    setLoadingProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call to get quotes
    setTimeout(() => {
      clearInterval(interval)
      setLoadingProgress(100)

      // Generate mock quotes
      const mockQuotes = [
        {
          id: 1,
          exchange: "Jupiter",
          fromAmount: Number.parseFloat(fromAmount),
          toAmount: Number.parseFloat(toAmount) * 1.005,
          price: ((Number.parseFloat(toAmount) * 1.005) / Number.parseFloat(fromAmount)).toFixed(6),
          fee: "0.1%",
          estimatedTime: "~10 seconds",
        },
        {
          id: 2,
          exchange: "Raydium",
          fromAmount: Number.parseFloat(fromAmount),
          toAmount: Number.parseFloat(toAmount) * 0.998,
          price: ((Number.parseFloat(toAmount) * 0.998) / Number.parseFloat(fromAmount)).toFixed(6),
          fee: "0.3%",
          estimatedTime: "~12 seconds",
        },
        {
          id: 3,
          exchange: "Orca",
          fromAmount: Number.parseFloat(fromAmount),
          toAmount: Number.parseFloat(toAmount) * 1.001,
          price: ((Number.parseFloat(toAmount) * 1.001) / Number.parseFloat(fromAmount)).toFixed(6),
          fee: "0.2%",
          estimatedTime: "~11 seconds",
        },
      ]

      // Sort by best rate
      mockQuotes.sort((a, b) => b.toAmount - a.toAmount)

      setQuotes(mockQuotes)
      setSelectedRoute(mockQuotes[0])
      setIsLoading(false)
    }, 2000)
  }

  const executeSwap = () => {
    if (!selectedRoute) return

    setIsLoading(true)
    setLoadingProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Simulate swap execution
    setTimeout(() => {
      clearInterval(interval)
      setLoadingProgress(100)

      // Reset form after successful swap
      setTimeout(() => {
        setFromAmount("")
        setToAmount("")
        setQuotes([])
        setSelectedRoute(null)
        setIsLoading(false)
      }, 1000)
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SolXtreme Swap</CardTitle>
            <CardDescription>Swap tokens across multiple chains and DEXes</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Chain</Label>
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger>
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="from-amount">From</Label>
              <span className="text-xs text-muted-foreground">Balance: 12.45 {fromToken}</span>
            </div>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  id="from-amount"
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={handleFromAmountChange}
                  className="pr-16"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-2 text-xs"
                  onClick={() => setFromAmount("12.45")}
                >
                  MAX
                </Button>
              </div>
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens[selectedChain].map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" size="icon" onClick={swapTokens} className="rounded-full h-8 w-8 bg-muted">
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-amount">To</Label>
            <div className="flex space-x-2">
              <Input
                id="to-amount"
                type="number"
                placeholder="0.0"
                value={toAmount}
                onChange={handleToAmountChange}
                className="flex-1"
              />
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens[selectedChain].map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span>
              1 {fromToken} ={" "}
              {(
                tokens[selectedChain].find((t) => t.symbol === toToken)?.price /
                tokens[selectedChain].find((t) => t.symbol === fromToken)?.price
              ).toFixed(6)}{" "}
              {toToken}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              Slippage Tolerance
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your transaction will revert if the price changes unfavorably by more than this percentage.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant={slippage === "0.1" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setSlippage("0.1")}
              >
                0.1%
              </Button>
              <Button
                variant={slippage === "0.5" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setSlippage("0.5")}
              >
                0.5%
              </Button>
              <Button
                variant={slippage === "1.0" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setSlippage("1.0")}
              >
                1.0%
              </Button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>{loadingProgress < 100 ? "Finding best route..." : "Executing swap..."}</span>
              <span>{loadingProgress}%</span>
            </div>
            <Progress value={loadingProgress} className="h-2" />
          </div>
        )}

        {quotes.length > 0 && !isLoading && (
          <div className="space-y-3 border rounded-md p-3">
            <h3 className="font-medium">Available Routes</h3>
            <div className="space-y-2">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className={`p-2 rounded-md border cursor-pointer ${selectedRoute?.id === quote.id ? "bg-primary/10 border-primary/30" : ""}`}
                  onClick={() => setSelectedRoute(quote)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{quote.exchange}</span>
                    <span className="font-medium">
                      {quote.toAmount.toFixed(6)} {toToken}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      Rate: {quote.price} | Fee: {quote.fee}
                    </span>
                    <span>{quote.estimatedTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!quotes.length && !isLoading && (
          <Button
            onClick={findRoutes}
            disabled={!fromAmount || isNaN(fromAmount) || Number.parseFloat(fromAmount) <= 0}
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Find Best Route
          </Button>
        )}

        {selectedRoute && !isLoading && (
          <Button onClick={executeSwap} className="w-full">
            Swap
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
