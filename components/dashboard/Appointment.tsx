"use client";

import { IAppointment } from "@/models/appointments";
import { useEffect, useState } from "react";

type Props = {
  appointments: IAppointment[];
};

export default function Appointments({ appointments }: Props) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<IAppointment[] | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = () => {
    const results = appointments.filter((apt) =>
      apt.reason.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
      <h2 className="text-xl font-bold text-blue-800 mb-4">
        🔍 Search Appointments
      </h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by reason (e.g., fever, rash)"
          className="p-2 border border-gray-300 rounded w-full placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Search
        </button>
      </div>

      {filtered !== null && (
        <>
          {filtered.length === 0 ? (
            <p className="text-red-500 font-medium">No matching appointments found.</p>
          ) : (
            <ul className="space-y-3">
              {filtered.map((apt) => (
                <li
                  key={apt._id?.toString()}
                  className="bg-blue-50 p-3 rounded shadow-sm border border-blue-100"
                >
                  <p className="text-blue-900 font-semibold">{apt.doctor}</p>
                  <p className="text-sm text-gray-700">
                    {isClient ? new Date(apt.date).toLocaleString() : "Loading..."} at{" "}
                    <span className="text-gray-600">{apt.location}</span>
                  </p>
                  <p className="text-sm text-indigo-700 italic">{apt.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
