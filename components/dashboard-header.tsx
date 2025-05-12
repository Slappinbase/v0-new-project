import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonIcon } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-gray-800 bg-[#0a0d14]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-lg">SolXtreme</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-white">
              Dashboard
            </Link>
            <Link href="/swap" className="text-gray-400 hover:text-white transition-colors">
              Swap
            </Link>
            <Link href="/tokens" className="text-gray-400 hover:text-white transition-colors">
              Tokens
            </Link>
            <Link href="/analytics" className="text-gray-400 hover:text-white transition-colors">
              Analytics
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Connect Wallet</Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <MoonIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
