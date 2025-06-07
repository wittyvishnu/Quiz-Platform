"use client"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react" 
import { toast } from "react-hot-toast"

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false) 
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token) {
      router.push("/dashboard");
    }
  },[])

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!formData.email || !formData.password) {
    toast.error("Please fill in all fields");
    setLoading(false);
    return;
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        role: "creator",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    toast.success("Login successful!");

    router.push("/dashboard");

  } catch (err) {
    toast.error("Network error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-lg bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-xl">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </CardTitle>
          <p className="mt-2 text-sm text-gray-500">Sign in to access your account</p>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-amber-400 transition-all"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-2 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-amber-400 pr-12 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                  )}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-amber-500 text-black font-bold text-lg rounded-lg hover:bg-amber-600 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-sm text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 transition-colors font-semibold">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}