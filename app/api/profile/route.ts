// app/api/profile/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { User } from "@/models/User";
import { verifyToken } from "@/Lib/jwt";

export async function GET() {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await User.findById((decoded as any).id).select(
    "name age gender location language"
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
