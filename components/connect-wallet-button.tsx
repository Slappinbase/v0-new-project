"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet } from "lucide-react"

export function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const connectWallet = (walletType: string) => {
    // Mock wallet connection
    const mockAddress = `${walletType.substring(0, 3)}...${Math.random().toString(36).substring(2, 8)}`
    setWalletAddress(mockAddress)
    setIsConnected(true)
    setIsDialogOpen(false)
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setIsConnected(false)
  }

  if (isConnected) {
    return (
      <Button variant="outline" onClick={disconnectWallet} className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        {walletAddress}
      </Button>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect a wallet</DialogTitle>
          <DialogDescription>Connect your wallet to access SolXtreme features</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => connectWallet("Phantom")} className="w-full justify-start">
            <img src="/placeholder.svg?height=24&width=24&text=P" alt="Phantom" className="mr-2 h-6 w-6 rounded-full" />
            Phantom
          </Button>
          <Button onClick={() => connectWallet("Solflare")} className="w-full justify-start">
            <img
              src="/placeholder.svg?height=24&width=24&text=S"
              alt="Solflare"
              className="mr-2 h-6 w-6 rounded-full"
            />
            Solflare
          </Button>
          <Button onClick={() => connectWallet("Backpack")} className="w-full justify-start">
            <img
              src="/placeholder.svg?height=24&width=24&text=B"
              alt="Backpack"
              className="mr-2 h-6 w-6 rounded-full"
            />
            Backpack
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
