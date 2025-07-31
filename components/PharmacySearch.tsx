"use client";
import { useState } from "react";

type Place = {
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    amenity?: string;
  };
};

type SearchRequestBody = {
  place?: string;
  coords?: { lat: number; lon: number };
  radius: number;
  includeHospitals: boolean;
};

type PharmacyApiResponse = {
  results: Place[];
};

export default function PharmacySearch() {
  const [place, setPlace] = useState("");
  const [radius, setRadius] = useState(1000);
  const [includeHospitals, setIncludeHospitals] = useState(true);
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setMessage("");
    setResults([]);

    const requestBody: SearchRequestBody = {
      radius,
      includeHospitals,
    };

    if (place.trim()) {
      requestBody.place = place;
      fetchData(requestBody);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          requestBody.coords = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          fetchData(requestBody);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setMessage("❌ Failed to access your location.");
          setLoading(false);
        }
      );
    } else {
      setMessage("❌ Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  const fetchData = async (body: SearchRequestBody) => {
    try {
      const res = await fetch("/api/pharmacies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = (await res.json()) as PharmacyApiResponse;

      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setMessage("❌ No nearby pharmacies found.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("⚠️ Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(Number(e.target.value));
  };

  const handleIncludeHospitalsChange = () => {
    setIncludeHospitals((prev) => !prev);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          🔍 Pharmacy & Clinic Locator
        </h1>
        <p className="text-gray-600 mb-6">
          Find nearby <strong>pharmacies, clinics, and hospitals</strong> using
          a place name or your current location.
        </p>

        <input
          type="text"
          placeholder="Enter a place (optional)"
          value={place}
          onChange={handlePlaceChange}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Search Radius:{" "}
            <span className="text-blue-600">{radius} meters</span>
          </label>
          <input
            type="range"
            min={100}
            max={5000}
            step={100}
            value={radius}
            onChange={handleRadiusChange}
            className="w-full accent-blue-600"
          />
        </div>

        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeHospitals}
            onChange={handleIncludeHospitalsChange}
            id="includeHospitals"
            className="accent-blue-600"
          />
          <label htmlFor="includeHospitals" className="text-gray-700">
            Include clinics and hospitals
          </label>
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search Nearby"}
        </button>

        {message && (
          <p className="mt-4 text-red-600 font-medium text-center">{message}</p>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📍 Results:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((place, idx) => (
              <div
                key={idx}
                className="bg-white p-5 border border-gray-200 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg text-blue-700">
                  {place.tags?.name || "Unnamed Facility"}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  Type: {place.tags?.amenity || "Unknown"}
                </p>
                <a
                  className="text-blue-500 text-sm underline"
                  href={`https://maps.google.com/?q=${place.lat},${place.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
