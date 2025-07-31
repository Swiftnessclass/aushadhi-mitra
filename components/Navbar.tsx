"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // important
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const cookies = document.cookie;
    setIsLoggedIn(cookies.includes("token="));
    setHasMounted(true); // Only render after hydration
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const hiddenPaths = ["/login", "/register"];
  if (hiddenPaths.includes(pathname) || !hasMounted) return null;

  return (
    <nav className="bg-blue-800 text-white p-4 sticky top-0 z-50 shadow">
      <div className="flex justify-between items-center">
        {/* Left - Profile Link */}
        {isLoggedIn && (
          <Link
            href="/indashboard"
            className="bg-blue-700 text-white px-4 py-2 rounded-full shadow hover:bg-blue-900 transition text-sm font-medium"
            title="Go to Profile"
          >
            Profile
          </Link>
        )}

        {/* Right - Hamburger Icon for Mobile */}
        <div className="md:hidden">
          {menuOpen ? (
            <X onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
          ) : (
            <Menu onClick={() => setMenuOpen(true)} className="w-6 h-6 cursor-pointer" />
          )}
        </div>

        {/* Right - Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <Link href="/medicines" className="hover:underline">Medicines</Link>
              <Link href="/pharmacy" className="hover:underline">Pharmacy</Link>
              <Link href="/diagnosis" className="hover:underline">Symptom Checker</Link>
              <Link href="/Schemes" className="hover:underline">Schemes</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-blue-700 text-white shadow-lg z-50 p-4 transition-transform duration-300 ease-in-out">
          <div className="flex justify-end mb-4">
            <X onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="flex flex-col space-y-2">
            {isLoggedIn ? (
              <>
                <Link href="/medicines" className="block px-4 py-2 hover:bg-blue-800 rounded">Medicines</Link>
                <Link href="/pharmacy" className="block px-4 py-2 hover:bg-blue-800 rounded">Pharmacy</Link>
                <Link href="/diagnosis" className="block px-4 py-2 hover:bg-blue-800 rounded">Symptom Checker</Link>
                <Link href="/Schemes" className="block px-4 py-2 hover:bg-blue-800 rounded">Schemes</Link>
                <Link href="/contact" className="block px-4 py-2 hover:bg-blue-800 rounded">Contact</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
