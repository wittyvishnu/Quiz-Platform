"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, HelpCircle, BarChart3 } from "lucide-react"; // Added BarChart3 import
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { removeAuthToken } from "@/lib/auth";
import Image from "next/image";

const Navbar = ({ className }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from local storage:", error);
      }
    }
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSignOut = async () => {
    try {
      await removeAuthToken();
      localStorage.removeItem("user");
      setUser(null);
      router.push("/auth/login");
      closeMobileMenu();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const fullName = user ? `${user.first_name} ${user.last_name}`.trim() : "Guest";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo and Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2" onClick={closeMobileMenu}>
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QuizPlatform
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 rounded-lg text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200 font-medium text-sm"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/create-quiz"
                    className="px-3 py-2 rounded-lg text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200 font-medium text-sm"
                    onClick={closeMobileMenu}
                  >
                    Create Quiz
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="px-3 py-2 rounded-lg text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200 font-medium text-sm"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                  <Link
                    href="/auth/login"
                    className="px-3 py-2 rounded-lg text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200 font-medium text-sm"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-3 py-2 rounded-lg text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200 font-medium text-sm"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Right section - User Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hover:bg-amber-50 h-10 px-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/default.png" alt="User avatar" />
                        <AvatarFallback className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{fullName}</p>
                        <p className="text-xs leading-none text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600" onSelect={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="space-y-1">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/create-quiz"
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                    onClick={closeMobileMenu}
                  >
                    Create Quiz
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                  <Link
                    href="/auth/login"
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            {user && (
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex items-center px-3 py-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/default.png" alt="User avatar" />
                    <AvatarFallback className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{fullName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;