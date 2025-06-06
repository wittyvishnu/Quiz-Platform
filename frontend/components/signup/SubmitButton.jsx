import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function SubmitButton({ loading, emailVerified }) {
  return (
    <Button
      type="submit"
      className="w-full h-8 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-lg"
      disabled={loading || !emailVerified} // Button enabled only when email is verified
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        "Continue" // Always "Continue" for signup
      )}
    </Button>
  )
}