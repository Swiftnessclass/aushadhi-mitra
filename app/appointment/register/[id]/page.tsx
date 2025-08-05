"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/appointments/${id}`);
        if (!res.ok) throw new Error("Failed to fetch appointment");
        const data = await res.json();
        setAppointment(data);
      } catch (err: any) {
        setMessage("❌ " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleRegister = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setMessage("❌ User not logged in.");
      return;
    }

    setRegistering(true);
    try {
      const res = await fetch("/api/register-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: id, userId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setMessage("✅ Registered successfully!");

      // Optionally redirect after success:
       setTimeout(() => router.push("/indashboard"), 2000);
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setRegistering(false);
    }
  };

  const handleCancel = () => {
    // Go back to the dashboard or appointments page
    router.push("/indashboard"); // Or wherever you'd like
  };

  if (loading) return <p className="p-4">Loading appointment details...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg border">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Register for Appointment</h1>

      {message && (
        <p
          className={`mb-4 font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {appointment && (
        <div className="space-y-2 mb-6">
          <p><strong>Doctor:</strong> {appointment.doctor}</p>
          <p><strong>Reason:</strong> {appointment.reason}</p>
          <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {appointment.location}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleRegister}
          disabled={registering}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {registering ? "Registering..." : "Confirm Registration"}
        </button>

        <button
          onClick={handleCancel}
          disabled={registering}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
