import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

const tokens = [
  {
    symbol: "S",
    name: "Solana",
    ticker: "SOL",
    price: "$142.87",
    change: "+4.2%",
    marketCap: "$58.2B",
    isPositive: true,
  },
  {
    symbol: "B",
    name: "Bonk",
    ticker: "BONK",
    price: "$0.00002341",
    change: "+12.5%",
    marketCap: "$1.4B",
    isPositive: true,
  },
  {
    symbol: "R",
    name: "Raydium",
    ticker: "RAY",
    price: "$1.87",
    change: "-2.3%",
    marketCap: "$456M",
    isPositive: false,
  },
  {
    symbol: "J",
    name: "Jito",
    ticker: "JTO",
    price: "$3.42",
    change: "+1.8%",
    marketCap: "$389M",
    isPositive: true,
  },
  {
    symbol: "M",
    name: "Marinade",
    ticker: "MNDE",
    price: "$0.78",
    change: "-0.5%",
    marketCap: "$156M",
    isPositive: false,
  },
]

export function TopTokens() {
  return (
    <Card className="bg-[#131722] border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Top Tokens</CardTitle>
          <p className="text-sm text-gray-400">Popular tokens on Solana</p>
        </div>
        <div className="bg-[#1e2530] text-xs px-2 py-1 rounded">Live</div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-xs border-b border-gray-800">
                <th className="text-left py-2 font-medium">Token</th>
                <th className="text-right py-2 font-medium">Price</th>
                <th className="text-right py-2 font-medium">24h</th>
                <th className="text-right py-2 font-medium">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index} className="border-b border-gray-800 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs mr-3">
                        {token.symbol}
                      </div>
                      <div>
                        <div className="font-medium">{token.name}</div>
                        <div className="text-xs text-gray-400">{token.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">{token.price}</td>
                  <td className="text-right">
                    <span
                      className={`flex items-center justify-end ${token.isPositive ? "text-green-500" : "text-red-500"}`}
                    >
                      {token.isPositive ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {token.change}
                    </span>
                  </td>
                  <td className="text-right">{token.marketCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
