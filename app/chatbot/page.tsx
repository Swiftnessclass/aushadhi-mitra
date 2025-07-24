"use client";
import { useState } from "react";

export default function ChatBotPage() {
  const [messages, setMessages] = useState([{ role: "bot", text: "Hi! How can I help you today?" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    const res = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Aushadhi Mitra Chatbot</h1>
      <div className="border p-4 rounded h-96 overflow-y-auto bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.role === "bot" ? "text-left text-blue-800" : "text-right text-green-700"}`}
          >
            <span className="inline-block px-4 py-2 rounded bg-white shadow">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow border rounded-l px-4 py-2"
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
