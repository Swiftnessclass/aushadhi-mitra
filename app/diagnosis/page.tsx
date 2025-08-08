"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, PlusCircle, Trash2 } from "lucide-react";

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
      setDiagnosis("");
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
    setDiagnosis("");
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
        throw new Error(errorData?.error || "Diagnosis failed");
      }

      const data = await res.json();
      setDiagnosis(data?.prediction || "Diagnosis received.");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="rounded-2xl shadow-lg p-8 border border-gray-200 bg-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="text-3xl font-bold text-blue-700 mb-6 text-center flex items-center justify-center gap-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Stethoscope className="w-7 h-7 text-blue-600" />
          🩺 Aushadhi Mitra - Diagnosis
        </motion.h1>

        <div className="grid gap-4">
          <motion.input
            className="border border-gray-300 rounded-lg p-3 placeholder-gray-400 text-black"
            placeholder="Enter your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.select
            className="border border-gray-300 rounded-lg p-3 text-black"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </motion.select>

          <div>
            <div className="flex gap-2">
              <motion.input
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
                whileFocus={{ scale: 1.02 }}
              />

              <motion.button
                onClick={handleAddSymptom}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-1"
                whileTap={{ scale: 0.95 }}
              >
                <PlusCircle className="w-4 h-4" /> Add
              </motion.button>
            </div>

            <AnimatePresence>
              {symptoms.length > 0 && (
                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {symptoms.map((s, i) => (
                    <motion.span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      {s}
                      <button
                        onClick={() => handleRemoveSymptom(s)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white font-semibold px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Diagnosing..." : "Get Diagnosis"}
          </motion.button>

          {error && (
            <motion.p
              className="text-red-600 text-sm mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
        </div>

        <AnimatePresence>
          {diagnosis && (
            <motion.div
              className="mt-8 p-4 border-l-4 border-green-600 bg-green-50 rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-green-800 mb-2">
                AI Diagnosis Result
              </h2>
              <p className="whitespace-pre-wrap text-gray-800">{diagnosis}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
