"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Upload, CheckCircle, UserCheck, Search, LogOut, FileText, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Property {
  id: string
  address: string
  owner: string
  ownerAddress: string
  status: "Verified" | "Under Dispute" | "Pending"
  lastUpdated: string
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Document Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadDescription, setUploadDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [walrusCid, setWalrusCid] = useState("")

  // Property Verification State
  const [verifyPropertyId, setVerifyPropertyId] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  // Ownership Transfer State
  const [transferPropertyId, setTransferPropertyId] = useState("")
  const [newOwnerAddress, setNewOwnerAddress] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)

  // Search State
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<Property | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (!user || user.type !== "admin") {
      router.push("/admin-login")
    }
  }, [user, router])

  const handleDocumentUpload = async () => {
    if (!uploadFile) {
      toast({
        title: "File Required",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      // Simulate document upload to Walrus via backend API
      // In real implementation:
      // const formData = new FormData()
      // formData.append('file', uploadFile)
      // formData.append('description', uploadDescription)
      // const response = await fetch('/api/documents/upload', { method: 'POST', body: formData })

      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock Walrus CID response
      const mockCid = `bafybei${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      setWalrusCid(mockCid)

      toast({
        title: "Upload Successful",
        description: `Document uploaded to Walrus. CID: ${mockCid}`,
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Unable to upload document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handlePropertyVerification = async () => {
    if (!verifyPropertyId.trim()) {
      toast({
        title: "Property ID Required",
        description: "Please enter a property ID to verify.",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    try {
      // Simulate Sui blockchain transaction for property verification
      // In real implementation, this would use Sui TypeScript SDK:
      // const txb = new TransactionBlock()
      // txb.moveCall({
      //   target: `${PACKAGE_ID}::land_registry::set_property_status_verified`,
      //   arguments: [txb.pure(verifyPropertyId), txb.pure(walrusCid)]
      // })
      // const result = await suiClient.signAndExecuteTransactionBlock({ ... })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Property Verified",
        description: `Property ${verifyPropertyId} has been marked as verified on the Sui blockchain.`,
      })
      setVerifyPropertyId("")
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Unable to verify property on blockchain. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleOwnershipTransfer = async () => {
    if (!transferPropertyId.trim() || !newOwnerAddress.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both property ID and new owner address.",
        variant: "destructive",
      })
      return
    }

    setIsTransferring(true)
    try {
      // Simulate Sui blockchain transaction for ownership transfer
      // In real implementation:
      // const txb = new TransactionBlock()
      // txb.moveCall({
      //   target: `${PACKAGE_ID}::land_registry::transfer_ownership`,
      //   arguments: [txb.pure(transferPropertyId), txb.pure(newOwnerAddress)]
      // })
      // const result = await suiClient.signAndExecuteTransactionBlock({ ... })

      await new Promise((resolve) => setTimeout(resolve, 2500))

      toast({
        title: "Ownership Transferred",
        description: `Property ${transferPropertyId} ownership has been transferred to ${newOwnerAddress}.`,
      })
      setTransferPropertyId("")
      setNewOwnerAddress("")
    } catch (error) {
      toast({
        title: "Transfer Failed",
        description: "Unable to transfer ownership on blockchain. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTransferring(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockProperty: Property = {
        id: searchQuery.startsWith("PROP") ? searchQuery : "PROP-LG-2024-001",
        address: "15 Victoria Island, Lagos",
        owner: "John Doe",
        ownerAddress: "0x1234567890abcdef1234567890abcdef12345678",
        status: "Pending",
        lastUpdated: "2024-01-15",
      }

      setSearchResult(mockProperty)
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to find property.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HectareChain Admin</h1>
              <p className="text-sm text-gray-600">Lagos Land Registry Administration</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="destructive">Admin Access</Badge>
            <span className="text-sm text-gray-600">{user.name}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Document Upload</TabsTrigger>
            <TabsTrigger value="verify">Property Verification</TabsTrigger>
            <TabsTrigger value="transfer">Ownership Transfer</TabsTrigger>
            <TabsTrigger value="search">Property Search</TabsTrigger>
          </TabsList>

          {/* Document Upload Tab */}
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Document Upload to Walrus
                </CardTitle>
                <CardDescription>Upload land-related documents to decentralized storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="file">Select Document</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Document Description</Label>
                  <Textarea
                    id="description"
                    placeholder="e.g., Certificate of Occupancy for Property PROP-LG-2024-001"
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                  />
                </div>

                <Button onClick={handleDocumentUpload} disabled={isUploading || !uploadFile} className="w-full">
                  {isUploading ? "Uploading to Walrus..." : "Upload Document"}
                </Button>

                {walrusCid && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800 mb-2">Upload Successful!</p>
                    <p className="text-xs text-green-700">Walrus CID:</p>
                    <p className="text-sm font-mono bg-white px-2 py-1 rounded border mt-1">{walrusCid}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Property Verification Tab */}
          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Property Verification
                </CardTitle>
                <CardDescription>Mark properties as verified on the Sui blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="verify-property-id">Property ID</Label>
                  <Input
                    id="verify-property-id"
                    placeholder="e.g., PROP-LG-2024-001"
                    value={verifyPropertyId}
                    onChange={(e) => setVerifyPropertyId(e.target.value)}
                  />
                </div>

                {walrusCid && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <FileText className="h-4 w-4 inline mr-1" />
                      Document CID will be linked: {walrusCid}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handlePropertyVerification}
                  disabled={isVerifying || !verifyPropertyId.trim()}
                  className="w-full"
                >
                  {isVerifying ? "Verifying on Blockchain..." : "Mark as Verified"}
                </Button>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Important</p>
                      <p className="text-sm text-yellow-700">
                        This action will create an immutable record on the Sui blockchain. Ensure all documentation is
                        complete before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ownership Transfer Tab */}
          <TabsContent value="transfer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Ownership Transfer
                </CardTitle>
                <CardDescription>Transfer land ownership on the Sui blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="transfer-property-id">Property ID</Label>
                  <Input
                    id="transfer-property-id"
                    placeholder="e.g., PROP-LG-2024-001"
                    value={transferPropertyId}
                    onChange={(e) => setTransferPropertyId(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="new-owner-address">New Owner Sui Address</Label>
                  <Input
                    id="new-owner-address"
                    placeholder="0x..."
                    value={newOwnerAddress}
                    onChange={(e) => setNewOwnerAddress(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleOwnershipTransfer}
                  disabled={isTransferring || !transferPropertyId.trim() || !newOwnerAddress.trim()}
                  className="w-full"
                >
                  {isTransferring ? "Processing Transfer..." : "Transfer Ownership"}
                </Button>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Critical Action</p>
                      <p className="text-sm text-red-700">
                        Ownership transfers are permanent and cannot be reversed. Verify all details before executing
                        the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Property Search Tab */}
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Property Search & Management
                </CardTitle>
                <CardDescription>Search and manage property records with administrative controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter property ID or address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>

                {searchResult && (
                  <div className="mt-6 p-4 border rounded-lg bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">{searchResult.id}</h3>
                      <Badge
                        className={
                          searchResult.status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : searchResult.status === "Under Dispute"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {searchResult.status}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>
                          <strong>Address:</strong> {searchResult.address}
                        </p>
                        <p>
                          <strong>Owner:</strong> {searchResult.owner}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Owner Address:</strong> {searchResult.ownerAddress}
                        </p>
                        <p>
                          <strong>Last Updated:</strong> {searchResult.lastUpdated}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Full Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit Property
                      </Button>
                      <Button size="sm" variant="outline">
                        View Documents
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
