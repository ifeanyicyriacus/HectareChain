"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  MapPin,
  Building,
  ExternalLink,
  TrendingUp,
  Users,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader2,
  LogOut,
  User,
  Menu,
  X,
  Home,
  Bell,
  Settings,
  Wallet,
  BarChart3,
  History,
} from "lucide-react"
import { mockProperties } from "@/lib/data"
import type { LandParcel } from "@/lib/types"
import Link from "next/link"
import LeafletMap from "@/components/leaflet-map"

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<LandParcel[]>([])
  const [selectedProperty, setSelectedProperty] = useState<LandParcel | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "properties", label: "My Properties", icon: Building },
    { id: "search", label: "Property Search", icon: Search },
    { id: "tracking", label: "Verification Tracking", icon: Clock },
    { id: "portfolio", label: "Portfolio", icon: BarChart3 },
    { id: "transactions", label: "Transaction History", icon: History },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const results = mockProperties.filter(
        (property) =>
          property.landIdInternal.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(results)
      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-emerald-500"
      case "Fractionalized":
        return "bg-blue-500"
      case "Under Verification":
        return "bg-yellow-500"
      case "Under Dispute":
        return "bg-red-500"
      case "Mortgaged":
        return "bg-orange-500"
      case "Government Acquired":
        return "bg-purple-500"
      default:
        return "bg-slate-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle className="w-4 h-4" />
      case "Under Verification":
        return <Clock className="w-4 h-4" />
      case "Under Dispute":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const openDocument = (cid: string) => {
    // Simulate opening document
    window.open(`/api/documents/${cid}`, "_blank")
  }

  const getVerificationProgress = (property: LandParcel) => {
    if (!property.verificationProgress) return 0
    const completed = property.verificationProgress.filter((stage) => stage.status === "completed").length
    return (completed / property.verificationProgress.length) * 100
  }

  // Mock user properties (properties owned by current user)
  const userProperties = mockProperties.filter(
    (p) =>
      p.currentOwnerAddress === "0xabcdef1234567890abcdef1234567890abcdef12" ||
      (p.fractionalShares && p.fractionalShares.userShares > 0),
  )

  return (
    <div className="min-h-screen h-screen bg-slate-900 text-white flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col fixed lg:relative z-50 h-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-slate-900" />
                </div>
                <span className="text-lg font-bold">
                  HECTARE<span className="text-emerald-400">CHAIN</span>
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false)
                  }
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-emerald-500 text-slate-900"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            {sidebarOpen && (
              <div>
                <div className="text-sm font-medium text-white">John Doe</div>
                <div className="text-xs text-slate-400">Verified Investor</div>
              </div>
            )}
          </div>
          <Link href="/login">
            <Button
              variant="ghost"
              className={`w-full ${sidebarOpen ? "justify-start" : "justify-center"} text-slate-400 hover:text-white`}
            >
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span className="ml-2">Logout</span>}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-0">
        {/* Mobile Header with Hamburger */}
        <header className="bg-slate-800/50 border-b border-slate-700 p-4 lg:p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white">
                  {sidebarItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
                </h1>
                <p className="text-slate-400 text-sm lg:text-base">Last updated: {lastUpdated.toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-end lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
              <Badge className="bg-emerald-500/20 text-emerald-400 text-xs lg:text-sm">
                {userProperties.length} Properties
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 text-xs lg:text-sm hidden sm:block">
                Portfolio: {formatCurrency(userProperties.reduce((sum, p) => sum + p.estimatedValue, 0))}
              </Badge>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-xs lg:text-sm">My Properties</p>
                        <p className="text-xl lg:text-2xl font-bold text-white">{userProperties.length}</p>
                      </div>
                      <Building className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-xs lg:text-sm">Portfolio Value</p>
                        <p className="text-lg lg:text-2xl font-bold text-white">
                          ₦{(userProperties.reduce((sum, p) => sum + p.estimatedValue, 0) / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-xs lg:text-sm">Fractional Shares</p>
                        <p className="text-xl lg:text-2xl font-bold text-white">
                          {userProperties
                            .filter((p) => p.fractionalShares)
                            .reduce((sum, p) => sum + (p.fractionalShares?.userShares || 0), 0)}
                        </p>
                      </div>
                      <Users className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-xs lg:text-sm">Pending</p>
                        <p className="text-xl lg:text-2xl font-bold text-white">
                          {userProperties.filter((p) => p.status === "Under Verification").length}
                        </p>
                      </div>
                      <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProperties.slice(0, 3).map((property) => (
                      <div
                        key={property.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-700/50 rounded-lg space-y-3 sm:space-y-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-slate-600 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={property.imagesWalrusCids[0]?.url || "/placeholder.svg?height=48&width=48"}
                              alt={property.landIdInternal}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-white font-medium truncate">{property.landIdInternal}</p>
                            <p className="text-slate-400 text-sm truncate">{property.address}</p>
                            <div className="flex items-center space-x-2 text-xs text-slate-400">
                              <MapPin className="w-3 h-3" />
                              <span>{property.lga}</span>
                              <span>•</span>
                              <span>{property.size}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(property.status)} text-white flex-shrink-0`}>
                          {property.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Properties Section */}
          {activeSection === "properties" && (
            <div className="space-y-6">
              <div className="grid gap-6">
                {userProperties.map((property) => (
                  <Card key={property.id} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 lg:p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-1">
                          <img
                            src={property.imagesWalrusCids[0]?.url || "/placeholder.svg?height=200&width=300"}
                            alt={property.landIdInternal}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                            <div className="mb-4 sm:mb-0">
                              <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">
                                {property.landIdInternal}
                              </h3>
                              <p className="text-slate-300 mb-2 text-sm lg:text-base">{property.address}</p>
                              <div className="flex items-center space-x-2 text-sm text-slate-400">
                                <MapPin className="w-4 h-4" />
                                <span>{property.lga}</span>
                                <span>•</span>
                                <span>{property.size}</span>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(property.status)} text-white flex-shrink-0`}>
                              {getStatusIcon(property.status)}
                              <span className="ml-1">{property.status}</span>
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {property.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-600 text-slate-200 text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          {property.fractionalShares && (
                            <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-400 text-sm">Your Ownership</span>
                                <span className="text-emerald-400 font-semibold">
                                  {(
                                    (property.fractionalShares.userShares / property.fractionalShares.totalShares) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  (property.fractionalShares.userShares / property.fractionalShares.totalShares) * 100
                                }
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>{property.fractionalShares.userShares} shares</span>
                                <span>{property.fractionalShares.totalShares} total</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="lg:col-span-1 text-left lg:text-right">
                          <div className="text-xl lg:text-2xl font-bold text-white mb-2">
                            {formatCurrency(property.estimatedValue)}
                          </div>
                          <div className="text-sm text-slate-400 mb-4">
                            Registered: {new Date(property.registrationDate).toLocaleDateString()}
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button
                              onClick={() => setSelectedProperty(property)}
                              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900"
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Blockchain
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Search Section */}
          {activeSection === "search" && (
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-emerald-400" />
                    <span className="text-white">Property Search</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Input
                      placeholder="Search by Land ID or Address"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <Button
                      onClick={handleSearch}
                      disabled={isLoading}
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 w-full sm:w-auto"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      <span className="ml-2 sm:hidden">Search</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Map Section */}
              <LeafletMap
                properties={searchResults.length > 0 ? searchResults : mockProperties}
                selectedProperty={selectedProperty}
                onPropertySelect={setSelectedProperty}
                height="300px"
              />

              {/* Search Results */}
              {searchResults.length > 0 && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>Search Results ({searchResults.length} found)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {searchResults.map((property) => (
                        <Card key={property.id} className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-4 sm:space-y-0">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-1">{property.landIdInternal}</h3>
                                <p className="text-slate-300 text-sm mb-2">{property.address}</p>
                                <div className="flex items-center space-x-2 text-sm text-slate-400">
                                  <MapPin className="w-4 h-4" />
                                  <span>{property.lga}</span>
                                  <span>•</span>
                                  <span>{property.size}</span>
                                </div>
                              </div>
                              <div className="text-left sm:text-right">
                                <Badge className={`${getStatusColor(property.status)} text-white mb-2`}>
                                  {getStatusIcon(property.status)}
                                  <span className="ml-1">{property.status}</span>
                                </Badge>
                                <div className="text-lg font-bold text-white">
                                  {formatCurrency(property.estimatedValue)}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                              <Button
                                onClick={() => setSelectedProperty(property)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 w-full sm:w-auto"
                              >
                                View Details
                              </Button>
                              <div className="text-xs text-slate-400">
                                Registered: {new Date(property.registrationDate).toLocaleDateString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Tracking Section */}
          {activeSection === "tracking" && (
            <div className="space-y-6">
              <div className="grid gap-6">
                {userProperties
                  .filter((p) => p.status === "Under Verification" || p.verificationProgress)
                  .map((property) => (
                    <Card key={property.id} className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white">{property.landIdInternal}</CardTitle>
                            <p className="text-slate-300">{property.address}</p>
                          </div>
                          <Badge className={`${getStatusColor(property.status)} text-white`}>{property.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {property.verificationProgress ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-slate-300 font-medium">Verification Progress</span>
                              <span className="text-emerald-400 font-semibold">
                                {Math.round(getVerificationProgress(property))}% Complete
                              </span>
                            </div>

                            <Progress value={getVerificationProgress(property)} className="h-3 mb-6" />

                            <div className="space-y-4">
                              {property.verificationProgress.map((stage, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      stage.status === "completed"
                                        ? "bg-emerald-500"
                                        : stage.status === "in-progress"
                                          ? "bg-yellow-500"
                                          : "bg-slate-600"
                                    }`}
                                  >
                                    {stage.status === "completed" ? (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    ) : stage.status === "in-progress" ? (
                                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                                    ) : (
                                      <Clock className="w-4 h-4 text-slate-400" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-white font-medium">{stage.stage}</div>
                                    {stage.date && <div className="text-sm text-slate-400">{stage.date}</div>}
                                  </div>
                                  <Badge
                                    className={
                                      stage.status === "completed"
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : stage.status === "in-progress"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-slate-600/20 text-slate-400"
                                    }
                                  >
                                    {stage.status.replace("-", " ")}
                                  </Badge>
                                </div>
                              ))}
                            </div>

                            {property.status === "Under Verification" && (
                              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <div className="flex items-center space-x-2 text-blue-400 mb-2">
                                  <Clock className="w-4 h-4" />
                                  <span className="font-medium">Estimated Completion</span>
                                </div>
                                <p className="text-sm text-slate-300">
                                  Expected completion: 2-3 weeks from site inspection
                                </p>
                                <p className="text-xs text-slate-400 mt-2">
                                  You will receive notifications at each stage completion
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                            <h3 className="text-white font-semibold mb-2">Verification Complete</h3>
                            <p className="text-slate-400">
                              This property has been fully verified and is ready for transactions.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                {userProperties.filter((p) => p.status === "Under Verification" || p.verificationProgress).length ===
                  0 && (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="text-center py-12">
                      <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Pending Verifications</h3>
                      <p className="text-slate-400 mb-6">
                        All your properties are verified or you don't have any properties under verification.
                      </p>
                      <Button
                        onClick={() => setActiveSection("search")}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-900"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Search Properties
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Portfolio Section */}
          {activeSection === "portfolio" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Properties:</span>
                        <span className="text-white font-semibold">{userProperties.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Value:</span>
                        <span className="text-white font-semibold">
                          {formatCurrency(userProperties.reduce((sum, p) => sum + p.estimatedValue, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Fractional Shares:</span>
                        <span className="text-white font-semibold">
                          {userProperties
                            .filter((p) => p.fractionalShares)
                            .reduce((sum, p) => sum + (p.fractionalShares?.userShares || 0), 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Verified Properties:</span>
                        <span className="text-emerald-400 font-semibold">
                          {userProperties.filter((p) => p.status === "Verified").length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Average ROI:</span>
                        <span className="text-emerald-400 font-semibold">12.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Monthly Returns:</span>
                        <span className="text-emerald-400 font-semibold">₦125,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Growth Rate:</span>
                        <span className="text-emerald-400 font-semibold">+8.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Risk Level:</span>
                        <span className="text-yellow-400 font-semibold">Moderate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Other sections can be added here */}
          {(activeSection === "transactions" ||
            activeSection === "wallet" ||
            activeSection === "notifications" ||
            activeSection === "settings") && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const currentItem = sidebarItems.find((item) => item.id === activeSection)
                    const IconComponent = currentItem?.icon
                    return IconComponent ? <IconComponent className="w-8 h-8 text-slate-400" /> : null
                  })()}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {sidebarItems.find((item) => item.id === activeSection)?.label}
                </h3>
                <p className="text-slate-400 mb-6">
                  This section is coming soon. We're working hard to bring you the best experience.
                </p>
                <Button
                  onClick={() => setActiveSection("overview")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-900"
                >
                  Back to Overview
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Property Details Modal/Section */}
          {selectedProperty && (
            <Card className="bg-slate-800/50 border-slate-700 mt-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-white">{selectedProperty.landIdInternal}</CardTitle>
                    <p className="text-slate-300">{selectedProperty.address}</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedProperty(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Property Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Land ID:</span>
                        <span className="text-white">{selectedProperty.landIdInternal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Size:</span>
                        <span className="text-white">{selectedProperty.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">LGA:</span>
                        <span className="text-white">{selectedProperty.lga}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <Badge className={`${getStatusColor(selectedProperty.status)} text-white`}>
                          {selectedProperty.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Estimated Value:</span>
                        <span className="text-white font-semibold">
                          {formatCurrency(selectedProperty.estimatedValue)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Property Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-600 text-slate-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Property Images */}
                {selectedProperty.imagesWalrusCids.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Property Images</h3>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <img
                        src={
                          selectedProperty.imagesWalrusCids[currentImageIndex]?.url ||
                          "/placeholder.svg?height=400&width=600" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={selectedProperty.imagesWalrusCids[currentImageIndex]?.description}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <div className="text-center">
                        <h4 className="text-white font-medium mb-1">
                          {selectedProperty.imagesWalrusCids[currentImageIndex]?.angle}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {selectedProperty.imagesWalrusCids[currentImageIndex]?.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-2 mt-4">
                      {selectedProperty.imagesWalrusCids.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === currentImageIndex ? "bg-emerald-500" : "bg-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Blockchain Verification */}
                <div className="mt-6">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Blockchain Verified</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">
                      This property is registered on the Sui blockchain and all ownership records are immutable and
                      transparent.
                    </p>
                    <Button
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-900"
                      onClick={() =>
                        window.open(`https://suiexplorer.com/object/${selectedProperty.suiObjectId}`, "_blank")
                      }
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Sui Explorer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
