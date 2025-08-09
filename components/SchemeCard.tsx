"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // for navigation
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
  const router = useRouter();

  const handleApply = () => {
    // Navigate to an application form page with the scheme ID
    router.push(`/apply/${scheme._id}`);
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition bg-white dark:bg-gray-800 mb-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {scheme.title}
      </h2>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        {scheme.description}
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-400">Category: {scheme.category}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Min Age: {scheme.minAge}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Max Income: ₹{scheme.maxIncome}</p>

      <div className="flex gap-2 mt-3">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowFeedback((prev) => !prev)}
        >
          {showFeedback ? "Cancel" : "Leave Feedback"}
        </button>
      </div>

      {showFeedback && (
        <SchemeFeedback
          schemeId={scheme._id}
          onSubmit={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
}
