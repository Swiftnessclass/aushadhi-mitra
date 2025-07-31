import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { User } from "@/models/User";
import { verifyToken } from "@/Lib/jwt";
import type { JwtPayload } from "jsonwebtoken";

export async function GET() {
  try {
    await connectDB();

    const cookieStore =await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as JwtPayload | null;

    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id).select(
      "name age gender location language"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    // Use type assertion or check type
    if (error instanceof Error) {
      console.error("Profile GET error:", error.message);
    } else {
      console.error("Profile GET unknown error:", error);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
