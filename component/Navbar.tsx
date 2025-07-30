"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // trigger useEffect when route changes

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/is-authenticated");
      const data = await res.json();
      setIsLoggedIn(data.isAuthenticated);
    };
    checkAuth();
  }, [pathname]); // re-run when path changes

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold text-xl">
        Dashboard
      </Link>
      <div className="space-x-4">
        {isLoggedIn && (
          <>
            <Link href="/medicines">Medicines</Link>
            <Link href="/pharmacy">Pharmacy</Link>
            <Link href="/diagnosis">Symptom Checker</Link>
            <Link href="/Schemes">Schemes</Link>
            <Link href="/contact">Contact</Link>
          </>
        )}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};
