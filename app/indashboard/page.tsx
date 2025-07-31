import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/Lib/jwt";
import { connectDB } from "@/Lib/db";
import User, { IUser } from "@/models/apointUser";
import Appointment, { IAppointment } from "@/models/appointment";

import Welcome from "@/components/dashboard/Welcome";
import ProfileSummary from "@/components/dashboard/ProfileSummary";
import Appointments from "@/components/dashboard/Appointment";

export default async function DashboardPage() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return <div>Unauthorized</div>;

  let userId: string | null = null;
  try {
    const decoded = verifyToken(token);
    if (typeof decoded !== "string" && decoded.id) {
      userId = decoded.id;
      console.log("Server Decoded userId:", userId);
    }
  } catch (err) {
    console.error("Token verification failed", err);
    return <div>Unauthorized</div>;
  }

  if (!userId) return <div>Unauthorized</div>;

  const user = await User.findById(userId).lean<IUser>();
  console.log("Server  User fetched:", user);

  if (!user) return <div>User not found</div>;

  const appointments = (await Appointment.find({ userId })
    .sort({ date: 1 })
    .limit(5)
    .lean()) as unknown as IAppointment[];

  return (
    <main className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Go Back Button */}
      <div className="mb-4">
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>

      <Welcome name={user.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSummary profile={user} />
        <Appointments appointments={appointments} />

      </div>
    </main>
  );
}
