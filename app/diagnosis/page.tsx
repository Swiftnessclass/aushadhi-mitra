"use client";

import { useState } from "react";

export default function DiagnosisPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddSymptom = () => {
    const trimmed = customSymptom.trim();
    if (
      trimmed &&
      !symptoms.some((s) => s.toLowerCase() === trimmed.toLowerCase())
    ) {
      setSymptoms([...symptoms, trimmed]);
      setCustomSymptom("");
      setDiagnosis(""); // clear previous diagnosis after changing symptoms
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
    setDiagnosis(""); // clear previous diagnosis after changing symptoms
  };

  const handleSubmit = async () => {
    setDiagnosis("");
    setError("");
    if (!symptoms.length) {
      return alert("Please enter at least one symptom.");
    }
    setLoading(true);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gender, symptoms }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        throw new Error(errorData?.error || "Diagnosis failed");
      }

      const data = await res.json();
      setDiagnosis(data?.prediction || "Diagnosis received."); // Use the prediction field
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  


  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className=" rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          🩺 Aushadhi Mitra -Diagnosis
        </h1>

        <div className="grid gap-4">
        <input
  className="border border-gray-300 rounded-lg p-3 placeholder-gray-400 text-black"
  placeholder="Enter your name (optional)"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<select
  className="border border-gray-300 rounded-lg p-3 text-black"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
>
  <option value="" disabled className="text-gray-400">
    Select your gender
  </option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

<div>
  <div className="flex gap-2">
    <input
      className="flex-1 border border-gray-300 rounded-lg p-3 placeholder-gray-400 text-black"
      placeholder="Enter a symptom (e.g., headache)"
      value={customSymptom}
      onChange={(e) => setCustomSymptom(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleAddSymptom();
        }
      }}
    />




              <button
                onClick={handleAddSymptom}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>

            {symptoms.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {symptoms.map((s, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {s}
                    <button
                      onClick={() => handleRemoveSymptom(s)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white font-semibold px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Diagnosing..." : "Get Diagnosis"}
          </button>

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        {diagnosis && (
  <div className="mt-8 p-4 border-l-4 border-green-600 bg-green-50 rounded">
    <h2 className="text-xl font-bold text-green-800 mb-2">AI Diagnosis Result</h2>
    <p className="whitespace-pre-wrap text-gray-800">{diagnosis}</p>
   
  </div>
)}

      </div>
    </div>
  );
}
