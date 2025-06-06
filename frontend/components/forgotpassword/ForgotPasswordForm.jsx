"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "react-hot-toast"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Email is required")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/auth/request-password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "seller" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to send OTP")
      toast.success(data.message || "OTP sent")
      setStep(2)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to reset password")
      toast.success("Password reset successful!")
      router.push("/auth/login")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-lg bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-xl">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Reset Your Password
          </CardTitle>
          <p className="mt-2 text-sm text-gray-500">
            {step === 1 ? "Enter your email to receive an OTP" : "Enter the OTP and your new password"}
          </p>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          {step === 1 ? (
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-amber-400 transition-all"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-amber-500 text-black font-bold text-lg rounded-lg hover:bg-amber-600 transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <Label htmlFor="otp" className="text-sm font-semibold text-gray-700">
                  OTP
                </Label>
                <Input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="mt-2 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-amber-400 transition-all"
                />
              </div>
              <div>
                <Label htmlFor="new-password" className="text-sm font-semibold text-gray-700">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-amber-400 pr-12 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-amber-400 pr-12 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-amber-500 text-black font-bold text-lg rounded-lg hover:bg-amber-600 transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
          <div className="text-sm text-center text-gray-600 mt-6">
            Remember your password?{" "}
            <a href="/auth/login" className="text-blue-600 hover:text-blue-800 transition-colors font-semibold">
              Log in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}