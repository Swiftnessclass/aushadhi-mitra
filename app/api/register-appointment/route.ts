// app/api/register-appointment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import Appointment from "@/models/appointments";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { userId, appointmentId } = await req.json();

    if (!userId || !appointmentId)
      return NextResponse.json({ message: "Missing data" }, { status: 400 });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    if (appointment.registeredUsers.includes(userId))
      return NextResponse.json({ message: "Already registered" }, { status: 409 });

    appointment.registeredUsers.push(userId);
    await appointment.save();

    return NextResponse.json({ message: "Registered successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
