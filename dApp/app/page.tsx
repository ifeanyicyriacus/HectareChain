import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, FileText, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">HectareChain Lagos</h1>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline">User Login</Button>
            </Link>
            <Link href="/admin-login">
              <Button>Admin Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Secure Land Registry on the Blockchain</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            HectareChain Lagos provides a transparent, immutable, and decentralized solution for land ownership
            verification and management using Sui blockchain technology.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Verify Property
              </Button>
            </Link>
            <Link href="/admin-login">
              <Button size="lg" variant="outline">
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose HectareChain?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Blockchain Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Immutable records on Sui blockchain ensure your land ownership is permanently secured and
                  tamper-proof.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Decentralized Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Documents stored on Walrus network provide redundant, censorship-resistant access to your land
                  records.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Easy Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Simple property lookup system allows anyone to verify land ownership and status instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Document Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secure upload and management of land documents with cryptographic proof of authenticity.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-semibold">HectareChain Lagos</span>
          </div>
          <p className="text-gray-400">Powered by Sui Blockchain & Walrus Storage • Securing Land Rights for Lagos</p>
        </div>
      </footer>
    </div>
  )
}
