// components/SchemeFeedback.tsx
"use client";
import { useState } from "react";

export default function SchemeFeedback({
  schemeId,
  onSubmit,
}: {
  schemeId: string;
  onSubmit: () => void;
}) {
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    if (!feedback.trim()) return alert("Feedback cannot be empty");

    await fetch("/api/schemes/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schemeId, feedback }),
    });

    setFeedback("");
    alert("Thanks for your feedback!");
    onSubmit();
  };

  return (
    <div className="mt-4">
      <textarea
        className="w-full rounded p-2 border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-black dark:text-white 
                   placeholder-gray-500 dark:placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Leave your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        onClick={submitFeedback}
        className="mt-2 bg-green-600 hover:bg-green-700 
                   text-white px-4 py-2 rounded 
                   transition-colors duration-200"
      >
        Submit
      </button>
    </div>
  );
}
