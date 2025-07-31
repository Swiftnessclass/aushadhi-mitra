// app/api/appointments/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import  Appointment from "@/models/appointment";// You must define this
import { cookies } from "next/headers";
import { verifyToken } from "@/Lib/jwt";

export async function GET() {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return NextResponse.json([], { status: 200 });

  const decoded = verifyToken(token);
  const userId = (decoded as any).id;

  const appointments = await Appointment.find({ userId });

  return NextResponse.json(appointments);
}
