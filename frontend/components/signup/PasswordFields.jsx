import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff } from "lucide-react"

export default function PasswordFields({ formData, handleChange }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <Label htmlFor="password" className="text-xs font-medium text-gray-700">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="pl-8 pr-8 h-8 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="confirm_password" className="text-xs font-medium text-gray-700">Confirm *</Label>
        <div className="relative">
          <Lock className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <Input
            id="confirm_password"
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm"
            value={formData.confirm_password}
            onChange={handleChange}
            className="pl-8 pr-8 h-8 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}