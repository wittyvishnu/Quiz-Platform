import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function AuthLayout({ children }) {
  return (
 
      <div>
        {children}
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    
  );
}
