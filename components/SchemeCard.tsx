// components/SchemeCard.tsx
"use client";
import { useState } from "react";
import SchemeFeedback from "./SchemeFeedback";

type SchemeProps = {
  scheme: {
    _id: string; 
    title: string;
    description: string;
    category: string;
    minAge: number;
    maxIncome: number;
  };
};


export default function SchemeCard({ scheme }: SchemeProps) {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition bg-white dark:bg-gray-800 mb-4">
    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      {scheme.title}
    </h2>
    <p className="mb-2 text-gray-700        dark:text-gray-500">
        {scheme.description}
    </p>

      <p className="text-sm text-gray-600">Category: {scheme.category}</p>
      <p className="text-sm text-gray-600">Min Age: {scheme.minAge}</p>
      <p className="text-sm text-gray-600">Max Income: ₹{scheme.maxIncome}</p>

      <button
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowFeedback((prev) => !prev)}
      >
        {showFeedback ? "Cancel" : "Leave Feedback"}
      </button>

      {showFeedback && (
       <SchemeFeedback schemeId={scheme._id} onSubmit={() => setShowFeedback(false)} />

      )}
    </div>
  );
}
