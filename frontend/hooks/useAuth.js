"use client"

import { useState, useEffect, useContext, createContext } from "react"
import { getAuthToken, getUser, removeAuthToken } from "@/lib/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = getAuthToken()
    const userData = getUser()

    if (token && userData) {
      try {
        // Check if token is expired
        const payload = JSON.parse(atob(token.split(".")[1]))
        const currentTime = Date.now() / 1000

        if (payload.exp > currentTime) {
          setUser(userData)
          setIsAuthenticated(true)
        } else {
          // Token expired
          removeAuthToken()
        }
      } catch (error) {
        // Invalid token
        removeAuthToken()
      }
    }

    setLoading(false)
  }, [])

  const login = (token, userData) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    removeAuthToken()
    setUser(null)
    setIsAuthenticated(false)
    window.location.href = "/auth/login"
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
