// components/EligibilityCheck.tsx
import { useState } from "react";

type Scheme = {
  minAge: number;
  maxIncome: number;
};

export default function EligibilityCheck({ scheme }: { scheme: Scheme }) {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [eligible, setEligible] = useState<string | null>(null);

  const checkEligibility = () => {
    if (+age >= scheme.minAge && +income <= scheme.maxIncome) {
      setEligible("✅ You are eligible for this scheme!");
    } else {
      setEligible("❌ Sorry, you are not eligible.");
    }
  };

  return (
    <div className="mt-4">
      <input
        type="number"
        placeholder="Your Age"
        className="p-2 border rounded mr-2"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="number"
        placeholder="Your Income"
        className="p-2 border rounded mr-2"
        onChange={(e) => setIncome(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={checkEligibility}
      >
        Check
      </button>
      {eligible && <p className="mt-2">{eligible}</p>}
    </div>
  );
}
