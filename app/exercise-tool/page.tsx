"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExerciseTool() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    goal: "Weight Loss",
    activityLevel: "Moderate",
  });

  const [plan, setPlan] = useState("");

  const exercisePlans: Record<string, string> = {
    "Weight Loss": `
  1. Cardiovascular Training
     - Perform 30–45 minutes of cardio (e.g., brisk walking, jogging, cycling) 4–5 times per week.
     - Focus on maintaining a moderate heart rate for fat burning.
  
  2. Strength Training
     - Full-body resistance training 2–3 times per week.
     - Emphasize compound movements (squats, lunges, push-ups, rows).
  
  3. Flexibility & Recovery
     - Stretch or perform yoga 2 times per week to improve flexibility and reduce injury risk.
  
  4. Lifestyle
     - Maintain a calorie deficit through a balanced, nutritious diet.
     - Track progress weekly and adjust intensity as needed.
    `.trim(),
  
    "Muscle Gain": `
  1. Resistance Training
     - Lift weights 4–5 times per week focusing on hypertrophy (8–12 reps per set).
     - Prioritize major muscle groups with compound lifts (bench press, deadlifts, squats).
  
  2. Progressive Overload
     - Gradually increase the weight or reps weekly to ensure continuous muscle development.
  
  3. Nutrition
     - Increase daily calorie intake with a focus on protein (1.6–2.2g per kg body weight).
     - Include complex carbs and healthy fats for energy and recovery.
  
  4. Recovery
     - Ensure 7–9 hours of sleep per night.
     - Allow muscle groups 48 hours to recover between sessions.
    `.trim(),
  
    "General Fitness": `
  1. Daily Movement
     - Aim for 30 minutes of light activity (walking, cycling) daily.
     - Take frequent short breaks from long sitting sessions.
  
  2. Strength & Endurance
     - Include full-body strength training 2–3 times per week.
     - Mix in low-impact cardio (e.g., swimming, brisk walking).
  
  3. Flexibility & Balance
     - Practice stretching or yoga 2–3 times per week.
     - Include balance exercises like single-leg stands or light agility drills.
  
  4. Wellness
     - Stay hydrated, eat a balanced diet, and manage stress.
     - Engage in hobbies or activities that promote mental health.
    `.trim(),
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

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-green-600 hover:underline"
        >
          ← Go Back
        </button>

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
