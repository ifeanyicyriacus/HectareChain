"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, AlertTriangle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login, checkAdminStatus } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleGoogleOAuth = async () => {
    setIsLoading(true)
    try {
      // Simulate Google OAuth for admin
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock Google OAuth response
      const mockGoogleUser = {
        email: "admin@hectarechain.gov.ng", // This would come from actual Google OAuth
        name: "Lagos Land Registry Admin",
        id: "google_admin_123",
      }

      // Check if user is in admin whitelist
      const isAdmin = await checkAdminStatus(mockGoogleUser.email)

      if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "Your account is not authorized for administrative access.",
          variant: "destructive",
        })
        return
      }

      // Create admin user object
      const adminData = {
        id: mockGoogleUser.id,
        email: mockGoogleUser.email,
        name: mockGoogleUser.name,
        type: "admin" as const,
        suiAddress: "0xadmin1234567890abcdef1234567890abcdef12345678",
      }

      login(adminData)
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the administrative dashboard.",
      })
      router.push("/admin-dashboard")
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Unable to authenticate admin access. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>Secure authentication for Lagos Land Registry administrators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGoogleOAuth} disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700">
              {isLoading ? "Authenticating..." : "Sign in with Google OAuth"}
            </Button>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Authorized Personnel Only</p>
                  <p className="text-sm text-yellow-700">
                    Access is restricted to whitelisted email addresses. Contact your system administrator if you
                    believe you should have access.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 mt-6">
              <p>
                Regular user?{" "}
                <Link href="/login" className="text-red-600 hover:underline">
                  User Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
