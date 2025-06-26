"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useCurrentAccount } from "@mysten/dapp-kit"
import { CustomConnectButton } from "@/components/custom-connect-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Shield, Search, LogOut, FileText, User, MapPin, Calendar, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { TrustBadge } from "@/components/trust-badge"
import { DocumentViewer } from "@/components/document-viewer"
import type { LandParcel, SearchResponse } from "@/lib/types"
import { subscribeToPropertyEvents } from "@/lib/sui-client"

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const currentAccount = useCurrentAccount()
  const router = useRouter()
  const { toast } = useToast()

  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<LandParcel[]>([])
  const [selectedProperty, setSelectedProperty] = useState<LandParcel | null>(null)

  useEffect(() => {
    if (!user || user.type !== "user") {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    // Subscribe to real-time property updates
    const unsubscribe = subscribeToPropertyEvents((event) => {
      // Handle real-time property updates
      if (selectedProperty && event.parsedJson?.landParcelId === selectedProperty.id) {
        // Refresh selected property data
        handleSearch()
      }

      toast({
        title: "Property Updated",
        description: "A property you're viewing has been updated on the blockchain.",
      })
    })

    return () => {
      if (unsubscribe) {
        unsubscribe.then((unsub) => unsub())
      }
    }
  }, [selectedProperty])

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a property ID or address to search.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    try {
      // API call with partial matching
      const response = await fetch(`/api/properties/search?query=${encodeURIComponent(searchQuery)}`)
      const data: SearchResponse = await response.json()

      setSearchResults(data.results)

      if (data.results.length === 0) {
        toast({
          title: "No Properties Found",
          description: "No properties match your search criteria.",
        })
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${data.results.length} property(ies).`,
        })
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to search properties. Please try again.",
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

  const formatNairaValue = (suiAmount: number) => {
    // Mock conversion rate: 1 SUI = ₦800 (this would be dynamic in production)
    const nairaValue = suiAmount * 800
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(nairaValue)
  }

  const getLagosDistrict = (address: string) => {
    const districts = ["Lekki", "Ikoyi", "Ikeja", "Epe", "Surulere", "Yaba", "Apapa"]
    return districts.find((district) => address.includes(district)) || "Lagos"
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HectareChain Lagos</h1>
              <p className="text-sm text-gray-600">Secure Land Registry</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <CustomConnectButton />
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Property Verification</h2>
          <p className="text-gray-600">Search and verify land property ownership on the Sui blockchain</p>
          {currentAccount && (
            <div className="mt-2 flex items-center text-sm text-green-600">
              <Wallet className="h-4 w-4 mr-1" />
              Connected: {currentAccount.address.slice(0, 8)}...{currentAccount.address.slice(-6)}
            </div>
          )}
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Property
            </CardTitle>
            <CardDescription>
              Enter a property ID (e.g., Lagos/IKJ/P-123) or address to verify ownership and status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search">Property ID or Address</Label>
                <Input
                  id="search"
                  placeholder="e.g., Lagos/IKJ/P-123 or Victoria Island"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Search Results ({searchResults.length})</h3>

            {searchResults.map((property) => (
              <Card key={property.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="font-mono text-lg">{property.landIdInternal}</span>
                    <TrustBadge status={property.status} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Address
                        </Label>
                        <p className="text-lg">{property.address}</p>
                        <p className="text-sm text-gray-500">District: {getLagosDistrict(property.address)}</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-500">Property Size</Label>
                        <p className="text-lg">{property.size}</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-500">Current Owner</Label>
                        <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {property.currentOwnerAddress}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Registration Date
                        </Label>
                        <p className="text-lg">{new Date(property.registrationDate).toLocaleDateString("en-NG")}</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-500">Last Modified</Label>
                        <p className="text-lg">{new Date(property.lastModifiedDate).toLocaleDateString("en-NG")}</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-500">Blockchain Status</Label>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">Verified on Sui Network</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium text-gray-500 flex items-center mb-4">
                      <FileText className="h-4 w-4 mr-1" />
                      Associated Documents
                    </Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Primary Documents */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div>
                            <p className="font-medium text-green-800">Certificate of Occupancy</p>
                            <p className="text-sm text-green-600">Primary deed document</p>
                          </div>
                          <DocumentViewer cid={property.deedWalrusCid} filename="Certificate_of_Occupancy.pdf" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div>
                            <p className="font-medium text-blue-800">Survey Plan</p>
                            <p className="text-sm text-blue-600">Official survey document</p>
                          </div>
                          <DocumentViewer cid={property.surveyWalrusCid} filename="Survey_Plan.pdf" />
                        </div>
                      </div>

                      {/* Additional Documents */}
                      <div className="space-y-3">
                        {property.otherDocsWalrusCids.map((cid, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Additional Document {index + 1}</p>
                              <p className="text-sm text-gray-500">Supporting documentation</p>
                            </div>
                            <DocumentViewer cid={cid} filename={`Additional_Document_${index + 1}.pdf`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Walrus CID Information */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Decentralized Storage Information</h4>
                    <p className="text-sm text-blue-700">
                      All documents are stored on Walrus decentralized network, ensuring permanent availability and
                      tamper-proof access. Each document has a unique Content ID (CID) for verification.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {searchQuery && searchResults.length === 0 && !isSearching && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-4">
                No properties match your search for "{searchQuery}". Try searching with:
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Complete property ID (e.g., Lagos/IKJ/P-123)</li>
                <li>• Partial address (e.g., Victoria Island)</li>
                <li>• Lagos district name (e.g., Lekki, Ikoyi)</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
