import { connectDB } from "@/Lib/db";
import Appointment from "@/models/appointments";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const reason = searchParams.get("reason");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const query: {
      userId: string;
      reason?: { $regex: string; $options: string };
      date?: { $gte: Date };
    } = {
      userId,
      date: { $gte: new Date() }, // only fetch future appointments
    };

    if (reason) {
      query.reason = { $regex: reason, $options: "i" };
    }

    const appointments = await Appointment.find(query).sort({ date: 1 });

    // ✅ Convert ObjectId and Date to strings
    const serializedAppointments = appointments.map((apt) => ({
      _id: apt._id.toString(),
      userId: apt.userId?.toString(),
      doctor: apt.doctor,
      date: apt.date.toISOString(),
      location: apt.location,
      reason: apt.reason,
    }));

    console.log("✅ Returning appointments:", serializedAppointments);

    return NextResponse.json(serializedAppointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
