// hooks/use-toast.js (or use-toast.ts)
import { useContext } from "react";
import { ToastContext } from "@/components/ui/toast"; // or wherever your ToastContext is

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }
  return context;
}
