"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Don't forget to install: npm i lucide-react
import ThemeToggle from "./ThemeToggle";
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
      <button
  onClick={handleLogout}
  className="px-6 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition w-fit"
>
  Logout
</button>
<div className="ml-auto">
  <ThemeToggle />
</div>


    </>
  );

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Profile "P" Button */}
        <Link
  href="/indashboard"
  className="bg-blue-700 text-white px-4 py-2 rounded-full shadow hover:bg-blue-900 transition text-sm font-medium"
  title="Go to Profile"
>
  Profile
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
  <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-blue-700 text-white shadow-lg z-50 p-4 transition-transform duration-300 ease-in-out">
    <div className="flex justify-end mb-4">
      <X onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
    </div>
    <div className="flex flex-col space-y-2">
      {isLoggedIn ? navLinks : (
        <Link href="/login" className="block px-4 py-2 hover:bg-blue-600 rounded">Login</Link>
      )}
    </div>
  </div>
)}

    </nav>
  );
}
