"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Layers, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-mobile"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export function Header() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block">SolXtreme</span>
          </Link>
        </div>
        {isDesktop && (
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link
              href="/swap"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Swap
            </Link>
            <Link
              href="/tokens"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tokens
            </Link>
            <Link
              href="/analytics"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Analytics
            </Link>
          </nav>
        )}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ConnectWalletButton />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-4 py-4">
      <Link href="/" className="flex items-center space-x-2 px-4">
        <Layers className="h-6 w-6 text-primary" />
        <span className="font-bold">SolXtreme</span>
      </Link>
      <div className="px-4 py-2">
        <nav className="flex flex-col space-y-3">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/swap" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Swap
          </Link>
          <Link
            href="/tokens"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Tokens
          </Link>
          <Link
            href="/analytics"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Analytics
          </Link>
        </nav>
      </div>
    </div>
  )
}
