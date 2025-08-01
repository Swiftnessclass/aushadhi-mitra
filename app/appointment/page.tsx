"use client";

import { useEffect, useState } from "react";
import Appointments from "@/components/dashboard/Appointment";
import { IAppointment } from "@/models/appointments";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    if (storedUserId) {
      fetch(`/api/appoint?userId=${storedUserId}`) // ✅ match API route filename
        .then((res) => res.json())
        .then((data: IAppointment[]) => {
          setAppointments(data);
        })
        .catch((err) => {
          console.error("Failed to fetch appointments", err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="p-4 text-gray-500">Loading appointments...</p>;
  }

  if (!userId) {
    return <p className="p-4 text-red-600">User not logged in.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <Appointments appointments={appointments} />
    </div>
  );
}
