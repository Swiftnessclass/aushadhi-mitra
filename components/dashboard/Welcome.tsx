"use client";

const healthTips = [
  "Stay hydrated and drink at least 2L of water daily.",
  "Take a 5-minute walk after every hour of sitting.",
  "Eat fruits and vegetables rich in fiber and vitamins.",
  "Sleep at least 7–8 hours every night.",
];

export default function Welcome({ name }: { name: string }) {
  const tip = healthTips[Math.floor(Math.random() * healthTips.length)];

  return (
    <div className="bg-blue-100 p-4 rounded-xl shadow-md space-y-2">
  <h2 className="text-xl font-semibold text-blue-900">Welcome back, {name} 👋</h2>
  <p className="text-sm text-gray-700">💡 Health Tip: {tip}</p>
</div>

  );
}
