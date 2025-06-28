"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Shield, User, UserCog, Chrome, Facebook, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("user")
  const router = useRouter()

  const handleUserLogin = async (provider: "google" | "facebook") => {
    setIsLoading(true)

    // Simulate zkLogin process
    setTimeout(() => {
      console.log(`Initiating zkLogin with ${provider}...`)
      // In real implementation, this would trigger Sui zkLogin
      router.push("/user-dashboard")
    }, 2000)
  }

  const handleAdminLogin = async () => {
    setIsLoading(true)

    // Simulate Google OAuth for admin
    setTimeout(() => {
      console.log("Initiating Google OAuth for admin...")
      // In real implementation, this would check backend whitelist
      router.push("/admin-dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Building className="w-7 h-7 text-slate-900" />
              </div>
              <span className="text-2xl font-bold text-white">
                HECTARE<span className="text-emerald-400">CHAIN</span>
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="w-96 h-96 mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 bg-emerald-400/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/30">
                  <Shield className="w-16 h-16 text-emerald-400" />
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-emerald-500 text-slate-900 font-semibold">BLOCKCHAIN SECURED</Badge>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              Join thousands of smart investors who trust us to manage their land assets. Log in to access your
              personalized dashboard, track your portfolio performance, and make informed investment decisions.
            </p>
          </div>
        </div>

        {/* Right Side - Login Forms */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">
                HECTARE<span className="text-emerald-400">CHAIN</span>
              </span>
            </div>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">Welcome Back</CardTitle>
              <p className="text-slate-400 text-center">Please select your login type to continue</p>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                  <TabsTrigger value="user" className="data-[state=active]:bg-slate-600">
                    <User className="w-4 h-4 mr-2" />
                    User Login
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-slate-600">
                    <UserCog className="w-4 h-4 mr-2" />
                    Admin Login
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user" className="space-y-4 mt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Login with Sui zkLogin</h3>
                    <p className="text-sm text-slate-400">Secure authentication using zero-knowledge proofs</p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => handleUserLogin("google")}
                      disabled={isLoading}
                      className="w-full bg-white hover:bg-gray-100 text-slate-900 font-semibold"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Chrome className="w-4 h-4 mr-2" />
                      )}
                      Continue with Google
                    </Button>

                    <Button
                      onClick={() => handleUserLogin("facebook")}
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Facebook className="w-4 h-4 mr-2" />
                      )}
                      Continue with Facebook
                    </Button>
                  </div>

                  <div className="text-center text-xs text-slate-400 mt-4">
                    <p>
                      By continuing, you agree to our{" "}
                      <Link href="#" className="text-emerald-400 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-emerald-400 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4 mt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Admin Access</h3>
                    <p className="text-sm text-slate-400">Restricted access for authorized administrators</p>
                  </div>

                  <Button
                    onClick={handleAdminLogin}
                    disabled={isLoading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Chrome className="w-4 h-4 mr-2" />
                    )}
                    Continue with Google OAuth
                  </Button>

                  <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-white">Admin Requirements</span>
                    </div>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• Must be whitelisted in backend system</li>
                      <li>• Requires Google OAuth verification</li>
                      <li>• Access to land registration functions</li>
                      <li>• Property verification capabilities</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Link href="/" className="text-emerald-400 hover:text-emerald-300 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
