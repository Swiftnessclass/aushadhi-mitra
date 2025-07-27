"use client";

import { useState } from "react";

export default function ExerciseTool() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    goal: "Weight Loss",
    activityLevel: "Moderate",
  });
  const [plan, setPlan] = useState("");

  const exercisePlans: Record<string, string> = {
    "Weight Loss": "💪 30 mins cardio (jogging, cycling)\n🏋️ Strength training (3x/week)\n🧘 Yoga or stretching (2x/week)",
    "Muscle Gain": "🏋️ Heavy weightlifting (4x/week)\n🍗 High protein intake\n😴 Adequate rest",
    "General Fitness": "🚶 20 mins walking daily\n🏋️ Full body workout (2x/week)\n🧘 10 mins meditation",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlan(exercisePlans[formData.goal]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Personalized Exercise Plan
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your details to receive a suitable exercise routine.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Fitness Goal</label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>General Fitness</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Activity Level</label>
            <select
              value={formData.activityLevel}
              onChange={(e) =>
                setFormData({ ...formData, activityLevel: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Get Exercise Plan
          </button>
        </form>

        {plan && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow-sm whitespace-pre-line">
            <h2 className="text-xl font-semibold mb-2">Suggested Plan:</h2>
            <p>{plan}</p>
          </div>
        )}
      </div>
    </main>
  );
}
