"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MarketActivity() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // This is a simplified chart drawing function
    // In a real app, you'd use a library like Chart.js or recharts
    const drawChart = () => {
      const canvas = canvasRef.current!
      const width = canvas.width
      const height = canvas.height

      ctx.clearRect(0, 0, width, height)

      // Draw grid lines
      ctx.strokeStyle = "#1e2530"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i < 6; i++) {
        const y = 30 + (i * (height - 60)) / 5
        ctx.beginPath()
        ctx.moveTo(50, y)
        ctx.lineTo(width - 20, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i < 8; i++) {
        const x = 50 + (i * (width - 70)) / 7
        ctx.beginPath()
        ctx.moveTo(x, 30)
        ctx.lineTo(x, height - 30)
        ctx.stroke()
      }

      // Draw price line
      const priceData = [120, 125, 123, 128, 135, 130, 140, 145]
      ctx.strokeStyle = "#6366f1"
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let i = 0; i < priceData.length; i++) {
        const x = 50 + (i * (width - 70)) / 7
        const y = height - 30 - ((priceData[i] - 120) * (height - 60)) / 30
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw volume bars
      const volumeData = [100, 150, 120, 200, 180, 250, 220, 190]
      ctx.fillStyle = "rgba(99, 102, 241, 0.2)"

      for (let i = 0; i < volumeData.length; i++) {
        const x = 50 + (i * (width - 70)) / 7 - 5
        const barHeight = (volumeData[i] * (height - 60)) / 300
        ctx.fillRect(x, height - 30 - barHeight, 10, barHeight)
      }

      // Draw axis labels
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"

      const dates = ["Apr 9", "Apr 12", "Apr 15", "Apr 18", "Apr 21", "Apr 25", "Apr 29", "May 8"]
      for (let i = 0; i < dates.length; i++) {
        const x = 50 + (i * (width - 70)) / 7
        ctx.fillText(dates[i], x, height - 10)
      }

      // Draw price labels
      ctx.textAlign = "right"
      for (let i = 0; i < 6; i++) {
        const y = 30 + (i * (height - 60)) / 5
        const price = 160 - i * 10
        ctx.fillText(price.toString(), 40, y + 3)
      }

      // Draw volume labels
      ctx.textAlign = "left"
      for (let i = 0; i < 6; i++) {
        const y = 30 + (i * (height - 60)) / 5
        const volume = 600 - i * 150
        ctx.fillText(volume.toString(), width - 15, y + 3)
      }

      // Draw legend
      ctx.textAlign = "left"
      ctx.fillStyle = "#6366f1"
      ctx.fillRect(width / 2 - 100, height - 15, 10, 2)
      ctx.fillStyle = "#9ca3af"
      ctx.fillText("SOL Price ($)", width / 2 - 85, height - 10)

      ctx.fillStyle = "rgba(99, 102, 241, 0.2)"
      ctx.fillRect(width / 2 + 20, height - 15, 10, 10)
      ctx.fillStyle = "#9ca3af"
      ctx.fillText("Volume (M)", width / 2 + 35, height - 10)
    }

    drawChart()

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth
        canvasRef.current.height = canvasRef.current.offsetHeight
        drawChart()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Card className="bg-[#131722] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Market Activity</CardTitle>
        <p className="text-sm text-gray-400">SOL price and volume over time</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  )
}
