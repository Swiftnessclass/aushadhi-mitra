// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Aushadhi Mitra",
  description: "Medicine portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar rendered always, will conditionally hide inside */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
