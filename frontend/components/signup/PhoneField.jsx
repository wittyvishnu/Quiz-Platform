import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone } from "lucide-react"

export default function PhoneField({ formData, handleChange }) {
  return (
    <div className="space-y-1">
      <Label htmlFor="phone" className="text-xs font-medium text-gray-700">Phone *</Label>
      <div className="relative">
        <Phone className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleChange}
          className="pl-8 h-8 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          required
        />
      </div>
    </div>
  )
}