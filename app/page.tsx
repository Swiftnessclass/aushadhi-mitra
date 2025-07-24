"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between">
      {/* Header */}
      <header className="bg-blue-800 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Aushadhi Mitra</h1>
          <nav className="space-x-4 hidden md:block">
            <Link href="/medicines" className="hover:underline">
              Search Medicines
            </Link>
            <Link href="/stores" className="hover:underline">
              Jan Aushadhi Stores
            </Link>
            <Link href="/schemes" className="hover:underline">
              Govt Schemes
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-12 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
            Welcome to Aushadhi Mitra
          </h2>
          <p className="text-gray-700 text-lg">
            Your trusted companion for finding affordable medicines, nearby Jan Aushadhi stores, and government healthcare schemes.
          </p>
          <div className="space-x-4">
            <Link
              href="/medicines"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded shadow transition"
            >
              Search Medicines
            </Link>
            <Link
              href="/chatbot"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow transition"
            >
              Ask Aushadhi Bot
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/aushadhi-illustration.png"
            alt="Aushadhi Illustration"
            className="w-4/5 max-w-md"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-4 mt-8">
        <p>© 2025 Aushadhi Mitra | An Initiative for Affordable Healthcare</p>
      </footer>
    </main>
  );
}
