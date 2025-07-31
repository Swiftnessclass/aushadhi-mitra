// app/api/debug/route.ts
import { connectDB } from "@/Lib/db";
import Appointment from "@/models/appointments";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const all = await Appointment.find();
  return NextResponse.json(all);
}

