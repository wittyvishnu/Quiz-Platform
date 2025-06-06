"use client"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import Navbar from "@/components/Navbar"

import Footer from "@/components/Footer"
import { Toaster } from "react-hot-toast"

const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-amber-100 via-blue-100 to-purple-100 overflow-hidden">
      <SidebarProvider>
        
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-md" />
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto overflow-x-hidden mt-12">
            {children}
          </main>
          <Footer/>
        </SidebarInset>
        <Toaster position="bottom-right" reverseOrder={false} />
      </SidebarProvider>
    </div>
  )
}


export default ClientLayout