"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Mail, Shield, Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { toast } from "react-hot-toast"

// NameFields Component
const NameFields = ({ formData, handleChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">First Name *</Label>
      <Input
        id="first_name"
        name="first_name"
        placeholder="John"
        value={formData.first_name}
        onChange={handleChange}
        className="h-10 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md placeholder:text-gray-400"
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">Last Name *</Label>
      <Input
        id="last_name"
        name="last_name"
        placeholder="Doe"
        value={formData.last_name}
        onChange={handleChange}
        className="h-10 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md placeholder:text-gray-400"
        required
      />
    </div>
  </div>
)

// EmailField Component
const EmailField = ({
  formData,
  handleChange,
  emailVerified,
  showOtpField,
  otp,
  setOtp,
  handleVerifyOtp,
  handleResendOtp,
  handleRequestOtp,
  countdown,
  loading,
}) => (
  <div className="space-y-3">
    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="pl-10 h-10 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md placeholder:text-gray-400"
            required
            disabled={emailVerified}
          />
        </div>
        {!emailVerified && (
          <Button
            type="button"
            onClick={handleRequestOtp}
            disabled={loading || !formData.email || countdown > 0}
            variant="outline"
            className="h-10 px-4 text-sm text-gray-700 border-gray-300 hover:bg-amber-50 rounded-md"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : countdown > 0 ? `${countdown}s` : "Verify"}
          </Button>
        )}
        {emailVerified && (
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" /> Verified
          </div>
        )}
      </div>
    </div>
    {showOtpField && !emailVerified && (
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-sm font-medium text-gray-700">OTP</Label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="pl-10 h-10 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md placeholder:text-gray-400"
                maxLength={6}
              />
            </div>
            <Button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className="h-10 px-4 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-md"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify OTP"}
            </Button>
          </div>
        </div>
        <div className="text-right">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={countdown > 0}
            className="text-sm text-amber-600 hover:text-amber-800 hover:underline disabled:opacity-50"
          >
            {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    )}
  </div>
)

// PasswordFields Component
const PasswordFields = ({ formData, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="pl-10 pr-10 h-10 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md placeholder:text-gray-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm_password" className="text-sm font-medium text-gray-700">Confirm *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="confirm_password"
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm"
            value={formData.confirm_password}
            onChange={handleChange}
            className="pl-10 pr-10 h-10 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md placeholder:text-gray-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}

// TermsCheckbox Component
const TermsCheckbox = ({ formData, setFormData }) => (
  <div className="flex items-center space-x-3">
    <Checkbox
      id="terms_accepted"
      name="terms_accepted"
      checked={formData.terms_accepted}
      onCheckedChange={(checked) => setFormData({ ...formData, terms_accepted: checked })}
      className="h-4 w-4 border-gray-300 rounded"
    />
    <Label htmlFor="terms_ac integral" className="text-sm text-gray-600">
      I agree to the{" "}
      <Link href="/terms" className="text-amber-600 hover:text-amber-800 hover:underline">
        Terms
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="text-amber-600 hover:text-amber-800 hover:underline">
        Privacy
      </Link>
    </Label>
  </div>
)

// SubmitButton Component
const SubmitButton = ({ loading, emailVerified }) => (
  <Button
    type="submit"
    className="w-full h-10 bg-amber-500 hover:bg-amber-600 text-white text-base font-semibold rounded-md"
    disabled={loading || !emailVerified}
  >
    {loading ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Creating...
      </>
    ) : (
      "Continue"
    )}
  </Button>
)

// Main SignupForm Component
export default function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "", // Still in state but not in UI
    password: "",
    confirm_password: "",
    terms_accepted: false,
    role: "seller",
  })
  const [emailVerified, setEmailVerified] = useState(false)
  const [showOtpField, setShowOtpField] = useState(false)
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value })
  }

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    setOtpLoading(true)
    if (!formData.email) {
      toast.error("Email is required")
      setOtpLoading(false)
      return
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("OTP sent to your email")
        setShowOtpField(true)
        setCountdown(60)
        startCountdown()
      } else {
        toast.error(data.error || "Failed to send OTP")
      }
    } catch {
      toast.error("Network error")
    } finally {
      setOtpLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setOtpLoading(true)
    if (!otp || otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP")
      setOtpLoading(false)
      return
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      })
      const data = await response.json()
      if (data.verified) {
        setEmailVerified(true)
        toast.success("Email verified successfully")
        setShowOtpField(false)
      } else {
        toast.error(data.error || "OTP verification failed")
      }
    } catch {
      toast.error("Network error")
    } finally {
      setOtpLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setOtpLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("New OTP sent to your email")
        setCountdown(60)
        startCountdown()
      } else {
        toast.error(data.error || "Failed to resend OTP")
      }
    } catch {
      toast.error("Network error")
    } finally {
      setOtpLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { first_name, last_name, email, password, confirm_password, terms_accepted } = formData
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      toast.error("All fields are required")
      setLoading(false)
      return
    }
    if (password !== confirm_password) {
      toast.error("Passwords do not match")
      setLoading(false)
      return
    }
    if (!terms_accepted) {
      toast.error("Accept terms and conditions")
      setLoading(false)
      return
    }
    if (!emailVerified) {
      toast.error("Verify your email first")
      setLoading(false)
      return
    }

    try {
      const signupResponse = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: "1234567890", otp }), // Hardcode phone as "1234567890"
      })

      const signupData = await signupResponse.json()

      if (!signupResponse.ok) {
        toast.error(signupData.error || "Signup failed")
        setLoading(false)
        return
      }

      toast.success("Account created successfully!")

      try {
        const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: "seller",
          }),
        })

        const loginData = await loginResponse.json()

        if (!loginResponse.ok) {
          toast.error(loginData.error || "Login failed")
          return
        }

        localStorage.setItem("token", loginData.token)
        localStorage.setItem("user", JSON.stringify(loginData.user))
        toast.success("Login successful!")
        router.push("/dashboard")
      } catch {
        toast.error("Login network error")
      }
    } catch (err) {
      toast.error(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-blue-50 to-purple-50 p-6">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Create Your Account
          </CardTitle>
          <p className="mt-1 text-sm text-gray-500">Join us to start your journey</p>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form onSubmit={handleSignup} className="space-y-5">
            <NameFields formData={formData} handleChange={handleChange} />
            <div className="grid grid-cols-1 gap-4"> {/* Changed to grid-cols-1 */}
              <EmailField
                formData={formData}
                handleChange={handleChange}
                emailVerified={emailVerified}
                showOtpField={showOtpField}
                otp={otp}
                setOtp={setOtp}
                handleVerifyOtp={handleVerifyOtp}
                handleResendOtp={handleResendOtp}
                handleRequestOtp={handleRequestOtp}
                countdown={countdown}
                loading={otpLoading}
              />
            </div>
            <PasswordFields formData={formData} handleChange={handleChange} />
            <TermsCheckbox formData={formData} setFormData={setFormData} />
            <SubmitButton loading={loading} emailVerified={emailVerified} />
            <div className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}