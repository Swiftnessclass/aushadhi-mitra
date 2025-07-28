"use client";

import { useState } from "react";

type Medicine = {
  _id: string;
  name: string;
  description: string;
  disease: string;
  price: number;
};

export default function MedicineSearchPage() {
  const [disease, setDisease] = useState("");
  const [results, setResults] = useState<Medicine[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!disease.trim()) {
      setError("Please enter a disease name.");
      return;
    }

    setError("");
    const res = await fetch(`/api/search?disease=${encodeURIComponent(disease)}`);
    const data = await res.json();

    if (res.ok) {
      setResults(data);
    } else {
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Medicine Search</h1>
      <input
        type="text"
        placeholder="Enter disease name..."
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        className="border p-2 w-full max-w-md"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Search
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <div className="mt-6">
        {results.length === 0 ? (
          <p>No medicines found.</p>
        ) : (
          <ul>
            {results.map((med) => (
              <li key={med._id} className="border p-4 mb-2">
                <h2 className="text-xl font-semibold">{med.name}</h2>
                <p>{med.description}</p>
                <p><strong>Disease:</strong> {med.disease}</p>
                <p><strong>Price:</strong> ₹{med.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
