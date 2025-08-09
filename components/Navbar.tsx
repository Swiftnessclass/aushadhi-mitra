"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
   (async () => {
     try {
      const res = await fetch("/api/is-authenticated");
      if (!res.ok) return;
      const data = await res.json();
      if (data?.isAuthenticated) setIsLoggedIn(true);
    } catch (err) {
      console.error("Failed to check authentication", err);
    }
  })();

  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const NavLinks = () => (
    <>
      <Link href="/medicines" className="block px-4 py-2 hover:bg-blue-700 rounded">Medicines</Link>
      <Link href="/pharmacy" className="block px-4 py-2 hover:bg-blue-700 rounded">Pharmacy</Link>
      <Link href="/diagnosis" className="block px-4 py-2 hover:bg-blue-700 rounded">Symptom Checker</Link>
      <Link href="/Schemes" className="block px-4 py-2 hover:bg-blue-700 rounded">Schemes</Link>
      <Link href="/contact" className="block px-4 py-2 hover:bg-blue-700 rounded">Contact</Link>
    </>
  );

  const hiddenPaths = ["/login", "/register"];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-800 text-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        {/* Profile button */}
        <Link
          href="/indashboard"
          className="bg-blue-700 text-white px-4 py-2 rounded-full shadow hover:bg-blue-900 transition text-sm font-medium"
        >
          Profile
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? <NavLinks /> : <Link href="/login" className="hover:underline">Login</Link>}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
          {/* Theme toggle always visible */}
          <ThemeToggle />
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle /> {/* Keep toggle accessible in mobile header too */}
          {menuOpen ? (
            <X onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
          ) : (
            <Menu onClick={() => setMenuOpen(true)} className="w-6 h-6 cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-blue-700 text-white shadow-lg z-50 p-4">
          <div className="flex justify-end mb-4">
            <X onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="flex flex-col space-y-2">
            {isLoggedIn ? <NavLinks /> : <Link href="/login" className="hover:bg-blue-600 rounded px-4 py-2">Login</Link>}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
