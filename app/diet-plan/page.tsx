"use client";

import { useState } from "react";

export default function DietPlansPage() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    activity: "moderate",
    goal: "maintain",
  });

  const [dietPlan, setDietPlan] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple logic — replace with AI-based later
    let plan = `For a ${formData.age}-year-old ${formData.gender} with ${formData.activity} activity aiming to ${formData.goal} weight:\n\n`;

    if (formData.goal === "lose") {
      plan += `• Breakfast: Oats with fruits and green tea\n• Lunch: Grilled vegetables with brown rice\n• Dinner: Soup and salad\n• Snacks: Nuts & yogurt\n\nDrink plenty of water.`;
    } else if (formData.goal === "gain") {
      plan += `• Breakfast: Eggs, toast, banana smoothie\n• Lunch: Chicken curry with rice\n• Dinner: Paneer/Tofu with roti\n• Snacks: Peanut butter, protein bars\n\nIncrease calorie intake healthily.`;
    } else {
      plan += `• Balanced meals with lean proteins, carbs & veggies\n• 3 main meals + 2 healthy snacks\n• Avoid processed foods\n\nStay active & hydrated.`;
    }

    setDietPlan(plan);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Personalized Diet Plan
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Activity Level</label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Health Goal</label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="maintain">Maintain Weight</option>
                <option value="lose">Lose Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
          >
            Get Diet Plan
          </button>
        </form>

        {dietPlan && (
          <div className="mt-10 bg-blue-50 border border-blue-200 p-6 rounded">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Your Suggested Diet Plan:</h2>
            <pre className="whitespace-pre-wrap text-gray-800">{dietPlan}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
