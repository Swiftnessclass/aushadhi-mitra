"use client";

import { IAppointment } from "@/models/appointments";
import { useEffect, useState } from "react";

type Props = {
  appointments: IAppointment[];
};

export default function Appointments({ appointments }: Props) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<IAppointment[]>(appointments);
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
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>

      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          placeholder="Search by reason (e.g., skin rash)"
          className="p-2 border border-gray-300 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No matching appointments.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((apt) => (
            <li key={apt._id?.toString()} className="text-sm">
              <strong>{apt.doctor}</strong> on{" "}
              {isClient ? new Date(apt.date).toDateString() : "loading..."} at{" "}
              {apt.location} –{" "}
              <span className="italic text-gray-600">{apt.reason}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
