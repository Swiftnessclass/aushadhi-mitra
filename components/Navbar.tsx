"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Don't show navbar on login/register pages
  const hiddenPaths = ["/login", "/register"];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <nav className="bg-blue-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold text-xl">
        Dashboard
      </Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/medicines">Medicines</Link>
            <Link href="/pharmacy">Pharmacy</Link>
            <Link href="/diagnosis">Symptom Checker</Link>
            <Link href="/Schemes">Schemes</Link>
            <Link href="/contact">Contact</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
