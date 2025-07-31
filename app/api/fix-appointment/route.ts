import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import Appointment from "@/models/appointments";

// GET /api/fix-appointment
export async function GET() {
  try {
    await connectDB();

    const oldUserId = "abc123"; // Old placeholder userId
    const correctUserId = "688b8331ebe5285b4fc2cf17"; // Your actual logged-in user's ID

    const result = await Appointment.updateOne(
      { userId: oldUserId },
      { $set: { userId: correctUserId } }
    );

    return NextResponse.json({
      message: "✅ User ID updated in appointment",
      result,
    });
  } catch (error) {
    console.error("❌ Error updating userId:", error);
    return NextResponse.json(
      { error: "Failed to update appointment userId" },
      { status: 500 }
    );
  }
}
