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

    console.log("✅ Returning appointments:", appointments);

    return NextResponse.json(appointments); // return plain array ✅
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error fetching appointments:", error.message);
    } else {
      console.error("❌ Unknown error fetching appointments:", error);
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
