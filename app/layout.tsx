import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/app/context/ThemeProvider"; // ensure this path is correct

export const metadata: Metadata = {
  title: "Aushadhi Mitra",
  description: "Medicine portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-900 text-white">
        <ThemeProvider>
          <Navbar />
          {/* Push content below fixed navbar */}
          <main className="pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
