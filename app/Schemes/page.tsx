"use client";

import { useState } from "react";
import SchemeCard from "@/component/SchemeCard";

type Scheme = {
  _id: string;
  title: string;
  description: string;
  category: string;
  minAge: number;
  maxIncome: number;
};

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filters, setFilters] = useState({ age: "", income: "", category: "" });

  const fetchSchemes = async () => {
    const query = new URLSearchParams(filters as any).toString();
    const res = await fetch(`/api/schemes?${query}`);
    const data = await res.json();
    console.log("Fetched schemes:", data);
    setSchemes(data);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Government Health Schemes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Age"
          className="p-2 border rounded"
          value={filters.age}
          onChange={(e) => setFilters({ ...filters, age: e.target.value })}
        />
        <input
          type="number"
          placeholder="Annual Income"
          className="p-2 border rounded"
          value={filters.income}
          onChange={(e) => setFilters({ ...filters, income: e.target.value })}
        />
        <select
          className="p-2 border rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Women">Women</option>
          <option value="Education">Education</option>
          <option value="Senior">Senior</option>
          <option value="General">General</option>
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={fetchSchemes}
      >
        Search
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {schemes.length > 0 ? (
          schemes.map((scheme) => (
            <SchemeCard key={scheme._id} scheme={scheme} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No schemes found. Try different filters.</p>
        )}
      </div>
    </div>
  );
}
