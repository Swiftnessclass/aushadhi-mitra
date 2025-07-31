"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Don't forget to install: npm i lucide-react

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const checkLoginStatus = () => {
    const cookies = document.cookie;
    setIsLoggedIn(cookies.includes("token="));
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const hiddenPaths = ["/login", "/register"];
  if (hiddenPaths.includes(pathname)) return null;

  const navLinks = (
    <>
      <Link href="/medicines" className="block px-4 py-2 hover:bg-blue-700">Medicines</Link>
      <Link href="/pharmacy" className="block px-4 py-2 hover:bg-blue-700">Pharmacy</Link>
      <Link href="/diagnosis" className="block px-4 py-2 hover:bg-blue-700">Symptom Checker</Link>
      <Link href="/Schemes" className="block px-4 py-2 hover:bg-blue-700">Schemes</Link>
      <Link href="/contact" className="block px-4 py-2 hover:bg-blue-700">Contact</Link>
      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-blue-700">Logout</button>
    </>
  );

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Profile "P" Button */}
        <Link
          href="/indashboard"
          className="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-blue-900 transition"
          title="Go to Profile"
        >
          P
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          {menuOpen ? (
            <X onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
          ) : (
            <Menu onClick={() => setMenuOpen(true)} className="w-6 h-6 cursor-pointer" />
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          {isLoggedIn ? navLinks : <Link href="/login" className="hover:underline">Login</Link>}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-blue-700 rounded-lg shadow-lg flex flex-col text-sm">
          {isLoggedIn ? navLinks : (
            <Link href="/login" className="block px-4 py-2 hover:bg-blue-600">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
