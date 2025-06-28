"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  MapPin,
  Users,
  TrendingUp,
  Lock,
  Eye,
  FileText,
  Coins,
  Building,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Award,
} from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold">
                HECTARE<span className="text-emerald-400">CHAIN</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                How it works
              </Link>
              <Link href="#properties" className="text-slate-300 hover:text-white transition-colors">
                Properties
              </Link>
              <Link href="#about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-black">
                  Login
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6">
                BLOCKCHAIN-POWERED LAND REGISTRY
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-emerald-400">REVOLUTIONIZING</span> LAND OWNERSHIP {" "}
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  THROUGH BLOCKCHAIN
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                HectareChain is transforming land ownership through blockchain technology. Secure your property
                rights with immutable records, fractional ownership opportunities, and transparent transactions that
                eliminate traditional bureaucratic delays.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/login">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  <Eye className="mr-2 w-5 h-5" />
                  View Properties
                </Button>
              </div>

              <div className="text-sm text-slate-400">
                {/* <p className="flex items-center mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Licensed by Lagos State Ministry of Lands
                </p> */}
                <p className="flex items-center mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Partnership with Federal Ministry of Works and Housing
                </p>
                <p className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Over 500 properties successfully registered on blockchain
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 relative overflow-hidden">
                {/* Hero Image */}
                <div className="relative z-10 mb-6">
                  <img
                    src="https://images.pexels.com/photos/636342/pexels-photo-636342.jpeg"
                    alt="Modern Lagos Property Development"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-emerald-500 text-slate-900 font-semibold">BLOCKCHAIN VERIFIED</Badge>
                  </div>
                </div>

                {/* Stats Overlay */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-emerald-400">₦2.5B+</div>
                    <div className="text-sm text-slate-300">Total Property Value</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-blue-400">500+</div>
                    <div className="text-sm text-slate-300">Properties Registered</div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4">
                  <div className="w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-slate-900 font-bold text-xs">SECURE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-28 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12">
            {[
              { icon: Zap, title: "Instant", subtitle: "verification" },
              { icon: Shield, title: "Blockchain", subtitle: "security" },
              { icon: Users, title: "Fractional", subtitle: "ownership" },
              { icon: Globe, title: "Global", subtitle: "accessibility" },
              { icon: Award, title: "Government", subtitle: "approved" },
              { icon: TrendingUp, title: "Investment", subtitle: "opportunities" },
            ].map((feature, index) => (
              <Card key={index} className="bg-slate-700/50 border-slate-600">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-slate-900" />
                  </div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-300">{feature.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Transforming Land Ownership</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              HectareChain eliminates the traditional complexities of land ownership by leveraging blockchain technology
              to create a transparent, secure, and efficient system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Digital Land Verification",
                description:
                  "Our system verifies land documents including Certificate of Occupancy, survey plans, and government approvals in minutes, not months.",
                icon: FileText,
              },
              {
                title: "Immutable Blockchain Records",
                description:
                  "Every property transaction is recorded on the Sui blockchain, creating permanent, tamper-proof ownership records that can never be disputed.",
                icon: Shield,
              },
              {
                title: "Fractional Property Investment",
                description:
                  "Break down property barriers by owning fractions of high-value properties, starting from as little as ₦100,000.",
                icon: Coins,
              },
              {
                title: "Smart Contract Automation",
                description:
                  "Automated property transfers, rental distributions, and ownership changes through smart contracts eliminate middlemen and reduce costs.",
                icon: Building,
              },
              {
                title: "Real-Time Property Tracking",
                description:
                  "Track your property verification status, ownership changes, and investment performance in real-time through our advanced dashboard.",
                icon: TrendingUp,
              },
              {
                title: "Government Integration",
                description:
                  "Direct integration with State land registry ensures all blockchain records are synchronized with official government databases.",
                icon: ArrowRight,
              },
            ].map((step, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Path to Property Ownership</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Three simple steps to secure your place in this digital property revolution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01.",
                title: "Register & Verify",
                description:
                  "Create your HectareChain account using our secure zkLogin system. Upload your property documents for instant AI-powered verification.",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
              },
              {
                step: "02.",
                title: "Invest & Own",
                description:
                  "Choose from verified properties and invest according to your budget. Own full properties or buy fractional shares starting from ₦100,000.",
                image: "https://images.pexels.com/photos/171328/pexels-photo-171328.jpeg",
              },
              {
                step: "03.",
                title: "Track & Trade",
                description:
                  "Monitor your investments in real-time, receive rental income automatically, and trade your property tokens on our secure marketplace.",
                image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop",
              },
            ].map((item, index) => (
              <Card key={index} className="bg-slate-700/50 border-slate-600 overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-emerald-400 text-lg font-bold mb-2">{item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-300 mb-6">{item.description}</p>
                  <div className="bg-slate-600 rounded-lg p-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/login">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold">
                Start Your Journey Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Properties Showcase */}
      <section id="properties" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Premium Properties</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Invest in verified, high-value properties across Lagos's most desirable locations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
                status: "100% VERIFIED",
                location: "Lekki Phase 1, Lagos",
                title: "Luxury 4-Bedroom Villa in Gated Estate",
                roi: "12.5%",
                yield: "8.2%",
                price: "₦45,000,000",
                shares: "Available for fractional ownership",
              },
              {
                image: "https://images.privateproperty.com.ng/large/commercial-land-3eYUvDxFbdDc71Q0ogWn.jpeg",
                status: "100% VERIFIED",
                location: "Ikoyi, Lagos Island",
                title: "Commercial Plot on Broad Street",
                roi: "15.2%",
                yield: "10.1%",
                price: "₦85,000,000",
                shares: "25% shares available",
              },
              {
                image: "https://images.nigeriapropertycentre.com/properties/images/2926238/068516a77b9147-affordable-3-bedroom-apartment-spacious-bq-f-block-of-flats-for-sale-yaba-lagos.jpeg",
                status: "VERIFICATION IN PROGRESS",
                location: "Yaba, Lagos Mainland",
                title: "3-Bedroom Apartment Complex",
                roi: "TBA",
                yield: "TBA",
                price: "₦25,000,000",
                shares: "Coming soon",
              },
            ].map((property, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      property.status === "100% VERIFIED"
                        ? "bg-emerald-500 text-slate-900"
                        : "bg-yellow-500 text-slate-900"
                    }`}
                  >
                    {property.status}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center text-slate-400 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-4">{property.title}</h3>

                  <div className="flex justify-between text-sm mb-4">
                    <div>
                      <span className="text-emerald-400 font-semibold">{property.roi}</span>
                      <span className="text-slate-400 ml-1">Projected ROI</span>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-semibold">{property.yield}</span>
                      <span className="text-slate-400 ml-1">Gross yield</span>
                    </div>
                  </div>

                  <div className="text-right mb-4">
                    <div className="text-2xl font-bold text-white">{property.price}</div>
                    <div className="text-sm text-slate-400">{property.shares}</div>
                  </div>

                  <Button
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold"
                    disabled={property.status === "VERIFICATION IN PROGRESS"}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    {property.status === "VERIFICATION IN PROGRESS" ? "Coming Soon" : "Invest Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Trust HectareChain?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title:
                  "HectareChain is revolutionizing real estate investment by seamlessly bridging traditional property ownership with cutting-edge blockchain technology.",
              },
              {
                icon: CheckCircle,
                title:
                  "We're officially licensed by the State Ministry of Lands and maintain strategic partnerships with the Federal Ministry of Works and Housing.",
              },
              {
                icon: Lock,
                title:
                  "Our platform enables secure property tokenization and trading on our marketplace, giving investors unprecedented control and transparency over their assets.",
              },
              {
                icon: TrendingUp,
                title:
                  "HectareChain investors benefit from reduced government fees, streamlined processes, and access to previously exclusive high-value properties.",
              },
            ].map((item, index) => (
              <Card key={index} className="bg-slate-700/50 border-slate-600 p-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-slate-900" />
                </div>
                <p className="text-slate-300 leading-relaxed">{item.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Future of Real Estate</h2>
              <p className="text-xl text-slate-300 mb-8">
                Be part of the blockchain revolution transforming property ownership in Nigeria. Start with as little as {" "}
                <span className="text-emerald-400 font-semibold">₦100,000 </span>
                 and own a piece of Lagos's growth story.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold">
                    Start Investing Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  <FileText className="mr-2 w-5 h-5" />
                  Download Whitepaper
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-slate-900" />
                </div>
                <span className="text-xl font-bold">
                  HECTARE<span className="text-emerald-400">CHAIN</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Transforming land ownership through blockchain technology. Secure, transparent, and accessible
                property investment for everyone.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/user-dashboard" className="hover:text-white">
                    Property Search
                  </Link>
                </li>
                <li>
                  <Link href="/admin-dashboard" className="hover:text-white">
                    Admin Portal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Investment Calculator
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blockchain Explorer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Investment Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Legal Framework
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Community Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 HectareChain Lagos. Licensed by Lagos State Ministry of Lands. Built on Sui Blockchain.
            </p>
            <Link href="#" className="text-emerald-400 hover:text-emerald-300 text-sm mt-4 md:mt-0">
              Back to top ↑
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
