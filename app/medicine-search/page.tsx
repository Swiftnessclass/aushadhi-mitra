"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Medicine = {
  _id: string;
  name: string;
  description: string;
  disease: string;
  price: number;
};

export default function MedicineSearchPage() {
  const router = useRouter();
  const [disease, setDisease] = useState("");
  const [results, setResults] = useState<Medicine[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    if (!disease.trim()) {
      setError("Please enter a disease name.");
      setLoading(false);
      return;
    }

    try {
      setError("");
      const res = await fetch(`/api/search?disease=${encodeURIComponent(disease)}`);
      const data = await res.json();

      if (res.ok) {
        setResults(data);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false); // ✅ Always stop loader
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Medicine Search</h1>

      <input
        type="text"
        placeholder="Enter disease name..."
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        className="border p-2 w-full max-w-md"
      />
       <button
      onClick={handleSearch}
      disabled={loading}
      className={`bg-blue-500 text-white px-4 py-2 mt-2 ml-2 rounded transition ${
        loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"
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
          Searching...
        </div>
      ) : (
        "Search"
      )}
    </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Back Button (Positioned below search) */}
      <div className="mt-4">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline"
        >
          ← Go Back
        </button>
      </div>

      <div className="mt-6">
        {results.length === 0 ? (
          <p>No medicines found.</p>
        ) : (
          <ul>
            {results.map((med) => (
              <li key={med._id} className="border p-4 mb-2 rounded shadow-sm bg-white">
                <h2 className="text-xl font-semibold text-blue-700">{med.name}</h2>
                <p className="text-gray-700">{med.description}</p>
                <p className="text-sm mt-1">
                  <strong>Disease:</strong> {med.disease}
                </p>
                <p className="text-sm">
                  <strong>Price:</strong> ₹{med.price}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
