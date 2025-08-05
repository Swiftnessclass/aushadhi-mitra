"use client";
import { useState } from "react";
import { Hospital, LocateIcon, MapPin, Search } from "lucide-react";

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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className=" rounded-3xl shadow-xl p-10 border border-gray-100">
        <h1 className="text-4xl font-bold text-blue-700 mb-2 flex items-center gap-2">
          <LocateIcon className="w-8 h-8" />
          Pharmacy & Clinic Locator
        </h1>
        <p className="text-gray-700 mb-6">
           Easily find <strong>pharmacies, clinics, and hospitals</strong> near you
          by entering a place or using your current location.
        </p>

        {/* Place input */}
        <input
          type="text"
          placeholder="📍 Enter a location (optional)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-5"
        />

        {/* Radius dropdown */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700 font-medium">
            Radius Distance:
          </label>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[500, 1000, 2000, 3000, 4000, 5000].map((r) => (
              <option key={r} value={r}>
                {r} meters
              </option>
            ))}
          </select>
        </div>

        {/* Include hospitals checkbox */}
        <div className="mb-6 flex items-center gap-3">
          <input
            type="checkbox"
            checked={includeHospitals}
            onChange={() => setIncludeHospitals((prev) => !prev)}
            id="includeHospitals"
            className="accent-blue-600 w-5 h-5"
          />
          <label htmlFor="includeHospitals" className="text-gray-700 font-medium">
            Include clinics and hospitals
          </label>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          {loading ? "Searching..." : "Search Nearby"}
        </button>

        {/* Message */}
        {message && (
          <p className="mt-4 text-red-600 font-semibold text-center">{message}</p>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">
            📍 Nearby Facilities:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((place, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg text-blue-700 mb-1 flex items-center gap-1">
                  <Hospital className="w-5 h-5" />
                  {place.tags?.name || "Unnamed Facility"}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Type: {place.tags?.amenity || "Unknown"}
                </p>
                <a
                  href={`https://maps.google.com/?q=${place.lat},${place.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm underline"
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
