"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleZkLogin = async (provider: "google" | "facebook") => {
    setIsLoading(true)
    try {
      // Simulate zkLogin authentication with Sui
      // In a real implementation, this would integrate with Sui's zkLogin SDK
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock user data - in real implementation, this would come from zkLogin
      const userData = {
        id: `zklogin_${Date.now()}`,
        email: `user@${provider}.com`,
        name: `User via ${provider}`,
        type: "user" as const,
        suiAddress: "0x1234567890abcdef1234567890abcdef12345678",
      }

      login(userData)
      toast({
        title: "Login Successful",
        description: `Welcome! You're now logged in via ${provider}.`,
      })
      router.push("/user-dashboard")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Unable to authenticate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl">User Login</CardTitle>
            <CardDescription>Sign in with your social account using Sui's zkLogin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => handleZkLogin("google")} disabled={isLoading} className="w-full" variant="outline">
              {isLoading ? "Authenticating..." : "Continue with Google"}
            </Button>

            <Button onClick={() => handleZkLogin("facebook")} disabled={isLoading} className="w-full" variant="outline">
              {isLoading ? "Authenticating..." : "Continue with Facebook"}
            </Button>

            <div className="text-center text-sm text-gray-600 mt-6">
              <p>Secure authentication powered by Sui zkLogin</p>
              <p className="mt-2">
                Are you an admin?{" "}
                <Link href="/admin-login" className="text-green-600 hover:underline">
                  Admin Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
