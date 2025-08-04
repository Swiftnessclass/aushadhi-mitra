// app/api/appointments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Lib/db"; // Ensure this path is correct
import Appointment from "@/models/appointments";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const reason = searchParams.get("reason");

  if (!reason || reason.trim() === "") {
    return NextResponse.json(
      { error: "Missing 'reason' parameter in query" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const appointments = await Appointment.find({
      reason: { $regex: reason, $options: "i" }, // Case-insensitive partial match
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
