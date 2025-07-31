// Lib/appointments.ts
import Appointment from "@/models/appointments";
import { connectDB } from "./db";
import { verifyToken } from "./jwt";
import { cookies } from "next/headers";

export async function getAppointments() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("⛔ No token found");
    return [];
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    console.log("✅ Server Decoded userId:", decoded.userId);

    const appointments = await Appointment.find({ userId: decoded.userId }).lean();
    return appointments;
  } catch (err) {
    console.error("⛔ JWT Verification Failed", err);
    return [];
  }
}
