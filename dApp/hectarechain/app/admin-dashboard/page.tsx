"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building,
  Users,
  FileText,
  MapPin,
  Settings,
  BarChart3,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Menu,
  X,
  Home,
  UserCheck,
  ArrowUpDown,
  Database,
  Loader2,
} from "lucide-react"
import { mockProperties, mockOwners, mockTransactions } from "@/lib/data"
import type { Owner, TransactionRecord } from "@/lib/types"
import Link from "next/link"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)

  // Owner management state
  const [owners, setOwners] = useState(mockOwners)
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null)
  const [ownerForm, setOwnerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    suiAddress: "",
  })

  // Land management state
  const [landForm, setLandForm] = useState({
    landIdInternal: "",
    address: "",
    coordinates: "",
    size: "",
    lga: "",
    features: "",
    estimatedValue: "",
  })

  // Transaction management state
  const [transactionForm, setTransactionForm] = useState({
    type: "",
    propertyId: "",
    fromOwnerId: "",
    toOwnerId: "",
    amount: "",
    description: "",
  })

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "owners", label: "Owner Management", icon: Users },
    { id: "lands", label: "Land Management", icon: Building },
    { id: "transactions", label: "Transactions", icon: ArrowUpDown },
    { id: "registry", label: "Land Registry", icon: FileText },
    { id: "coordinates", label: "Coordinate Index", icon: MapPin },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleCreateOwner = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newOwner: Owner = {
        id: (owners.length + 1).toString(),
        ...ownerForm,
        dateCreated: new Date().toISOString().split("T")[0],
        propertiesOwned: [],
        verificationStatus: "Pending",
      }
      setOwners([...owners, newOwner])
      setOwnerForm({ name: "", email: "", phone: "", address: "", suiAddress: "" })
      setIsLoading(false)
      alert("Owner created successfully!")
    }, 1000)
  }

  const handleCreateTransaction = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newTransaction: TransactionRecord = {
        id: (mockTransactions.length + 1).toString(),
        ...transactionForm,
        amount: Number.parseInt(transactionForm.amount) || 0,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
        txHash: "0x" + Math.random().toString(36).substring(2, 15),
      }
      setTransactionForm({
        type: "",
        propertyId: "",
        fromOwnerId: "",
        toOwnerId: "",
        amount: "",
        description: "",
      })
      setIsLoading(false)
      alert("Transaction created successfully!")
    }, 1000)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}
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
                onClick={() => setActiveSection(item.id)}
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
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/50 border-b border-slate-700 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-400">Manage land registry, owners, and transactions</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-emerald-500/20 text-emerald-400">Admin Access</Badge>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Properties</p>
                        <p className="text-2xl font-bold text-white">{mockProperties.length}</p>
                      </div>
                      <Building className="w-8 h-8 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Owners</p>
                        <p className="text-2xl font-bold text-white">{owners.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Transactions</p>
                        <p className="text-2xl font-bold text-white">{mockTransactions.length}</p>
                      </div>
                      <ArrowUpDown className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Value</p>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency(mockProperties.reduce((sum, p) => sum + p.estimatedValue, 0))}
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-yellow-400" />
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
                    {mockTransactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
                      >
                        <div>
                          <p className="text-white font-medium">{transaction.description}</p>
                          <p className="text-slate-400 text-sm">{transaction.date}</p>
                        </div>
                        <Badge
                          className={
                            transaction.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Owner Management Section */}
          {activeSection === "owners" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Owner Management</h2>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Owner
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Create Owner Form */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Create New Owner</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="ownerName" className="text-slate-300">
                        Full Name
                      </Label>
                      <Input
                        id="ownerName"
                        placeholder="Enter full name"
                        value={ownerForm.name}
                        onChange={(e) => setOwnerForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerEmail" className="text-slate-300">
                        Email Address
                      </Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        placeholder="Enter email address"
                        value={ownerForm.email}
                        onChange={(e) => setOwnerForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerPhone" className="text-slate-300">
                        Phone Number
                      </Label>
                      <Input
                        id="ownerPhone"
                        placeholder="+234 XXX XXX XXXX"
                        value={ownerForm.phone}
                        onChange={(e) => setOwnerForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerAddress" className="text-slate-300">
                        Physical Address
                      </Label>
                      <Textarea
                        id="ownerAddress"
                        placeholder="Enter physical address"
                        value={ownerForm.address}
                        onChange={(e) => setOwnerForm((prev) => ({ ...prev, address: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerSuiAddress" className="text-slate-300">
                        Sui Wallet Address
                      </Label>
                      <Input
                        id="ownerSuiAddress"
                        placeholder="0x..."
                        value={ownerForm.suiAddress}
                        onChange={(e) => setOwnerForm((prev) => ({ ...prev, suiAddress: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 font-mono text-sm"
                      />
                    </div>

                    <Button
                      onClick={handleCreateOwner}
                      disabled={isLoading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Create Owner
                    </Button>
                  </CardContent>
                </Card>

                {/* Owners List */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Existing Owners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {owners.map((owner) => (
                        <div key={owner.id} className="p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-white font-medium">{owner.name}</h3>
                              <p className="text-slate-400 text-sm">{owner.email}</p>
                            </div>
                            <Badge
                              className={
                                owner.verificationStatus === "Verified"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }
                            >
                              {owner.verificationStatus}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Properties: {owner.propertiesOwned.length}</span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Land Management Section */}
          {activeSection === "lands" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Land Management</h2>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Land
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Create Land Form */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Register New Land</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="landId" className="text-slate-300">
                        Land ID Internal
                      </Label>
                      <Input
                        id="landId"
                        placeholder="e.g., LKI-2024-007"
                        value={landForm.landIdInternal}
                        onChange={(e) => setLandForm((prev) => ({ ...prev, landIdInternal: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="landAddress" className="text-slate-300">
                        Property Address
                      </Label>
                      <Textarea
                        id="landAddress"
                        placeholder="Full address including LGA"
                        value={landForm.address}
                        onChange={(e) => setLandForm((prev) => ({ ...prev, address: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="landSize" className="text-slate-300">
                        Property Size
                      </Label>
                      <Input
                        id="landSize"
                        placeholder="e.g., 2,500 sqm"
                        value={landForm.size}
                        onChange={(e) => setLandForm((prev) => ({ ...prev, size: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="landLga" className="text-slate-300">
                        Local Government Area
                      </Label>
                      <Select onValueChange={(value) => setLandForm((prev) => ({ ...prev, lga: value }))}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select LGA" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="eti-osa" className="text-white hover:bg-slate-600">
                            Eti-Osa LGA
                          </SelectItem>
                          <SelectItem value="lagos-island" className="text-white hover:bg-slate-600">
                            Lagos Island LGA
                          </SelectItem>
                          <SelectItem value="yaba" className="text-white hover:bg-slate-600">
                            Yaba LCDA
                          </SelectItem>
                          <SelectItem value="ikorodu" className="text-white hover:bg-slate-600">
                            Ikorodu LGA
                          </SelectItem>
                          <SelectItem value="epe" className="text-white hover:bg-slate-600">
                            Epe LGA
                          </SelectItem>
                          <SelectItem value="ikeja" className="text-white hover:bg-slate-600">
                            Ikeja LGA
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="landValue" className="text-slate-300">
                        Estimated Value (₦)
                      </Label>
                      <Input
                        id="landValue"
                        type="number"
                        placeholder="e.g., 45000000"
                        value={landForm.estimatedValue}
                        onChange={(e) => setLandForm((prev) => ({ ...prev, estimatedValue: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <Button disabled={isLoading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900">
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Register Land
                    </Button>
                  </CardContent>
                </Card>

                {/* Properties List */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Existing Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {mockProperties.map((property) => (
                        <div key={property.id} className="p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-white font-medium">{property.landIdInternal}</h3>
                              <p className="text-slate-400 text-sm">{property.address}</p>
                            </div>
                            <Badge
                              className={
                                property.status === "Verified"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : property.status === "Under Verification"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {property.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">{formatCurrency(property.estimatedValue)}</span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Transaction Management Section */}
          {activeSection === "transactions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Transaction Management</h2>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Transaction
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Create Transaction Form */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Create New Transaction</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="transactionType" className="text-slate-300">
                        Transaction Type
                      </Label>
                      <Select onValueChange={(value) => setTransactionForm((prev) => ({ ...prev, type: value }))}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select transaction type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="sale" className="text-white hover:bg-slate-600">
                            Sale
                          </SelectItem>
                          <SelectItem value="inheritance" className="text-white hover:bg-slate-600">
                            Inheritance
                          </SelectItem>
                          <SelectItem value="gift" className="text-white hover:bg-slate-600">
                            Gift
                          </SelectItem>
                          <SelectItem value="transfer" className="text-white hover:bg-slate-600">
                            Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="transactionProperty" className="text-slate-300">
                        Property
                      </Label>
                      <Select onValueChange={(value) => setTransactionForm((prev) => ({ ...prev, propertyId: value }))}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {mockProperties.map((property) => (
                            <SelectItem key={property.id} value={property.id} className="text-white hover:bg-slate-600">
                              {property.landIdInternal} - {property.address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="fromOwner" className="text-slate-300">
                        From Owner
                      </Label>
                      <Select
                        onValueChange={(value) => setTransactionForm((prev) => ({ ...prev, fromOwnerId: value }))}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select current owner" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {owners.map((owner) => (
                            <SelectItem key={owner.id} value={owner.id} className="text-white hover:bg-slate-600">
                              {owner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="toOwner" className="text-slate-300">
                        To Owner
                      </Label>
                      <Select onValueChange={(value) => setTransactionForm((prev) => ({ ...prev, toOwnerId: value }))}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select new owner" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {owners.map((owner) => (
                            <SelectItem key={owner.id} value={owner.id} className="text-white hover:bg-slate-600">
                              {owner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="transactionAmount" className="text-slate-300">
                        Amount (₦)
                      </Label>
                      <Input
                        id="transactionAmount"
                        type="number"
                        placeholder="Enter amount (0 for gifts/inheritance)"
                        value={transactionForm.amount}
                        onChange={(e) => setTransactionForm((prev) => ({ ...prev, amount: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="transactionDescription" className="text-slate-300">
                        Description
                      </Label>
                      <Textarea
                        id="transactionDescription"
                        placeholder="Enter transaction description"
                        value={transactionForm.description}
                        onChange={(e) => setTransactionForm((prev) => ({ ...prev, description: e.target.value }))}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <Button
                      onClick={handleCreateTransaction}
                      disabled={isLoading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Create Transaction
                    </Button>
                  </CardContent>
                </Card>

                {/* Transactions List */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {mockTransactions.map((transaction) => (
                        <div key={transaction.id} className="p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-white font-medium">{transaction.type}</h3>
                              <p className="text-slate-400 text-sm">{transaction.description}</p>
                            </div>
                            <Badge
                              className={
                                transaction.status === "Completed"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : transaction.status === "Pending"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">
                              {transaction.amount > 0 ? formatCurrency(transaction.amount) : "No monetary value"}
                            </span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Land Registry Section */}
          {activeSection === "registry" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Land Registry Management</h2>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Registry
                </Button>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Registry Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Total Registered</p>
                      <p className="text-2xl font-bold text-white">{mockProperties.length}</p>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Active Records</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {mockProperties.filter((p) => p.status === "Verified").length}
                      </p>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Under Review</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {mockProperties.filter((p) => p.status === "Under Verification").length}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Registry Entries</h3>
                    {mockProperties.map((property) => (
                      <div key={property.id} className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">{property.landIdInternal}</h4>
                            <p className="text-slate-400 text-sm">{property.address}</p>
                            <p className="text-slate-400 text-xs mt-1">
                              Registered: {new Date(property.registrationDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                property.status === "Verified"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : property.status === "Under Verification"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {property.status}
                            </Badge>
                            <p className="text-slate-400 text-sm mt-1">{property.lga}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Coordinate Index Section */}
          {activeSection === "coordinates" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Coordinate Indexing</h2>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900">
                  <Database className="w-4 h-4 mr-2" />
                  Rebuild Index
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Coordinate Search</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="searchLat" className="text-slate-300">
                        Latitude
                      </Label>
                      <Input
                        id="searchLat"
                        placeholder="e.g., 6.5244"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="searchLng" className="text-slate-300">
                        Longitude
                      </Label>
                      <Input
                        id="searchLng"
                        placeholder="e.g., 3.3792"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="searchRadius" className="text-slate-300">
                        Search Radius (km)
                      </Label>
                      <Input
                        id="searchRadius"
                        type="number"
                        placeholder="e.g., 5"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Search className="w-4 h-4 mr-2" />
                      Search Properties
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Index Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <p className="text-slate-400 text-sm">Total Indexed Properties</p>
                        <p className="text-2xl font-bold text-white">{mockProperties.length}</p>
                      </div>
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <p className="text-slate-400 text-sm">Coverage Areas</p>
                        <p className="text-2xl font-bold text-blue-400">6 LGAs</p>
                      </div>
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <p className="text-slate-400 text-sm">Last Updated</p>
                        <p className="text-white">Today, 2:30 PM</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white font-medium">Coverage by LGA</h4>
                        {["Eti-Osa LGA", "Lagos Island LGA", "Yaba LCDA", "Ikorodu LGA", "Epe LGA", "Ikeja LGA"].map(
                          (lga) => (
                            <div key={lga} className="flex justify-between text-sm">
                              <span className="text-slate-400">{lga}</span>
                              <span className="text-white">
                                {mockProperties.filter((p) => p.lga === lga).length} properties
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Analytics & Reports</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Avg Property Value</p>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency(
                            mockProperties.reduce((sum, p) => sum + p.estimatedValue, 0) / mockProperties.length,
                          )}
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Verification Rate</p>
                        <p className="text-2xl font-bold text-white">
                          {Math.round(
                            (mockProperties.filter((p) => p.status === "Verified").length / mockProperties.length) *
                              100,
                          )}
                          %
                        </p>
                      </div>
                      <UserCheck className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Monthly Transactions</p>
                        <p className="text-2xl font-bold text-white">{mockTransactions.length}</p>
                      </div>
                      <ArrowUpDown className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Active Owners</p>
                        <p className="text-2xl font-bold text-white">
                          {owners.filter((o) => o.verificationStatus === "Verified").length}
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Property Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      "Verified",
                      "Under Verification",
                      "Under Dispute",
                      "Fractionalized",
                      "Mortgaged",
                      "Government Acquired",
                    ].map((status) => {
                      const count = mockProperties.filter((p) => p.status === status).length
                      const percentage = Math.round((count / mockProperties.length) * 100)
                      return (
                        <div key={status} className="bg-slate-700/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-300 text-sm">{status}</span>
                            <span className="text-white font-bold">{count}</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-slate-400 text-xs">{percentage}%</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">System Settings</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Blockchain Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="suiNetwork" className="text-slate-300">
                        Sui Network
                      </Label>
                      <Select defaultValue="testnet">
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="testnet" className="text-white hover:bg-slate-600">
                            Testnet
                          </SelectItem>
                          <SelectItem value="mainnet" className="text-white hover:bg-slate-600">
                            Mainnet
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="packageId" className="text-slate-300">
                        Package ID
                      </Label>
                      <Input
                        id="packageId"
                        value="0x1234567890abcdef..."
                        readOnly
                        className="bg-slate-700 border-slate-600 text-white font-mono text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gasLimit" className="text-slate-300">
                        Default Gas Limit
                      </Label>
                      <Input id="gasLimit" value="20000000" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">System Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="defaultLga" className="text-slate-300">
                        Default LGA
                      </Label>
                      <Select defaultValue="lagos-island">
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="lagos-island" className="text-white hover:bg-slate-600">
                            Lagos Island LGA
                          </SelectItem>
                          <SelectItem value="eti-osa" className="text-white hover:bg-slate-600">
                            Eti-Osa LGA
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency" className="text-slate-300">
                        Currency
                      </Label>
                      <Select defaultValue="ngn">
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="ngn" className="text-white hover:bg-slate-600">
                            Nigerian Naira (₦)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone" className="text-slate-300">
                        Timezone
                      </Label>
                      <Select defaultValue="africa-lagos">
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="africa-lagos" className="text-white hover:bg-slate-600">
                            Africa/Lagos (WAT)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Admin Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Database className="w-4 h-4 mr-2" />
                      Backup Database
                    </Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900">
                      <Settings className="w-4 h-4 mr-2" />
                      System Maintenance
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
