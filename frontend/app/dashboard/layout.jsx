"use client";
import ClientLayout from "@/components/ClientLayout"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function OrdersLayout({ children }) {
  return <ClientLayout>
         <ProtectedRoute>
          {children}
          </ProtectedRoute>
        </ClientLayout>
}