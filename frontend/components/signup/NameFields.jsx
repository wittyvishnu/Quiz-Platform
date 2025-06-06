import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NameFields({ formData, handleChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <Label htmlFor="first_name" className="text-xs font-medium text-gray-700">First Name *</Label>
        <Input
          id="first_name"
          name="first_name"
          placeholder="John"
          value={formData.first_name}
          onChange={handleChange}
          className="h-8 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="last_name" className="text-xs font-medium text-gray-700">Last Name *</Label>
        <Input
          id="last_name"
          name="last_name"
          placeholder="Doe"
          value={formData.last_name}
          onChange={handleChange}
          className="h-8 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          required
        />
      </div>
    </div>
  )
}