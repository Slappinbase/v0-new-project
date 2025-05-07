import { Header } from "@/components/header"
import { DashboardTabs } from "@/components/dashboard-tabs"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DashboardTabs />
      </main>
    </div>
  )
}
