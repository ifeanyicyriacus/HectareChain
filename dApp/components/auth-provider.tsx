"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  type: "user" | "admin"
  suiAddress?: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoading: boolean
  checkAdminStatus: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock admin whitelist - in production, this would be checked via backend API
const ADMIN_WHITELIST = ["admin@hectarechain.gov.ng", "registry@lagosstate.gov.ng", "landadmin@lagos.gov.ng"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("hectarechain_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const checkAdminStatus = async (email: string): Promise<boolean> => {
    // In production, this would be an API call to check admin whitelist
    // const response = await fetch('/api/auth/check-admin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // })
    // const { isAdmin } = await response.json()
    // return isAdmin

    return ADMIN_WHITELIST.includes(email.toLowerCase())
  }

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("hectarechain_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hectarechain_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, checkAdminStatus }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
