"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/auth/login")
        return
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/verify-token", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        const data = await res.json()

        if (!data.valid) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          router.push("/auth/login")
        } else {
          setLoading(false)
        }
      } catch (err) {
        console.error("Token verification failed:", err)
        router.push("/auth/login")
      }
    }

    verifyToken()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return children
}
