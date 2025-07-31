import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/Lib/jwt"; // Make sure this exists
import type { JwtPayload } from "jsonwebtoken";
import DashboardPage from "./indashboard/page";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return redirect("/login");
  }

  try {
    const decoded = verifyToken(token);

    // Narrow the type
    if (typeof decoded !== "string" && (decoded as JwtPayload).id) {
      return redirect("/DashboardPage");
    } else {
      return redirect("/login");
    }
  } catch (err) {
    console.error("Invalid token", err);
    return redirect("/login");
  }
}  