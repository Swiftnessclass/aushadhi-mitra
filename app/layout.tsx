import type { Metadata } from "next";
import { Navbar } from "@/component/Navbar";
import "./globals.css";


export const metadata: Metadata = {
  title: "Aushadhi Mitra",
  description: "Check medicine availability, prices, stores & more",
};

// This is the root layout for the application.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar /> {/* ✅ Shown on every page */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}