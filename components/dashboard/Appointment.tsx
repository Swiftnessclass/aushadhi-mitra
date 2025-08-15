"use client";

import { useState } from "react";
import { SerializedAppointment } from "@/models/appointments";
import Link from "next/link";

type Props = {
  appointments: SerializedAppointment[];
};

export default function Appointments({ appointments }: Props) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<SerializedAppointment[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/appointments?reason=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error("API Error");

      const data: SerializedAppointment[] = await res.json();
      setFiltered(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const displayAppointments = filtered !== null ? filtered : appointments;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
      <h2 className="text-xl font-bold text-blue-800 mb-4">🔍 Search Appointments</h2>

      <div className="flex items-center gap-2 mb-4">
  <input
    type="text"
    placeholder="Search eg: skin care"
    className="p-2 border border-gray-300 dark:border-gray-600 
               rounded w-full 
               bg-white dark:bg-gray-800 
               text-black dark:text-white 
               placeholder-gray-500 dark:placeholder-gray-400 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button
    onClick={handleSearch}
    disabled={loading}
    className={`bg-blue-600 text-white px-4 py-2 rounded transition ${
      loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
    }`}
  >
    {loading ? (
      <div className="flex items-center">
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
        Loading...
      </div>
    ) : (
      "Search"
    )}
  </button>
</div>


      {loading && <p className="text-blue-500 mb-2">Searching...</p>}

      {filtered !== null && (
        <ul className="space-y-3">
          {displayAppointments.length === 0 ? (
            <p className="text-red-500 font-medium">No matching appointments found.</p>
          ) : (
            displayAppointments.map((apt) => (
              <li
                key={apt._id}
                className="bg-blue-50 p-3 rounded shadow-sm border border-blue-100"
              >
                <p className="text-blue-900 font-semibold">{apt.doctor}</p>
                <p className="text-sm text-gray-700">
                  {new Date(apt.date).toLocaleString()} at{" "}
                  <span className="text-gray-600">{apt.location}</span>
                </p>
                <p className="text-sm text-indigo-700 italic">{apt.reason}</p>

                {/* ✅ Register Button */}
                <div className="mt-3">
                  <Link
                    href={`/appointment/register/${apt._id}`}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Register
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
