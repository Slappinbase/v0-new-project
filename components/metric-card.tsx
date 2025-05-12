import { ArrowUpIcon, ArrowDownIcon, LineChartIcon, DatabaseIcon, UsersIcon, LockIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changeText?: string
  subtext?: string
  icon: "chart-line" | "database" | "users" | "lock"
}

export function MetricCard({ title, value, change, changeText, subtext, icon }: MetricCardProps) {
  const isPositive = change && change.startsWith("+")

  const renderIcon = () => {
    switch (icon) {
      case "chart-line":
        return <LineChartIcon className="h-5 w-5 text-gray-400" />
      case "database":
        return <DatabaseIcon className="h-5 w-5 text-gray-400" />
      case "users":
        return <UsersIcon className="h-5 w-5 text-gray-400" />
      case "lock":
        return <LockIcon className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="bg-[#131722] rounded-lg p-4 border border-gray-800">
      <div className="flex justify-between items-start">
        <h3 className="text-sm text-gray-400">{title}</h3>
        {renderIcon()}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <div className="flex items-center mt-1">
            <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"} flex items-center`}>
              {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
              {change}
            </span>
            {changeText && <span className="text-xs text-gray-500 ml-1">{changeText}</span>}
          </div>
        )}
        {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
      </div>
    </div>
  )
}
