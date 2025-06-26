"use client"

import { useState } from "react"
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CustomConnectButton() {
  const currentAccount = useCurrentAccount()
  const { mutate: disconnect } = useDisconnectWallet()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const { toast } = useToast()

  const handleCopyAddress = () => {
    if (currentAccount?.address) {
      navigator.clipboard.writeText(currentAccount.address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (currentAccount) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <Wallet className="h-4 w-4" />
            <span>{formatAddress(currentAccount.address)}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
            <Copy className="h-4 w-4 mr-2" />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={`https://suiexplorer.com/address/${currentAccount.address}?network=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Sui Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Connect your Sui wallet to interact with the HectareChain land registry on the blockchain.
          </p>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                // In a real implementation, this would trigger wallet connection
                toast({
                  title: "Wallet Connection",
                  description: "Please install and connect a Sui wallet like Sui Wallet or Suiet",
                })
                setIsWalletModalOpen(false)
              }}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Sui Wallet
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                toast({
                  title: "Wallet Connection",
                  description: "Please install and connect Suiet wallet",
                })
                setIsWalletModalOpen(false)
              }}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Suiet Wallet
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                toast({
                  title: "Wallet Connection",
                  description: "Please install and connect Martian wallet",
                })
                setIsWalletModalOpen(false)
              }}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Martian Wallet
            </Button>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>• Make sure you have a Sui wallet installed</p>
            <p>• Switch to Sui Testnet for development</p>
            <p>• Keep your wallet secure and never share your private keys</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
