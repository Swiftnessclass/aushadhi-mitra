import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "./context/ThemeProvider";

export const metadata: Metadata = {
  title: "Aushadhi Mitra",
  description: "Medicine portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
