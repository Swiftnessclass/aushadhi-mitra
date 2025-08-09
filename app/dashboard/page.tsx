"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      
      
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <Link
    href="/medicine-search"
    className="flex items-center justify-center bg-blue-700 hover:bg-blue-800 
               text-white px-6 py-3 rounded shadow transition h-20"
  >
    Search Medicines
  </Link>

  <Link
    href="/chatbot"
    className="flex items-center justify-center bg-green-600 hover:bg-green-700 
               text-white px-6 py-3 rounded shadow transition h-20"
  >
    Ask Aushadhi Bot
  </Link>

  <Link
    href="/diet-plan"
    className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 
               text-white px-6 py-3 rounded shadow transition h-20"
  >
    Personalized Diet Plan
  </Link>

  <Link
    href="/exercise-tool"
    className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 
               text-white px-6 py-3 rounded shadow transition h-20"
  >
    Exercise Recommend
  </Link>
</div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <Image
  src="/aushadhi-illustration.png"
  alt="Aushadhi Illustration"
  width={400}
  height={300}
  className="w-4/5 max-w-md h-auto object-contain"
/>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg font-semibold mb-2">
            © 2025 Aushadhi Mitra | An Initiative for Affordable Healthcare
          </p>
          <p className="mb-1">Bringing Government Medicine Support to Every Home</p>
          <p className="mb-2">
            Find Jan Aushadhi Stores, Compare Prices, Explore Alternatives
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 text-sm mt-4">
            <span>Email: support@aushadhimitra.in</span>
            <span>Helpline: 1800-123-4567</span>
            <span>Address: Ministry of Health, New Delhi, India</span>
          </div>
          <div className="mt-4 text-sm">
            <a href="/privacy" className="underline hover:text-gray-300">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms" className="underline hover:text-gray-300 ml-2">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
