// components/SchemeFeedback.tsx
import { useState } from "react";
export default function SchemeFeedback({ schemeId }: { schemeId: string }) {
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    await fetch("/api/schemes/feedback", {
      method: "POST",
      body: JSON.stringify({ schemeId, feedback }),
    });
    setFeedback("");
    alert("Thanks for your feedback!");
  };

  return (
    <div className="mt-4">
      <textarea
        className="w-full border rounded p-2"
        placeholder="Leave your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={submitFeedback} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
}
