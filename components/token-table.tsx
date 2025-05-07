"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function TokenTable() {
  // Mock token data
  const tokens = [
    {
      id: 1,
      name: "Solana",
      symbol: "SOL",
      price: "$142.87",
      change: "+4.2%",
      isPositive: true,
      marketCap: "$58.2B",
      volume: "$2.1B",
    },
    {
      id: 2,
      name: "Bonk",
      symbol: "BONK",
      price: "$0.00002341",
      change: "+12.5%",
      isPositive: true,
      marketCap: "$1.4B",
      volume: "$321M",
    },
    {
      id: 3,
      name: "Raydium",
      symbol: "RAY",
      price: "$1.87",
      change: "-2.3%",
      isPositive: false,
      marketCap: "$456M",
      volume: "$89M",
    },
    {
      id: 4,
      name: "Jito",
      symbol: "JTO",
      price: "$3.42",
      change: "+1.8%",
      isPositive: true,
      marketCap: "$389M",
      volume: "$76M",
    },
    {
      id: 5,
      name: "Marinade",
      symbol: "MNDE",
      price: "$0.78",
      change: "-0.5%",
      isPositive: false,
      marketCap: "$156M",
      volume: "$23M",
    },
  ]

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h</TableHead>
            <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                    {token.symbol.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span>{token.name}</span>
                    <span className="text-xs text-muted-foreground">{token.symbol}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">{token.price}</TableCell>
              <TableCell className="text-right">
                <span className={token.isPositive ? "text-green-500" : "text-red-500"}>
                  {token.isPositive ? (
                    <ArrowUpRight className="inline h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="inline h-3 w-3 mr-1" />
                  )}
                  {token.change}
                </span>
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">{token.marketCap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
