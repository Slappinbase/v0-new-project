"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function MarketChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration issues with theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate mock data
  const generateData = () => {
    const data = []
    const now = new Date()

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)

      // Base price around $140 with some randomness
      const basePrice = 140
      const randomFactor = Math.sin(i / 5) * 15 + (Math.random() * 10 - 5)
      const price = basePrice + randomFactor

      // Volume between 100M and 500M
      const volume = 100 + Math.random() * 400

      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: price.toFixed(2),
        volume: volume.toFixed(0),
      })
    }

    return data
  }

  const data = generateData()

  if (!mounted) return null

  const textColor = theme === "dark" ? "#f8fafc" : "#0f172a"
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0"

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="date" stroke={textColor} />
          <YAxis yAxisId="left" domain={["auto", "auto"]} stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
              borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
              color: textColor,
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            name="SOL Price ($)"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="right" type="monotone" dataKey="volume" name="Volume (M)" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
