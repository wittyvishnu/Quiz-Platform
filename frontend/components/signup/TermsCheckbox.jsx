import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function TermsCheckbox({ formData, setFormData }) {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id="terms_accepted"
        name="terms_accepted"
        checked={formData.terms_accepted}
        onCheckedChange={(checked) => setFormData({ ...formData, terms_accepted: checked })}
        className="mt-0.5 border-gray-300"
      />
      <Label htmlFor="terms_accepted" className="text-xs text-gray-600 leading-tight">
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
}