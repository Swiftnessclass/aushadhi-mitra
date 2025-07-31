"use client";

import { useState } from "react";
import SchemeCard from "@/components/SchemeCard";

type Scheme = {
  _id: string;
  title: string;
  description: string;
  category: string;
  minAge: number;
  maxIncome: number;
};

type Filters = {
  age: string;
  income: string;
  category: string;
};

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filters, setFilters] = useState<Filters>({
    age: "",
    income: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getQueryString = (filters: Filters): string => {
    const validFilters: Record<string, string> = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value.trim() !== "") {
        validFilters[key] = value;
      }
    });

    return new URLSearchParams(validFilters).toString();
  };

  const fetchSchemes = async () => {
    try {
      const query = getQueryString(filters);
      const res = await fetch(`/api/schemes?${query}`);
      const data: Scheme[] = await res.json();
      console.log("Fetched schemes:", data);
      setSchemes(data);
    } catch (err) {
      console.error("Error fetching schemes:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Government Health Schemes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          name="age"
          placeholder="Age"
          min={0}
          max={120}
          className="p-2 border rounded"
          value={filters.age}
          onChange={handleChange}
        />
        <input
          type="number"
          name="income"
          placeholder="Annual Income"
          min={0}
          className="p-2 border rounded"
          value={filters.income}
          onChange={handleChange}
        />
        <select
          name="category"
          className="p-2 border rounded"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="Women">Women</option>
          <option value="Education">Education</option>
          <option value="Senior">Senior</option>
          <option value="General">General</option>
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        onClick={fetchSchemes}
        disabled={
          filters.age.trim() === "" &&
          filters.income.trim() === "" &&
          filters.category.trim() === ""
        }
      >
        Search
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {schemes.length > 0 ? (
          schemes.map((scheme) => (
            <SchemeCard key={scheme._id} scheme={scheme} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            Search to find schemes…
          </p>
        )}
      </div>
    </div>
  );
}
