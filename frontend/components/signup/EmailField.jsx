import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Shield, Loader2, CheckCircle } from "lucide-react"

export default function EmailField({
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
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email *
        </Label>
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 h-10 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md"
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
              className="h-10 px-4 text-sm text-gray-700 hover:bg-amber-50"
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
          <div className="space-y-1">
            <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
              OTP
            </Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="pl-10 h-10 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md"
                  maxLength={6}
                />
              </div>
              <Button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="h-10 px-4 text-sm bg-amber-500 hover:bg-amber-600 text-black"
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
}