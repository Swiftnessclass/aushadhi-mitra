// app/dashboard/page.tsx

import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/Lib/jwt";
import { connectDB } from "@/Lib/db";
import User, { IUser } from "@/models/apointUser";
import Appointment, { SerializedAppointment } from "@/models/appointments";

import Welcome from "@/components/dashboard/Welcome";
import ProfileSummary from "@/components/dashboard/ProfileSummary";
import Appointments from "@/components/dashboard/Appointment"; // ✅ Client Component

// ✅ Temporary lean-safe type for raw Mongoose output
interface RawAppointment {
  _id: unknown;
  userId: unknown;
  doctor: string;
  date: Date;
  location: string;
  reason: string;
}

export default async function DashboardPage() {
  await connectDB();

  const cookieStore = await cookies(); // ✅ no await
  const token = cookieStore.get("token")?.value;

  if (!token) return <div className="text-red-600">Unauthorized</div>;

  let userId: string | null = null;

  try {
    const decoded = verifyToken(token);
    if (typeof decoded !== "string" && decoded.id) {
      userId = decoded.id;
    }
  } catch (err) {
    return <div className="text-red-600">Invalid or expired token</div>;
  }

  if (!userId) return <div className="text-red-600">Unauthorized</div>;

  const user = await User.findById(userId).lean<IUser>();
  if (!user) return <div className="text-red-600">User not found</div>;

  const rawAppointments = await Appointment.find({ userId })
    .sort({ date: 1 })
    .lean<RawAppointment[]>(); // ✅ Tell TypeScript what lean() returns

  // ✅ Convert raw Mongoose docs into serialized plain objects
  const upcoming: SerializedAppointment[] = rawAppointments.map((apt) => ({
    _id: String(apt._id),
    userId: String(apt.userId),
    doctor: apt.doctor,
    date: apt.date instanceof Date ? apt.date.toISOString() : String(apt.date),
  location: apt.location,
  reason: apt.reason,
  }));

  return (
    <main className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Back to Dashboard Button */}
      <div className="mb-4">
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Welcome Banner */}
      <Welcome name={user.name} />

      {/* Main Grid: Profile + Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSummary profile={user} />
        <Appointments appointments={upcoming} />
      </div>
    </main>
  );
}
