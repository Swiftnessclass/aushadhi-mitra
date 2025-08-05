// app/api/appointments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import Appointment from "@/models/appointments";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({
      _id: appointment._id,
      doctor: appointment.doctor,
      reason: appointment.reason,
      date: appointment.date.toISOString(),
      location: appointment.location,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}
