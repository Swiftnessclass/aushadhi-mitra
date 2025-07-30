// app/layout.tsx
import "./globals.css";
import { cookies } from "next/headers";
import { Navbar } from "@/component/Navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // ✅ Await it
  const token = cookieStore.get("token")?.value;

  const isLoggedIn = !!token;

  return (
    <html lang="en">
      <body>
        {isLoggedIn && <Navbar />}
        {children}
      </body>
    </html>
  );
}
