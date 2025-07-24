"use client";

import { useState } from "react";

const hospitals = [
  { name: "District Hospital", location: "Mangaluru", contact: "080-123456" },
  { name: "Govt Hospital", location: "Udupi", contact: "080-789012" },
  { name: "KMC Public Wing", location: "Manipal", contact: "080-123789" },
];

export default function HospitalsPage() {
  const [search, setSearch] = useState("");

  const filtered = hospitals.filter((h) =>
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Government Hospitals</h1>

      <input
        type="text"
        placeholder="Search by city..."
        className="border p-2 rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-3">
        {filtered.map((h, idx) => (
          <li key={idx} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold">{h.name}</h2>
            <p>{h.location}</p>
            <p className="text-gray-600">Contact: {h.contact}</p>
          </li>
        ))}
        {filtered.length === 0 && <p>No hospitals found in that area.</p>}
      </ul>
    </div>
  );
}
