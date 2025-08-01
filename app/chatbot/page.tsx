"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatBotPage() {
  const router = useRouter();

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Please try again." },
      ]);
      console.error("Chatbot error:", error);
    }

    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-2 text-blue-800">
        Aushadhi Mitra Chatbot
      </h1>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
      >
        ← Back
      </button>

      {/* Chat Box */}
      <div className="border p-4 rounded h-96 overflow-y-auto bg-gray-50 shadow-inner">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.role === "bot"
                ? "text-left text-blue-800"
                : "text-right text-green-700"
            }`}
          >
            <span className="inline-block px-4 py-2 rounded bg-white shadow">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}
