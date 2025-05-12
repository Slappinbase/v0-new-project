"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "voice-orders", label: "Voice Orders" },
    { id: "token-creator", label: "Token Creator" },
    { id: "swap", label: "Swap" },
  ]

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 px-4 text-center transition-colors",
              activeTab === tab.id ? "bg-[#131722] text-white" : "bg-transparent text-gray-400 hover:text-white",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
